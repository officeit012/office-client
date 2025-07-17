import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getFeaturedProducts } from "@/lib/products";

const FeaturedProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-7">
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  // Don't show section if error occurred
  if (error) {
    return null;
  }

  // Only show featured section if 4 or more products are featured (minimum 4, maximum 8)
  if (featuredProducts.length < 4) {
    return null;
  }

  // Dynamic grid layout based on number of featured products
  const getGridColumns = (count) => {
    if (count === 4) return "lg:grid-cols-4";
    if (count === 5) return "lg:grid-cols-5";
    if (count === 6) return "lg:grid-cols-3 2xl:grid-cols-6"; // 3x2 for 1024px-1535px, 6x1 for 1536px+
    if (count === 7) return "lg:grid-cols-4"; // 4 + 3 layout
    if (count === 8) return "lg:grid-cols-4"; // 4 + 4 layout
    return "lg:grid-cols-4"; // fallback
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-7">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-10 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-purple-700 font-medium hover:text-purple-900 inline-flex items-center transition-colors duration-200 self-start sm:self-auto"
          >
            View all products <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${getGridColumns(
            featuredProducts.length
          )} gap-4 sm:gap-6`}
        >
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
