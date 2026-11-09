import { useEffect, useRef } from 'react';

export const useSounds = () => {
  const typingSoundRef = useRef(null);
  const btnClickSoundRef = useRef(null);
  const btnHoverSoundRef = useRef(null);
  const enddaySoundRef = useRef(null);

  useEffect(() => {
    typingSoundRef.current = new Audio('/sounds/intro-keys.mp3');
    typingSoundRef.current.volume = 0.3;
    typingSoundRef.current.loop = true;

    btnClickSoundRef.current = new Audio('/sounds/btnClick.mp3');
    btnClickSoundRef.current.volume = 0.5;

    btnHoverSoundRef.current = new Audio('/sounds/btnHover.mp3');
    btnHoverSoundRef.current.volume = 0.3;

    enddaySoundRef.current = new Audio('/sounds/endday.mp3');
    enddaySoundRef.current.volume = 0.2;
    
    // Cleanup audio on unmount
    return () => {
      if (typingSoundRef.current) {
        typingSoundRef.current.pause();
        typingSoundRef.current = null;
      }
      if (btnClickSoundRef.current) {
        btnClickSoundRef.current.pause();
        btnClickSoundRef.current = null;
      }
      if (btnHoverSoundRef.current) {
        btnHoverSoundRef.current.pause();
        btnHoverSoundRef.current = null;
      }
      if (enddaySoundRef.current) {
        enddaySoundRef.current.pause();
        enddaySoundRef.current = null;
      }
    };
  }, []);

  const playBtnClick = () => {
    if (btnClickSoundRef.current) {
      btnClickSoundRef.current.currentTime = 0;
      btnClickSoundRef.current.play().catch(err => {});
    }
  };

  const playBtnHover = () => {
    if (btnHoverSoundRef.current) {
      btnHoverSoundRef.current.currentTime = 0;
      btnHoverSoundRef.current.play().catch(err => {});
    }
  };

  const playEndday = () => {
    if (enddaySoundRef.current) {
      enddaySoundRef.current.currentTime = 0;
      enddaySoundRef.current.play().catch(err => {});
    }
  };

  const playTypingSound = () => {
    if (typingSoundRef.current) {
      typingSoundRef.current.play().catch(err => {});
    }
  };

  const stopTypingSound = () => {
    if (typingSoundRef.current) {
      typingSoundRef.current.pause();
    }
  };

  return {
    playBtnClick,
    playBtnHover,
    playEndday,
    playTypingSound,
    stopTypingSound
  };
};