import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';
import Window from './Window';

const ContactWindow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we're just simulating a successful form submission
      setSending(false);
      setSent(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSent(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <Window
      title="Contact"
      windowType="contact"
      icon={<Mail size={16} className="text-red-400" />}
      initialPosition={{ x: 200, y: 120 }}
    >
      <div className="p-4 h-full overflow-y-auto bg-gray-900 text-white">
        <h2 className="text-xl mb-4 text-red-400 font-mono">// Connect With Me</h2>
        
        <div className="mb-6 p-4 bg-black bg-opacity-50 rounded border border-kali-accent">
          <h3 className="text-lg mb-3 text-kali-accent font-mono">$ nmap -p 22 contact.me</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center mb-2">
                <Github className="text-white mr-2" size={18} />
                <span className="font-mono">GitHub</span>
              </div>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/yourusername
              </a>
            </div>
            
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center mb-2">
                <Linkedin className="text-blue-500 mr-2" size={18} />
                <span className="font-mono">LinkedIn</span>
              </div>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/yourusername
              </a>
            </div>
            
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center mb-2">
                <Twitter className="text-blue-400 mr-2" size={18} />
                <span className="font-mono">Twitter</span>
              </div>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                twitter.com/yourusername
              </a>
            </div>
            
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center mb-2">
                <Mail className="text-red-400 mr-2" size={18} />
                <span className="font-mono">Email</span>
              </div>
              <a 
                href="mailto:yourname@example.com" 
                className="text-blue-400 hover:underline"
              >
                yourname@example.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-black bg-opacity-50 rounded border border-kali-accent">
          <h3 className="text-lg mb-3 text-red-400 font-mono">
            # Contact Form [Encrypted]
          </h3>
          
          {sent && (
            <div className="mb-4 p-3 bg-green-900 bg-opacity-30 border border-green-500 rounded text-green-400">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-500 rounded text-red-400">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-300 font-mono text-sm">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 focus:border-kali-accent p-2 rounded text-white font-mono"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-300 font-mono text-sm">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 focus:border-kali-accent p-2 rounded text-white font-mono"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1 text-gray-300 font-mono text-sm">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 focus:border-kali-accent p-2 rounded text-white font-mono"
                placeholder="Your message here..."
              />
            </div>
            
            <button
              type="submit"
              disabled={sending}
              className={`flex items-center justify-center w-full py-2 px-4 bg-red-800 hover:bg-red-700 text-white font-mono rounded transition-colors ${
                sending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {sending ? (
                <>
                  <span className="mr-2">Sending...</span>
                  <span className="animate-spin">⟳</span>
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Window>
  );
};

export default ContactWindow;