import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import VideoPlayer from '../components/VideoPlayer';
import FrictionCard from '../components/FrictionCard';
import { missions } from '../data/mockData';
import './MissionReplayPage.css';

/**
 * MissionReplayPage Component
 * 
 * Displays mission replay with video playback and friction analysis.
 */
const MissionReplayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find mission by ID
  const mission = missions.find(m => m.id === id);
  
  // Mock friction data
  const frictions = [
    {
      severity: 'critical',
      title: 'Non-Responsive CTA Element',
      description: 'The "Contact Sales" button (id: #btn-contact) registered a click action at 01:14, but failed to trigger modal popup. Agent attempted 3 retries.',
      timestamp: '01:14'
    },
    {
      severity: 'warning',
      title: 'Excessive TTI (Time to Interactive)',
      description: 'Mobile emulation detected 13.8s layout shift during image loading. First Contentful Paint delayed until 2.1s.',
      timestamp: '00:08'
    }
  ];

  if (!mission) {
    navigate('/');
    return null;
  }

  const handleJumpTo = (seconds) => {
    console.log('Jumping to:', seconds);
    // Video player will handle this via window.seekVideo
  };

  const handleDownloadReport = () => {
    console.log('Downloading report for mission:', id);
    // Add download logic here
  };

  const breadcrumbItems = [
    { label: 'Mission History', path: '/' },
    { label: `Mission #${id}` }
  ];

  return (
    <div className="mission-replay-page">
      <Header />
      
      <div className="replay-container">
        {/* Page Header */}
        <div className="replay-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/')}>
              ← 
            </button>
            <div className="header-info">
              <Breadcrumb items={breadcrumbItems} />
              <h1 className="replay-title">{mission.objective}</h1>
            </div>
          </div>
          
          <div className="header-right">
            <div className="mission-score">
              <span className="score-value">84</span>
              <span className="score-label">/100</span>
            </div>
            <button className="download-btn" onClick={handleDownloadReport}>
              <span className="download-icon">⬇</span> Download Full Report
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="video-section">
          <VideoPlayer
            videoUrl="/replay_session_084.mp4"
            onSeek={handleJumpTo}
          />
          <div className="video-info">
            <span className="video-label">📹 REPLAY_SESSION_084.MP4</span>
            <span className="agent-version">AGENT: ABANG_V3.0</span>
          </div>
        </div>

        {/* Two Column Layout: Friction Summary (Left) + Mission Details (Right) */}
        <div className="content-grid">
          {/* Left Column - Friction Summary */}
          <div className="friction-section">
            <h2 className="section-title">
              <span className="title-icon">📊</span> DETAILED FRICTION SUMMARY
            </h2>
            
            <div className="friction-list">
              {frictions.map((friction, index) => (
                <FrictionCard
                  key={index}
                  severity={friction.severity}
                  title={friction.title}
                  description={friction.description}
                  timestamp={friction.timestamp}
                  onJumpTo={handleJumpTo}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Mission Details */}
          <div className="details-column">
            <h2 className="section-title">
              <span className="title-icon">📋</span> MISSION DETAILS
            </h2>
            
            <div className="details-stack">
              <div className="detail-card">
                <h3 className="detail-title">MISSION OBJECTIVE</h3>
                <p className="detail-content">{mission.description}</p>
              </div>
              
              <div className="detail-card">
                <h3 className="detail-title">DEVICE</h3>
                <p className="detail-content">iPhone 14 Pro</p>
                <p className="detail-meta">393 x 852 pixels</p>
              </div>
              
              <div className="detail-card">
                <h3 className="detail-title">NETWORK</h3>
                <p className="detail-content">5G 4B</p>
                <p className="detail-meta">Simulated network conditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionReplayPage;
