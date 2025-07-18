import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Check,
  AlertTriangle,
  Search,
  ArrowRight,
  Package,
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-16 pb-24">
        <div className="container mx-auto px-7 md:px-12">
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
      <div className="bg-gray-50 min-h-screen pt-16 pb-24">
        <div className="container mx-auto px-7 md:px-12">
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

  // Product Not Found Page
  if (!product) {
    return (
      <div className="bg-gray-50 flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Icon Section */}
          <div className="text-center">
            <div className="mx-auto h-24 w-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-purple-600" />
            </div>

            {/* Main Content */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn't find the product you're looking for. It may
              have been removed or the link might be incorrect.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Products
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Go Home
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discount > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discount) / product.price) * 100)
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-24">
      <div className="container mx-auto px-7 md:px-12">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="h-64 lg:h-96 lg:h-[500px] relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {hasDiscount && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{discountPercentage}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                {hasDiscount ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl lg:text-3xl font-bold text-red-600">
                      Rs. {formatPrice(product.discount)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Rs. {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.availability === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : product.availability === "Out of Stock"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {product.availability === "In Stock" ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mr-1" />
                  )}
                  {product.availability}
                </div>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-gray-200"
                    >
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  disabled={product.availability === "Out of Stock"}
                  onClick={() => {
                    if (product.availability === "In Stock") {
                      navigate(
                        `/contact?subject=${encodeURIComponent(
                          `About ${product.name}`
                        )}&focus=name`
                      );
                    }
                  }}
                  className={`flex items-center justify-center text-center py-3 px-6 rounded-md font-medium transition-colors ${
                    product.availability === "In Stock"
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.availability === "In Stock"
                    ? "Contact for Quote"
                    : "Out of Stock"}
                </button>
                <Link
                  to={`/products?category=${encodeURIComponent(
                    product.category
                  )}`}
                  className="flex items-center justify-center text-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  View Similar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
