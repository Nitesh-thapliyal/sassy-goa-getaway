import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface StorySceneProps {
  sceneNumber: number;
  onNext: () => void;
  isActive: boolean;
}

const StoryScene = ({ sceneNumber, onNext, isActive }: StorySceneProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive]);

  const scenes = [
    // Scene 1: Phone Call
    {
      title: "📞 The Call That Started It All",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`character-card ${showContent ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="text-center">
                <div className="text-6xl mb-4 animate-phone-ring">📱</div>
                <h3 className="text-xl font-bold text-primary mb-2">Nitesh</h3>
                <p className="text-muted-foreground mb-4">📍 Noida</p>
                <div className="speech-bubble">
                  <p className="text-sm">"Hey Jhanvi! Guess what day it is? It's Sassy's birthday! We HAVE to celebrate this properly! 🎉"</p>
                </div>
              </div>
            </div>
            
            <div className={`character-card ${showContent ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-cute">🎈</div>
                <h3 className="text-xl font-bold text-accent mb-2">Jhanvi</h3>
                <p className="text-muted-foreground mb-4">📍 Hyderabad</p>
                <div className="speech-bubble">
                  <p className="text-sm">"OMG YES! Sassy is in Goa right? Let's surprise her there! Pack your bags, we're going to the beach! 🏖️"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Scene 2: Travel Preparation
    {
      title: "🧳 The Great Journey Begins",
      content: (
        <div className="space-y-6">
          <div className={`text-center ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-5xl mb-2 animate-wave">🚖</div>
                <p className="text-sm">Nitesh calls taxi</p>
              </div>
              <div className="text-4xl animate-float">✈️</div>
              <div className="text-center">
                <div className="text-5xl mb-2 animate-wave">🚖</div>
                <p className="text-sm">Jhanvi calls taxi</p>
              </div>
            </div>
            
            <div className="character-card max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">🛫</div>
                <h3 className="text-xl font-bold mb-4">Meeting at the Airport</h3>
                <div className="speech-bubble">
                  <p>"Look! There's Jhanvi! Ready for some Goa vibes and Sassy's epic birthday celebration? 🌴"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Scene 3: Arrival in Goa
    {
      title: "🌴 Welcome to Goa Paradise",
      content: (
        <div className="space-y-6">
          <div className={`${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="bg-gradient-ocean rounded-3xl p-8 mb-8">
              <div className="text-center text-white">
                <div className="text-6xl mb-4 animate-float">🏖️</div>
                <h3 className="text-2xl font-bold mb-4">Landed in Goa! 🌊</h3>
                <p className="text-lg">"The beach breeze, the palm trees... Sassy chose the perfect place to live! Let's find our birthday girl!"</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center animate-bounce-cute">
                <div className="text-4xl mb-2">🌴</div>
                <p className="text-sm">Palm Trees</p>
              </div>
              <div className="text-center animate-bounce-cute" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl mb-2">🌊</div>
                <p className="text-sm">Ocean Waves</p>
              </div>
              <div className="text-center animate-bounce-cute" style={{ animationDelay: '0.6s' }}>
                <div className="text-4xl mb-2">☀️</div>
                <p className="text-sm">Sunshine</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Scene 4: Finding Sassy
    {
      title: "🎂 The Birthday Surprise",
      content: (
        <div className="space-y-6">
          <div className={`${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="character-card text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce-cute">🎉</div>
              <h3 className="text-2xl font-bold text-primary mb-4">SURPRISE SASSY! 🎂</h3>
              <div className="speech-bubble max-w-md mx-auto">
                <p className="text-lg">"Happy Birthday to our amazing friend! We flew all the way from Noida and Hyderabad just to celebrate with you in paradise! 🥳"</p>
              </div>
            </div>
            
            <div className="bg-gradient-sunset rounded-3xl p-8 text-white text-center">
              <div className="text-5xl mb-4">🍷✨</div>
              <h4 className="text-xl font-bold mb-4">Time for a Toast!</h4>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <span className="wine-glass text-3xl cursor-pointer">🍷</span>
                <span className="wine-glass text-3xl cursor-pointer">🍷</span>
                <span className="wine-glass text-3xl cursor-pointer">🍷</span>
              </div>
              <p className="text-lg">"To Sassy - may your year be filled with as much joy as a Goa sunset! Cheers! 🥂"</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Scene 5: The Letter
    {
      title: "💌 A Special Letter for Sassy",
      content: (
        <div className="space-y-6">
          <div className={`${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="character-card text-center">
              <div className="text-6xl mb-6 animate-float">💝</div>
              <h3 className="text-2xl font-bold text-primary mb-6">Our Letter to You, Sassy</h3>
              
              <div className="bg-gradient-beach p-8 rounded-2xl text-left max-w-2xl mx-auto shadow-lg">
                <div className="space-y-4 text-foreground">
                  <p className="text-lg leading-relaxed">
                    <strong>Dear Sassy,</strong> 🌟
                  </p>
                  <p>
                    From the bustling streets of Noida and the tech hubs of Hyderabad, we've traveled to the beautiful beaches of Goa just to tell you something important...
                  </p>
                  <p>
                    <strong>YOU ARE ABSOLUTELY AMAZING!</strong> 🎉
                  </p>
                  <p>
                    Your friendship lights up our lives like the Goa sunshine. You bring warmth like the beach sand and joy like the ocean waves. 🌊✨
                  </p>
                  <p>
                    May this new year of your life be filled with:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Adventures as exciting as our spontaneous Goa trip 🏖️</li>
                    <li>Laughter that echoes like waves on the shore 😄</li>
                    <li>Love as endless as the Arabian Sea 💕</li>
                    <li>Dreams as colorful as Goan sunsets 🌅</li>
                  </ul>
                  <p className="text-center text-lg font-semibold text-primary mt-6">
                    Happy Birthday, Sassy! 🎂🎈
                  </p>
                  <p className="text-center">
                    With all our love,<br />
                    <strong>Nitesh & Jhanvi</strong> 💕
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  if (!isActive) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-sunset">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-white text-center mb-8 text-shadow-glow ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {scenes[sceneNumber].title}
        </h2>
        
        <div className="mb-8">
          {scenes[sceneNumber].content}
        </div>
        
        <div className={`text-center ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            {sceneNumber < scenes.length - 1 ? 'Continue Story 👉' : 'Celebrate More! 🎉'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryScene;