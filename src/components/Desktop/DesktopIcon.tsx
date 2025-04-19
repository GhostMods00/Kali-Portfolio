import React, { ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

// SVG components for Kali Linux icons
export const KaliFolder = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="folder-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2b73d2" />
        <stop offset="100%" stopColor="#2759b3" />
      </linearGradient>
    </defs>
    <path 
      d="M5 8C3.9 8 3 8.9 3 10v28c0 1.1 0.9 2 2 2h38c1.1 0 2-0.9 2-2V16c0-1.1-0.9-2-2-2H24l-4-6H5z"
      fill="url(#folder-gradient)"
    />
  </svg>
);

export const KaliTerminal = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="terminal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#31c6b7" />
        <stop offset="100%" stopColor="#19a895" />
      </linearGradient>
    </defs>
    <path 
      d="M44.9 39c0 2.2-1.8 4-4 4H7.1c-2.2 0-4-1.8-4-4V9c0-2.2 1.8-4 4-4h33.8c2.2 0 4 1.8 4 4v30z"
      fill="url(#terminal-gradient)"
    />
    <path 
      d="M10.6 15.7l4.1 4.1-4.1 4.1 2.3 2.3 6.4-6.4-6.4-6.4-2.3 2.3zm10.6 12.1h10.8v3H21.2v-3z" 
      fill="white"
    />
  </svg>
);

export const KaliCode = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="code-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e9472a" />
        <stop offset="100%" stopColor="#d1351a" />
      </linearGradient>
    </defs>
    <path 
      d="M7 4C5.35 4 4 5.35 4 7v34c0 1.65 1.35 3 3 3h34c1.65 0 3-1.35 3-3V7c0-1.65-1.35-3-3-3H7z"
      fill="url(#code-gradient)"
    />
    <path 
      d="M17.7 29.4l-4.5-4.5 4.5-4.5-2.1-2.1-6.6 6.6 6.6 6.6 2.1-2.1zm12.6 0l4.5-4.5-4.5-4.5 2.1-2.1 6.6 6.6-6.6 6.6-2.1-2.1z" 
      fill="white"
    />
  </svg>
);

export const KaliUser = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="user-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3387e1" />
        <stop offset="100%" stopColor="#2b73d2" />
      </linearGradient>
    </defs>
    <path 
      d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z"
      fill="url(#user-gradient)"
    />
    <path 
      d="M24 20c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c2.67 0 8 1.33 8 4v2H16v-2c0-2.67 5.33-4 8-4z" 
      fill="white"
    />
  </svg>
);

export const KaliMail = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d85121" />
        <stop offset="100%" stopColor="#c7471e" />
      </linearGradient>
    </defs>
    <path 
      d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4z"
      fill="url(#mail-gradient)"
    />
    <path 
      d="M40 16L24 26 8 16v-4l16 10L40 12v4z" 
      fill="white"
    />
  </svg>
);

export const KaliShield = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8c56cc" />
        <stop offset="100%" stopColor="#7341b6" />
      </linearGradient>
    </defs>
    <path 
      d="M24 4L6 12v12c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24V12L24 4z"
      fill="url(#shield-gradient)"
    />
    <path 
      d="M21 29h6v-6h-6v6zm0-8h6v-2h-6v2zm0-8v4h6v-4h-6z" 
      fill="white"
    />
  </svg>
);

export const KaliFileText = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="file-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5cc6a7" />
        <stop offset="100%" stopColor="#47b090" />
      </linearGradient>
    </defs>
    <path 
      d="M10 4H30l12 12v24c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4z"
      fill="url(#file-gradient)"
    />
    <path 
      d="M16 20h16v2H16v-2zm0 4h16v2H16v-2zm0 4h16v2H16v-2zm0 4h10v2H16v-2z" 
      fill="white"
    />
    <path 
      d="M30 4l12 12h-8c-2.2 0-4-1.8-4-4V4z"
      fillOpacity="0.2"
      fill="white"
    />
  </svg>
);

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div 
      className="desktop-icon flex flex-col items-center cursor-pointer hover:bg-kali-dark hover:bg-opacity-70 p-2 rounded transition duration-200"
      onClick={onClick}
      onDoubleClick={onClick} // Double-click also triggers the action
    >
      {icon}
      <span className="text-xs mt-1 text-white">{label}</span>
    </div>
  );
};

export default DesktopIcon;