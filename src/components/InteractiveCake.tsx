import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

interface InteractiveCakeProps {
  name?: string;
}

const InteractiveCake: React.FC<InteractiveCakeProps> = ({ name = 'Kashish' }) => {
  const [isFlameVisible, setIsFlameVisible] = useState(true);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/happy-birthday.mp3');
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsAudioLoaded(true);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', () => {});
      }
    };
  }, []);

  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff77e1', '#ff77bc', '#ff5e94', '#fd6eb1'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#a152ff', '#9356fc', '#7d50f7', '#8a53f2'],
      });
    }, 250);
  }, []);

  const handleCakeClick = () => {
    if (!isCelebrating && isAudioLoaded) {
      setIsFlameVisible(false);
      setIsCelebrating(true);
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
      
      // Trigger confetti
      triggerConfetti();
      
      // Reset after celebration
      setTimeout(() => {
        setIsFlameVisible(true);
        setIsCelebrating(false);
      }, 10000); // 10 seconds celebration
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4 py-4 sm:py-8">
      {/* SVG Cake with Interactive Elements */}
      <div 
        className="relative cursor-pointer transition transform hover:scale-105 duration-200"
        onClick={handleCakeClick}
      >
        <svg
          className="w-[140px] h-[154px] sm:w-[200px] sm:h-[220px]"
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cake Plate */}
          <ellipse cx="100" cy="200" rx="80" ry="20" fill="#E4E4E4" />
          
          {/* Bottom Cake Layer */}
          <rect x="30" y="150" width="140" height="50" rx="5" fill="#FDA4AF" />
          <rect x="30" y="150" width="140" height="10" rx="2" fill="#FB7185" />
          
          {/* Middle Cake Layer */}
          <rect x="45" y="110" width="110" height="40" rx="5" fill="#F9A8D4" />
          <rect x="45" y="110" width="110" height="8" rx="2" fill="#F472B6" />
          
          {/* Top Cake Layer */}
          <rect x="60" y="80" width="80" height="30" rx="5" fill="#C4B5FD" />
          <rect x="60" y="80" width="80" height="7" rx="2" fill="#A78BFA" />
          
          {/* Candle */}
          <rect x="95" y="50" width="10" height="30" rx="2" fill="#FCD34D" />
          
          {/* Flame Animation with pulsing */}
          {isFlameVisible && (
            <g className="animate-pulse">
              <path
                d="M100 30 L105 45 L100 40 L95 45 Z"
                fill="#F59E0B"
                className="origin-bottom animate-flame"
              />
              <circle cx="100" cy="39" r="3" fill="#FBBF24" />
            </g>
          )}
          
          {/* Cake Decorations */}
          <circle cx="50" cy="130" r="3" fill="#FB7185" />
          <circle cx="70" cy="130" r="3" fill="#FB7185" />
          <circle cx="90" cy="130" r="3" fill="#FB7185" />
          <circle cx="110" cy="130" r="3" fill="#FB7185" />
          <circle cx="130" cy="130" r="3" fill="#FB7185" />
          <circle cx="150" cy="130" r="3" fill="#FB7185" />
          
          <circle cx="60" cy="175" r="4" fill="#F472B6" />
          <circle cx="85" cy="175" r="4" fill="#F472B6" />
          <circle cx="110" cy="175" r="4" fill="#F472B6" />
          <circle cx="135" cy="175" r="4" fill="#F472B6" />
        </svg>
        
        {/* Hint Text for Mobile */}
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500 sm:hidden">
          Tap the cake!
        </div>
      </div>

      {/* Celebration Message */}
      <div 
        className={`mt-4 sm:mt-8 transition-all duration-500 ${
          isCelebrating ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
        }`}
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
          🎉 Happy Birthday {name}! 🎉
        </h2>
      </div>

      {/* Audio Element (Hidden) */}
      <audio
        preload="auto"
        src="/happy-birthday.mp3"
        className="hidden"
        ref={audioRef}
      />
    </div>
  );
};

export default InteractiveCake;
