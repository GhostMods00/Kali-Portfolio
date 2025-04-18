import React, { useState } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import Window from '../Windows/Window';
import { useWindowContext } from '../context/WindowContext';
import { executeCommand } from '../Terminal/commands';

const TerminalWindow: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '# Welcome to Kali Portfolio Terminal',
    '# Type "help" for a list of available commands',
    ''
  ]);
  const { openWindow } = useWindowContext();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    const input = terminalInput.trim();
    const newHistory = [...terminalHistory, `root@kali:~$ ${input}`];
    
    if (input) {
      const output = executeCommand(input, { openWindow });
      setTerminalHistory([...newHistory, ...output, '']);
    } else {
      setTerminalHistory([...newHistory, '']);
    }
    
    setTerminalInput('');
  };

  return (
    <Window
      title="Terminal"
      windowType="terminal"
      icon={<TerminalIcon size={16} className="text-green-400" />}
      initialPosition={{ x: 150, y: 150 }}
      width="w-3/5"
      height="h-96"
    >
      <div className="p-2 h-full overflow-y-auto text-sm bg-black text-green-400 font-mono">
        <div>
          {terminalHistory.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
        </div>
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-green-500 mr-1">root@kali:~$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-500"
            autoFocus
          />
        </form>
      </div>
    </Window>
  );
};

export default TerminalWindow;

// Ensure the file is treated as a module
export {};