import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CharacterSprite = ({ character, expression, action, isActive, position, size = "large" }) => {
  const spriteMap = {
    nitesh: {
      happy: "./assets/nitesh.jpeg",
      excited: "./assets/nitesh.jpeg",
      surprised: "./assets/nitesh.jpeg",
      neutral: "./assets/nitesh.jpeg",
    },
    jahanvi: {
      happy: "./assets/jhanvi.jpg",
      excited: "./assets/jhanvi.jpg",
      surprised: "./assets/jhanvi.jpg",
      neutral: "./assets/jhanvi.jpg",
    },
    sassy: {
      happy: "./assets/sassy.png",
      surprised: "./assets/sassy-surprised.png",
      neutral: "./assets/sassy.png",
    }
  };

  // Mobile-responsive size classes
  const sizeClasses = {
    large: "w-40 h-40 md:w-64 md:h-64",
    medium: "w-32 h-32 md:w-48 md:h-48",
    small: "w-24 h-24 md:w-32 md:h-32"
  };

  return (
    <div className={`character-container ${position} ${isActive ? 'active' : 'inactive'}`}>
      <img 
        src={spriteMap[character][expression] || spriteMap[character].neutral}
        alt={`${character} ${expression}`}
        className={`character-sprite ${sizeClasses[size]} ${action}`}
      />
    </div>
  );
};

interface StorySceneProps {
  sceneNumber: number;
  onNext: () => void;
  isActive: boolean;
}

const scenes = [
  // Scene 1: Airport Meeting
  {
    characters: [
      { 
        name: "nitesh",
        position: "left",
        expression: "excited",
        action: "jump",
        dialogue: "Look! There's Jahanvi at the airport!"
      },
      {
        name: "jahanvi",
        position: "right",
        expression: "happy",
        action: "wave",
        dialogue: "Nitesh! Ready for our surprise mission? 🎉"
      }
    ],
    background: "airport-bg.jpg",
    sfx: "WHOOSH!",
  },
  // ... define other scenes similarly
];

