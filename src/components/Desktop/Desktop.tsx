import React, { useEffect, useState } from 'react';
import DesktopIcon, { 
  KaliFolder, KaliTerminal, KaliCode, KaliUser, KaliMail, 
  KaliShield, KaliFileText 
} from './DesktopIcon';
import Taskbar from './Taskbar';
import AboutWindow from '../Windows/AboutWindow';
import ProjectsWindow from '../Windows/ProjectsWindow';
import ContactWindow from '../Windows/ContactWindow';
import TerminalWindow from '../Windows/TerminalWindow';
import HackingToolWindow from '../Windows/HackingToolWindow';
import SkillsWindow from '../Windows/SkillsWindow';
import { useWindowContext } from '../context/WindowContext';
import MatrixRain from '../Effects/MatrixRain';
import ScrambleText from '../Effects/ScrambleText';

// Kali wallpapers with both local and external options
export const WALLPAPERS = [
  // Include an external fallback wallpaper first
  'https://www.kali.org/images/wallpapers-2019/kali-geometric-4x3.png',
  // Then try local wallpapers
  `${process.env.PUBLIC_URL}/wallpapers/kali-fractal-blue.png`,
  `${process.env.PUBLIC_URL}/wallpapers/kali-dark-grid.jpg`,
  `${process.env.PUBLIC_URL}/wallpapers/kali-linux-4kwaves.pngg`
];

// Default fallback background
const DEFAULT_BG = 'linear-gradient(to bottom, #1a2980, #26d0ce)';

