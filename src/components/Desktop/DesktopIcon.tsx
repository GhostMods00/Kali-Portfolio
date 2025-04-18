import React, { ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer hover:bg-kali-dark hover:bg-opacity-70 p-2 rounded transition duration-200"
      onClick={onClick}
      onDoubleClick={onClick} // Double-click also triggers the action
    >
      {icon}
      <span className="text-xs mt-1 text-white">{label}</span>
    </div>
  );
};

export default DesktopIcon;