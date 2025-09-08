import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const dialogues = [
  {
    speaker: "jahanvi",
    text: "Hey Nitesh! Sassy's ka birthday aari h!",
    expression: "happy",
    position: "right",
    action: "wave",
  },
  {
    speaker: "nitesh",
    text: "Oh wow! chal kuch karte h!!",
    expression: "excited",
    position: "left",
    action: "think",
  },
  {
    speaker: "jahanvi",
    text: "How about a surprise trip to Goa? sassy ko surprise krenge",
    expression: "enthusiastic",
    position: "right",
    action: "sparkle",
  },
  {
    speaker: "nitesh",
    text: "Vo hme laat marke, bhaga na de!",
    expression: "overjoyed",
    position: "left",
    action: "jump",
  },
  {
    speaker: "jahanvi",
    text: "Yar tu kitna darta h!",
    expression: "overjoyed",
    position: "right",
    action: "sparkle",
  },
  {
    speaker: "nitesh",
    text: "chl phir chalte h!",
    expression: "overjoyed",
    position: "left",
    action: "sparkle",
    goa: true,
  },
];

const CharacterSprite = ({
  character,
  expression,
  action,
  isActive,
  position,
}) => {
  const spriteMap = {
    nitesh: {
      happy: "./assets/nitesh.jpeg",
      excited: "./assets/nitesh.jpeg",
      overjoyed: "./assets/nitesh.jpeg",
      neutral: "./assets/nitesh.jpeg",
    },
    jahanvi: {
      happy: "./assets/jhanvi.jpg",
      enthusiastic: "./assets/jhanvi.jpg",
      overjoyed: "./assets/jhanvi.jpg",
      neutral: "./assets/jhanvi.jpg",
    },
  };

  return (
    <div
      className={`character-container ${position} ${
        isActive ? "active" : "inactive"
      }`}
    >
      <img
        src={spriteMap[character][expression] || spriteMap[character].neutral}
        alt={`${character} ${expression}`}
        className={`character-sprite ${action}`}
      />
    </div>
  );
};

interface IntroSceneProps {
  onStart: () => void;
}

