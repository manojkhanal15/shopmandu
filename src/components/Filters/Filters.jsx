import "./Filters.css";

const Filters = ({ filters, setFilters }) => {
  const resetFilters = () => {
    setFilters({
      category: null,
      style: null,
      size: null,
    });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>

      {/* Category */}
      <div className="filter-group">
        <p>Category</p>
        <button
          className={filters.category === "pants" ? "active" : ""}
          onClick={() =>
            setFilters({ ...filters, category: "pants" })
          }
        >
          Pants
        </button>
        <button
          className={filters.category === "jumpsuits" ? "active" : ""}
          onClick={() =>
            setFilters({ ...filters, category: "jumpsuits" })
          }
        >
          Jumpsuits
        </button>
      </div>

      {/* Style */}
      <div className="filter-group">
        <p>Style</p>
        <button
          className={filters.style === "bold" ? "active" : ""}
          onClick={() =>
            setFilters({ ...filters, style: "bold" })
          }
        >
          Bold
        </button>
        <button
          className={filters.style === "monochrome" ? "active" : ""}
          onClick={() =>
            setFilters({ ...filters, style: "monochrome" })
          }
        >
          Monochrome
        </button>
        <button
          className={filters.style === "neutrals" ? "active" : ""}
          onClick={() =>
            setFilters({ ...filters, style: "neutrals" })
          }
        >
          Neutrals
        </button>
      </div>

      {/* Size */}
      <div className="filter-group">
        <p>Size</p>
        {["S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className={filters.size === size ? "active" : ""}
            onClick={() =>
              setFilters({ ...filters, size })
            }
          >
            {size}
          </button>
        ))}
      </div>

      {/* Reset */}
      <button className="filters-reset" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