const Desktop: React.FC = () => {
  const { openWindows, minimizedWindows, openWindow } = useWindowContext();
  const [wallpaper, setWallpaper] = useState<string | null>(null);
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  // Load and check wallpapers
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('kali-portfolio-wallpaper');
    console.log('Saved wallpaper from localStorage:', savedWallpaper);
    
    // Function to check if a wallpaper can be loaded
    const checkWallpaper = async (wallpaperUrl: string): Promise<boolean> => {
      if (!wallpaperUrl) return false;
      
      try {
        const response = await fetch(wallpaperUrl, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        console.warn(`Error checking wallpaper ${wallpaperUrl}:`, error);
        return false;
      }
    };

    const loadFirstAvailableWallpaper = async () => {
      // First try the saved wallpaper if it exists
      if (savedWallpaper) {
        const savedWallpaperWorks = await checkWallpaper(savedWallpaper);
        if (savedWallpaperWorks) {
          console.log('Using saved wallpaper:', savedWallpaper);
          setWallpaper(savedWallpaper);
          setWallpaperLoaded(true);
          return;
        }
      }
      
      // Otherwise, try each wallpaper in order until one works
      for (const wp of WALLPAPERS) {
        const wallpaperWorks = await checkWallpaper(wp);
        if (wallpaperWorks) {
          console.log('Found working wallpaper:', wp);
          setWallpaper(wp);
          setWallpaperLoaded(true);
          return;
        }
      }
      
      // If none work, set to null to use default background
      console.log('No wallpapers could be loaded, using default background');
      setWallpaper(null);
      setWallpaperLoaded(true);
    };

    loadFirstAvailableWallpaper();
  }, []);

  // Handle wallpaper change from Taskbar
  const handleWallpaperChange = (newWallpaper: string) => {
    console.log('Changing wallpaper to:', newWallpaper);
    setWallpaper(newWallpaper);
    // Save preference to localStorage
    localStorage.setItem('kali-portfolio-wallpaper', newWallpaper);
  };

  // Simulate boot sequence
  useEffect(() => {
    if (showBootSequence) {
      const bootTimer = setTimeout(() => {
        if (bootStep < 3) {
          setBootStep(bootStep + 1);
        } else {
          setShowBootSequence(false);
        }
      }, 1000);
      return () => clearTimeout(bootTimer);
    }
  }, [bootStep, showBootSequence]);

  // Check localStorage to see if we should skip boot sequence
  useEffect(() => {
    // Check if user has seen the boot sequence before
    const hasSeenBoot = localStorage.getItem('kali-boot-seen') === 'true';
    if (hasSeenBoot) {
      setShowBootSequence(false);
    } else {
      // Mark that the user has seen the boot sequence
      localStorage.setItem('kali-boot-seen', 'true');
    }
  }, []);

  // Boot sequence screen
  if (showBootSequence) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-green-500 font-mono">
        <div className="mb-8">
          <ScrambleText 
            text="KALI LINUX PORTFOLIO OS" 
            speed={100} 
            className="text-3xl mb-2"
          />
          <div className="flex space-x-2 justify-center">
            <div className={`h-2 w-2 rounded-full ${bootStep >= 0 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
            <div className={`h-2 w-2 rounded-full ${bootStep >= 1 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
            <div className={`h-2 w-2 rounded-full ${bootStep >= 2 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
            <div className={`h-2 w-2 rounded-full ${bootStep >= 3 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
          </div>
        </div>
        
        <div className="w-96 text-sm text-left">
          <ScrambleText text="[OK] Loading kernel modules..." speed={10} delay={200} />
          <ScrambleText text="[OK] Initializing network interfaces..." speed={10} delay={600} />
          <ScrambleText text="[OK] Starting system services..." speed={10} delay={1200} />
          <ScrambleText text="[OK] Loading desktop environment..." speed={10} delay={1800} />
          <div className={`mt-4 ${bootStep >= 2 ? 'visible' : 'invisible'}`}>
            <span className="text-blue-400">kali@portfolio</span>:
            <span className="text-purple-400">~</span>$ <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking wallpapers
  if (!wallpaperLoaded) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl font-mono">Loading environment...</div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Wallpaper or default background */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-cover bg-center z-0 transition-all duration-700"
        style={wallpaper 
          ? { backgroundImage: `url(${wallpaper})` }
          : { background: DEFAULT_BG }
        }
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Matrix Rain Effect in background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <MatrixRain />
      </div>
      
      {/* Taskbar at the top */}
      <Taskbar 
        onChangeWallpaper={handleWallpaperChange} 
        currentWallpaper={wallpaper || ''} 
      />
      
      {/* Desktop Icons - Using Kali Linux style icons */}
      <div className="absolute top-14 left-4 flex flex-col space-y-6 z-10">
        <DesktopIcon 
          label="About.sh" 
          icon={<KaliUser />} 
          onClick={() => openWindow('about')} 
        />
        <DesktopIcon 
          label="Projects.sh" 
          icon={<KaliFolder />} 
          onClick={() => openWindow('projects')} 
        />
        <DesktopIcon 
          label="Terminal.sh" 
          icon={<KaliTerminal />} 
          onClick={() => openWindow('terminal')} 
        />
        <DesktopIcon 
          label="Contact.sh" 
          icon={<KaliMail />} 
          onClick={() => openWindow('contact')} 
        />
        <DesktopIcon 
          label="Skills.sh" 
          icon={<KaliFileText />} 
          onClick={() => openWindow('skills')} 
        />
        <DesktopIcon 
          label="NetScan.sh" 
          icon={<KaliShield />} 
          onClick={() => openWindow('network-scanner')} 
        />
      </div>
      
      {/* Desktop Clock with Date */}
      <div className="absolute bottom-6 right-6 text-white text-right opacity-80 font-mono">
        <ScrambleText
          text={new Date().toLocaleTimeString()}
          speed={100}
          delay={0}
          className="text-3xl"
          autoRefresh={1000}
        />
        <div className="text-sm">
          {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* Windows */}
      {openWindows.includes('about') && !minimizedWindows.includes('about') && <AboutWindow />}
      {openWindows.includes('projects') && !minimizedWindows.includes('projects') && <ProjectsWindow />}
      {openWindows.includes('terminal') && !minimizedWindows.includes('terminal') && <TerminalWindow />}
      {openWindows.includes('contact') && !minimizedWindows.includes('contact') && <ContactWindow />}
      {openWindows.includes('skills') && !minimizedWindows.includes('skills') && <SkillsWindow />}
      {openWindows.includes('network-scanner') && !minimizedWindows.includes('network-scanner') && <HackingToolWindow />}
    </div>
  );
};

export default Desktop;