const IntroScene = ({ onStart }: IntroSceneProps) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!dialogues[currentDialogue]?.text) return;

    setTypedText("");
    setShowButton(false);
    const text = dialogues[currentDialogue].text;
    let i = 0;

    const typing = setInterval(() => {
      if (i < text.length) {
        setTypedText((prev) => text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => setShowButton(true), 400);
      }
    }, 40);

    return () => clearInterval(typing);
  }, [currentDialogue]);

  const handlePrev = () => {
    if (currentDialogue > 0) setCurrentDialogue(currentDialogue - 1);
  };

  const handleNext = () => {
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    } else {
      onStart();
    }
  };

  return (
    <div className="manga-scene min-h-screen relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black"
        style={{
          backgroundImage: "url('./textures/manga-bg.png')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
        }}
      />

      {/* Characters */}
      <CharacterSprite
        character="nitesh"
        expression={dialogues[currentDialogue]?.expression || "neutral"}
        action={
          dialogues[currentDialogue]?.speaker === "nitesh"
            ? dialogues[currentDialogue]?.action
            : ""
        }
        isActive={dialogues[currentDialogue]?.speaker === "nitesh"}
        position="left"
      />

      <CharacterSprite
        character="jahanvi"
        expression={dialogues[currentDialogue]?.expression || "neutral"}
        action={
          dialogues[currentDialogue]?.speaker === "jahanvi"
            ? dialogues[currentDialogue]?.action
            : ""
        }
        isActive={dialogues[currentDialogue]?.speaker === "jahanvi"}
        position="right"
      />

      {/* Speech Bubble */}
      {dialogues[currentDialogue]?.speaker && (
        <div
          className={`speech-container ${dialogues[currentDialogue].speaker}`}
        >
          <div className="speech-bubble-manga animate-in">
            <div className="speaker-name">
              {dialogues[currentDialogue].speaker === "nitesh"
                ? "Nitesh"
                : "Jahanvi"}
            </div>
            <div className="dialogue-text">{typedText}</div>
          </div>
        </div>
      )}

      {/* Mobile responsive navigation */}
      <div className="navigation-container absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-3 md:gap-4 z-20 w-11/12 md:w-auto">
        <Button
          onClick={handlePrev}
          disabled={currentDialogue === 0}
          className="nav-button w-full md:w-auto"
        >
          Previous
        </Button>
        {showButton && (
          <Button onClick={handleNext} className="nav-button-primary w-full md:w-auto">
            {currentDialogue < dialogues.length - 1
              ? "Next"
              : "Start Adventure!"}
          </Button>
        )}
      </div>

      <style>{`
        /* Mobile-first responsive styles */
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
        
        .character-sprite {
          width: 180px;
          height: auto;
          filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
          transition: all 0.3s ease;
        }
        
        /* Tablet and desktop character sizing */
        @media (min-width: 768px) {
          .character-container.left {
            left: 10%;
            bottom: 20%;
          }
          
          .character-container.right {
            right: 10%;
            bottom: 20%;
          }
          
          .character-sprite {
            width: 400px;
            filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
          }
        }
        
        .inactive {
          filter: brightness(0.5);
          transform: scale(0.85) translateY(15px);
        }
        
        .active {
          filter: brightness(1);
          transform: scale(1) translateY(0);
        }
        
        @media (min-width: 768px) {
          .inactive {
            transform: scale(0.9) translateY(20px);
          }
        }
        
        /* Animation classes with mobile optimization */
        .jump {
          animation: jump 0.5s ease-in-out;
        }
        .think {
          animation: think 2s infinite;
        }
        .wave {
          animation: wave 1s ease-in-out;
        }
        .sparkle {
          animation: sparkle 1s ease-in-out;
        }
        
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @media (min-width: 768px) {
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        }
        
        @keyframes think {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-3px) rotate(-3deg); }
        }
        
        @media (min-width: 768px) {
          @keyframes think {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-5px) rotate(-5deg); }
          }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(12deg); }
        }
        
        @media (min-width: 768px) {
          @keyframes wave {
            0%, 100% { transform: rotate(0); }
            50% { transform: rotate(15deg); }
          }
        }
        
        @keyframes sparkle {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.3) saturate(1.1); }
          100% { filter: brightness(1); }
        }
        
        @media (min-width: 768px) {
          @keyframes sparkle {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.5) saturate(1.2); }
            100% { filter: brightness(1); }
          }
        }
        
        /* Mobile responsive speech bubbles */
        .speech-container {
          position: absolute;
          z-index: 10;
          transition: all 0.3s ease-out;
          max-width: 90%;
        }
        
        .speech-container.nitesh {
          left: 5%;
          bottom: 45%;
        }
        
        .speech-container.jahanvi {
          right: 5%;
          bottom: 45%;
        }
        
        .speech-bubble-manga {
          background: white;
          border-radius: 15px;
          padding: 15px;
          max-width: 280px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          position: relative;
          border: 2px solid #ddd;
        }
        
        .speaker-name {
          font-size: 1rem;
          font-weight: bold;
          color: #ff3366;
          text-transform: capitalize;
          margin-bottom: 6px;
        }
        
        .dialogue-text {
          font-size: 1.1rem;
          line-height: 1.4;
          color: #333;
        }
        
        /* Tablet and desktop speech bubble sizes */
        @media (min-width: 768px) {
          .speech-container {
            max-width: none;
          }
          
          .speech-container.nitesh {
            left: 25%;
            bottom: 60%;
          }
          
          .speech-container.jahanvi {
            right: 25%;
            bottom: 60%;
          }
          
          .speech-bubble-manga {
            border-radius: 20px;
            padding: 20px;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            border: none;
          }
          
          .speaker-name {
            font-size: 1.2rem;
            margin-bottom: 8px;
          }
          
          .dialogue-text {
            font-size: 1.4rem;
          }
        }
        
        /* Mobile responsive navigation buttons */
        .nav-button {
          background: rgba(255,255,255,0.1);
          border: 2px solid white;
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          transition: all 0.3s ease;
          font-size: 1rem;
          touch-action: manipulation;
        }
        
        .nav-button-primary {
          background: #ff3366;
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(255,51,102,0.4);
          transition: all 0.3s ease;
          touch-action: manipulation;
        }
        
        /* Desktop button sizes */
        @media (min-width: 768px) {
          .nav-button {
            padding: 12px 24px;
            border-radius: 999px;
            font-size: 1rem;
          }
          
          .nav-button-primary {
            padding: 12px 32px;
            border-radius: 999px;
            font-size: 1.2rem;
            box-shadow: 0 4px 20px rgba(255,51,102,0.4);
          }
          
          .nav-button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 24px rgba(255,51,102,0.5);
          }
        }
        
        /* Mobile touch optimization */
        @media (max-width: 767px) {
          .nav-button:active,
          .nav-button-primary:active {
            transform: scale(0.98);
          }
        }
        
        .animate-in {
          animation: slideIn 0.4s ease-out;
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .navigation-container {
          padding: 0 1rem;
        }
        
        @media (min-width: 768px) {
          .navigation-container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default IntroScene;
