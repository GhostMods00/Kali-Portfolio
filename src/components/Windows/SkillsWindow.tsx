import React, { useState, useEffect } from 'react';
import { FileText, Terminal, Server, Code, Shield, Database, Cpu } from 'lucide-react';
import Window from './Window';
import ScrambleText from '../Effects/ScrambleText';

interface Skill {
  category: string;
  name: string;
  level: number; // 1-10
  icon: React.ReactNode;
  description: string;
}

const SkillsWindow: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  
  // Skills data
  const skills: Skill[] = [
    // Frontend
    {
      category: 'Frontend',
      name: 'React',
      level: 9,
      icon: <Code size={16} />,
      description: 'Building complex single-page applications and component libraries'
    },
    {
      category: 'Frontend',
      name: 'TypeScript',
      level: 8,
      icon: <Code size={16} />,
      description: 'Type-safe development with advanced typing patterns'
    },
    {
      category: 'Frontend',
      name: 'JavaScript',
      level: 9,
      icon: <Code size={16} />,
      description: 'Deep knowledge of ES6+ features and browser APIs'
    },
    {
      category: 'Frontend',
      name: 'Tailwind CSS',
      level: 8,
      icon: <Code size={16} />,
      description: 'Utility-first CSS framework for rapid UI development'
    },
    
    // Backend
    {
      category: 'Backend',
      name: 'Node.js',
      level: 8,
      icon: <Server size={16} />,
      description: 'Building RESTful APIs and microservices'
    },
    {
      category: 'Backend',
      name: 'Python',
      level: 7,
      icon: <Server size={16} />,
      description: 'Data processing, automation, and web scraping'
    },
    {
      category: 'Backend',
      name: 'Express',
      level: 8,
      icon: <Server size={16} />,
      description: 'Creating performant and secure backend services'
    },
    {
      category: 'Backend',
      name: 'MongoDB',
      level: 7,
      icon: <Database size={16} />,
      description: 'Document database design and optimization'
    },
    
    // DevOps
    {
      category: 'DevOps',
      name: 'Docker',
      level: 7,
      icon: <Cpu size={16} />,
      description: 'Containerization and deployment automation'
    },
    {
      category: 'DevOps',
      name: 'Git',
      level: 9,
      icon: <Cpu size={16} />,
      description: 'Version control and collaborative development'
    },
    {
      category: 'DevOps',
      name: 'CI/CD',
      level: 7,
      icon: <Cpu size={16} />,
      description: 'Automated testing and deployment pipelines'
    },
    
    // Security
    {
      category: 'Security',
      name: 'Penetration Testing',
      level: 6,
      icon: <Shield size={16} />,
      description: 'Identifying and exploiting vulnerabilities'
    },
    {
      category: 'Security',
      name: 'Network Security',
      level: 7,
      icon: <Shield size={16} />,
      description: 'Secure network architecture and protocols'
    },
    {
      category: 'Security',
      name: 'Application Security',
      level: 8,
      icon: <Shield size={16} />,
      description: 'OWASP Top 10, threat modeling, and secure coding practices'
    }
  ];

  // Get unique categories
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  // Simulate initial scan - using a fixed timeout to ensure it always completes
  useEffect(() => {
    console.log("Skills scanning started");
    const timer = setTimeout(() => {
      console.log("Skills scanning complete");
      setScanning(false);
      setActiveCategory(categories[0]);
    }, 2500); // Fixed timeout of 2.5 seconds
    
    return () => {
      console.log("Clearing skills scanning timer");
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures this runs only once

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: number) => {
    if (level >= 9) return 'text-green-400';
    if (level >= 7) return 'text-blue-400';
    if (level >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  console.log("SkillsWindow render - scanning state:", scanning);
  console.log("Active category:", activeCategory);

  return (
    <Window
      title="Skills Analysis"
      windowType="skills"
      icon={<FileText size={16} className="text-purple-400" />}
      initialPosition={{ x: 250, y: 120 }}
      width="w-3/4"
      height="h-3/4"
    >
      <div className="p-4 h-full overflow-y-auto bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          <h2 className="text-xl mb-4 text-purple-400 font-mono">// Technical Skills Scanner</h2>
          
          {scanning ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <div className="text-lg mb-2">Scanning for technical skills...</div>
                <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-purple-500 progress-bar"></div>
                </div>
              </div>
              <div className="text-sm text-gray-400 font-mono">
                <div>$ sudo skill-scan -u developer -a</div>
                <div className="text-green-400">Parsing system paths...</div>
                <div className="text-green-400">Analyzing GitHub repositories...</div>
                <div className="text-green-400">Scanning memory for code patterns...</div>
                <div className="animate-pulse">Compiling results...</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1">
              {/* Categories Sidebar */}
              <div className="w-64 bg-gray-800 rounded-l-lg p-3 border-r border-gray-700">
                <div className="text-sm font-semibold mb-2 text-gray-400">SKILL CATEGORIES</div>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`flex items-center w-full p-2 mb-1 rounded text-left ${
                      activeCategory === category 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category === 'Frontend' && <Code size={16} className="mr-2 text-blue-400" />}
                    {category === 'Backend' && <Server size={16} className="mr-2 text-green-400" />}
                    {category === 'DevOps' && <Cpu size={16} className="mr-2 text-yellow-400" />}
                    {category === 'Security' && <Shield size={16} className="mr-2 text-red-400" />}
                    {category}
                  </button>
                ))}
                
                <div className="mt-6 p-3 bg-black bg-opacity-70 rounded border border-gray-700 text-xs text-gray-400">
                  <div className="font-semibold mb-1 text-purple-400">SKILL SCAN SUMMARY</div>
                  <div className="flex justify-between mb-1">
                    <span>Total Skills:</span>
                    <span>{skills.length}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Categories:</span>
                    <span>{categories.length}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Mastery Level:</span>
                    <span className="text-blue-400">Advanced</span>
                  </div>
                </div>
              </div>
              
              {/* Skills Detail View */}
              <div className="flex-1 p-4">
                {activeCategory && (
                  <>
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-mono">
                        <ScrambleText 
                          text={`${activeCategory} Skills`}
                          speed={50}
                          className="text-lg"
                        />
                      </h3>
                      <div className="ml-3 px-2 py-1 bg-gray-800 rounded-full text-xs">
                        {getSkillsByCategory(activeCategory).length} skills
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {getSkillsByCategory(activeCategory).map((skill, index) => (
                        <div key={index} className="bg-gray-800 bg-opacity-70 rounded-lg p-4 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <span className="mr-2">{skill.icon}</span>
                              <span className="font-semibold">{skill.name}</span>
                            </div>
                            <div className={`font-mono ${getLevelColor(skill.level)}`}>
                              Level {skill.level}/10
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{skill.description}</p>
                          <div className="mt-2 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${skill.level >= 9 ? 'bg-green-500' : skill.level >= 7 ? 'bg-blue-500' : skill.level >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${skill.level * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-black bg-opacity-50 rounded border border-gray-700 text-sm scan-effect">
                      <div className="font-mono text-gray-400">$ skill-analyze --category {activeCategory.toLowerCase()} --verbose</div>
                      <p className="mt-2">
                        Analysis shows {activeCategory.toLowerCase()} expertise with emphasis on {getSkillsByCategory(activeCategory)[0]?.name} and {getSkillsByCategory(activeCategory)[1]?.name}.
                        Growth potential identified in advanced {getSkillsByCategory(activeCategory).filter(s => s.level < 8)[0]?.name || 'areas'}.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default SkillsWindow;