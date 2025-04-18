import { WindowType } from '../context/WindowContext';

interface CommandContext {
  openWindow: (window: WindowType) => void;
}

// File system structure simulation
const fileSystem = {
  root: {
    about: { type: 'directory', content: {} },
    projects: { type: 'directory', content: {} },
    contact: { type: 'directory', content: {} },
    skills: { type: 'directory', content: {} },
    'resume.pdf': { type: 'file', content: 'Resume content would be here' },
    '.hidden': { type: 'directory', content: {
      'secret.txt': { type: 'file', content: 'You found a secret easter egg!' }
    }}
  }
};

// Current directory path simulation
let currentPath = '/root';

// Helper function to get current directory
const getCurrentDirectory = () => {
  return currentPath.split('/').filter(Boolean).reduce((acc: any, curr) => {
    return acc[curr]?.content || acc;
  }, fileSystem);
};

// Command implementations
const commands: Record<string, (args: string[], context: CommandContext) => string[]> = {
  help: () => [
    '',
    'Available commands:',
    '',
    'ls             - List files and directories',
    'cd [dir]       - Change directory',
    'cat [file]     - Display file content',
    'clear          - Clear terminal screen',
    'whoami         - Display user information',
    'open [section] - Open a window section',
    'pwd            - Print working directory',
    'echo [text]    - Display text',
    'date           - Display current date and time',
    'skills         - List technical skills',
    'projects       - List projects information',
    'contact        - Show contact information',
    'uname -a       - System information',
    'hack           - Run a mock hacking sequence',
    'scan           - Open network scanner',
    'exit           - Close terminal window',
    'find           - Search for files',
    '',
    'Try to discover hidden easter eggs!',
    ''
  ],
  
  ls: (args) => {
    const showHidden = args.includes('-a');
    const currentDir = getCurrentDirectory();
    
    const items = Object.keys(currentDir)
      .filter(item => showHidden || !item.startsWith('.'))
      .map(item => {
        const isDir = currentDir[item].type === 'directory';
        return isDir ? item + '/' : item;
      });
    
    return ['', ...items, ''];
  },
  
  cd: (args) => {
    if (!args.length || args[0] === '~') {
      currentPath = '/root';
      return ['', 'Changed to /root', ''];
    }
    
    const target = args[0];
    const currentDir = getCurrentDirectory();
    
    if (target === '..') {
      const pathParts = currentPath.split('/').filter(Boolean);
      if (pathParts.length > 1) {
        pathParts.pop();
        currentPath = '/' + pathParts.join('/');
      } else {
        currentPath = '/';
      }
      return ['', `Changed to ${currentPath}`, ''];
    }
    
    if (currentDir[target] && currentDir[target].type === 'directory') {
      currentPath = currentPath === '/' ? `/${target}` : `${currentPath}/${target}`;
      return ['', `Changed to ${currentPath}`, ''];
    }
    
    return ['', `cd: ${target}: No such directory`, ''];
  },
  
  cat: (args) => {
    if (!args.length) {
      return ['', 'Usage: cat [file]', ''];
    }
    
    const target = args[0];
    const currentDir = getCurrentDirectory();
    
    if (currentDir[target] && currentDir[target].type === 'file') {
      return ['', currentDir[target].content, ''];
    }
    
    return ['', `cat: ${target}: No such file`, ''];
  },
  
  clear: () => {
    return ['CLEAR_TERMINAL'];
  },
  
  whoami: () => [
    '',
    'Developer & Security Enthusiast',
    'Full Stack Developer specializing in web applications and cybersecurity',
    'Passionate about creating secure, efficient, and user-friendly applications',
    ''
  ],
  
  open: (args, context) => {
    if (!args.length) {
      return ['', 'Usage: open [about|projects|skills|contact|terminal]', ''];
    }
    
    const section = args[0].toLowerCase();
    const validSections = ['about', 'projects', 'skills', 'contact', 'terminal', 'network-scanner'];
    
    if (validSections.includes(section)) {
      context.openWindow(section as WindowType);
      return ['', `Opening ${section} window...`, ''];
    }
    
    return ['', `Cannot open ${section}: Invalid section`, ''];
  },
  
  pwd: () => ['', currentPath, ''],
  
  echo: (args) => ['', args.join(' '), ''],
  
  date: () => ['', new Date().toString(), ''],
  
  skills: () => [
    '',
    '═══ Technical Skills ═══',
    '',
    '█████████████████████ Frontend Development',
    '- React.js, Vue.js, Angular',
    '- JavaScript/TypeScript',
    '- HTML5, CSS3, SASS/LESS',
    '- Responsive Design',
    '',
    '█████████████████████ Backend Development',
    '- Node.js, Express',
    '- Python, Django, Flask',
    '- PHP, Laravel',
    '- RESTful APIs, GraphQL',
    '',
    '█████████████████████ Security & DevOps',
    '- Penetration Testing',
    '- Network Security',
    '- Docker, Kubernetes',
    '- CI/CD Pipelines',
    '- Linux Administration',
    ''
  ],
  
  projects: (_, context) => {
    context.openWindow('projects');
    return ['', 'Loading projects...', ''];
  },
  
  contact: (_, context) => {
    context.openWindow('contact');
    return ['', 'Opening contact information...', ''];
  },
  
  uname: (args) => {
    if (args.includes('-a')) {
      return ['', 'Kali Portfolio OS 1.0 #1 SMP PREEMPT x86_64 GNU/Linux', ''];
    }
    return ['', 'Kali Portfolio OS', ''];
  },
  
  hack: () => {
    const hackingSequence = [
      '',
      '┌──────────────────────────────────────┐',
      '│         INITIATING HACK SEQUENCE     │',
      '└──────────────────────────────────────┘',
      '',
      '[+] Scanning target system...',
      '[+] Identifying open ports...',
      '[!] Found open ports: 22, 80, 443',
      '[+] Analyzing vulnerabilities...',
      '[!] Discovered multiple entry points',
      '[+] Deploying exploit payload...',
      '[+] Bypassing firewall...',
      '[+] Establishing secure connection...',
      '[!] Access granted!',
      '',
      '┌──────────────────────────────────────┐',
      '│         ACCESS GRANTED!              │',
      '└──────────────────────────────────────┘',
      '',
      '→ Thanks for exploring my portfolio ←',
      ''
    ];
    
    return hackingSequence;
  },
  
  exit: () => ['EXIT_TERMINAL'],
  
  find: (args) => {
    if (!args.length) {
      return ['', 'Usage: find [filename]', ''];
    }
    
    const searchTerm = args[0].toLowerCase();
    const results: string[] = [];
    
    const searchInDirectory = (dir: any, path: string) => {
      Object.keys(dir).forEach(item => {
        const fullPath = path === '/' ? `/${item}` : `${path}/${item}`;
        if (item.toLowerCase().includes(searchTerm)) {
          results.push(fullPath);
        }
        if (dir[item].type === 'directory') {
          searchInDirectory(dir[item].content, fullPath);
        }
      });
    };
    
    searchInDirectory(fileSystem.root, '/root');
    
    if (results.length) {
      return ['', `Found ${results.length} results:`, ...results, ''];
    } else {
      return ['', `No files found matching '${searchTerm}'`, ''];
    }
  },
  
  scan: (_, context) => {
    context.openWindow('network-scanner');
    return [
      '',
      'Opening network vulnerability scanner...',
      '',
      'Starting reconnaissance module...',
      'Initializing packet capture...',
      '',
      'Press Start Scan in the interface to begin network analysis',
      ''
    ];
  }
};

export const executeCommand = (input: string, context: CommandContext): string[] => {
  // Handle special cases
  if (input.toLowerCase() === 'clear') {
    return ['CLEAR_TERMINAL'];
  }
  
  if (input.toLowerCase() === 'exit') {
    return ['EXIT_TERMINAL'];
  }
  
  // Parse the command and arguments
  const parts = input.split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  // Check if the command exists
  if (commands[command]) {
    return commands[command](args, context);
  }
  
  // Handle unknown commands
  return [
    '',
    `Command not found: ${command}. Type 'help' for available commands.`,
    ''
  ];
};