import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CharacterSprite = ({ character, expression, action, isActive, position, size = "large" }) => {
  const spriteMap = {
    nitesh: {
      happy: "/src/assets/nitesh.jpeg",
      excited: "/src/assets/nitesh.jpeg",
      surprised: "/src/assets/nitesh.jpeg",
      neutral: "/src/assets/nitesh.jpeg",
    },
    jahanvi: {
      happy: "/src/assets/jhanvi.jpg",
      excited: "/src/assets/jhanvi.jpg",
      surprised: "/src/assets/jhanvi.jpg",
      neutral: "/src/assets/jhanvi.jpg",
    },
    sassy: {
      happy: "/src/assets/sassy.png",
      surprised: "/src/assets/sassy-surprised.png",
      neutral: "/src/assets/sassy.png",
    }
  };

  const sizeClasses = {
    large: "w-64 h-64",
    medium: "w-48 h-48",
    small: "w-32 h-32"
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
    if (!scenes[sceneNumber].characters[currentDialogue]?.dialogue) return;
    
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
    }, 40);

    return () => clearInterval(typing);
  }, [currentDialogue, sceneNumber]);

  if (!isActive) return null;

  const currentScene = scenes[sceneNumber];

  return (
    <div className="manga-scene min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(/backgrounds/${currentScene.background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Sound Effect */}
      {currentScene.sfx && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30">
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

      {/* Speech Bubble */}
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

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        <Button
          onClick={() => setCurrentDialogue(prev => Math.max(0, prev - 1))}
          disabled={currentDialogue === 0}
          className="nav-button"
        >
          ←
        </Button>
        <Button
          onClick={() => {
            if (currentDialogue < currentScene.characters.length - 1) {
              setCurrentDialogue(prev => prev + 1);
            } else {
              onNext();
            }
          }}
          className="nav-button-primary"
        >
          {currentDialogue < currentScene.characters.length - 1 ? "Next" : "Continue →"}
        </Button>
      </div>

      <style>{`
        .sfx-text {
          font-family: 'Bangers', cursive;
          font-size: 4rem;
          color: #ff3366;
          transform: rotate(-5deg);
          text-shadow: 
            3px 3px 0 #fff,
            -3px -3px 0 #fff,
            3px -3px 0 #fff,
            -3px 3px 0 #fff;
          animation: sfx-pop 0.5s ease-out;
        }

        @keyframes sfx-pop {
          0% { transform: scale(0) rotate(-5deg); }
          50% { transform: scale(1.2) rotate(-5deg); }
          100% { transform: scale(1) rotate(-5deg); }
        }

        // ... existing styles ...
      `}</style>
    </div>
  );
};

export default StoryScene;
