import React, { createContext, useState, useContext, ReactNode } from 'react';

export type WindowType = 'about' | 'projects' | 'contact' | 'terminal' | 'skills' | 'network-scanner' | null;

interface WindowContextType {
  activeWindow: WindowType;
  openWindows: WindowType[];
  windowZIndices: Record<string, number>;
  zIndexCounter: number;
  openWindow: (window: WindowType) => void;
  closeWindow: (window: WindowType) => void;
  bringToFront: (window: WindowType) => void;
  minimizeWindow: (window: WindowType) => void;
  minimizedWindows: WindowType[];
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWindow, setActiveWindow] = useState<WindowType>(null);
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowType[]>([]);
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});
  const [zIndexCounter, setZIndexCounter] = useState(1);

  const openWindow = (window: WindowType) => {
    if (!window) return;
    
    if (!openWindows.includes(window)) {
      setOpenWindows([...openWindows, window]);
    }
    
    if (minimizedWindows.includes(window)) {
      setMinimizedWindows(minimizedWindows.filter(w => w !== window));
    }
    
    bringToFront(window);
  };

  const closeWindow = (window: WindowType) => {
    if (!window) return;
    setOpenWindows(openWindows.filter(w => w !== window));
    setMinimizedWindows(minimizedWindows.filter(w => w !== window));
    
    // Set next active window
    if (activeWindow === window) {
      const remainingWindows = openWindows.filter(w => w !== window && !minimizedWindows.includes(w));
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1] : null);
    }
  };

  const bringToFront = (window: WindowType) => {
    if (!window) return;
    setActiveWindow(window);
    
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    
    setWindowZIndices({
      ...windowZIndices,
      [window]: newZIndex,
    });
  };

  const minimizeWindow = (window: WindowType) => {
    if (!window) return;
    
    if (!minimizedWindows.includes(window)) {
      setMinimizedWindows([...minimizedWindows, window]);
    }
    
    // Set next active window
    if (activeWindow === window) {
      const remainingWindows = openWindows.filter(w => w !== window && !minimizedWindows.includes(w));
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1] : null);
    }
  };

  return (
    <WindowContext.Provider
      value={{
        activeWindow,
        openWindows,
        windowZIndices,
        zIndexCounter,
        openWindow,
        closeWindow,
        bringToFront,
        minimizeWindow,
        minimizedWindows,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};