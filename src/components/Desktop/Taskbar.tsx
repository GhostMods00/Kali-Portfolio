import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, User, Mail, FileText, Monitor, Shield, ChevronDown, Power, Settings, Coffee, HardDrive } from 'lucide-react';
import { useWindowContext, WindowType } from '../context/WindowContext';

const Taskbar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { openWindow, openWindows, activeWindow, minimizedWindows } = useWindowContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // CPU and RAM usage simulation
  const [cpuUsage, setCpuUsage] = useState('3');
  const [ramUsage, setRamUsage] = useState('1.2');
  
  useEffect(() => {
    // Simulate fluctuating system resources
    const resourceMonitor = setInterval(() => {
      setCpuUsage((Math.random() * 8 + 2).toFixed(1));
      setRamUsage((Math.random() * 1 + 1).toFixed(1));
    }, 5000);
    return () => clearInterval(resourceMonitor);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const getTaskbarIconClass = (windowType: WindowType) => {
    if (activeWindow === windowType) return 'bg-gray-700';
    if (openWindows.includes(windowType as WindowType)) {
      return minimizedWindows.includes(windowType as WindowType)
        ? 'bg-gray-800 opacity-60'
        : 'bg-gray-800';
    }
    return '';
  };
  
  const handleTaskbarIconClick = (windowType: WindowType) => {
    if (openWindows.includes(windowType as WindowType)) {
      if (minimizedWindows.includes(windowType as WindowType) || activeWindow !== windowType) {
        openWindow(windowType);
      }
    } else {
      openWindow(windowType);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bg-gray-900 border-b border-kali-accent h-10 flex justify-between items-center px-4 z-50">
      {/* Kali Logo and dropdown */}
      <div className="relative" ref={menuRef}>
        <button 
          className="flex items-center space-x-1 p-1 rounded hover:bg-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-blue-500">
            <path 
              fill="currentColor" 
              d="M11.6 10.9c-.2-.23-.5-.32-.9-.32H8.5v1.75h2.2c.38 0 .68-.1.86-.34.2-.22.29-.55.29-.86 0-.1-.2-.16-.03-.23h.01zm-3.1-1.64h2.29c.4 0 .71.08.95.25.24.17.36.43.36.77 0 .44-.14.78-.43.97-.28.2-.68.28-1.18.28H8.49v-2.27h.01zm6.3 3.64c.31-.41.47-.98.47-1.7 0-.72-.15-1.29-.46-1.7-.3-.42-.76-.62-1.36-.62h-2.85v2.52H8.13v4.82h2.94c.61 0 1.08-.21 1.39-.62.31-.41.46-.99.46-1.72 0-.8-.15-1.37-.5-1.69l.37.01zM22 13.44c0 1.56-.4 2.76-1.2 3.59-.81.83-1.92 1.24-3.34 1.24-1.36 0-2.43-.41-3.24-1.22-.8-.82-1.2-1.97-1.2-3.44 0-1.56.42-2.77 1.25-3.61.83-.84 2.02-1.26 3.56-1.26 1.38 0 2.47.42 3.27 1.26.8.84 1.2 1.99 1.2 3.44z"
            />
            <path 
              fill="currentColor" 
              d="M18.29 16.89c.55-.54.82-1.31.82-2.32 0-1.08-.28-1.92-.85-2.5-.57-.58-1.37-.87-2.4-.87-1.08 0-1.93.29-2.56.87-.62.59-.93 1.4-.93 2.45 0 1.03.3 1.84.9 2.44.6.59 1.42.89 2.45.89 1.11-.01 2.02-.33 2.57-.96z"
            />
            <ChevronDown size={14} className="ml-1" />
          </svg>
        </button>
        
        {menuOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-gray-900 border border-gray-700 rounded shadow-lg z-50">
            <div className="p-2 border-b border-gray-700 text-white">
              <div className="text-sm font-semibold">Kali Linux Portfolio</div>
              <div className="text-xs text-gray-400">root@kali</div>
            </div>
            <div className="py-1">
              <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left">
                <Terminal size={16} className="mr-2 text-green-400" />
                Terminal
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left">
                <Settings size={16} className="mr-2 text-blue-400" />
                Settings
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left">
                <HardDrive size={16} className="mr-2 text-purple-400" />
                File Manager
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left">
                <Coffee size={16} className="mr-2 text-yellow-400" />
                About
              </button>
            </div>
            <div className="py-1 border-t border-gray-700">
              <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-red-800 w-full text-left">
                <Power size={16} className="mr-2 text-red-400" />
                Power Off
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Application Icons */}
      <div className="flex items-center space-x-4 ml-4">
        <button 
          className={`p-1 rounded hover:bg-gray-700 ${getTaskbarIconClass('terminal')}`}
          onClick={() => handleTaskbarIconClick('terminal')}
        >
          <Terminal size={20} className="text-green-400" />
        </button>
        <button 
          className={`p-1 rounded hover:bg-gray-700 ${getTaskbarIconClass('projects')}`}
          onClick={() => handleTaskbarIconClick('projects')}
        >
          <Code size={20} className="text-yellow-400" />
        </button>
        <button 
          className={`p-1 rounded hover:bg-gray-700 ${getTaskbarIconClass('about')}`}
          onClick={() => handleTaskbarIconClick('about')}
        >
          <User size={20} className="text-blue-400" />
        </button>
        <button 
          className={`p-1 rounded hover:bg-gray-700 ${getTaskbarIconClass('contact')}`}
          onClick={() => handleTaskbarIconClick('contact')}
        >
          <Mail size={20} className="text-red-400" />
        </button>
        <button 
          className={`p-1 rounded hover:bg-gray-700 ${getTaskbarIconClass('skills')}`}
          onClick={() => handleTaskbarIconClick('skills')}
        >
          <FileText size={20} className="text-purple-400" />
        </button>
        <button 
          className={`p-1 rounded hover:bg-gray-700 ${getTaskbarIconClass('network-scanner')}`}
          onClick={() => handleTaskbarIconClick('network-scanner')}
        >
          <Shield size={20} className="text-purple-400" />
        </button>
      </div>
      
      {/* System Info */}
      <div className="text-xs flex items-center space-x-3 text-gray-300">
        <div>{time.toLocaleTimeString()}</div>
        <div>|</div>
        <div>root@kali</div>
        <div>|</div>
        <div className="flex items-center">
          <Monitor size={14} className="mr-1" />
          <span>CPU: {cpuUsage}%</span>
        </div>
        <div>|</div>
        <div>RAM: {ramUsage}GB</div>
      </div>
    </div>
  );
};

export default Taskbar;