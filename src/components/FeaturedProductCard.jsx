import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

const FeaturedProductCard = ({ product }) => {
  const hasDiscount = product.discount > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discount) / product.price) * 100)
    : 0;

  return (
    <Link to={`/products/${product._id}`} className="group h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        <div className="h-40 sm:h-48 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-sm sm:text-lg font-medium text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {product.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    Rs. {formatPrice(product.price)}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-red-600">
                    Rs. {formatPrice(product.discount)}
                  </span>
                </>
              ) : (
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  Rs. {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span
              className={`px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium ${
                product.availability === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : product.availability === "Out of Stock"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {product.availability}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProductCard;
