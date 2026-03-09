import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

/**
 * MissionRow Component
 * 
 * Displays a single mission row in the mission history table.
 * Entire row is clickable to view mission details.
 * 
 * @param {Object} props
 * @param {Object} props.mission - Mission object containing id, objective, description, status, executionDate, hasAction
 */
const MissionRow = ({ mission }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/mission/${mission.id}`);
  };

  const handleRunClick = (e) => {
    e.stopPropagation(); // Prevent row click
    console.log(`Running mission ${mission.id}`);
    // Add your action handler here
  };

  return (
    <tr className="mission-row" onClick={handleRowClick}>
      <td className="mission-id">#{mission.id}</td>
      <td className="mission-objective">
        <div className="objective-title">{mission.objective}</div>
        <div className="objective-description">{mission.description}</div>
      </td>
      <td className="mission-status">
        <StatusBadge status={mission.status} />
      </td>
      <td className="mission-date">{mission.executionDate}</td>
      <td className="mission-actions">
        {mission.hasAction && (
          <button className="action-button running" onClick={handleRunClick}>
            <span className="action-icon">▶</span> RUNNING
          </button>
        )}
      </td>
    </tr>
  );
};

export default MissionRow;
