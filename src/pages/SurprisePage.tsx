import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import InteractiveCake from '@/components/InteractiveCake';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Home, Star, Heart, Gift } from 'lucide-react';
import { launchFireworks } from '@/utils/confetti';

const SurprisePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Floating element component for decorations
  const FloatingElement = ({ children, delay = 0, className = "" }) => (
    <div 
      className={`animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );

  useEffect(() => {
    // Add entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Initialize audio using shared global instance
    if (!window._birthdayAudio) {
      window._birthdayAudio = new Audio('/happy-birthday.mp3');
    }
    audioRef.current = window._birthdayAudio;
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSurpriseClick = () => {
    if (!isCelebrating) {
      setIsCelebrating(true);
      
      // Launch fireworks animation
      launchFireworks();
      
      // Play birthday song only if not already playing
      if (audioRef.current && (audioRef.current.paused || audioRef.current.ended)) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      
      // Reset celebration state after animation completes
      setTimeout(() => {
        setIsCelebrating(false);
      }, 6000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Floating decorative elements with responsive positioning */}
      <FloatingElement delay={0.3} className="absolute top-14 left-4 sm:left-10 text-yellow-400">
        <Star size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
      </FloatingElement>
      
      <FloatingElement delay={0.7} className="absolute top-28 right-6 sm:right-16 text-pink-400">
        <Star size={14} className="sm:w-6 sm:h-6" fill="currentColor" />
      </FloatingElement>
      
      <FloatingElement delay={1.2} className="absolute bottom-24 left-8 sm:left-24 text-purple-400">
        <Sparkles size={18} className="sm:w-5 sm:h-5" />
      </FloatingElement>
      
      <FloatingElement delay={0.5} className="absolute bottom-40 right-5 sm:right-20 text-yellow-500">
        <Star size={12} className="sm:w-4 sm:h-4" fill="currentColor" />
      </FloatingElement>
      
      {/* Larger decorations only visible on bigger screens */}
      <FloatingElement delay={1.5} className="absolute top-1/4 left-16 text-pink-300 hidden sm:block">
        <Heart size={24} fill="currentColor" />
      </FloatingElement>
      
      <FloatingElement delay={0.9} className="absolute bottom-1/4 right-24 text-purple-300 hidden sm:block">
        <Gift size={28} />
      </FloatingElement>

      <div 
        className={`w-full max-w-sm sm:max-w-md transition-all duration-1000 z-10 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}
      >
        <Card className="shadow-xl border-2 border-pink-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-pink-600 mb-4 sm:mb-6 animate-pulse">
              Birthday Surprise!
            </h1>
            
            <InteractiveCake name="Kashish" />
            
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                May your day be filled with joy, laughter, and sweet memories!
              </p>
              <Button
                onClick={handleSurpriseClick}
                disabled={isCelebrating}
                className={`relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-sm sm:text-base py-2 px-3 sm:py-2 sm:px-4 ${
                  isCelebrating ? 'opacity-80' : ''
                }`}
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <Sparkles className={`h-4 w-4 sm:h-5 sm:w-5 ${isCelebrating ? 'animate-pulse' : ''}`} />
                  Click for Surprise!
                </span>
                {isCelebrating && (
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold animate-pulse text-sm sm:text-base">
                    ✨ Celebrating! ✨
                  </span>
                )}
              </Button>
            </div>
            
            {/* Hidden audio element */}
            <audio preload="auto" src="/happy-birthday.mp3" className="hidden" />
          </div>
        </Card>
        
        {/* Back to Home button - outside the card */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <Link to="/">
            <Button 
              variant="outline"
              size="sm"
              className="border-pink-300 bg-white hover:bg-pink-50 text-pink-600 text-xs sm:text-sm"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Floating star elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden sm:block">
          <FloatingElement delay={0} className="absolute top-20 left-1/4 transform -translate-x-1/2">
            <Star className="h-8 w-8 text-yellow-300 animate-pulse" />
          </FloatingElement>
          <FloatingElement delay={1} className="absolute top-10 right-1/4 transform translate-x-1/2">
            <Heart className="h-8 w-8 text-red-300 animate-pulse" />
          </FloatingElement>
          <FloatingElement delay={2} className="absolute bottom-20 left-1/4 transform -translate-x-1/2">
            <Gift className="h-8 w-8 text-green-300 animate-pulse" />
          </FloatingElement>
        </div>
        
        <div className="block sm:hidden">
          <FloatingElement delay={0} className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
          </FloatingElement>
          <FloatingElement delay={1} className="absolute top-5 right-1/4 transform translate-x-1/2">
            <Heart className="h-6 w-6 text-red-300 animate-pulse" />
          </FloatingElement>
          <FloatingElement delay={2} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <Gift className="h-6 w-6 text-green-300 animate-pulse" />
          </FloatingElement>
        </div>
      </div>
    </div>
  );
};

export default SurprisePage;
