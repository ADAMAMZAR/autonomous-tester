import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MissionHistoryPage from './pages/MissionHistoryPage';
import MissionConfigPage from './pages/MissionConfigPage';
import MissionReplayPage from './pages/MissionReplayPage';
import './App.css';

/**
 * Main App Component with Routing
 * 
 * Routes:
 * - / : Mission History page (main page)
 * - /new-mission : Mission Configuration page
 * - /mission/:id : Mission Replay page
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MissionHistoryPage />} />
        <Route path="/new-mission" element={<MissionConfigPage />} />
        <Route path="/mission/:id" element={<MissionReplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
