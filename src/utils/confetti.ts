import confetti from 'canvas-confetti';

/**
 * Launches a quick burst of confetti from the center of the screen
 */
export const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

/**
 * Creates a fireworks display using confetti over 5 seconds
 * with randomized origin points around the screen
 */
export const launchFireworks = () => {
  // Duration of the fireworks display
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  
  // Helper function to get random number within range
  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Launch the fireworks
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    
    // Stop when time is up
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    
    // Create randomized firework bursts
    const particleCount = 50;
    
    // First burst - left side
    confetti({
      particleCount,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.3, 0.5) },
      colors: ['#ff77e1', '#ff77bc', '#ff5e94', '#fc77ff'],
      startVelocity: randomInRange(25, 45),
      gravity: 1.2,
      drift: 0,
      ticks: 200
    });
    
    // Second burst - right side
    confetti({
      particleCount,
      angle: randomInRange(235, 305),
      spread: randomInRange(50, 70),
      origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.3, 0.5) },
      colors: ['#a152ff', '#9356fc', '#7d50f7', '#8a53f2'],
      startVelocity: randomInRange(25, 45),
      gravity: 1.2,
      drift: 0,
      ticks: 200
    });
    
    // Random burst from top
    confetti({
      particleCount: particleCount * 2,
      angle: randomInRange(80, 100),
      spread: randomInRange(100, 120),
      origin: { x: randomInRange(0.3, 0.7), y: 0.1 },
      colors: ['#ff77e1', '#a152ff', '#9356fc', '#ff5e94', '#fd6eb1'],
      startVelocity: randomInRange(30, 55),
      gravity: 1.0,
      drift: randomInRange(-0.5, 0.5),
      ticks: 300
    });
    
  }, 250); // Launch new bursts every 250ms
};
