import React, { useState } from 'react';
import { Code, Folder, ExternalLink } from 'lucide-react';
import Window from './Window';

// Sample projects data
const projects = [
  {
    id: 1,
    title: 'Network Scanner',
    description: 'A network discovery and security auditing tool that identifies devices, open ports, and potential vulnerabilities on a local network.',
    technologies: ['Python', 'Scapy', 'Network Security'],
    image: '/api/placeholder/400/250',
    githubLink: 'https://github.com/yourusername/network-scanner',
    demoLink: 'https://example.com/demo',
    featured: true
  },
  {
    id: 2,
    title: 'Secure Chat App',
    description: 'End-to-end encrypted messaging platform with self-destructing messages and zero knowledge architecture.',
    technologies: ['React', 'Node.js', 'WebSockets', 'Encryption'],
    image: '/api/placeholder/400/250',
    githubLink: 'https://github.com/yourusername/secure-chat',
    featured: true
  },
  {
    id: 3,
    title: 'Web Vulnerability Scanner',
    description: 'Automated tool for identifying common web application vulnerabilities such as XSS, CSRF, and SQL injection.',
    technologies: ['JavaScript', 'Security', 'Penetration Testing'],
    image: '/api/placeholder/400/250',
    githubLink: 'https://github.com/yourusername/vulnerability-scanner',
    featured: true
  },
  {
    id: 4,
    title: 'Encryption Toolkit',
    description: 'A collection of cryptographic tools for file encryption, hashing, and secure password management.',
    technologies: ['Python', 'Cryptography', 'Desktop App'],
    image: '/api/placeholder/400/250',
    githubLink: 'https://github.com/yourusername/encryption-toolkit'
  },
  {
    id: 5,
    title: 'Personal Blog Platform',
    description: 'A custom-built content management system for technical blogging with markdown support and code highlighting.',
    technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
    image: '/api/placeholder/400/250',
    githubLink: 'https://github.com/yourusername/blog-platform',
    demoLink: 'https://example.com/blog'
  }
];

const ProjectsWindow: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <Window
      title="Projects"
      windowType="projects"
      icon={<Code size={16} className="text-yellow-400" />}
      initialPosition={{ x: 150, y: 100 }}
      width="w-2/3"
      height="h-3/4"
    >
      <div className="p-4 h-full overflow-y-auto bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          <h2 className="text-xl mb-4 text-yellow-400 font-mono">// Projects & Portfolio</h2>
          
          {/* Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <div 
                key={project.id}
                className={`p-4 rounded border transition-all ${
                  activeProject === project.id 
                    ? 'border-yellow-400 bg-gray-800' 
                    : 'border-gray-700 bg-black bg-opacity-50 hover:border-gray-500'
                }`}
                onClick={() => setActiveProject(project.id === activeProject ? null : project.id)}
              >
                <div className="flex items-center mb-2">
                  <Folder className="text-yellow-400 mr-2" size={18} />
                  <span className="text-yellow-400 font-mono font-bold">{project.title}</span>
                  {project.featured && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-600 rounded-full text-xs">Featured</span>
                  )}
                </div>
                
                <p className="text-sm mb-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-xs rounded">{tech}</span>
                  ))}
                </div>
                
                {activeProject === project.id && (
                  <div className="mt-4 space-y-4">
                    <div className="border border-gray-700 rounded overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-48 object-cover object-center"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                      >
                        <Code size={14} className="mr-1" />
                        GitHub Repo
                      </a>
                      
                      {project.demoLink && (
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-black bg-opacity-50 rounded border border-kali-accent">
            <h3 className="text-lg mb-2 text-kali-accent font-mono">$ cat github_stats.txt</h3>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">▶</span>
                <span>Repositories: 25+</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">▶</span>
                <span>Stars: 150+</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">▶</span>
                <span>Contributions: 700+</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">▶</span>
                <span>Pull Requests: 120+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default ProjectsWindow;
export {}