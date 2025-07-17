import React, { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp, Star } from "lucide-react";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const ProductTable = ({
  products,
  onDeleteProduct,
  onEditProduct,
  onSort,
  sortField,
  sortDirection,
  onToggleFeatured,
}) => {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const handleFeaturedToggle = (productId, currentFeaturedState) => {
    const featuredCount = products.filter((p) => p.featured).length;

    if (!currentFeaturedState) {
      // Trying to feature a product
      if (featuredCount >= 8) {
        toast.error("Maximum of 8 products can be featured at a time");
        return;
      }
    }

    onToggleFeatured(productId);

    if (!currentFeaturedState) {
      toast.success("Product added to featured section");
    } else {
      toast.success("Product removed from featured section");
    }
  };

  const handleRowClick = (productId) => {
    if (expandedProductId === productId) {
      // Collapse if already expanded
      setExpandedProductId(null);
    } else {
      // Expand this row (and collapse any other)
      setExpandedProductId(productId);
    }
  };

  const SortableHeader = ({ field, children, className = "" }) => {
    const isActive = sortField === field;
    const isDesc = isActive && sortDirection === "desc";

    return (
      <th
        scope="col"
        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none ${className}`}
        onClick={() => onSort(field)}
      >
        <div className="flex items-center justify-between group">
          <span>{children}</span>
          <ChevronDown
            size={14}
            className={`transform transition-transform duration-300 ease-in-out ${
              isActive
                ? isDesc
                  ? "rotate-180 text-purple-600"
                  : "rotate-0 text-purple-600"
                : "rotate-0 text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </div>
      </th>
    );
  };

  const ExpandedProductDetails = ({ product }) => (
    <tr className="bg-gray-50">
      <td colSpan="6" className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image and Basic Info */}
            <div className="space-y-4">
              <div className="aspect-square w-full max-w-md mx-auto lg:mx-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Product Details and Specifications */}
            <div className="space-y-6">
              {/* Price and Availability */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Pricing & Availability
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <div className="text-right">
                      {product.discount > 0 ? (
                        <div className="space-y-1">
                          <span className="line-through text-gray-500 text-sm">
                            Rs. {formatPrice(product.price)}
                          </span>
                          <div className="text-purple-600 font-bold text-lg">
                            Rs. {formatPrice(product.discount)}
                          </div>
                          <div className="text-xs text-green-600">
                            Save Rs.
                            {formatPrice(product.price - product.discount)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-900 font-bold text-lg">
                          Rs. {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900 font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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

              {/* Technical Specifications */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Technical Specifications
                </h4>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start">
                      <span className="text-gray-600 capitalize flex-shrink-0 mr-4">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-gray-900 text-right flex-1">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product ID */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="text-gray-900 font-mono text-sm">
                    {product.productId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <SortableHeader field="name">Product</SortableHeader>
              <SortableHeader field="category">Category</SortableHeader>
              <SortableHeader field="price">Price</SortableHeader>
              <SortableHeader field="availability">Availability</SortableHeader>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <tr
                  className={`cursor-pointer transition-all duration-200 ease-in-out hover:bg-blue-50 hover:shadow-sm ${
                    expandedProductId === product._id
                      ? "bg-blue-100 shadow-md"
                      : ""
                  }`}
                  onClick={() => handleRowClick(product._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            {expandedProductId === product._id ? (
                              <ChevronUp
                                size={16}
                                className="text-gray-400 transition-transform duration-200"
                              />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-gray-400 transition-transform duration-200"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.discount > 0 ? (
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500 text-xs">
                            Rs. {formatPrice(product.price)}
                          </span>
                          <span className="text-purple-600 font-medium">
                            Rs. {formatPrice(product.discount)}
                          </span>
                        </div>
                      ) : (
                        `Rs. ${formatPrice(product.price)}`
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.availability === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : product.availability === "Out of Stock"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.featured}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleFeaturedToggle(product._id, product.featured);
                          }}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        <Star
                          size={16}
                          className={`ml-2 transition-colors ${
                            product.featured
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProduct(product);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4 p-1 hover:bg-blue-100 rounded transition-colors z-10 relative"
                    >
                      <Edit size={18} />
                    </button>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block"
                    >
                      <DeleteConfirmation
                        onConfirm={() => onDeleteProduct(product._id)}
                        itemName={product.name}
                      />
                    </div>
                  </td>
                </tr>
                {expandedProductId === product._id && (
                  <ExpandedProductDetails product={product} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className={`bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 ease-in-out ${
              expandedProductId === product._id
                ? "shadow-lg border-purple-200"
                : "hover:shadow-md hover:border-gray-300"
            }`}
          >
            {/* Main Product Row - Clean and Simple */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => handleRowClick(product._id)}
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <div className="h-16 w-16 flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm [@media(min-width:570px)]:text-base font-semibold text-gray-900 truncate pr-2">
                        {product.name}
                      </h3>
                      <p className="text-xs [@media(min-width:570px)]:text-sm text-gray-500 mt-1">
                        {product.category}
                      </p>
                      <div className="mt-2">
                        <div className="text-xs [@media(min-width:570px)]:text-sm font-medium text-gray-900">
                          {product.discount > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span className="line-through text-gray-400 text-xs">
                                Rs. {formatPrice(product.price)}
                              </span>
                              <span className="text-purple-600 font-semibold">
                                Rs. {formatPrice(product.discount)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-900 font-semibold">
                              Rs. {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div className="flex-shrink-0 ml-2">
                      {expandedProductId === product._id ? (
                        <ChevronUp
                          size={18}
                          className="[@media(min-width:570px)]:w-5 [@media(min-width:570px)]:h-5 text-purple-500 transition-transform duration-200"
                        />
                      ) : (
                        <ChevronDown
                          size={18}
                          className="[@media(min-width:570px)]:w-5 [@media(min-width:570px)]:h-5 text-gray-400 transition-transform duration-200"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content - Actions and Details */}
            {expandedProductId === product._id && (
              <div className="border-t border-gray-200">
                {/* Action Buttons Section */}
                <div className="px-4 py-3 bg-gray-50 rounded-b-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm [@media(min-width:570px)]:text-sm font-semibold text-gray-900">
                      Product Actions
                    </h4>
                    {product.featured && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Edit and Delete Buttons */}
                    <div className="flex items-center space-x-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProduct(product);
                        }}
                        className="flex items-center space-x-1 pl-0.5 pr-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-xs [@media(min-width:570px)]:text-sm font-medium"
                      >
                        <Edit
                          size={16}
                          className="[@media(min-width:570px)]:w-4 [@media(min-width:570px)]:h-4"
                        />
                        <span>Edit</span>
                      </button>
                      <div onClick={(e) => e.stopPropagation()}>
                        <DeleteConfirmation
                          onConfirm={() => onDeleteProduct(product._id)}
                          itemName={product.name}
                        >
                          <button className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors text-xs [@media(min-width:570px)]:text-sm font-medium">
                            <Trash2
                              size={16}
                              className="[@media(min-width:570px)]:w-4 [@media(min-width:570px)]:h-4"
                            />
                            <span>Delete</span>
                          </button>
                        </DeleteConfirmation>
                      </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.featured}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleFeaturedToggle(product._id, product.featured);
                          }}
                          className="sr-only peer"
                        />
                        <div className="relative mr-1 w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        <Star
                          size={16}
                          className={`ml-2 transition-colors ${
                            product.featured
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Product Details Section */}
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Product Image and Description */}
                    <div className="text-center">
                      <div className="aspect-square w-48 mx-auto mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <p className="text-gray-600 text-xs [@media(min-width:570px)]:text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Availability Badge */}
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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

                    {/* Pricing Details */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm [@media(min-width:570px)]:text-sm font-semibold text-gray-900 mb-2">
                        Pricing Details
                      </h4>
                      <div className="space-y-2 text-xs [@media(min-width:570px)]:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Original Price:</span>
                          <span className="text-gray-900 font-medium">
                            Rs. {formatPrice(product.price)}
                          </span>
                        </div>
                        {product.discount > 0 && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sale Price:</span>
                              <span className="text-purple-600 font-bold">
                                Rs. {formatPrice(product.discount)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">You Save:</span>
                              <span className="text-green-600 font-medium">
                                Rs.{" "}
                                {formatPrice(product.price - product.discount)}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="text-gray-900 font-medium">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm [@media(min-width:570px)]:text-sm font-semibold text-gray-900 mb-2">
                        Technical Specifications
                      </h4>
                      <div className="space-y-1 text-xs [@media(min-width:570px)]:text-sm">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-gray-900 text-right ml-2 font-medium">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Product ID */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-xs [@media(min-width:570px)]:text-sm">
                          Product ID:
                        </span>
                        <span className="text-gray-900 font-mono text-xs [@media(min-width:570px)]:text-sm">
                          {product.productId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductTable;
