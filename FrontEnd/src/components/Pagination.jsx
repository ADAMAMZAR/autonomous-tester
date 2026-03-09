import { TOTAL_MISSIONS } from '../data/mockData';

/**
 * Pagination Component
 * 
 * Displays pagination controls with page numbers and navigation buttons.
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback when page changes
 */
const Pagination = ({ currentPage = 1, totalPages = 9, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing 1-10 of {TOTAL_MISSIONS} missions
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <button
          className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
        
        <button
          className={`pagination-number ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => handlePageClick(2)}
        >
          2
        </button>
        
        <button
          className={`pagination-number ${currentPage === 3 ? 'active' : ''}`}
          onClick={() => handlePageClick(3)}
        >
          3
        </button>
        
        <button
          className="pagination-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
