
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Heart, Sparkles } from 'lucide-react';

const Memories = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  const memoryTimeline = [
    {
      id: 1,
      year: "The Beginning",
      title: "Second Hello 👋",
      description: "What began with a simple hello turned into late-night chats and started sharing our thoughts, our stories, and slowly, our friendship grew!",
      color: "from-pink-400 to-rose-500",
      side: "left"
    },
    {
      id: 2,
      year: "The Meet-Up Day",
      title: "That Day in the Park 🌳",
      description: "We met up, went to the park, and ended up talking for hours. That day was simple but so special — full of laughter, long conversations, and vibes we’ll never forget.",
      color: "from-purple-400 to-indigo-500",
      side: "right"
    },
    {
      id: 3,
      year: "Growing Closer",
      title: "Deeper Connections 💫",
      description: "Those late-night conversations that revealed our dreams, fears, and everything in between. True friendship was born.",
      color: "from-blue-400 to-cyan-500",
      side: "left"
    },
    {
      id: 4,
      year: "Shared Experiences",
      title: "Making Memories 🎨",
      description: "From laughing over silly photos to sharing long stories from my college journey — we talked for hours, and every moment felt easy, genuine, and unforgettable. Those conversations turned into some of my favorite memories.",
      color: "from-green-400 to-teal-500",
      side: "right"
    },
    {
      id: 5,
      year: "Moments of Truth",
      title: "Genuine at Heart ❤️",
      description: "In the middle of tough times, you shared your emotions so openly — genuine, raw, and from the heart. It made me realize how true and honest your way of expressing feelings is. That trust made our friendship even stronger.",
      color: "from-yellow-400 to-orange-500",
      side: "left"
    },
    {
      id: 6,
      year: "A Day Just for You",
      title: "Birthday Chapter 🎈",
      description: "Even today, our conversations continue — just as fun, deep, and honest as ever. And today is not just any day... it's *your* day! A special moment to celebrate you, your journey, and the beautiful soul you are. Happy Birthday! 🥳",
      color: "from-red-400 to-pink-500",
      side: "right"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.getAttribute('data-memory-id'));
            setVisibleItems(prev => new Set([...prev, itemId]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('[data-memory-id]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-indigo-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Memory Lane
            </h1>
            <div className="flex items-center gap-2 text-indigo-600">
              <Clock size={20} />
              <Sparkles size={20} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Our Journey Together 🛤️
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A timeline of beautiful memories and special moments we've shared, Kahish!
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 rounded-full"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {memoryTimeline.map((memory, index) => (
              <div
                key={memory.id}
                data-memory-id={memory.id}
                className={`relative flex items-center ${
                  memory.side === 'left' ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-purple-400 rounded-full z-10 shadow-lg"></div>

                {/* Memory Card */}
                <div
                  className={`w-full md:w-5/12 transform transition-all duration-1000 delay-${index * 200} ${
                    visibleItems.has(memory.id)
                      ? 'opacity-100 translate-x-0 scale-100'
                      : memory.side === 'left'
                      ? 'opacity-0 -translate-x-8 scale-95'
                      : 'opacity-0 translate-x-8 scale-95'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${memory.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/80 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                          {memory.year}
                        </span>
                        <Heart className="text-white/60" size={20} />
                      </div>
                      
                      <h3 className="text-white text-2xl font-bold mb-4">
                        {memory.title}
                      </h3>
                      
                      <p className="text-white/90 text-lg leading-relaxed">
                        {memory.description}
                      </p>
                    </div>

                    {/* Floating Sparkles */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="animate-pulse">
                        <Sparkles className="text-white/60" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              The Story Continues... 📖
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              This is just the beginning of our amazing journey together. Here's to creating many more beautiful memories in the years to come!
            </p>
            <div className="text-6xl mb-6">🎂✨🎉</div>
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Happy Birthday, Kahish! 
            </p>
            <p className="text-lg text-gray-600 mt-4">
              May this new year of your life be filled with love, laughter, and endless adventures!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;
