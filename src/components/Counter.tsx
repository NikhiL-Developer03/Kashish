import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Minus, RotateCcw, Cake, Heart } from 'lucide-react';

interface CounterProps {
  initialValue?: number;
  title?: string;
  birthdayDate?: string;
  birthdayPerson?: string;
}

export const Counter = ({ 
  initialValue = 100, 
  title = "Counter", 
  birthdayDate = "2025-06-29", 
  birthdayPerson = "Kashish" 
}: CounterProps) => {
  const [count, setCount] = useState(initialValue);
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const birthday = new Date(birthdayDate);
      const currentDate = new Date();
      
      // Check if it's June 29th (month is 0-indexed, so June is 5)
      if (currentDate.getDate() === 29 && currentDate.getMonth() === 5) {
        setIsBirthday(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      // Set birthday to June 29th of the current year
      const currentBirthday = new Date(
        currentDate.getFullYear(),
        5,  // June (0-indexed)
        29
      );
      
      // If June 29th has already occurred this year, set it for next year
      if (currentDate > currentBirthday) {
        currentBirthday.setFullYear(currentBirthday.getFullYear() + 1);
      }
      
      const difference = currentBirthday.getTime() - currentDate.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Calculate initial time left
    setTimeLeft(calculateTimeLeft());

    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(initialValue);

  return (
    <Card className="w-full max-w-[300px] sm:max-w-[350px] shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-200 to-purple-200 py-4 sm:py-5">
        <CardTitle className="text-center text-pink-700 flex items-center justify-center gap-2 text-lg sm:text-xl font-bold">
          <Cake className="h-5 w-5 sm:h-6 sm:w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
        {/* Birthday Countdown Display */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
          {isBirthday ? (
            <div className="text-center animate-pulse">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-2 bg-clip-text">
                Happy Birthday {birthdayPerson}! 🎂
              </h3>
              <p className="text-base sm:text-lg text-purple-600 font-medium">Today is your special day! Enjoy!</p>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-pink-500 animate-bounce" />
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl sm:text-2xl font-semibold text-center text-pink-600 mb-2 sm:mb-3">
                Countdown to {birthdayPerson}'s Birthday (June 29)
              </h3>
              <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center">
                <div className="bg-white rounded-md p-1 sm:p-2 shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600">{timeLeft.days}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Days</div>
                </div>
                <div className="bg-white rounded-md p-1 sm:p-2 shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600">{timeLeft.hours}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Hours</div>
                </div>
                <div className="bg-white rounded-md p-1 sm:p-2 shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600">{timeLeft.minutes}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Mins</div>
                </div>
                <div className="bg-white rounded-md p-1 sm:p-2 shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-pink-600">{timeLeft.seconds}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Secs</div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Happiness Counter */}
        <div className="flex flex-col items-center gap-2 sm:gap-4">
          <h3 className="text-base sm:text-lg font-medium text-pink-600">Happiness Meter</h3>
          <span className="text-3xl sm:text-4xl font-bold text-pink-600">{count}</span>
          <div className="flex gap-2">
            <Button 
              onClick={decrement} 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 sm:h-10 sm:w-10 border-pink-300 hover:bg-pink-100"
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
            </Button>
            <Button 
              onClick={increment} 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 sm:h-10 sm:w-10 border-pink-300 hover:bg-pink-100"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
            </Button>
            <Button 
              onClick={reset} 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 sm:h-10 sm:w-10 border-pink-300 hover:bg-pink-100"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 sm:p-4 text-xs sm:text-sm text-center text-pink-700">
        {isBirthday ? 
          "Wishing you the best birthday ever on June 29th! 🎉" : 
          `${timeLeft.days} days until your June 29th celebration begins!`}
      </CardFooter>
    </Card>
  );
};
