import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/AdminHeader";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import EditProductModal from "@/components/EditProductModal";
import CategoryManagementModal from "@/components/CategoryManagementModal";
import FeaturedProductsInfoModal from "@/components/FeaturedProductsInfoModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { SignedIn } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const AdminPage = () => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

        setProductList(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products and categories. Please try again.");
        toast.error("Failed to load data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProductList((prev) => prev.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditCategories = () => {
    setIsCategoryModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  const handleAddNewProduct = async (newProduct) => {
    try {
      // Create product on backend
      const createdProduct = await createProduct(newProduct);

      // Update local state
      setProductList((prev) => [...prev, createdProduct]);

      // Add category to available categories if it's new
      if (!categories.find((cat) => cat.name === newProduct.category)) {
        setCategories((prev) => [
          ...prev,
          { name: newProduct.category, _id: Date.now().toString() },
        ]);
      }

      toast.success("Product added successfully");
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product");
    }
  };

  const handleEditProductSave = async (updatedProduct) => {
    try {
      // Update product on backend
      const savedProduct = await updateProduct(
        updatedProduct._id,
        updatedProduct
      );

      // Update local state
      setProductList((prev) =>
        prev.map((product) =>
          product._id === updatedProduct._id ? savedProduct : product
        )
      );

      // Add category to available categories if it's new
      if (!categories.find((cat) => cat.name === updatedProduct.category)) {
        setCategories((prev) => [
          ...prev,
          { name: updatedProduct.category, _id: Date.now().toString() },
        ]);
      }

      toast.success("Product updated successfully");
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product");
    }
  };

  const handleUpdateCategories = (updatedCategories) => {
    // Update the categories state
    setCategories(updatedCategories);
    toast.success("Categories updated successfully");
  };

  const handleToggleFeatured = async (productId) => {
    try {
      const product = productList.find((p) => p._id === productId);
      if (!product) return;

      const updatedProduct = {
        ...product,
        featured: !product.featured,
      };

      // Update product on backend
      const savedProduct = await updateProduct(productId, updatedProduct);

      // Update local state
      setProductList((prev) =>
        prev.map((p) => (p._id === productId ? savedProduct : p))
      );
    } catch (err) {
      console.error("Error toggling featured status:", err);
      toast.error("Failed to update featured status");
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...productList].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle string sorting
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <SignedIn>
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="container mx-auto px-7 md:px-12">
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </SignedIn>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <SignedIn>
        <div className="min-h-screen bg-gray-50 pt-16">
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
      </SignedIn>
    );
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader
          onAddProduct={handleAddProduct}
          onEditCategories={handleEditCategories}
        />
        <div className="container mx-auto px-7 sm:px-6 lg:px-8 py-6 lg:pt-8 pb-16 sm:pb-24">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      P
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Products
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {productList.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      ✓
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">In Stock</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      productList.filter((p) => p.availability === "In Stock")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-sm">
                      ✗
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      productList.filter(
                        (p) => p.availability === "Out of Stock"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      %
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">On Sale</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {productList.filter((p) => p.discount > 0).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold text-sm">
                      ★
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Featured</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {productList.filter((p) => p.featured).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Product Management Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Product Management
                    </h2>
                    <FeaturedProductsInfoModal />
                  </div>
                  <p className="text-sm text-gray-500">
                    Manage your product inventory and details
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:hidden">
                  <button
                    onClick={handleAddProduct}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                  >
                    <span className="flex items-center">
                      <Plus size={14} className="mr-2" />
                      Add Product
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {productList.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m6 0h8"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No products
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding a new product.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={handleAddProduct}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              ) : (
                <ProductTable
                  products={sortedProducts}
                  onDeleteProduct={handleDeleteProduct}
                  onEditProduct={handleEditProduct}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onToggleFeatured={handleToggleFeatured}
                />
              )}
            </div>
          </div>
        </div>

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddProduct={handleAddNewProduct}
          products={productList}
          availableCategories={categories.map((cat) => cat.name)}
        />

        {/* Edit Product Modal */}
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          onEditProduct={handleEditProductSave}
          product={selectedProduct}
          availableCategories={categories.map((cat) => cat.name)}
        />

        {/* Category Management Modal */}
        <CategoryManagementModal
          isOpen={isCategoryModalOpen}
          onClose={handleCategoryModalClose}
          products={productList}
          onUpdateCategories={handleUpdateCategories}
        />
      </div>
    </SignedIn>
  );
};

export default AdminPage;
