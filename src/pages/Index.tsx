import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Gift, Camera, Clock, Star } from 'lucide-react';
import { Counter } from '@/components/Counter';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 relative overflow-hidden">
      {/* Floating Background Elements - With responsive positions */}
      {/* Heart element - visible on all screens with adjusted position */}
      <FloatingElement delay={0} className="absolute top-16 sm:top-20 left-5 sm:left-10 text-pink-300 z-0">
        <Heart size={20} className="sm:w-8 sm:h-8" fill="currentColor" strokeWidth={1} />
      </FloatingElement>
      
      {/* Star/Sparkles element - visible on all screens with adjusted position */}
      <FloatingElement delay={1} className="absolute top-20 sm:top-32 right-6 sm:right-20 text-yellow-400 z-0">
        <Sparkles size={18} className="sm:w-7 sm:h-7" />
      </FloatingElement>
      
      {/* Gift element - positioned better for mobile */}
      <FloatingElement delay={2} className="absolute bottom-20 sm:bottom-32 left-6 sm:left-20 text-purple-300 z-0">
        <Gift size={22} className="sm:w-9 sm:h-9" />
      </FloatingElement>
      
      {/* Additional sparkles - repositioned for better mobile visibility */}
      <FloatingElement delay={0.5} className="absolute top-40 sm:top-48 right-4 sm:right-10 text-pink-400 z-0">
        <Sparkles size={14} className="sm:w-6 sm:h-6" />
      </FloatingElement>
      
      {/* Add Star for mobile too */}
      <FloatingElement delay={1.2} className="absolute top-80 left-4 sm:left-16 text-yellow-300 z-0">
        <Star size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
      </FloatingElement>
      
      {/* Extra elements visible only on larger screens */}
      <FloatingElement delay={0.8} className="absolute bottom-40 right-28 text-purple-200 hidden sm:block z-0">
        <Heart size={28} fill="currentColor" strokeWidth={1} />
      </FloatingElement>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Navigation - Responsive navigation with smaller spacing on mobile */}
        <nav className="flex justify-center mb-8 sm:mb-12 overflow-x-auto">
          <div className="bg-gradient-to-r from-pink-50/90 via-purple-50/90 to-indigo-50/90 backdrop-blur-sm rounded-full px-4 sm:px-10 py-3 sm:py-5 shadow-xl border border-pink-100/50">
            <div className="flex space-x-4 sm:space-x-10">
              <Link 
                to="/" 
                className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-bold hover:from-pink-600 hover:to-pink-800 transition-colors duration-300 whitespace-nowrap"
              >
                Home
              </Link>
              <Link 
                to="/messages" 
                className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-bold hover:from-purple-600 hover:to-purple-800 transition-colors duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
              >
                <Heart size={16} className="hidden sm:block sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-500" />
                Messages
              </Link>
              <Link 
                to="/gallery" 
                className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-colors duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
              >
                <Camera size={16} className="hidden sm:block sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-500" />
                Gallery
              </Link>
              <Link 
                to="/memories" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-colors duration-300 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
              >
                <Clock size={16} className="hidden sm:block sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500" />
                Memories
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section - Responsive text sizes */}
        <div className="text-center">
          <div 
            className={`transition-all duration-2000 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent mb-3 sm:mb-6 animate-pulse">
              Happy Birthday
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-800 mb-4 sm:mb-8">
              Kashish! 🎉
            </h2>
          </div>

          <div 
            className={`transition-all duration-2000 delay-500 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <p className="text-base sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              A special celebration created just for you! 
              Dive into a world of memories, wishes, and surprises. 
              Your journey through this magical birthday experience begins now...
            </p>
          </div>

          {/* Action Buttons - Responsive grid layout for smaller screens */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 transition-all duration-2000 delay-1000 px-4 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <Link 
              to="/messages"
              className="bg-gradient-to-r from-pink-400/80 via-pink-500/80 to-rose-600/80 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border border-pink-300/40 backdrop-blur-sm hover:from-pink-500/90 hover:via-pink-600/90 hover:to-rose-700/90"
            >
              <Heart size={16} className="sm:w-5 sm:h-5 animate-pulse" fill="white" />
              Read Birthday Wishes
            </Link>
            <Link 
              to="/gallery"
              className="bg-gradient-to-r from-purple-400/80 via-purple-500/80 to-indigo-600/80 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border border-purple-300/40 backdrop-blur-sm hover:from-purple-500/90 hover:via-purple-600/90 hover:to-indigo-700/90"
            >
              <Camera size={16} className="sm:w-5 sm:h-5 animate-pulse" />
              View Photo Gallery
            </Link>
            <Link 
              to="/memories"
              className="bg-gradient-to-r from-amber-400/80 via-yellow-500/80 to-orange-600/80 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border border-yellow-300/40 backdrop-blur-sm hover:from-amber-500/90 hover:via-yellow-600/90 hover:to-orange-700/90"
            >
              <Clock size={16} className="sm:w-5 sm:h-5 animate-pulse" />
              Memory Lane
            </Link>
            <Link 
              to="/surprise"
              className="bg-gradient-to-r from-rose-400/80 via-pink-500/80 to-purple-600/80 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border border-pink-300/40 backdrop-blur-sm hover:from-rose-500/90 hover:via-pink-600/90 hover:to-purple-700/90"
            >
              <Gift size={16} className="sm:w-5 sm:h-5 animate-pulse" />
              Birthday Surprise
            </Link>
            <Link 
              to="/game"
              className="bg-gradient-to-r from-blue-400/80 via-indigo-500/80 to-blue-600/80 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border border-indigo-300/40 backdrop-blur-sm hover:from-blue-500/90 hover:via-indigo-600/90 hover:to-blue-700/90"
            >
              <span className="text-xl mr-1">🎈</span>
              Balloon Popping Game
            </Link>
          </div>
        </div>

        {/* Birthday Stats/Fun Facts - Responsive grid */}
        <div 
          className={`mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 transition-all duration-2000 delay-1500 px-2 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-pink-50/90 to-pink-200/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center border border-pink-200/50 hover:from-pink-100/90 hover:to-pink-300/80 transition-all duration-500 transform hover:scale-105">
            <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1 sm:mb-2">🎂</div>
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1 sm:mb-2">Another Year</h3>
            <p className="text-sm sm:text-base text-gray-700">Of amazing memories and adventures!</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50/90 to-purple-200/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center border border-purple-200/50 hover:from-purple-100/90 hover:to-purple-300/80 transition-all duration-500 transform hover:scale-105">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">🌟</div>
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">Special Day</h3>
            <p className="text-sm sm:text-base text-gray-700">Celebrating the wonderful person you are!</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50/90 to-amber-200/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg text-center sm:col-span-2 md:col-span-1 border border-amber-200/50 hover:from-yellow-100/90 hover:to-amber-300/80 transition-all duration-500 transform hover:scale-105">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">🎁</div>
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 sm:mb-2">Surprises</h3>
            <p className="text-sm sm:text-base text-gray-700">More treats await in every corner!</p>
          </div>
        </div>
        
        {/* Birthday Countdown & Happiness Meter */}
        <div 
          className={`mt-12 sm:mt-16 md:mt-20 flex justify-center transition-all duration-2000 delay-2000 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          <Counter 
            initialValue={100} 
            title="Birthday Celebration" 
            birthdayDate="2025-06-29" 
            birthdayPerson="Kashish"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
