import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { dialogueScenes } from "../data/scenes";
import { celebrationScenes } from "./Celebration";
import LetterComponent from "./LetterComponent";

// Import images properly (Vite handles them)
import niteshImg from "/assets/nitesh.jpeg";
import jahanviImg from "/assets/jhanvi.jpg";
import sassyImg from "/assets/sassy-character.jpg";

// Define the Scene interface properly
interface Character {
  speaker: string;
  text: string;
  expression: string;
  position: "left" | "right" | "center";
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
      curious: niteshImg,
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
    sassy: {
      surprised: sassyImg,
      happy: sassyImg,
      excited: sassyImg,
      overjoyed: sassyImg,
      emotional: sassyImg,
      nostalgic: sassyImg,
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
  const [showLetter, setShowLetter] = useState(false);

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

  const handleLetterScene = () => {
    const currentScene = sceneData || dialogueScenes[sceneNumber];
    return currentScene?.specialContent === "letter" && currentDialogue === currentScene.characters.length - 1;
  };

  const handleNext = () => {
    const currentScene = sceneData || dialogueScenes[sceneNumber];
    
    if (currentDialogue < currentScene.characters.length - 1) {
      setCurrentDialogue(prev => prev + 1);
    } else if (handleLetterScene()) {
      setShowLetter(true);
    } else {
      onNext();
    }
  };

  const handleLetterClose = () => {
    setShowLetter(false);
    onNext();
  };

  if (!isActive || !isSceneReady) return null;
  
  const currentScene = sceneData || dialogueScenes[sceneNumber];
  if (!currentScene) return null;

  const getSFXText = (): string => {
    if (sceneData) {
      return sceneData.sfx;
    }
    
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

  const getSpeakerName = (speaker: string): string => {
    const nameMap: Record<string, string> = {
      nitesh: "Nitesh",
      jahanvi: "Jahanvi",
      sassy: "Sassy"
    };
    return nameMap[speaker] || speaker;
  };

  const getSpeechBubbleStyle = (character: Character) => {
    const isMobile = window.innerWidth < 768;
    
    switch (character.position) {
      case 'left':
        return isMobile 
          ? { left: "5%", bottom: "45%" }
          : { left: "25%", bottom: "55%" };
      case 'right':
        return isMobile 
          ? { right: "5%", bottom: "45%" }
          : { right: "25%", bottom: "55%" };
      case 'center':
        return isMobile 
          ? { left: "50%", transform: "translateX(-50%)", bottom: "45%" }
          : { left: "50%", transform: "translateX(-50%)", bottom: "55%" };
      default:
        return isMobile 
          ? { left: "5%", bottom: "45%" }
          : { left: "25%", bottom: "55%" };
    }
  };

  return (
    <>
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

        {/* Mobile responsive SFX */}
        <div 
          className="sfx-text absolute top-4 md:top-10 left-1/2 transform -translate-x-1/2 z-30"
          style={{
            fontFamily: 'Impact, Arial Black, Helvetica, sans-serif',
            fontSize: window.innerWidth < 768 ? '2.5rem' : '4.5rem',
            fontWeight: 900,
            color: isCelebration ? '#ff69b4' : '#ff1744',
            transform: 'rotate(-8deg)',
            textShadow: '4px 4px 0 #ffffff, -3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 3px 3px 0 #000000',
            letterSpacing: window.innerWidth < 768 ? '2px' : '4px',
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

        {/* Mobile responsive buttons */}
        <div className="button-container absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 z-20 px-4">
          <Button
            onClick={() => currentDialogue > 0 && setCurrentDialogue(prev => prev - 1)}
            disabled={currentDialogue === 0}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Previous
          </Button>
          {showButton && (
            <Button
              onClick={handleNext}
              className={`${isCelebration ? 'bg-pink-600 hover:bg-pink-500' : 'bg-blue-600 hover:bg-blue-500'} text-white px-6 py-2 rounded font-bold w-full md:w-auto`}
            >
              {currentDialogue < currentScene.characters.length - 1 
                ? "Next" 
                : handleLetterScene() 
                  ? "Read Letter 💌"
                  : "Continue →"
              }
            </Button>
          )}
        </div>

        <style>{`
          /* Mobile-first responsive character positioning */
          .character-container {
            position: absolute;
            transition: all 0.5s ease-out;
          }
          
          .character-container.left { 
            left: 5%; 
            bottom: 15%; 
          }
          
          .character-container.right { 
            right: 5%; 
            bottom: 15%; 
          }
          
          .character-container.center { 
            left: 50%; 
            bottom: 15%; 
            transform: translateX(-50%);
          }
          
          /* Mobile responsive character sizing */
          .character-sprite {
            width: 200px;
            height: auto;
            filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
            transition: transform 0.3s ease;
          }
          
          .sassy-sprite {
            width: 220px;
            filter: drop-shadow(0 0 25px rgba(255,215,0,0.4)) drop-shadow(0 0 15px rgba(255,255,255,0.2));
          }
          
          /* Tablet and desktop sizes */
          @media (min-width: 768px) {
            .character-container.left { left: 10%; bottom: 20%; }
            .character-container.right { right: 10%; bottom: 20%; }
            .character-container.center { left: 50%; bottom: 20%; }
            
            .character-sprite {
              width: 400px;
              filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
            }
            
            .sassy-sprite {
              width: 420px;
              filter: drop-shadow(0 0 30px rgba(255,215,0,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.2));
            }
          }
          
          .character-container.active .character-sprite { transform: scale(1.05); }
          .character-container.inactive .character-sprite { transform: scale(0.85); opacity: 0.7; }
          
          @media (min-width: 768px) {
            .character-container.active .character-sprite { transform: scale(1.1); }
            .character-container.inactive .character-sprite { transform: scale(0.9); opacity: 0.7; }
          }
          
          .character-container.center.active .sassy-sprite { 
            transform: translateX(-50%) scale(1.1); 
            filter: drop-shadow(0 0 35px rgba(255,215,0,0.6)) drop-shadow(0 0 25px rgba(255,255,255,0.3));
          }
          
          @media (min-width: 768px) {
            .character-container.center.active .sassy-sprite { 
              transform: translateX(-50%) scale(1.15); 
              filter: drop-shadow(0 0 40px rgba(255,215,0,0.6)) drop-shadow(0 0 30px rgba(255,255,255,0.3));
            }
          }

          /* Animation classes with mobile optimization */
          .celebration { animation: celebration 2s infinite; }
          .toast { animation: toastAction 2s infinite; }
          .cake { animation: cakeAction 2s infinite; }
          .reminisce { animation: reminisceAction 2s infinite; }
          .letter, .wave, .jump, .sparkle, .excited, .nervous, .shake, .search, .victory, .laugh { animation: genericAction 2s infinite; }
          
          @keyframes celebration {
            0%, 100% { transform: scale(1.05) rotate(0deg); filter: drop-shadow(0 0 15px rgba(255,255,255,0.2)); }
            25% { transform: scale(1.1) rotate(-3deg); filter: drop-shadow(0 0 25px rgba(255,215,0,0.5)); }
            50% { transform: scale(1.08) rotate(0deg); filter: drop-shadow(0 0 20px rgba(255,20,147,0.4)); }
            75% { transform: scale(1.1) rotate(3deg); filter: drop-shadow(0 0 25px rgba(0,255,255,0.4)); }
          }
          
          @media (min-width: 768px) {
            @keyframes celebration {
              0%, 100% { transform: scale(1.1) rotate(0deg); filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); }
              25% { transform: scale(1.2) rotate(-5deg); filter: drop-shadow(0 0 30px rgba(255,215,0,0.5)); }
              50% { transform: scale(1.15) rotate(0deg); filter: drop-shadow(0 0 25px rgba(255,20,147,0.4)); }
              75% { transform: scale(1.2) rotate(5deg); filter: drop-shadow(0 0 30px rgba(0,255,255,0.4)); }
            }
          }
          
          @keyframes toastAction {
            0%, 100% { transform: scale(1.05) translateY(0); }
            50% { transform: scale(1.1) translateY(-5px) rotate(3deg); }
          }
          
          @media (min-width: 768px) {
            @keyframes toastAction {
              0%, 100% { transform: scale(1.1) translateY(0); }
              50% { transform: scale(1.15) translateY(-10px) rotate(5deg); }
            }
          }
          
          @keyframes cakeAction {
            0%, 100% { transform: scale(1.05); filter: drop-shadow(0 0 15px rgba(255,192,203,0.5)); }
            50% { transform: scale(1.15); filter: drop-shadow(0 0 25px rgba(255,105,180,0.7)); }
          }
          
          @media (min-width: 768px) {
            @keyframes cakeAction {
              0%, 100% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(255,192,203,0.5)); }
              50% { transform: scale(1.2); filter: drop-shadow(0 0 30px rgba(255,105,180,0.7)); }
            }
          }
          
          @keyframes reminisceAction {
            0%, 100% { transform: scale(1.05); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.85; filter: sepia(15%); }
          }
          
          @media (min-width: 768px) {
            @keyframes reminisceAction {
              0%, 100% { transform: scale(1.1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.8; filter: sepia(20%); }
            }
          }
          
          @keyframes genericAction { 
            0%, 100% { transform: scale(1.05); } 
            50% { transform: scale(1.1) translateY(-3px); } 
          }
          
          @media (min-width: 768px) {
            @keyframes genericAction { 
              0%, 100% { transform: scale(1.1); } 
              50% { transform: scale(1.15) translateY(-5px); } 
            }
          }

          /* Mobile responsive speech bubbles */
          .speech-container { 
            position: absolute; 
            z-index: 30; 
            transition: all 0.3s ease-out; 
            max-width: 280px;
            padding: 0 10px;
          }
          
          .speech-bubble-manga {
            background: white;
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            position: relative;
            border: 2px solid #333;
            transform: perspective(1000px) rotateY(-2deg);
            transition: transform 0.3s ease;
          }
          
          .celebration-bubble {
            background: linear-gradient(135deg, #fff 0%, #ffe4f1 100%);
            border-color: #ff69b4;
            box-shadow: 0 4px 15px rgba(255,105,180,0.4);
          }
          
          .speech-bubble-manga::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            border: 12px solid transparent;
            border-top-color: white;
            border-bottom: none;
          }
          .speech-bubble-manga::before {
            content: '';
            position: absolute;
            bottom: -18px;
            left: 50%;
            transform: translateX(-50%);
            border: 12px solid transparent;
            border-top-color: #333;
            border-bottom: none;
            z-index: -1;
          }
          
          .celebration-bubble::before {
            border-top-color: #ff69b4;
          }
          
          .speaker-name { 
            font-weight: bold; 
            color: #333; 
            font-size: 0.8rem;
            margin-bottom: 6px; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
          }
          
          .dialogue-text { 
            font-size: 0.9rem;
            color: #333; 
            line-height: 1.4; 
            min-height: 20px; 
            font-weight: 500; 
          }
          
          /* Tablet and desktop speech bubble sizes */
          @media (min-width: 768px) {
            .speech-container { 
              max-width: 450px; 
              padding: 0;
            }
            
            .speech-bubble-manga {
              border-radius: 20px;
              padding: 20px;
              border: 3px solid #333;
              box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            
            .celebration-bubble {
              box-shadow: 0 4px 20px rgba(255,105,180,0.4);
            }
            
            .speech-bubble-manga::after {
              bottom: -20px;
              border: 15px solid transparent;
            }
            .speech-bubble-manga::before {
              bottom: -23px;
              border: 15px solid transparent;
            }
            
            .speaker-name { 
              font-size: 0.9rem; 
              margin-bottom: 8px; 
            }
            
            .dialogue-text { 
              font-size: 1.1rem; 
              min-height: 25px; 
            }
          }
          
          .animate-in { animation: bubbleIn 0.4s ease-out; }
          @keyframes bubbleIn { 
            0% { opacity: 0; transform: perspective(1000px) rotateY(-15deg) scale(0.8) translateY(20px); } 
            100% { opacity: 1; transform: perspective(1000px) rotateY(-2deg) scale(1) translateY(0); } 
          }
          
          /* Thunder effects */
          .thunder-effect { animation: flash 1.5s infinite; }
          .thunder-overlay { position: absolute; inset: 0; background: white; opacity: 0; z-index: 15; animation: thunder 1.5s infinite; }
          @keyframes flash { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.3) contrast(1.2); } }
          @keyframes thunder { 0%, 100% { opacity: 0; } 10% { opacity: 0.8; } 11% { opacity: 0; } 14% { opacity: 0.4; } 15% { opacity: 0; } }
          
          /* Mobile responsive button container */
          .button-container {
            max-width: 100%;
          }
          
          @media (max-width: 767px) {
            .button-container button {
              max-width: 200px;
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>

      <LetterComponent 
        isVisible={showLetter} 
        onClose={handleLetterClose} 
      />
    </>
  );
};

export default MangaStoryScene;
