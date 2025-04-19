import React from 'react';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
// Update path to match your file structure
import AboutWindow from '../Windows/AboutWindow';
import ProjectsWindow from '../Windows/ProjectsWindow';
import ContactWindow from '../Windows/ContactWindow';
import TerminalWindow from '../Windows/TerminalWindow';
import HackingToolWindow from '../Windows/HackingToolWindow';
import { Terminal, User, Code, Mail, FileText, Shield } from 'lucide-react';
import { useWindowContext } from '../context/WindowContext';

const Desktop: React.FC = () => {
  const { openWindows, minimizedWindows, openWindow } = useWindowContext();

  return (
    <div className="h-screen bg-kali-dark text-kali-accent font-mono overflow-hidden relative">
      {/* Desktop Background with Grid Pattern */}
      <div className="absolute inset-0 bg-kali-dark z-0">
        <div className="grid grid-cols-12 grid-rows-6 h-full w-full opacity-5">
          {Array(72).fill(0).map((_, i) => (
            <div key={i} className="border border-kali-accent"></div>
          ))}
        </div>
      </div>
      
      {/* Taskbar at the top */}
      <Taskbar />
      
      {/* Desktop Icons - Adjusted top position to account for taskbar */}
      <div className="absolute top-14 left-4 flex flex-col space-y-6 z-10">
        <DesktopIcon 
          label="About.sh" 
          icon={<User size={32} className="text-blue-400" />} 
          onClick={() => openWindow('about')} 
        />
        <DesktopIcon 
          label="Projects.sh" 
          icon={<Code size={32} className="text-yellow-400" />} 
          onClick={() => openWindow('projects')} 
        />
        <DesktopIcon 
          label="Terminal.sh" 
          icon={<Terminal size={32} className="text-green-400" />} 
          onClick={() => openWindow('terminal')} 
        />
        <DesktopIcon 
          label="Contact.sh" 
          icon={<Mail size={32} className="text-red-400" />} 
          onClick={() => openWindow('contact')} 
        />
        <DesktopIcon 
          label="Skills.sh" 
          icon={<FileText size={32} className="text-purple-400" />} 
          onClick={() => openWindow('skills')} 
        />
        <DesktopIcon 
          label="NetScan.sh" 
          icon={<Shield size={32} className="text-purple-400" />} 
          onClick={() => openWindow('network-scanner')} 
        />
      </div>
      
      {/* Windows */}
      {openWindows.includes('about') && !minimizedWindows.includes('about') && <AboutWindow />}
      {openWindows.includes('projects') && !minimizedWindows.includes('projects') && <ProjectsWindow />}
      {openWindows.includes('terminal') && !minimizedWindows.includes('terminal') && <TerminalWindow />}
      {openWindows.includes('contact') && !minimizedWindows.includes('contact') && <ContactWindow />}
      {openWindows.includes('network-scanner') && !minimizedWindows.includes('network-scanner') && <HackingToolWindow />}
    </div>
  );
};

export default Desktop;