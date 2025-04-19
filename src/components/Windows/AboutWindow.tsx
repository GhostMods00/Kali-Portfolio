import React from 'react';
import { User } from 'lucide-react';
import Window from './Window';

const AboutWindow: React.FC = () => {
  return (
    <Window
      title="About Me"
      windowType="about"
      icon={<User size={16} className="text-blue-400" />}
      initialPosition={{ x: 100, y: 80 }}
    >
      <div className="p-4 h-full overflow-y-auto bg-gray-900 text-white">
        <h2 className="text-xl mb-4 text-blue-400 font-mono">// Developer & Security Enthusiast</h2>
        
        <div className="mb-6">
          <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia massa sapien, non tincidunt eros eleifend feugiat. Donec maximus nulla id vulputate molestie.
          </p>
          <p className="mb-3">
            My journey in technology began with building simple websites, which evolved into a deep fascination 
            with how systems work and how they can be secured against potential threats.
          </p>
          <p className="mb-3">
            I specialize in creating robust, scalable web applications with a focus on security by design. 
            Whether it's developing interactive user interfaces, setting up secure backend systems, or conducting 
            security assessments, I bring a holistic approach to every project.
          </p>
        </div>
        
        <div className="mb-6 p-4 bg-black bg-opacity-50 rounded border border-kali-accent">
          <h3 className="text-lg mb-2 text-kali-accent font-mono">$ cat education.txt</h3>
          <ul className="space-y-2 ml-2">
            <li className="flex">
              <span className="text-green-400 mr-2">▶</span>
              <div>
                <p className="font-semibold">Bachelor of Science in Computer Science</p>
                <p className="text-gray-400 text-sm">University of Technology, 2018-2022</p>
              </div>
            </li>
            <li className="flex">
              <span className="text-green-400 mr-2">▶</span>
              <div>
                <p className="font-semibold">Certified Ethical Hacker (CEH)</p>
                <p className="text-gray-400 text-sm">EC-Council, 2023</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-black bg-opacity-50 rounded border border-kali-accent">
          <h3 className="text-lg mb-2 text-kali-accent font-mono">$ grep "interests" personal_data.txt</h3>
          <ul className="grid grid-cols-2 gap-2">
            <li className="flex items-center">
              <span className="text-red-400 mr-2">❯</span>
              <span>Capture The Flag competitions</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-2">❯</span>
              <span>Open Source contributing</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-2">❯</span>
              <span>Network security</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-2">❯</span>
              <span>UI/UX design</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-2">❯</span>
              <span>Machine learning</span>
            </li>
            <li className="flex items-center">
              <span className="text-red-400 mr-2">❯</span>
              <span>Tech blogging</span>
            </li>
          </ul>
        </div>
      </div>
    </Window>
  );
};

export default AboutWindow;