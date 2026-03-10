import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import DeviceSelector from '../components/DeviceSelector';
import TerminalPanel from '../components/TerminalPanel';
import './MissionConfigPage.css';

/**
 * MissionConfigPage Component
 * 
 * Mission configuration page for setting up new agent deployments.
 */
const MissionConfigPage = () => {
  
  // Form state
  const [targetUrl, setTargetUrl] = useState('');
  const [objective, setObjective] = useState('');
  
  // Device state
  const [deviceType, setDeviceType] = useState('mobile');
  const [selectedModel, setSelectedModel] = useState('');
  const [width, setWidth] = useState(393);
  const [height, setHeight] = useState(852);
  
  // Terminal logs state
  const [logs, setLogs] = useState([]);

  // Socket connection
  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('agent_log', (newLog) => {
      setLogs((prevLogs) => [...prevLogs, newLog]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle device type change
  const handleDeviceTypeChange = (newType) => {
    setDeviceType(newType);
    setSelectedModel('');
    
    // Set default dimensions based on device type
    if (newType === 'mobile') {
      setWidth(393);
      setHeight(852);
    } else {
      setWidth(1920);
      setHeight(1080);
    }
  };

  // Handle deploy agent
  const handleDeploy = async () => {
    setLogs([]); // Clear previous logs
    
    console.log('Deploying agent with config:', {
      targetUrl,
      objective,
      deviceType,
      selectedModel,
      width,
      height
    });

    try {
      const response = await fetch('http://localhost:3001/api/missions/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`,
          objective,
          width: parseInt(width),
          height: parseInt(height)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to deploy agent');
      }

      const data = await response.json();
      console.log('Deployment response:', data);
    } catch (error) {
      console.error('Error deploying agent:', error);
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs([{
        timestamp,
        type: 'SYSTEM',
        message: `CONNECTION ERROR: Could not connect to backend. Please ensure the backend server is running on port 3001.`
      }]);
    }
  };

  return (
    <div className="mission-config-page">
      <Header />
      
      <div className="config-container">
        {/* Left Panel - Configuration Form */}
        <div className="config-panel">
          <div className="config-header">
            <h1 className="config-title">Mission Configuration</h1>
            <p className="config-subtitle">
              Define the scope and objectives for the AI agent deployment.
            </p>
          </div>

          {/* Target URL */}
          <div className="form-group">
            <label className="form-label">TARGET URL</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://example.com/pricing-plans"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
            />
          </div>

          {/* Mission Objective */}
          <div className="form-group">
            <label className="form-label">MISSION OBJECTIVE</label>
            <textarea
              className="form-textarea"
              placeholder="e.g. Navigate to the pricing page, identify the 'Enterprise' plan, and verify if the 'Contact Us' button triggers a modal window..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={4}
            />
          </div>

          {/* Device Selector */}
          <DeviceSelector
            deviceType={deviceType}
            onDeviceTypeChange={handleDeviceTypeChange}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            width={width}
            onWidthChange={setWidth}
            height={height}
            onHeightChange={setHeight}
          />

          {/* Deploy Button */}
          <button className="deploy-button" onClick={handleDeploy}>
            <span className="deploy-icon">🚀</span> DEPLOY ABANG AGENT
          </button>

          {/* Bottom Actions */}
          <div className="bottom-actions">
            <div className="action-badges">
              <span className="badge badge-author">
                <span className="badge-icon">👤</span> FRICTION DETECTED
              </span>
              <span className="badge badge-latency">
                <span className="badge-icon">⏱️</span> 13.8 LATENCY
              </span>
              <span className="badge badge-mode">
                <span className="badge-icon">⚡</span> 84 /100
              </span>
            </div>
            <div className="action-buttons">
              <button className="action-btn secondary">
                <span className="btn-icon">🔄</span> Replay Session
              </button>
              <button className="action-btn secondary">
                <span className="btn-icon">📄</span> Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Terminal */}
        <div className="terminal-container">
          <TerminalPanel logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default MissionConfigPage;
