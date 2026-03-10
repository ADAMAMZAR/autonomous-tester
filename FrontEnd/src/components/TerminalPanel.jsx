import { useEffect, useRef } from 'react';

/**
 * TerminalPanel Component
 * 
 * Displays AI agent terminal output with syntax-highlighted log entries.
 * 
 * @param {Object} props
 * @param {Array} props.logs - Array of log objects with timestamp, type, and message
 * @param {string} props.screenshot - Base64 encoded screenshot image
 */
const TerminalPanel = ({ logs = [], screenshot = null }) => {
  const terminalRef = useRef(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogClassName = (type) => {
    const classMap = {
      'THOUGHT': 'log-thought',
      'ACTION': 'log-action',
      'LOG': 'log-info',
      'SYSTEM': 'log-system',
      'ERROR': 'log-error'
    };
    return classMap[type] || 'log-default';
  };

  const getLogIcon = (type) => {
    const iconMap = {
      'THOUGHT': '💭',
      'ACTION': '⚡',
      'LOG': '📝',
      'SYSTEM': '⚠️',
      'ERROR': '❌'
    };
    return iconMap[type] || '•';
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <span className="terminal-title">AI HERO TERMINAL v1.0.4</span>
        <div className="terminal-controls">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
        </div>
      </div>
      
      {/* Visual Preview Section */}
      <div className="terminal-preview">
        {screenshot ? (
          <img 
            src={`data:image/png;base64,${screenshot}`} 
            alt="Agent View" 
            className="agent-view-frame"
          />
        ) : (
          <div className="preview-placeholder">
            <div className="scanner-line"></div>
            <span>WAITING FOR AGENT BROADCAST...</span>
          </div>
        )}
      </div>

      <div className="terminal-content" ref={terminalRef}>
        {logs.length === 0 ? (
          <div className="terminal-empty">
            <p>Waiting for agent deployment...</p>
            <p className="terminal-hint">Configure your mission and click "DEPLOY ABANG AGENT" to start.</p>
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`terminal-log ${getLogClassName(log.type)}`}>
              <span className="log-timestamp">[{log.timestamp}]</span>
              <span className="log-icon">{getLogIcon(log.type)}</span>
              <span className="log-type">{log.type}:</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TerminalPanel;
