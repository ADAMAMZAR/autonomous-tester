/**
 * SearchBar Component
 * 
 * Search input with filter button for mission history.
 */
const SearchBar = () => {
  const handleSearch = (e) => {
    console.log('Search:', e.target.value);
    // Add your search handler here
  };

  const handleFilter = () => {
    console.log('Filter clicked');
    // Add your filter handler here
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          onChange={handleSearch}
        />
      </div>
      <button className="filter-button" onClick={handleFilter}>
        <span className="filter-icon">☰</span>
      </button>
    </div>
  );
};

export default SearchBar;
