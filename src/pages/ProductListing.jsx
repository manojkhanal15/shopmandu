import { useState, useEffect } from "react";
import products from "../data/products";
import ProductGrid from "../components/Product/ProductGrid";
import Filters from "../components/Filters/Filters";
import "./ProductListing.css";

const ProductListing = ({ search }) => {
  const [filters, setFilters] = useState({
    category: null,
    style: null,
    size: null,
  });

  const [sortBy, setSortBy] = useState("default");

  // ✅ NEW: Mobile filter toggle
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // 🔍 Filter
  const filteredProducts = products.filter((product) => {
    if (
      search &&
      !(
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      )
    ) return false;

    if (filters.category && product.category !== filters.category) return false;
    if (filters.style && product.style !== filters.style) return false;
    if (filters.size && !product.sizes.includes(filters.size)) return false;

    return true;
  });

  // 🔄 Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    return 0;
  });

  // ✅ Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, search]);

  const removeFilter = (key) => {
    setFilters({ ...filters, [key]: null });
  };

  const resetFilters = () => {
    setFilters({ category: null, style: null, size: null });
    setSortBy("default");
  };

  const hasActiveFilters =
    filters.category || filters.style || filters.size;

  return (
    <main className="plp">
      <div className="plp__content">

        {/* 🔥 MOBILE FILTER BUTTON */}
        <button
          className="mobile-filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Close Filters ✕" : "Filters ☰"}
        </button>

        {/* FILTERS */}
        <aside
          className={`plp__filters ${
            showFilters ? "show" : ""
          }`}
        >
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        {/* PRODUCTS */}
        <section className="plp__products">
          {/* Top */}
          <div className="plp-top">
            <div className="plp-sort">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Newest</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button className="plp-clear" onClick={resetFilters}>
                Clear all
              </button>
            )}
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="plp-active-filters">
              {filters.category && (
                <span onClick={() => removeFilter("category")}>
                  Category: {filters.category} ✕
                </span>
              )}
              {filters.style && (
                <span onClick={() => removeFilter("style")}>
                  Style: {filters.style} ✕
                </span>
              )}
              {filters.size && (
                <span onClick={() => removeFilter("size")}>
                  Size: {filters.size} ✕
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {currentProducts.length === 0 ? (
            <div className="plp-empty">
              <h2>No products found</h2>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : (
            <>
              <ProductGrid products={currentProducts} />

              {/* Pagination */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductListing;