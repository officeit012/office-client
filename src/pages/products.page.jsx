import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Filter, Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");
  const shouldFocusSearch = queryParams.get("focus") === "search";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products and categories in parallel
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData.map((cat) => cat.name));

        // Set max price range based on actual product data
        if (productsData.length > 0) {
          const maxPrice = Math.max(
            ...productsData.map((product) => product.price)
          );
          setPriceRange([0, maxPrice]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products and categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    // Filter by category
    if (selectedCategory && product.category !== selectedCategory) return false;
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    // Filter by availability
    if (
      availabilityFilter.length > 0 &&
      !availabilityFilter.includes(product.availability)
    )
      return false;
    return true;
  });

  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((product) => product.price))
      : 2000;

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.replaceState({}, "", newUrl);
  }, [selectedCategory]);

  useEffect(() => {
    // Auto-focus search input if coming from navigation search
    if (shouldFocusSearch) {
      // Small delay to ensure the input is fully rendered
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [shouldFocusSearch, loading]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="w-full">
        <div className="container mx-auto px-7 md:px-12 pt-9 pb-32">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Our Products
          </h1>
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <div className="w-full">
        <div className="container mx-auto px-7 md:px-12 pt-9 pb-32">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Our Products
          </h1>
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="container mx-auto px-7 md:px-12 pt-9 pb-32">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Our Products
        </h1>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Filter size={18} />
              <span className="font-medium">Filter Products</span>
            </button>
          </div>

          {/* Desktop Sidebar */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="hidden md:block">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                maxPrice={maxPrice}
                availabilityFilter={availabilityFilter}
                onAvailabilityChange={setAvailabilityFilter}
                isMobileOpen={false}
                onMobileClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>

          {/* Mobile Sidebar */}
          {isMobileFilterOpen && (
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setIsMobileFilterOpen(false);
              }}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
              availabilityFilter={availabilityFilter}
              onAvailabilityChange={setAvailabilityFilter}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Product Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-lg">×</span>
                  </button>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory && (
                  <span className="ml-1">in "{selectedCategory}"</span>
                )}
                {searchQuery && (
                  <span className="ml-1">for "{searchQuery}"</span>
                )}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg sm:text-xl font-medium mb-3">
                    No products found
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Try adjusting your filters
                    {searchQuery && " or search terms"} to find what you're
                    looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, maxPrice]);
                      setAvailabilityFilter([]);
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
