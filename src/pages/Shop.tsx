import { useSelector, useDispatch } from 'react-redux';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { setSelectedCategory, setSearchQuery } from '../store/uiSlice';
import type { RootState } from '../store';

export function Shop() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.ui.selectedCategory);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full border rounded-md px-3 py-2 mb-4 text-sm"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => dispatch(setSelectedCategory(category))}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium mb-1">No products found</p>
          <p className="text-sm">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}