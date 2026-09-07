import { useEffect, useRef, useState } from 'react';

const DURATION = 5000;

export function useHeroSlideshow(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, DURATION);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSlide, totalSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const togglePlay = () => setIsPlaying((playing) => !playing);

  return { currentSlide, isPlaying, goToSlide, togglePlay };
}
