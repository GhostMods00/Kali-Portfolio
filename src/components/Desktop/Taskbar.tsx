import React, { useState, useEffect } from 'react';
import { Terminal, Code, User, Mail, FileText, Monitor, Shield } from 'lucide-react';
import { useWindowContext, WindowType } from '../context/WindowContext';

const Taskbar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { openWindow, openWindows, activeWindow, minimizedWindows } = useWindowContext();
  
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
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-kali-accent h-10 flex justify-between items-center px-4 z-50">
      <div className="flex items-center space-x-4">
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

// Make sure to export the component as default
export default Taskbar;