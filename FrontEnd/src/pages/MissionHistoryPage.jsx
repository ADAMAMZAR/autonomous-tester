import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MissionRow from '../components/MissionRow';
import Pagination from '../components/Pagination';
import { missions } from '../data/mockData';

/**
 * MissionHistoryPage Component
 * 
 * Displays the mission history dashboard (main page).
 */
const MissionHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  return (
    <>
      <Header />
      
      <main className="main-content">
        <div className="content-header">
          <div className="page-title-section">
            <h1 className="page-title">Mission History</h1>
            <p className="page-subtitle">
              Review and manage past deployments of the Abang Mystery agent.
            </p>
          </div>
          <SearchBar />
        </div>

        <div className="mission-table-container">
          <table className="mission-table">
            <thead>
              <tr>
                <th className="th-id">#</th>
                <th className="th-objective">TASK OBJECTIVE</th>
                <th className="th-status">STATUS</th>
                <th className="th-date">EXECUTION DATE</th>
                <th className="th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <MissionRow key={mission.id} mission={mission} />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={9}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
};

export default MissionHistoryPage;
