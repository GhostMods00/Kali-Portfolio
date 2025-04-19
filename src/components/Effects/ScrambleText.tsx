import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  autoRefresh?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  autoRefresh = 0
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    // Start with delay
    const delayTimer = setTimeout(() => {
      setStartTime(Date.now());
      setIsScrambling(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, text]);
  
  // Handle auto refresh if specified
  useEffect(() => {
    if (autoRefresh > 0) {
      const refreshInterval = setInterval(() => {
        setStartTime(Date.now());
        setIsScrambling(true);
      }, autoRefresh);
      
      return () => clearInterval(refreshInterval);
    }
  }, [autoRefresh]);

  useEffect(() => {
    if (!isScrambling) return;

    const animationFrame = requestAnimationFrame(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (speed * text.length), 1);
      
      let result = '';
      for (let i = 0; i < text.length; i++) {
        // If this character should be revealed based on progress
        if (i < progress * text.length) {
          result += text[i];
        } else {
          // Use original character if it's a space
          if (text[i] === ' ') {
            result += ' ';
          } else {
            // Otherwise scramble
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }
      
      setDisplayText(result);
      
      if (progress >= 1) {
        setIsScrambling(false);
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isScrambling, text, speed, startTime]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;