import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
  autoplay?: boolean;
}

const BackgroundMusic = ({ src, volume = 0.3, autoplay = true }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Mobile considerations
    const isMobile = window.innerWidth < 768;
    const adjustedVolume = isMobile ? volume * 0.6 : volume;
    
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = adjustedVolume;
    setCurrentVolume(adjustedVolume);
    
    if (isMobile) {
      audioRef.current.preload = 'none';
      audioRef.current.muted = true;
      setIsMuted(true);
    }
    
    if (autoplay && !isMobile) {
      const playAudio = () => {
        audioRef.current?.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log('Autoplay blocked'));
      };
      
      document.addEventListener('click', playAudio, { once: true });
      document.addEventListener('keydown', playAudio, { once: true });
    }

    const handleVisibilityChange = () => {
      if (document.hidden && isMobile) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [src, volume, autoplay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const isMobile = window.innerWidth < 768;
      if (isMobile && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
      
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.error('Failed to play:', e);
          if (isMobile) {
            alert('Please tap the play button to start music');
          }
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex gap-3 md:gap-2">
      <Button
        onClick={togglePlay}
        className="bg-white/20 hover:bg-white/30 text-white border-white/30 p-4 md:p-3 text-4xl md:text-3xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </Button>
      <Button
        onClick={toggleMute}
        className="bg-white/20 hover:bg-white/30 text-white border-white/30 p-4 md:p-3 text-4xl md:text-3xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {isMuted ? '🔇' : '🔊'}
      </Button>
      
      <div className="absolute -bottom-8 left-0 text-white/70 text-xs md:hidden">
        Vol: {Math.round(currentVolume * 100)}%
      </div>
    </div>
  );
};

export default BackgroundMusic;
