import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Award, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { launchFireworks } from '@/utils/confetti';

interface BalloonProps {
  id: number;
  color: string;
  message: string;
  onPop: () => void;
}

const Balloon: React.FC<BalloonProps> = ({ id, color, message, onPop }) => {
  // Random motion values with much faster speeds
  const driftX = useRef(Math.random() * 200 - 100); // Random drift between -100 and 100px
  const rotationAngle = useRef(Math.random() * 20 - 10); // Random rotation between -10 and 10 degrees
  const floatSpeed = useRef(Math.random() * 3 + 2); // Much faster: 2-5 seconds to cross screen
  const wobbleAmount = useRef(Math.random() * 30 + 15); // Random wobble between 15-45px
  
  // Random size variation (90-110% of base size)
  const sizeVariation = useRef(0.9 + Math.random() * 0.2);
  
  // Balloon shine position
  const shinePosition = useRef({
    x: 30 + Math.random() * 20, // 30-50%
    y: 20 + Math.random() * 20  // 20-40%
  });

  return (
    <motion.div
      key={id}
      className="absolute bottom-0 cursor-pointer select-none"
      initial={{ y: '100vh', x: `${id % 100}%`, opacity: 0 }}
      animate={{ 
        y: '-100vh', 
        x: [
          `calc(${id % 100}% + ${driftX.current}px)`, 
          `calc(${id % 100}% + ${driftX.current + wobbleAmount.current}px)`,
          `calc(${id % 100}% + ${driftX.current - wobbleAmount.current}px)`,
          `calc(${id % 100}% + ${driftX.current}px)`
        ],
        opacity: 1,
        rotate: rotationAngle.current 
      }}
      exit={{ 
        scale: 2, 
        opacity: 0,
        transition: { duration: 0.3 } 
      }}
      transition={{ 
        y: { duration: floatSpeed.current, ease: "linear" },
        x: { 
          duration: floatSpeed.current, 
          times: [0, 0.33, 0.66, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop" 
        },
        rotate: { duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
      }}
      onClick={() => {
        onPop();
        // Play pop sound
        const audio = new Audio('/pop.mp3');
        audio.volume = 0.5; // Set volume to 50%
        audio.play().catch(error => console.error("Audio playback failed:", error));
        
        // Trigger confetti
        triggerConfetti();
      }}
      style={{ 
        translateX: '-50%',  // Center the balloon on its position point
        zIndex: Math.floor(Math.random() * 10) + 1 // Random z-index for overlapping
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div 
        className="relative flex flex-col items-center justify-center"
        style={{ touchAction: 'manipulation' }} // Better touch handling
      >
        {/* Balloon string */}
        <div className="h-16 w-0.5 bg-gray-300 mb-1 drop-shadow-sm"></div>
        
        {/* Balloon body */}
        <div 
          className={`rounded-full flex items-center justify-center text-center ${color} shadow-lg relative overflow-hidden`}
          style={{
            width: `${12 * sizeVariation.current}rem`,  // Even smaller balloons
            height: `${16 * sizeVariation.current}rem`, // Even smaller balloons
          }}
        >
          {/* Balloon knot */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-inherit rotate-45"></div>
          
          {/* Balloon shine effect */}
          <div 
            className="absolute opacity-40 bg-white rounded-full blur-sm"
            style={{
              width: '40%',
              height: '30%',
              left: `${shinePosition.current.x}%`,
              top: `${shinePosition.current.y}%`,
              transform: 'rotate(-25deg)'
            }}
          ></div>
          
          {/* Balloon message */}
          <p className="text-white text-xs font-bold px-2 drop-shadow-md">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Function to trigger confetti when balloon pops
const triggerConfetti = () => {
  // Get random colors in the pink/purple theme
  const colors = [
    '#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#DB7093', // Pinks
    '#DDA0DD', '#EE82EE', '#DA70D6', '#BA55D3', '#9370DB', // Purples
    '#FFCAD4', '#F3ABB6', '#9F5F80', '#583D72', '#2C2A4A'  // Other shades
  ];
  
  // Shapes aren't working correctly with TypeScript, use default shapes
  
  // Get random particleCount between 80-150
  const count = Math.floor(Math.random() * 70) + 80;
  
  // Create pop confetti
  confetti({
    origin: { y: 0.5 },
    spread: 70,
    particleCount: count,
    scalar: 1.2,
    colors: colors.sort(() => Math.random() - 0.5).slice(0, 5), // Randomly select 5 colors
    gravity: 1.2,
    decay: 0.94,
    ticks: 200
  });
};

const GamePage: React.FC = () => {
  const [popCount, setPopCount] = useState(0);
  const [balloons, setBalloons] = useState<{ id: number; color: string; message: string; x: number }[]>([]);
  const maxBalloons = 25; // Increased maximum number of balloons on screen at once
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [showMilestone, setShowMilestone] = useState(false);

  // Define balloon colors and messages
  const balloonColors = [
    'bg-pink-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 
    'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-rose-500',
    'bg-cyan-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500'
  ];

  const balloonMessages = [
    '🎉 Happy Birthday!',
    '🎂 Make a wish!',
    '🎁 Special day!',
    '💖 Lots of love!',
    '✨ Birthday sparkles!',
    '🥳 Party time!',
    '🌟 You\'re a star!',
    '🎵 Dance & celebrate!',
    '🎈 Pop pop hooray!',
    '🥂 Cheers to you!',
    '🍰 Cake day!',
    '🌸 Bloom & grow!',
    '😊 Smile, it\'s your day!'
  ];

  // Function to get random color and message
  const getRandomBalloon = () => {
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const message = balloonMessages[Math.floor(Math.random() * balloonMessages.length)];
    return { color, message };
  };

  // Create a new random balloon
  const createRandomBalloon = () => {
    const { color, message } = getRandomBalloon();
    
    // More drastic random positions from 0-100% of width
    // This will make balloons appear from far left, center, and far right
    const x = Math.floor(Math.random() * 100);
    
    return {
      id: Date.now() + Math.floor(Math.random() * 1000),
      color,
      message,
      x
    };
  };

  // Handle balloon pop
  const handlePop = (id: number) => {
    // Remove the popped balloon
    setBalloons(prev => prev.filter(balloon => balloon.id !== id));
    
    // Increase pop count
    const newCount = popCount + 1;
    setPopCount(newCount);
    
    // Check for milestones
    checkMilestones(newCount);
    
    // Add multiple new balloons after various short delays for faster action
    setTimeout(() => {
      if (balloons.length < maxBalloons) {
        setBalloons(prev => [...prev, createRandomBalloon()]);
      }
    }, 100); // Almost immediate replacement
    
    setTimeout(() => {
      if (balloons.length < maxBalloons) {
        setBalloons(prev => [...prev, createRandomBalloon()]);
      }
    }, 300); // Quick second balloon
  };
  
  // Check for pop count milestones
  const checkMilestones = (count: number) => {
    if (count % 10 === 0) {
      // Every 10 balloons
      setMilestone(`🏆 ${count} Balloons Popped!`);
      setShowMilestone(true);
      
      // Trigger fireworks at bigger milestones
      if (count % 25 === 0) {
        launchFireworks();
      } else {
        triggerConfetti();
      }
      
      // Hide the milestone message after 3 seconds
      setTimeout(() => {
        setShowMilestone(false);
      }, 3000);
    }
  };

  // Start the game with initial balloons
  const startGame = () => {
    // Create many more initial balloons (12 instead of 6)
    const initialBalloons = Array.from({ length: 12 }, () => createRandomBalloon());
    setBalloons(initialBalloons);
    setIsGameStarted(true);
  };

  useEffect(() => {
    // Start the game after component mounts
    const timer = setTimeout(() => {
      startGame();
    }, 500);
    
    // Super fast balloon generation
    const superFastInterval = setInterval(() => {
      // Add a balloon every 200ms
      if (isGameStarted && balloons.length < maxBalloons) {
        setBalloons(prev => [...prev, createRandomBalloon()]);
      }
    }, 200); // Ultra fast interval

    const fastBalloonInterval = setInterval(() => {
      // Add 2 balloons every 500ms
      if (isGameStarted && balloons.length < maxBalloons - 1) {
        setBalloons(prev => [...prev, createRandomBalloon(), createRandomBalloon()]);
      }
    }, 500); 

    const mediumBalloonInterval = setInterval(() => {
      // Add 3-4 balloons in bursts
      if (isGameStarted && balloons.length < maxBalloons - 3) {
        const numToAdd = Math.random() > 0.5 ? 4 : 3;
        const newBalloons = Array.from({ length: numToAdd }, () => createRandomBalloon());
        setBalloons(prev => {
          const combined = [...prev, ...newBalloons];
          // Ensure we don't exceed max balloons
          return combined.slice(0, maxBalloons);
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(superFastInterval);
      clearInterval(fastBalloonInterval);
      clearInterval(mediumBalloonInterval);
    };
  }, [isGameStarted, balloons.length]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100 overflow-hidden flex flex-col">
      {/* Fixed Back to Home button at the top - responsive for all screen sizes */}
      <div className="fixed top-0 left-0 w-full z-50 p-2 sm:p-4 bg-white/60 backdrop-blur-sm shadow-sm">
        <div className="container max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm"
              className="border-pink-300 bg-white/90 hover:bg-pink-50 text-pink-600 sm:text-sm md:text-base"
            >
              <Home className="h-4 w-4 mr-1.5 sm:mr-2" /> 
              <span>Back to Home</span>
            </Button>
          </Link>
          
          {/* On larger screens, show pop count in the nav bar as well */}
          <div className="hidden sm:flex items-center text-lg font-semibold text-pink-600">
            <Award className="h-5 w-5 mr-2 text-yellow-500" /> 
            <span className={`${popCount > 0 ? 'animate-pulse' : ''}`}>
              {popCount} Popped
            </span>
          </div>
        </div>
      </div>
      
      {/* Game header - with extra padding-top to account for fixed back button */}
      <div className="p-4 sm:p-6 pt-14 sm:pt-20 z-20 text-center relative max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
          Birthday Balloon Pop!
        </h1>
        
        {/* Pop count only shown on mobile, larger screens see it in the header */}
        <div className="sm:hidden text-xl font-semibold text-pink-600">
          <span className="inline-flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" /> 
            <span className={`${popCount > 0 ? 'animate-pulse' : ''}`}>
              Balloons Popped: {popCount}
            </span>
          </span>
        </div>
      </div>

      {/* Game instructions */}
      <div className="bg-white/40 backdrop-blur-sm mx-4 sm:mx-auto max-w-md lg:max-w-lg p-3 sm:p-4 rounded-lg text-center mb-4 border border-pink-100/50 shadow-md">
        <p className="text-gray-700 text-sm sm:text-base">
          Pop the balloons by tapping or clicking on them! Special surprises at every milestone!
        </p>
      </div>
      
      {/* Milestone notification */}
      <AnimatePresence>
        {showMilestone && milestone && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-xl z-50 text-xl font-bold"
          >
            {milestone}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balloon container - where balloons appear and float */}
      <div className="flex-1 relative">
        <AnimatePresence>
          {balloons.map(balloon => (
            <Balloon
              key={balloon.id}
              id={balloon.id}
              color={balloon.color}
              message={balloon.message}
              onPop={() => handlePop(balloon.id)}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Gift icon in the corner */}
      <div className="absolute bottom-4 right-4 animate-bounce z-10">
        <Gift size={32} className="text-pink-500 drop-shadow-md" />
      </div>
    </div>
  );
};

export default GamePage;
