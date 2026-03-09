import { useNavigate } from 'react-router-dom';

/**
 * Breadcrumb Component
 * 
 * Navigation breadcrumb for showing current page hierarchy.
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of breadcrumb items [{label, path}]
 */
const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index > 0 && <span className="breadcrumb-separator">›</span>}
          {item.path ? (
            <button
              className="breadcrumb-link"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
