import { useCallback, useRef } from 'react';

type SoundType = 'move' | 'capture' | 'check' | 'castle' | 'promote' | 'gameEnd';

const soundFiles: Record<SoundType, string> = {
  move: '/assets/sounds/move.mp3',
  capture: '/assets/sounds/capture.mp3',
  check: '/assets/sounds/check.mp3',
  castle: '/assets/sounds/castle.mp3',
  promote: '/assets/sounds/promote.mp3',
  gameEnd: '/assets/sounds/game-end.mp3',
};

export function useChessSound() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement>>({} as Record<SoundType, HTMLAudioElement>);

  // Initialize audio elements
  const initializeAudio = useCallback(() => {
    Object.entries(soundFiles).forEach(([type, file]) => {
      if (!audioRefs.current[type as SoundType]) {
        const audio = new Audio(file);
        audio.preload = 'auto';
        audioRefs.current[type as SoundType] = audio;
      }
    });
  }, []);

  // Play a sound
  const playSound = useCallback((type: SoundType) => {
    if (!audioRefs.current[type]) {
      initializeAudio();
    }
    
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
  }, [initializeAudio]);

  return { playSound };
} 