import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import niteshCharacter from '@/assets/nitesh-character.jpg';
import jhanviCharacter from '@/assets/jhanvi-character.jpg';
import sassyCharacter from '@/assets/sassy-character.jpg';
import goaBackground from '@/assets/goa-background.jpg';
import airplaneImage from '@/assets/airplane.jpg';

interface MangaStorySceneProps {
  sceneNumber: number;
  onNext: () => void;
  isActive: boolean;
}

const MangaStoryScene = ({ sceneNumber, onNext, isActive }: MangaStorySceneProps) => {
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
            <div className={`manga-panel ${showContent ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="comic-action-lines"></div>
              <div className="text-center relative z-10">
                <img 
                  src={niteshCharacter} 
                  alt="Nitesh"
                  className="manga-character w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <div className="text-4xl mb-4 animate-phone-ring">📱</div>
                <h3 className="text-xl font-bold mb-2">Nitesh</h3>
                <p className="text-sm text-muted-foreground mb-4">📍 Noida</p>
                <div className="speech-bubble">
                  <p className="text-sm font-bold">"Hey Jhanvi! Guess what day it is? It's Sassy's birthday! We HAVE to celebrate this properly! 🎉"</p>
                </div>
              </div>
            </div>
            
            <div className={`manga-panel ${showContent ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="comic-action-lines"></div>
              <div className="text-center relative z-10">
                <img 
                  src={jhanviCharacter} 
                  alt="Jhanvi"
                  className="manga-character w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <div className="text-4xl mb-4 animate-bounce-cute">🎈</div>
                <h3 className="text-xl font-bold mb-2">Jhanvi</h3>
                <p className="text-sm text-muted-foreground mb-4">📍 Hyderabad</p>
                <div className="speech-bubble">
                  <p className="text-sm font-bold">"OMG YES! Sassy is in Goa right? Let's surprise her there! Pack your bags, we're going to the beach! 🏖️"</p>
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
          <div className={`manga-panel text-center ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-5xl mb-2 animate-wave">🚖</div>
                <p className="text-sm font-bold">Nitesh calls taxi</p>
              </div>
              <img 
                src={airplaneImage} 
                alt="Airplane"
                className="manga-character w-20 h-20 animate-float"
              />
              <div className="text-center">
                <div className="text-5xl mb-2 animate-wave">🚖</div>
                <p className="text-sm font-bold">Jhanvi calls taxi</p>
              </div>
            </div>
            
            <div className="max-w-lg mx-auto">
              <div className="text-6xl mb-4">🛫</div>
              <h3 className="text-xl font-bold mb-4">Meeting at the Airport</h3>
              <div className="speech-bubble">
                <p className="font-bold">"Look! There's Jhanvi! Ready for some Goa vibes and Sassy's epic birthday celebration? 🌴"</p>
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
          <div className={`manga-panel ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div 
              className="rounded-2xl p-8 mb-8 text-center relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${goaBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="text-white relative z-10">
                <div className="text-6xl mb-4 animate-float">🏖️</div>
                <h3 className="text-2xl font-bold mb-4">Landed in Goa! 🌊</h3>
                <div className="speech-bubble bg-white text-foreground">
                  <p className="text-lg font-bold">"The beach breeze, the palm trees... Sassy chose the perfect place to live! Let's find our birthday girl!"</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center animate-bounce-cute">
                <div className="text-4xl mb-2">🌴</div>
                <p className="text-sm font-bold">Palm Trees</p>
              </div>
              <div className="text-center animate-bounce-cute" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl mb-2">🌊</div>
                <p className="text-sm font-bold">Ocean Waves</p>
              </div>
              <div className="text-center animate-bounce-cute" style={{ animationDelay: '0.6s' }}>
                <div className="text-4xl mb-2">☀️</div>
                <p className="text-sm font-bold">Sunshine</p>
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
          <div className={`manga-panel text-center ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <img 
              src={sassyCharacter} 
              alt="Sassy"
              className="manga-character w-40 h-40 mx-auto mb-6 rounded-full object-cover"
            />
            <div className="text-6xl mb-4 animate-bounce-cute">🎉</div>
            <h3 className="text-2xl font-bold mb-4">SURPRISE SASSY! 🎂</h3>
            <div className="speech-bubble max-w-md mx-auto">
              <p className="text-lg font-bold">"Happy Birthday to our amazing friend! We flew all the way from Noida and Hyderabad just to celebrate with you in paradise! 🥳"</p>
            </div>
          </div>
          
          <div className="manga-panel text-center">
            <div className="text-5xl mb-4">🍷✨</div>
            <h4 className="text-xl font-bold mb-4">Time for a Toast!</h4>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <span className="wine-glass text-3xl cursor-pointer">🍷</span>
              <span className="wine-glass text-3xl cursor-pointer">🍷</span>
              <span className="wine-glass text-3xl cursor-pointer">🍷</span>
            </div>
            <div className="speech-bubble">
              <p className="text-lg font-bold">"To Sassy - may your year be filled with as much joy as a Goa sunset! Cheers! 🥂"</p>
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
          <div className={`manga-panel text-center ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="text-6xl mb-6 animate-float">💝</div>
            <h3 className="text-2xl font-bold mb-6">Our Letter to You, Sassy</h3>
            
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl max-w-2xl mx-auto border-4 border-foreground">
              <div className="space-y-4 text-left">
                <p className="text-lg leading-relaxed font-bold">
                  <strong>Dear Sassy,</strong> 🌟
                </p>
                <p className="font-medium">
                  From the bustling streets of Noida and the tech hubs of Hyderabad, we've traveled to the beautiful beaches of Goa just to tell you something important...
                </p>
                <p className="text-xl font-bold text-center">
                  YOU ARE ABSOLUTELY AMAZING! 🎉
                </p>
                <p className="font-medium">
                  Your friendship lights up our lives like the Goa sunshine. You bring warmth like the beach sand and joy like the ocean waves. 🌊✨
                </p>
                <p className="font-medium">
                  May this new year of your life be filled with:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 font-medium">
                  <li>Adventures as exciting as our spontaneous Goa trip 🏖️</li>
                  <li>Laughter that echoes like waves on the shore 😄</li>
                  <li>Love as endless as the Arabian Sea 💕</li>
                  <li>Dreams as colorful as Goan sunsets 🌅</li>
                </ul>
                <p className="text-center text-lg font-bold text-primary mt-6">
                  Happy Birthday, Sassy! 🎂🎈
                </p>
                <p className="text-center font-bold">
                  With all our love,<br />
                  <strong>Nitesh & Jhanvi</strong> 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  if (!isActive) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-muted to-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 text-foreground ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`} style={{
          textShadow: '3px 3px 0px hsl(var(--muted-foreground))',
          WebkitTextStroke: '1px hsl(var(--foreground))'
        }}>
          {scenes[sceneNumber].title}
        </h2>
        
        <div className="mb-8">
          {scenes[sceneNumber].content}
        </div>
        
        <div className={`text-center ${showContent ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-3 rounded-full border-4 border-foreground transform transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '4px 4px 0px hsl(var(--foreground))' }}
          >
            {sceneNumber < scenes.length - 1 ? 'Continue Story 👉' : 'Celebrate More! 🎉'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MangaStoryScene;