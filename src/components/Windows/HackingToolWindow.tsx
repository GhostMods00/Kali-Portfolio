import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Monitor, Cpu, Server, CheckCircle, XCircle } from 'lucide-react';
import Window from './Window';

// Define proper types
interface Host {
  ip: string;
  type: string;
  status: string;
  ports: number[];
}

interface Vulnerability {
  host: string;
  service: string;
  port: number;
  severity: string;
  description: string;
}

const HackingToolWindow: React.FC = () => {
  const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, complete
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedHosts, setScannedHosts] = useState<Host[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  
  // Predefined sample data
  const sampleHosts: Host[] = [
    { ip: '192.168.1.1', type: 'Router', status: 'Online', ports: [80, 443, 22] },
    { ip: '192.168.1.10', type: 'Server', status: 'Online', ports: [21, 22, 80, 443, 3306] },
    { ip: '192.168.1.15', type: 'Workstation', status: 'Online', ports: [139, 445, 3389] },
    { ip: '192.168.1.20', type: 'IoT Device', status: 'Online', ports: [80, 8080, 1883] },
    { ip: '192.168.1.25', type: 'Printer', status: 'Online', ports: [9100, 515, 631] }
  ];
  
  const sampleVulnerabilities: Vulnerability[] = [
    { host: '192.168.1.10', service: 'SSH', port: 22, severity: 'Medium', description: 'Outdated SSH version' },
    { host: '192.168.1.15', service: 'SMB', port: 445, severity: 'High', description: 'SMB vulnerability detected' },
    { host: '192.168.1.20', service: 'HTTP', port: 8080, severity: 'Critical', description: 'Default credentials' },
    { host: '192.168.1.1', service: 'HTTP', port: 80, severity: 'Low', description: 'Information disclosure' }
  ];
  
  const startScan = () => {
    setScanStatus('scanning');
    setScanProgress(0);
    setScannedHosts([]);
    setVulnerabilities([]);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanStatus('complete');
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    // Add all hosts at once instead of gradually
    setTimeout(() => {
      setScannedHosts([...sampleHosts]);
    }, 2000);
    
    // Add all vulnerabilities at once
    setTimeout(() => {
      setVulnerabilities([...sampleVulnerabilities]);
    }, 5000);
  };
  
  // Reset on component unmount
  useEffect(() => {
    return () => {
      setScanStatus('idle');
      setScanProgress(0);
    };
  }, []);
  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Window
      title="Network Scanner"
      windowType="network-scanner"
      icon={<Shield size={16} className="text-purple-400" />}
      initialPosition={{ x: 120, y: 80 }}
      width="w-2/3"
      height="h-3/4"
    >
      <div className="p-4 h-full overflow-y-auto bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-purple-400 font-mono">// Network Vulnerability Scanner</h2>
            <button
              onClick={startScan}
              disabled={scanStatus === 'scanning'}
              className={`px-4 py-2 rounded font-mono ${
                scanStatus === 'scanning'
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-purple-700 hover:bg-purple-600'
              }`}
            >
              {scanStatus === 'scanning' ? 'Scanning...' : 'Start Scan'}
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Scan Progress:</span>
              <span className="text-sm">{Math.round(scanProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${scanProgress}%`, transition: 'width 0.2s ease-in-out' }}
              ></div>
            </div>
            {scanStatus === 'scanning' && (
              <div className="mt-1 text-xs text-gray-400 animate-pulse">
                Scanning network for vulnerabilities...
              </div>
            )}
            {scanStatus === 'complete' && (
              <div className="mt-1 text-xs text-green-400">
                Scan complete. Found {vulnerabilities.length} potential vulnerabilities.
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Discovered hosts */}
            <div className="bg-black bg-opacity-50 rounded border border-gray-700 p-3">
              <h3 className="text-sm font-mono mb-2 flex items-center">
                <Monitor size={14} className="mr-1" />
                Discovered Hosts ({scannedHosts.length})
              </h3>
              <div className="overflow-y-auto max-h-40">
                {scannedHosts.length > 0 ? (
                  <table className="w-full text-xs">
                    <thead className="text-gray-400 border-b border-gray-700">
                      <tr>
                        <th className="text-left py-1">IP Address</th>
                        <th className="text-left py-1">Type</th>
                        <th className="text-left py-1">Status</th>
                        <th className="text-left py-1">Open Ports</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scannedHosts.map((host, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-1">{host.ip}</td>
                          <td className="py-1">{host.type}</td>
                          <td className="py-1 text-green-400">{host.status}</td>
                          <td className="py-1">{host.ports.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex justify-center items-center h-20 text-gray-500 text-sm">
                    No hosts discovered yet
                  </div>
                )}
              </div>
            </div>
            
            {/* Network Map - Simplified to avoid errors */}
            <div className="bg-black bg-opacity-50 rounded border border-gray-700 p-3">
              <h3 className="text-sm font-mono mb-2 flex items-center">
                <Server size={14} className="mr-1" />
                Network Topology
              </h3>
              <div className="flex justify-center items-center h-40 bg-gray-900 rounded">
                <div className="text-gray-500 text-sm">
                  {scannedHosts.length > 0 
                    ? `Found ${scannedHosts.length} devices in network` 
                    : "Start scan to visualize network"}
                </div>
              </div>
            </div>
          </div>
          
          {/* Vulnerabilities Panel */}
          <div className="bg-black bg-opacity-50 rounded border border-gray-700 p-3 flex-1">
            <h3 className="text-sm font-mono mb-2 flex items-center">
              <AlertTriangle size={14} className="mr-1 text-yellow-500" />
              Detected Vulnerabilities ({vulnerabilities.length})
            </h3>
            
            {vulnerabilities.length > 0 ? (
              <div className="overflow-y-auto max-h-64">
                <table className="w-full text-xs">
                  <thead className="text-gray-400 border-b border-gray-700">
                    <tr>
                      <th className="text-left py-1">Host</th>
                      <th className="text-left py-1">Service</th>
                      <th className="text-left py-1">Port</th>
                      <th className="text-left py-1">Severity</th>
                      <th className="text-left py-1">Description</th>
                      <th className="text-left py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vulnerabilities.map((vuln, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-1">{vuln.host}</td>
                        <td className="py-1">{vuln.service}</td>
                        <td className="py-1">{vuln.port}</td>
                        <td className={`py-1 ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity}
                        </td>
                        <td className="py-1">{vuln.description}</td>
                        <td className="py-1 flex items-center">
                          {index % 2 === 0 ? (
                            <span className="flex items-center text-red-400">
                              <XCircle size={12} className="mr-1" />
                              Open
                            </span>
                          ) : (
                            <span className="flex items-center text-green-400">
                              <CheckCircle size={12} className="mr-1" />
                              Patched
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center h-40 text-gray-500 text-sm">
                No vulnerabilities detected yet
              </div>
            )}
            
            {scanStatus === 'complete' && vulnerabilities.length > 0 && (
              <div className="mt-4 p-3 bg-gray-800 rounded text-sm">
                <h4 className="font-mono mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Update SSH server on 192.168.1.10 to latest version</li>
                  <li>Apply latest security patches to workstation 192.168.1.15</li>
                  <li>Change default credentials on IoT device 192.168.1.20</li>
                  <li>Configure proper access controls on router admin interface</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Window>
  );
};

export default HackingToolWindow;