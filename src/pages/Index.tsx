import { useState } from 'react';
import IntroScene from '@/components/IntroScene';
import StoryScene from '@/components/StoryScene';

const Index = () => {
  const [currentScene, setCurrentScene] = useState(-1); // -1 for intro, 0-4 for story scenes
  const totalScenes = 5;

  const handleStartStory = () => {
    setCurrentScene(0);
  };

  const handleNextScene = () => {
    if (currentScene < totalScenes - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      // Loop back to intro for replay
      setCurrentScene(-1);
    }
  };

  return (
    <div className="min-h-screen">
      {currentScene === -1 && (
        <IntroScene onStart={handleStartStory} />
      )}
      
      {currentScene >= 0 && currentScene < totalScenes && (
        <StoryScene 
          sceneNumber={currentScene}
          onNext={handleNextScene}
          isActive={true}
        />
      )}
    </div>
  );
};

export default Index;
