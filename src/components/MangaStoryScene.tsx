import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { dialogueScenes } from "../data/scenes";
import { celebrationScenes } from "./Celebration";

// Import images properly (Vite handles them)
import niteshImg from "/assets/nitesh.jpeg";
import jahanviImg from "/assets/jhanvi.jpg";
import sassyImg from "/assets/sassy-character.jpg";

// Define the Scene interface properly
interface Character {
  speaker: string;
  text: string;
  expression: string;
  position: "left" | "right" | "center"; // ✅ Added center position
  action: string;
}

interface Scene {
  background: string;
  sfx: string;
  characters: Character[];
  backgroundEffect?: string;
  specialContent?: string;
}

const CharacterSprite = ({ character, expression, action, isActive, position }) => {
  const spriteMap = {
    nitesh: {
      happy: niteshImg,
      excited: niteshImg,
      surprised: niteshImg,
      nervous: niteshImg,
      overjoyed: niteshImg,
      emotional: niteshImg,
      nostalgic: niteshImg,
      neutral: niteshImg,
    },
    jahanvi: {
      happy: jahanviImg,
      enthusiastic: jahanviImg,
      angry: jahanviImg,
      relieved: jahanviImg,
      overjoyed: jahanviImg,
      excited: jahanviImg,
      neutral: jahanviImg,
    },
    // ✅ Added Sassy sprite map
    sassy: {
      surprised: sassyImg,
      happy: sassyImg,
      excited: sassyImg,
      overjoyed: sassyImg,
      neutral: sassyImg,
    },
  };
  return (
    <div className={`character-container ${position} ${isActive ? "active" : "inactive"}`}>
      <img
        src={spriteMap[character]?.[expression] || spriteMap[character]?.neutral}
        alt={`${character} ${expression}`}
        className={`character-sprite ${action} ${character === 'sassy' ? 'sassy-sprite' : ''}`}
      />
    </div>
  );
};

// Updated interface with proper Scene type instead of any
interface MangaStorySceneProps {
  sceneNumber: number;
  onNext: () => void;
  isActive: boolean;
  sceneData?: Scene;
  isCelebration?: boolean;
}

