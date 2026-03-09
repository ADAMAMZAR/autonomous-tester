import { useNavigate } from 'react-router-dom';

/**
 * Header Component
 * 
 * Top navigation bar with branding, navigation, status, and action buttons.
 */
const Header = () => {
  const navigate = useNavigate();

  const handleNewMission = () => {
    navigate('/new-mission');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">⊙</span>
          <span className="logo-text">
            ABANG <span className="logo-highlight">MYSTERY</span>
          </span>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link active">MISSION LOGS</a>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">ACTIVE OPERATIVE</span>
        </div>
        <button className="new-mission-btn" onClick={handleNewMission}>
          <span className="plus-icon">+</span> New Mission
        </button>
        <div className="user-avatar"></div>
      </div>
    </header>
  );
};

export default Header;
