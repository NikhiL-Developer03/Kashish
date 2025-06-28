
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Sparkles } from 'lucide-react';

const Messages = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());

  const birthdayWishes = [
    {
      id: 1,
      message: "Wishing you a day filled with happiness and a year filled with joy. Happy birthday, Kashish! 🎉",
      author: "Your Funny Friend",
      color: "from-pink-400 to-rose-500"
    },
    {
      id: 2,
      message: "May this special day bring you endless joy and tons of precious memories. You deserve all the wonderful things in life! ✨",
      author: "Your Positivity Charger",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: 3,
      message: "Another year of incredible adventures, amazing achievements, and beautiful moments. Here's to making this year the best one yet! 🚀",
      author: "Your Joy Generator",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 4,
      message: "You light up every room you enter and make everyone around you smile. Today we celebrate YOU and all the joy you bring! 🌟",
      author: "Your Certified Weirdo",
      color: "from-green-400 to-teal-500"
    },
    {
      id: 5,
      message: "From silly inside jokes to deep conversations, you make every moment special. Thank you for being such an incredible friend! 💫",
      author: "Your Mendhak",
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 6,
      message: "May your birthday be the start of a year filled with good health, happiness, and all your heart desires. You deserve the world! 🌍",
      author: "Your Nice Nick",
      color: "from-red-400 to-pink-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id'));
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Birthday Messages
            </h1>
            <div className="flex items-center gap-2 text-pink-600">
              <Heart size={20} />
              <Sparkles size={20} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Messages of Love 💝
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are heartfelt birthday wishes from my side, Kashish!
          </p>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {birthdayWishes.map((wish, index) => (
            <div
              key={wish.id}
              data-card-id={wish.id}
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                visibleCards.has(wish.id)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <div className="group relative">
                {/* Card */}
                <div className={`bg-gradient-to-br ${wish.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:-rotate-1`}>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 h-full">
                    <div className="flex justify-between items-start mb-4">
                      <Heart className="text-white/80" size={24} />
                      <Sparkles className="text-white/60" size={20} />
                    </div>
                    
                    <p className="text-white text-lg leading-relaxed mb-6 font-medium">
                      {wish.message}
                    </p>
                    
                    <div className="flex justify-end">
                      <span className="text-white/80 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                        - {wish.author}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Hearts */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="animate-bounce">
                    <Heart className="text-pink-400 fill-current" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              The Best is Yet to Come! 🎊
            </h3>
            <p className="text-gray-600 mb-6">
              These messages are just the beginning. Your journey continues with more surprises!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/gallery"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View Photo Gallery →
              </Link>
              <Link 
                to="/memories"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Memory Lane →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
