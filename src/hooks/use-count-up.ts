
"use client";

import { useEffect, useState, useRef } from 'react';

export const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / (1000 / 60));
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * progress);
      setCount(currentCount > end ? end : currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => {
      clearInterval(counter);
    };
  }, [end, duration]);

  return count;
};