const StoryScene = ({ sceneNumber, onNext, isActive }: StorySceneProps) => {
  const [showContent, setShowContent] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!scenes[sceneNumber]?.characters[currentDialogue]?.dialogue) return;
    
    setTypedText("");
    const text = scenes[sceneNumber].characters[currentDialogue].dialogue;
    let i = 0;
    
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, window.innerWidth < 768 ? 30 : 40); // Faster typing on mobile

    return () => clearInterval(typing);
  }, [currentDialogue, sceneNumber]);

  if (!isActive || !scenes[sceneNumber]) return null;

  const currentScene = scenes[sceneNumber];

  return (
    <div className="manga-scene min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(./backgrounds/${currentScene.background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Mobile responsive Sound Effect */}
      {currentScene.sfx && (
        <div className="absolute top-4 md:top-10 left-1/2 transform -translate-x-1/2 z-30">
          <div className="sfx-text">{currentScene.sfx}</div>
        </div>
      )}

      {/* Characters */}
      {currentScene.characters.map((char, index) => (
        <CharacterSprite
          key={char.name}
          character={char.name}
          expression={char.expression}
          action={char.action}
          position={char.position}
          isActive={currentDialogue === index}
        />
      ))}

      {/* Mobile responsive Speech Bubble */}
      {currentScene.characters[currentDialogue] && (
        <div className={`speech-container ${currentScene.characters[currentDialogue].position}`}>
          <div className="speech-bubble-manga animate-in">
            <div className="speaker-name">
              {currentScene.characters[currentDialogue].name}
            </div>
            <div className="dialogue-text">{typedText}</div>
          </div>
        </div>
      )}

      {/* Mobile responsive Navigation */}
      <div className="navigation-container absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-3 md:gap-4 z-20 px-4">
        <Button
          onClick={() => setCurrentDialogue(prev => Math.max(0, prev - 1))}
          disabled={currentDialogue === 0}
          className="nav-button w-full md:w-auto"
        >
          ← Previous
        </Button>
        <Button
          onClick={() => {
            if (currentDialogue < currentScene.characters.length - 1) {
              setCurrentDialogue(prev => prev + 1);
            } else {
              onNext();
            }
          }}
          className="nav-button-primary w-full md:w-auto"
        >
          {currentDialogue < currentScene.characters.length - 1 ? "Next" : "Continue →"}
        </Button>
      </div>

      <style>{`
        /* Mobile-first responsive SFX text */
        .sfx-text {
          font-family: 'Impact', 'Arial Black', cursive;
          font-size: 2.5rem;
          color: #ff3366;
          transform: rotate(-5deg);
          text-shadow: 
            2px 2px 0 #fff,
            -2px -2px 0 #fff,
            2px -2px 0 #fff,
            -2px 2px 0 #fff;
          animation: sfx-pop 0.5s ease-out;
          text-align: center;
        }

        /* Desktop SFX scaling */
        @media (min-width: 768px) {
          .sfx-text {
            font-size: 4rem;
            text-shadow: 
              3px 3px 0 #fff,
              -3px -3px 0 #fff,
              3px -3px 0 #fff,
              -3px 3px 0 #fff;
          }
        }

        @keyframes sfx-pop {
          0% { transform: scale(0) rotate(-5deg); }
          50% { transform: scale(1.2) rotate(-5deg); }
          100% { transform: scale(1) rotate(-5deg); }
        }

        /* Mobile-first character positioning */
        .character-container {
          position: absolute;
          transition: all 0.5s ease-out;
          z-index: 10;
        }

        .character-container.left {
          left: 5%;
          bottom: 15%;
        }

        .character-container.right {
          right: 5%;
          bottom: 15%;
        }

        /* Desktop character positioning */
        @media (min-width: 768px) {
          .character-container.left {
            left: 10%;
            bottom: 20%;
          }

          .character-container.right {
            right: 10%;
            bottom: 20%;
          }
        }

        .character-sprite {
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
          transition: all 0.3s ease;
          border-radius: 10px;
        }

        @media (min-width: 768px) {
          .character-sprite {
            filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
            border-radius: 15px;
          }
        }

        .character-container.active .character-sprite {
          transform: scale(1.05);
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.4));
        }

        .character-container.inactive .character-sprite {
          transform: scale(0.9);
          opacity: 0.7;
          filter: brightness(0.7);
        }

        @media (min-width: 768px) {
          .character-container.active .character-sprite {
            transform: scale(1.1);
            filter: drop-shadow(0 0 25px rgba(255,255,255,0.4));
          }

          .character-container.inactive .character-sprite {
            transform: scale(0.85);
          }
        }

        /* Character action animations - mobile optimized */
        .jump {
          animation: jump-mobile 0.5s ease-in-out;
        }

        .wave {
          animation: wave-mobile 1s ease-in-out;
        }

        @keyframes jump-mobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes wave-mobile {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(10deg); }
        }

        /* Desktop animations */
        @media (min-width: 768px) {
          .jump {
            animation: jump-desktop 0.5s ease-in-out;
          }

          .wave {
            animation: wave-desktop 1s ease-in-out;
          }

          @keyframes jump-desktop {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes wave-desktop {
            0%, 100% { transform: rotate(0); }
            50% { transform: rotate(15deg); }
          }
        }

        /* Mobile-first speech bubble positioning */
        .speech-container {
          position: absolute;
          z-index: 20;
          transition: all 0.3s ease-out;
          max-width: 90%;
        }

        .speech-container.left {
          left: 5%;
          bottom: 50%;
        }

        .speech-container.right {
          right: 5%;
          bottom: 50%;
        }

        /* Desktop speech bubble positioning */
        @media (min-width: 768px) {
          .speech-container {
            max-width: none;
          }

          .speech-container.left {
            left: 25%;
            bottom: 65%;
          }

          .speech-container.right {
            right: 25%;
            bottom: 65%;
          }
        }

        .speech-bubble-manga {
          background: white;
          border-radius: 15px;
          padding: 15px;
          max-width: 280px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          position: relative;
          border: 2px solid #333;
          transform: perspective(1000px) rotateY(-2deg);
        }

        /* Desktop speech bubble */
        @media (min-width: 768px) {
          .speech-bubble-manga {
            border-radius: 20px;
            padding: 20px;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            border: 3px solid #333;
          }
        }

        .speaker-name {
          font-weight: bold;
          color: #ff3366;
          font-size: 0.9rem;
          margin-bottom: 6px;
          text-transform: capitalize;
        }

        .dialogue-text {
          font-size: 1rem;
          line-height: 1.4;
          color: #333;
        }

        /* Desktop text sizing */
        @media (min-width: 768px) {
          .speaker-name {
            font-size: 1.1rem;
            margin-bottom: 8px;
          }

          .dialogue-text {
            font-size: 1.2rem;
          }
        }

        .animate-in {
          animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: perspective(1000px) rotateY(-15deg) scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) rotateY(-2deg) scale(1) translateY(0);
          }
        }

        /* Mobile-first navigation buttons */
        .nav-button, .nav-button-primary {
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          touch-action: manipulation;
        }

        .nav-button {
          background: rgba(255,255,255,0.1);
          border: 2px solid white;
          color: white;
        }

        .nav-button-primary {
          background: #ff3366;
          border: none;
          color: white;
          font-weight: bold;
          box-shadow: 0 3px 10px rgba(255,51,102,0.3);
        }

        /* Desktop button sizing */
        @media (min-width: 768px) {
          .nav-button, .nav-button-primary {
            padding: 12px 24px;
            font-size: 1rem;
            border-radius: 999px;
          }

          .nav-button-primary {
            padding: 12px 32px;
            font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(255,51,102,0.4);
          }

          .nav-button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255,51,102,0.5);
          }
        }

        /* Mobile touch feedback */
        @media (max-width: 767px) {
          .nav-button:active,
          .nav-button-primary:active {
            transform: scale(0.98);
          }
        }

        .navigation-container {
          width: 90%;
          max-width: 400px;
        }

        @media (min-width: 768px) {
          .navigation-container {
            width: auto;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default StoryScene;
