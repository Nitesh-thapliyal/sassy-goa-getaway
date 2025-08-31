import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface IntroSceneProps {
  onStart: () => void;
}

const IntroScene = ({ onStart }: IntroSceneProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-sunset relative overflow-hidden">
      {/* Floating palm trees */}
      <div className="absolute top-10 left-10 text-6xl animate-float opacity-30">🌴</div>
      <div className="absolute top-20 right-20 text-4xl animate-float opacity-40" style={{ animationDelay: '1s' }}>🌺</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-float opacity-35" style={{ animationDelay: '2s' }}>🏖️</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-float opacity-30" style={{ animationDelay: '1.5s' }}>🌊</div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className={`${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-8xl md:text-9xl mb-6 animate-bounce-cute">🎂</div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-glow">
            Happy Birthday
          </h1>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 text-shadow-glow animate-wave">
            SASSY! 🎉
          </h2>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/30">
            <p className="text-xl md:text-2xl text-white leading-relaxed">
              Join Nitesh and Jhanvi on their epic journey from 
              <span className="font-bold"> Noida 📍</span> and 
              <span className="font-bold"> Hyderabad 📍</span> to the beautiful beaches of 
              <span className="font-bold"> Goa 🏖️</span>
            </p>
            <p className="text-lg md:text-xl text-white/90 mt-4">
              An animated story of friendship, adventure, and birthday celebrations! ✨
            </p>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="text-3xl animate-bounce-cute">🎈</div>
            <div className="text-3xl animate-bounce-cute" style={{ animationDelay: '0.3s' }}>🎊</div>
            <div className="text-3xl animate-bounce-cute" style={{ animationDelay: '0.6s' }}>🥳</div>
            <div className="text-3xl animate-bounce-cute" style={{ animationDelay: '0.9s' }}>🍰</div>
          </div>
        </div>
        
        <div className={`${showContent ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-xl px-12 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 animate-pulse"
          >
            Start the Adventure! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScene;