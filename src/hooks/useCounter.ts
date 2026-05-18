"use client";
import { useEffect, useState } from "react";

export function useCounter(target: number, duration = 1800, active = false) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;
    let current = Math.floor(target * 0.8);
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return value;
}
