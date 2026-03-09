/**
 * FrictionCard Component
 * 
 * Displays a detected friction/issue with jump-to functionality.
 * 
 * @param {Object} props
 * @param {string} props.severity - 'critical' or 'warning'
 * @param {string} props.title - Issue title
 * @param {string} props.description - Issue description
 * @param {string} props.timestamp - Time in video (e.g., "01:14")
 * @param {Function} props.onJumpTo - Callback when jump button clicked
 */
const FrictionCard = ({ severity, title, description, timestamp, onJumpTo }) => {
  const getSeverityConfig = () => {
    if (severity === 'critical') {
      return {
        badge: 'P1 CRITICAL',
        className: 'friction-critical',
        icon: '🔴'
      };
    }
    return {
      badge: '⚠️ WARNING',
      className: 'friction-warning',
      icon: '⚠️'
    };
  };

  const config = getSeverityConfig();

  const handleJumpClick = () => {
    // Convert timestamp (MM:SS) to seconds
    const [mins, secs] = timestamp.split(':').map(Number);
    const totalSeconds = mins * 60 + secs;
    
    if (onJumpTo) {
      onJumpTo(totalSeconds);
    }
    
    // Also use global seek function if available
    if (window.seekVideo) {
      window.seekVideo(totalSeconds);
    }
  };

  return (
    <div className={`friction-card ${config.className}`}>
      <div className="friction-header">
        <span className="friction-badge">{config.badge}</span>
      </div>
      
      <div className="friction-content">
        <h3 className="friction-title">{title}</h3>
        <p className="friction-description">{description}</p>
      </div>
      
      <button className="friction-jump-btn" onClick={handleJumpClick}>
        JUMP TO {timestamp}
      </button>
    </div>
  );
};

export default FrictionCard;
