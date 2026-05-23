export default function ProductsToolbar({ categories, activeCategory, onCategoryChange, search, onSearchChange, sort, onSortChange }) {
  return (
    <div className="products-toolbar">
      <div className="category-tabs" id="categoryTabsContainer">
        <button
          className={`cat-tab ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >All</button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >{cat}</button>
        ))}
      </div>
      <div className="search-sort">
        <div className="search-box">
          <i className="fas fa-search" />
          <input
            type="text"
            id="productSearch"
            placeholder="Search products..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
        <select id="sortSelect" value={sort} onChange={e => onSortChange(e.target.value)}>
          <option value="name-asc">Name A to Z</option>
          <option value="name-desc">Name Z to A</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="stock-asc">Stock Low to High</option>
          <option value="stock-desc">Stock High to Low</option>
        </select>
      </div>
    </div>
  );
}
