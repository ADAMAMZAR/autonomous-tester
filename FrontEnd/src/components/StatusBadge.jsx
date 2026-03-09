import { getStatusConfig } from '../data/mockData';

/**
 * StatusBadge Component
 * 
 * Displays a status badge with appropriate styling based on the status type.
 * 
 * @param {Object} props
 * @param {string} props.status - Status type (SUCCESS, FAILED, IN_PROGRESS, RUNNING)
 */
const StatusBadge = ({ status }) => {
  const config = getStatusConfig(status);
  
  return (
    <span className={`status-badge ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
