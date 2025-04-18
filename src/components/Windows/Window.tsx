import React, { ReactNode, useState, useEffect, useRef, RefObject } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindowContext, WindowType } from '../context/WindowContext';

interface WindowProps {
  title: string;
  windowType: WindowType;
  icon: ReactNode;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  width?: string;
  height?: string;
}

const Window: React.FC<WindowProps> = ({
  title,
  windowType,
  icon,
  children,
  initialPosition = { x: 100, y: 100 },
  width = 'w-2/5',
  height = 'h-96',
}) => {
  const { 
    activeWindow, 
    windowZIndices, 
    bringToFront, 
    closeWindow,
    minimizeWindow 
  } = useWindowContext();
  
  // Use a more explicit type definition that matches what react-draggable expects
  const nodeRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const [maximized, setMaximized] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [dragEnabled, setDragEnabled] = useState(true);

  const isActive = activeWindow === windowType;
  const zIndex = windowZIndices[windowType as string] || 1;

  const handleMaximize = () => {
    setMaximized(!maximized);
    setDragEnabled(!maximized);
    if (maximized) {
      setPosition(initialPosition);
    }
  };

  useEffect(() => {
    if (isActive) {
      bringToFront(windowType);
    }
  }, [isActive, bringToFront, windowType]);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      position={maximized ? { x: 0, y: 0 } : position}
      onStop={(_, data) => !maximized && setPosition({ x: data.x, y: data.y })}
      disabled={!dragEnabled || maximized}
    >
      <div
        ref={nodeRef}
        className={`absolute bg-kali-terminal rounded border border-kali-accent shadow-lg ${
          maximized ? 'inset-0' : width + ' ' + height
        }`}
        style={{ zIndex }}
        onClick={() => bringToFront(windowType)}
      >
        <div className="window-titlebar bg-gray-800 p-2 flex justify-between items-center border-b border-kali-accent cursor-move">
          <div className="flex items-center">
            <span className="mr-2">{icon}</span>
            <span>{title}</span>
          </div>
          <div className="flex space-x-2">
            <button 
              className="hover:bg-gray-700 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(windowType);
              }}
            >
              <Minus size={14} />
            </button>
            <button 
              className="hover:bg-gray-700 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
            >
              <Maximize2 size={14} />
            </button>
            <button 
              className="hover:bg-red-500 hover:text-white p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowType);
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className={`overflow-auto ${maximized ? 'h-[calc(100%-2.5rem)]' : 'h-[calc(100%-2.5rem)]'}`}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;