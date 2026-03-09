import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
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
  const handleDeploy = () => {
    console.log('Deploying agent with config:', {
      targetUrl,
      objective,
      deviceType,
      selectedModel,
      width,
      height
    });

    // Add sample logs
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLogs = [
      { timestamp, type: 'THOUGHT', message: `Target URL received. Initializing headless browser environment for ${deviceType} emulation.` },
      { timestamp, type: 'ACTION', message: `Navigate to https://${targetUrl || 'example.com'}/pricing` },
      { timestamp, type: 'LOG', message: `DOM Content Loaded (3.4s). All assets ready.` },
      { timestamp, type: 'THOUGHT', message: `Scanning page for mission objective: "${objective || 'Enterprise plan identification'}". Elements detected: 3 pricing cards.` },
      { timestamp, type: 'ACTION', message: `Scroll to coordinates (0, 840)` },
      { timestamp, type: 'ACTION', message: `Click Element [.btn-contact]` },
      { timestamp, type: 'SYSTEM', message: 'UNEXPECTED BEHAVIOR DETECTED. CLICK REGISTERED BUT DOM UNCHANGED.' },
      { timestamp, type: 'LOG', message: `AI Agent state: Analyzing failure...` }
    ];
    
    setLogs(newLogs);
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
