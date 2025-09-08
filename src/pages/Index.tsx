import { useState, useEffect } from "react";
import MangaLayout from "@/components/MangaLayout";
import IntroScene from "@/components/IntroScene";
import MangaStoryScene from "@/components/MangaStoryScene";
import { Button } from "@/components/ui/button";
import { celebrationScenes } from "@/components/Celebration";
import BackgroundMusic from "@/components/BackgroundMusic"; 

const Index = () => {
  const [currentScene, setCurrentScene] = useState(-2);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scenePhase, setScenePhase] = useState<'main' | 'celebration'>('main');
  
  // Updated total scenes: 6 original + 5 celebration = 11 total
  const totalMainScenes = 6;
  const totalCelebrationScenes = celebrationScenes.length; // 5 scenes
  const totalScenes = totalMainScenes + totalCelebrationScenes;

  const handleSceneChange = (newScene: number) => {
    setIsTransitioning(true);
    playPageTurnSound();

    setTimeout(() => {
      // Check if we're transitioning from main story to celebration
      if (newScene === totalMainScenes && scenePhase === 'main') {
        setScenePhase('celebration');
        setCurrentScene(0); // Start celebration at scene 0
      } else {
        setCurrentScene(newScene);
      }
      setIsTransitioning(false);
    }, 1000);
  };

  const playPageTurnSound = () => {
    const audio = new Audio("./page-turn.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const getCurrentSceneLimit = () => {
    return scenePhase === 'main' ? totalMainScenes : totalCelebrationScenes;
  };

  return (
    <MangaLayout isTransitioning={isTransitioning}>

      <BackgroundMusic 
        src="./assets/amazing-plan.mp3" 
        volume={0.2} 
        autoplay={true} 
      />
      {/* Welcome screen with mobile responsiveness */}
      {currentScene === -2 && (
        <div className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-800">
            {/* Balloons - reduced count on mobile */}
            <div className="absolute inset-0 balloon-animation">
              {[...Array(window.innerWidth > 768 ? 20 : 10)].map((_, i) => (
                <div
                  key={i}
                  className="balloon"
                  style={{
                    left: `${10 + i * (window.innerWidth > 768 ? 4.5 : 9)}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${8 + (i % 3)}s`,
                  }}
                >
                  🎈
                </div>
              ))}
            </div>

            {/* Cake emoji - responsive size */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 md:mb-4 text-4xl md:text-8xl animate-bounce">
              🎂
            </div>

            {/* Nitesh image - mobile responsive */}
            <div className="absolute bottom-0 left-0 h-[40vh] md:h-[80vh] transform-gpu transition-all duration-500 hover:scale-105">
              <img
                src="./assets/nitesh.jpeg"
                alt="Nitesh"
                className="h-32 md:h-80 object-contain"
              />
              <div className="absolute top-0 right-0 text-2xl md:text-4xl animate-spin">🎉</div>
            </div>

            {/* Jahanvi image - mobile responsive */}
            <div className="absolute bottom-0 right-0 h-[40vh] md:h-[80vh] transform-gpu transition-all duration-500 hover:scale-105">
              <img
                src="./assets/jhanvi.jpg"
                alt="Jahanvi"
                className="h-32 md:h-80 object-contain mr-2 md:mr-10"
              />
              <div className="absolute top-0 left-0 text-2xl md:text-4xl animate-spin">🎊</div>
            </div>

            {/* Sassy center image - mobile responsive */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
              <div className="relative">
                <img
                  src="./assets/sassy-character.jpg"
                  alt="Sassy"
                  className="h-[20vh] md:h-[40vh] object-contain"
                  style={{ animation: "float 3s ease-in-out infinite" }}
                />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="text-3xl md:text-6xl animate-bounce">👑</div>
                </div>
              </div>
            </div>

            {/* Title - mobile responsive */}
            <div className="absolute top-4 md:top-10 left-1/2 transform -translate-x-1/2 text-center z-20 px-4">
              <h1 className="manga-title text-4xl md:text-8xl mb-2 md:mb-4 text-yellow-300 birthday-text-glow">
                Sassy's Birthday
              </h1>
              <h2 className="manga-title text-2xl md:text-6xl text-white birthday-text-glow">
                Adventure!
              </h2>
            </div>

            {/* Button - mobile responsive */}
            <div className="absolute bottom-16 md:bottom-32 left-1/2 transform -translate-x-1/2 z-20 px-4">
              <Button
                onClick={() => handleSceneChange(-1)}
                className="birthday-button w-full md:w-auto"
              >
                <span className="relative z-10 text-xl md:text-4xl px-8 md:px-16 py-4 md:py-8 inline-block font-bold text-white">
                  Let's Celebrate! 🎉
                </span>
              </Button>
            </div>
          </div>

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }

            .balloon {
              position: absolute;
              font-size: 1.5rem;
              animation: float-up linear infinite;
            }

            @media (min-width: 768px) {
              .balloon {
                font-size: 2rem;
              }
            }

            @keyframes float-up {
              0% { transform: translateY(100vh) rotate(0deg); }
              100% { transform: translateY(-100px) rotate(360deg); }
            }

            .birthday-text-glow {
              text-shadow: 
                0 0 10px rgba(255,255,255,0.8),
                0 0 20px rgba(255,223,0,0.8),
                0 0 30px rgba(255,182,193,0.8);
              animation: pulse 2s infinite;
            }

            .birthday-button {
              background: linear-gradient(45deg, #FF1493, #FF69B4);
              border: 4px solid white;
              border-radius: 999px;
              transform-style: preserve-3d;
              transition: all 0.3s ease;
              animation: pulse 2s infinite;
              box-shadow: 
                0 0 20px rgba(255,20,147,0.5),
                0 0 40px rgba(255,20,147,0.3),
                0 0 60px rgba(255,20,147,0.1);
              min-width: 280px;
            }

            @media (max-width: 767px) {
              .birthday-button {
                min-width: 250px;
                border-radius: 25px;
              }
            }

            .birthday-button:hover {
              transform: translateY(-5px) scale(1.05);
            }

            @media (max-width: 767px) {
              .birthday-button:hover {
                transform: translateY(-2px) scale(1.02);
              }
            }

            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }

            @media (max-width: 767px) {
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
              }
            }
          `}</style>
        </div>
      )}

      {/* Intro scene */}
      {currentScene === -1 && (
        <IntroScene onStart={() => handleSceneChange(0)} />
      )}

      {/* Main story scenes (0-5) */}
      {scenePhase === 'main' && currentScene >= 0 && currentScene < totalMainScenes && (
        <MangaStoryScene
          sceneNumber={currentScene}
          onNext={() => handleSceneChange(currentScene + 1)}
          isActive={true}
        />
      )}

      {/* Celebration scenes (0-4 in celebration phase) */}
      {scenePhase === 'celebration' && currentScene >= 0 && currentScene < totalCelebrationScenes && (
        <MangaStoryScene
          sceneNumber={currentScene}
          sceneData={celebrationScenes[currentScene]}
          onNext={() => {
            if (currentScene < totalCelebrationScenes - 1) {
              handleSceneChange(currentScene + 1);
            } else {
              handleSceneChange(totalScenes);
            }
          }}
          isActive={true}
          isCelebration={true}
        />
      )}

      {/* End scene - mobile responsive */}
      {currentScene >= totalScenes && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-orange-400 px-4">
          <div className="text-center max-w-md md:max-w-2xl">
            <div className="text-6xl md:text-9xl mb-4 md:mb-8 animate-bounce">🎉</div>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4 birthday-text-glow">
              Happy Birthday Sassy!
            </h1>
            <div className="text-2xl md:text-4xl mb-4 md:mb-8">
              🎊 Thanks for the incredible journey! 🎊
            </div>
            <Button
              onClick={() => {
                setCurrentScene(-2);
                setScenePhase('main');
              }}
              className="birthday-button w-full md:w-auto"
            >
              <span className="text-xl md:text-2xl px-6 md:px-8 py-3 md:py-4 font-bold text-white">
                Start Over 🔄
              </span>
            </Button>
          </div>

          <style>{`
            .birthday-text-glow {
              text-shadow: 
                0 0 10px rgba(255,255,255,0.8),
                0 0 20px rgba(255,223,0,0.8),
                0 0 30px rgba(255,182,193,0.8);
              animation: pulse 2s infinite;
            }

            .birthday-button {
              background: linear-gradient(45deg, #FF1493, #FF69B4);
              border: 4px solid white;
              border-radius: 999px;
              transform-style: preserve-3d;
              transition: all 0.3s ease;
              animation: pulse 2s infinite;
              box-shadow: 
                0 0 20px rgba(255,20,147,0.5),
                0 0 40px rgba(255,20,147,0.3),
                0 0 60px rgba(255,20,147,0.1);
              min-width: 200px;
            }

            @media (max-width: 767px) {
              .birthday-button {
                border-radius: 25px;
                min-width: 180px;
              }
            }

            .birthday-button:hover {
              transform: translateY(-5px) scale(1.05);
            }

            @media (max-width: 767px) {
              .birthday-button:hover {
                transform: translateY(-2px) scale(1.02);
              }
            }

            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }

            @media (max-width: 767px) {
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
              }
            }
          `}</style>
        </div>
      )}
    </MangaLayout>
  );
};

export default Index;
