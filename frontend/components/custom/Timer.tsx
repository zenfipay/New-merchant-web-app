"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface TimerHandle {
  start: () => void;
  reset: (value?: number) => void;
  restart: () => void;
}

interface TimerProps {
  initialSeconds: number;
  onExpire?: () => void;
}

const Timer = forwardRef<TimerHandle, TimerProps>(function Timer(
  { initialSeconds, onExpire },
  ref
) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = (value: number = initialSeconds) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSeconds(value);
  };

  const restart = () => {
    reset(initialSeconds);
    start();
  };

  // expose to parent
  useImperativeHandle(ref, () => ({
    start,
    reset,
    restart,
  }));

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return <span>{format(seconds)}</span>;
});

export default Timer;