const MangaStoryScene = ({ sceneNumber, onNext, isActive, sceneData, isCelebration }: MangaStorySceneProps) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);

  useEffect(() => {
    if (isActive) {
      setCurrentDialogue(0);
      setTypedText("");
      setShowButton(false);
      setIsSceneReady(false);
      
      const sceneTimer = setTimeout(() => setIsSceneReady(true), 100);
      return () => clearTimeout(sceneTimer);
    }
  }, [sceneNumber, isActive]);

  useEffect(() => {
    if (!isSceneReady || !isActive) return;
    
    // Use sceneData if provided (celebration), otherwise use dialogueScenes
    const currentScene = sceneData || dialogueScenes[sceneNumber];
    if (!currentScene?.characters[currentDialogue]?.text) return;

    setTypedText("");
    setShowButton(false);
    
    const text = currentScene.characters[currentDialogue].text;
    let i = 0;

    const startDelay = setTimeout(() => {
      const typing = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => setShowButton(true), 400);
        }
      }, 40);
      return () => clearInterval(typing);
    }, 200);

    return () => clearTimeout(startDelay);
  }, [currentDialogue, sceneNumber, isSceneReady, isActive, sceneData]);

  if (!isActive || !isSceneReady) return null;
  
  // Use sceneData if provided (celebration), otherwise use dialogueScenes
  const currentScene = sceneData || dialogueScenes[sceneNumber];
  if (!currentScene) return null;

  // Function to get SFX text based on scene
  const getSFXText = (): string => {
    if (sceneData) {
      return sceneData.sfx;
    }
    
    // Original hardcoded SFX for main story scenes with proper typing
    const sfxMap: Record<number, string> = {
      0: 'WHOOSH!',
      1: 'ZOOM!',
      2: 'TADA!',
      3: 'CRACK!',
      4: 'PHEW!',
      5: 'SURPRISE!'
    };
    return sfxMap[sceneNumber] || 'WHOOSH!';
  };

  // Function to get speaker display name
  const getSpeakerName = (speaker: string): string => {
    const nameMap: Record<string, string> = {
      nitesh: "Nitesh",
      jahanvi: "Jahanvi",
      sassy: "Sassy" // ✅ Added Sassy display name
    };
    return nameMap[speaker] || speaker;
  };

  // Function to get speech bubble position based on character position
  const getSpeechBubbleStyle = (character: Character) => {
    switch (character.position) {
      case 'left':
        return { left: "25%" };
      case 'right':
        return { right: "25%" };
      case 'center':
        return { left: "50%", transform: "translateX(-50%)" }; // ✅ Center positioning
      default:
        return { left: "25%" };
    }
  };

  return (
    <div className="manga-scene min-h-screen relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-1000 transform ${
          currentScene.backgroundEffect === "thunder" ? "thunder-effect" : ""
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${currentScene.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {currentScene.backgroundEffect === "thunder" && <div className="thunder-overlay"></div>}

      {/* Updated SFX that works for both main and celebration scenes */}
      <div 
        className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30"
        style={{
          fontFamily: 'Impact, Arial Black, Helvetica, sans-serif',
          fontSize: '4.5rem',
          fontWeight: 900,
          color: isCelebration ? '#ff69b4' : '#ff1744',
          transform: 'rotate(-8deg)',
          textShadow: '4px 4px 0 #ffffff, -3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 3px 3px 0 #000000',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          userSelect: 'none'
        }}
      >
        {getSFXText()}
      </div>

      {/* Render all characters in the scene */}
      {currentScene.characters.map((char, index) => (
        <CharacterSprite
          key={`${char.speaker}-${index}`}
          character={char.speaker}
          expression={char.expression}
          action={currentDialogue === index ? char.action : ""}
          isActive={currentDialogue === index}
          position={char.position}
        />
      ))}

      {/* Speech bubble with dynamic positioning */}
      {currentScene.characters[currentDialogue] && (
        <div
          className="speech-container"
          style={{
            position: "absolute",
            zIndex: 30,
            ...getSpeechBubbleStyle(currentScene.characters[currentDialogue]),
            bottom: "55%",
          }}
        >
          <div className={`speech-bubble-manga animate-in ${isCelebration ? 'celebration-bubble' : ''}`}>
            <div className="speaker-name">
              {getSpeakerName(currentScene.characters[currentDialogue].speaker)}
            </div>
            <div className="dialogue-text">{typedText}</div>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        <Button
          onClick={() => currentDialogue > 0 && setCurrentDialogue(prev => prev - 1)}
          disabled={currentDialogue === 0}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </Button>
        {showButton && (
          <Button
            onClick={() => {
              if (currentDialogue < currentScene.characters.length - 1) {
                setCurrentDialogue(prev => prev + 1);
              } else {
                onNext();
              }
            }}
            className={`${isCelebration ? 'bg-pink-600 hover:bg-pink-500' : 'bg-blue-600 hover:bg-blue-500'} text-white px-6 py-2 rounded font-bold`}
          >
            {currentDialogue < currentScene.characters.length - 1 ? "Next" : "Continue →"}
          </Button>
        )}
      </div>

      <style>{`
        .character-container {
          position: absolute;
          transition: all 0.5s ease-out;
        }
        .character-container.left { left: 10%; bottom: 20%; }
        .character-container.right { right: 10%; bottom: 20%; }
        .character-container.center { 
          left: 50%; 
          bottom: 20%; 
          transform: translateX(-50%);
        }
        
        .character-sprite {
          width: 400px;
          height: auto;
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
          transition: transform 0.3s ease;
        }
        
        /* Special styling for Sassy to make her stand out */
        .sassy-sprite {
          width: 420px; /* Slightly larger */
          filter: drop-shadow(0 0 30px rgba(255,215,0,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.2));
        }
        
        .character-container.active .character-sprite { transform: scale(1.1); }
        .character-container.inactive .character-sprite { transform: scale(0.9); opacity: 0.7; }
        .character-container.center.active .sassy-sprite { 
          transform: translateX(-50%) scale(1.15); 
          filter: drop-shadow(0 0 40px rgba(255,215,0,0.6)) drop-shadow(0 0 30px rgba(255,255,255,0.3));
        }

        .celebration { animation: celebration 2s infinite; }
        .toast { animation: toastAction 2s infinite; }
        .cake { animation: cakeAction 2s infinite; }
        .reminisce { animation: reminisceAction 2s infinite; }
        .letter, .wave, .jump, .sparkle, .excited, .nervous, .shake, .search, .victory, .laugh { animation: genericAction 2s infinite; }
        
        @keyframes celebration {
          0%, 100% { transform: scale(1.1) rotate(0deg); filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); }
          25% { transform: scale(1.2) rotate(-5deg); filter: drop-shadow(0 0 30px rgba(255,215,0,0.5)); }
          50% { transform: scale(1.15) rotate(0deg); filter: drop-shadow(0 0 25px rgba(255,20,147,0.4)); }
          75% { transform: scale(1.2) rotate(5deg); filter: drop-shadow(0 0 30px rgba(0,255,255,0.4)); }
        }
        
        @keyframes toastAction {
          0%, 100% { transform: scale(1.1) translateY(0); }
          50% { transform: scale(1.15) translateY(-10px) rotate(5deg); }
        }
        
        @keyframes cakeAction {
          0%, 100% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(255,192,203,0.5)); }
          50% { transform: scale(1.2); filter: drop-shadow(0 0 30px rgba(255,105,180,0.7)); }
        }
        
        @keyframes reminisceAction {
          0%, 100% { transform: scale(1.1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; filter: sepia(20%); }
        }
        
        @keyframes genericAction { 0%, 100% { transform: scale(1.1); } 50% { transform: scale(1.15) translateY(-5px); } }

        .speech-container { 
          position: absolute; 
          z-index: 30; 
          transition: all 0.3s ease-out; 
          max-width: 450px; 
        }
        
        .speech-bubble-manga {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          position: relative;
          border: 3px solid #333;
          transform: perspective(1000px) rotateY(-2deg);
          transition: transform 0.3s ease;
        }
        
        .celebration-bubble {
          background: linear-gradient(135deg, #fff 0%, #ffe4f1 100%);
          border-color: #ff69b4;
          box-shadow: 0 4px 20px rgba(255,105,180,0.4);
        }
        
        .speech-bubble-manga::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          border: 15px solid transparent;
          border-top-color: white;
          border-bottom: none;
        }
        .speech-bubble-manga::before {
          content: '';
          position: absolute;
          bottom: -23px;
          left: 50%;
          transform: translateX(-50%);
          border: 15px solid transparent;
          border-top-color: #333;
          border-bottom: none;
          z-index: -1;
        }
        
        .celebration-bubble::before {
          border-top-color: #ff69b4;
        }
        
        .speaker-name { font-weight: bold; color: #333; font-size: 0.9rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .dialogue-text { font-size: 1.1rem; color: #333; line-height: 1.4; min-height: 25px; font-weight: 500; }
        .animate-in { animation: bubbleIn 0.4s ease-out; }
        @keyframes bubbleIn { 0% { opacity: 0; transform: perspective(1000px) rotateY(-15deg) scale(0.8) translateY(20px); } 100% { opacity: 1; transform: perspective(1000px) rotateY(-2deg) scale(1) translateY(0); } }
        .thunder-effect { animation: flash 1.5s infinite; }
        .thunder-overlay { position: absolute; inset: 0; background: white; opacity: 0; z-index: 15; animation: thunder 1.5s infinite; }
        @keyframes flash { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.3) contrast(1.2); } }
        @keyframes thunder { 0%, 100% { opacity: 0; } 10% { opacity: 0.8; } 11% { opacity: 0; } 14% { opacity: 0.4; } 15% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default MangaStoryScene;
