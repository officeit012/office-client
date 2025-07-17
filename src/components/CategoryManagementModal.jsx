import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Tag,
  Package,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/categories";
import { toast } from "sonner";

const CategoryManagementModal = ({
  isOpen,
  onClose,
  products,
  onUpdateCategories,
}) => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          setLoading(true);
          const backendCategories = await getCategories();

          // Add product count to each category
          const categoriesWithCounts = backendCategories.map((category) => ({
            id: category._id,
            name: category.name,
            productCount: products.filter(
              (product) => product.category === category.name
            ).length,
            isDefault: true,
          }));

          setCategories(categoriesWithCounts);
        } catch (error) {
          console.error("Error fetching categories:", error);
          toast.error("Failed to load categories");
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }
  }, [isOpen, products]);

  const validateCategoryName = (name, excludeId = null) => {
    if (!name.trim()) {
      return "Category name is required";
    }
    if (name.trim().length < 2) {
      return "Category name must be at least 2 characters";
    }
    if (name.trim().length > 50) {
      return "Category name must be less than 50 characters";
    }
    if (
      categories.some(
        (cat) =>
          cat.name.toLowerCase() === name.trim().toLowerCase() &&
          cat.id !== excludeId
      )
    ) {
      return "Category name already exists";
    }
    return null;
  };

  const handleAddCategory = async () => {
    const error = validateCategoryName(newCategoryName);
    if (error) {
      setErrors({ newCategory: error });
      return;
    }

    try {
      setLoading(true);
      const createdCategory = await createCategory({
        name: newCategoryName.trim(),
      });

      const newCategory = {
        id: createdCategory._id,
        name: createdCategory.name,
        productCount: 0,
        isDefault: false,
      };

      setCategories((prev) => [...prev, newCategory]);
      setNewCategoryName("");
      setErrors({});

      // Notify parent component about the new category
      onUpdateCategories?.([...categories, newCategory]);
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
      setErrors({ newCategory: "Failed to add category. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setErrors({});
  };

  const handleSaveEdit = async () => {
    const error = validateCategoryName(editingName, editingId);
    if (error) {
      setErrors({ [editingId]: error });
      return;
    }

    try {
      setLoading(true);
      const updatedCategory = await updateCategory(editingId, {
        name: editingName.trim(),
      });

      const updatedCategories = categories.map((cat) =>
        cat.id === editingId ? { ...cat, name: updatedCategory.name } : cat
      );

      setCategories(updatedCategories);
      setEditingId(null);
      setEditingName("");
      setErrors({});

      // Notify parent component about the category update
      onUpdateCategories?.(updatedCategories);
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
      setErrors({
        [editingId]: "Failed to update category. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setErrors({});
  };

  const handleDeleteCategory = async (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);

    if (category.productCount > 0) {
      setErrors({
        [categoryId]: `Cannot delete category with ${category.productCount} products`,
      });
      return;
    }

    try {
      setLoading(true);
      await deleteCategory(categoryId);

      const updatedCategories = categories.filter(
        (cat) => cat.id !== categoryId
      );
      setCategories(updatedCategories);
      setDeleteConfirm(null);
      setErrors({});

      // Notify parent component about the category deletion
      onUpdateCategories?.(updatedCategories);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
      setErrors({
        [categoryId]: "Failed to delete category. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEditingId(null);
    setEditingName("");
    setNewCategoryName("");
    setErrors({});
    setDeleteConfirm(null);
    onClose();
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    } else if (e.key === "Escape") {
      if (editingId) {
        handleCancelEdit();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Tag className="w-6 h-6 text-purple-600" />
            Manage Categories
          </DialogTitle>
          <DialogDescription>
            Add, edit, or remove product categories. Categories with products
            cannot be deleted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Category Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Plus className="w-5 h-5 text-green-600" />
              Add New Category
            </h3>

            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label
                  htmlFor="newCategory"
                  className="text-sm font-medium text-gray-700"
                >
                  Category Name
                </Label>
                <Input
                  id="newCategory"
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    if (errors.newCategory) {
                      setErrors((prev) => ({ ...prev, newCategory: "" }));
                    }
                  }}
                  onKeyDown={(e) => handleKeyPress(e, handleAddCategory)}
                  placeholder="Enter new category name..."
                  className={`mt-1 ${
                    errors.newCategory ? "border-red-500" : ""
                  }`}
                  disabled={loading}
                />
                {errors.newCategory && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newCategory}
                  </p>
                )}
              </div>
              <Button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim() || loading}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4" />
                {loading ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </div>

          {/* Categories List Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Package className="w-5 h-5 text-purple-600" />
              Existing Categories ({categories.length})
            </h3>

            {loading && categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No categories found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Tag className="w-5 h-5 text-white" />
                      </div>

                      {editingId === category.id ? (
                        <div className="flex-1 max-w-xs">
                          <Input
                            value={editingName}
                            onChange={(e) => {
                              setEditingName(e.target.value);
                              if (errors[category.id]) {
                                setErrors((prev) => ({
                                  ...prev,
                                  [category.id]: "",
                                }));
                              }
                            }}
                            onKeyDown={(e) => handleKeyPress(e, handleSaveEdit)}
                            className={`${
                              errors[category.id] ? "border-red-500" : ""
                            }`}
                            autoFocus
                            disabled={loading}
                          />
                          {errors[category.id] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[category.id]}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {category.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {category.productCount}{" "}
                            {category.productCount === 1
                              ? "product"
                              : "products"}
                            {category.isDefault && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {editingId === category.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-8 px-3 bg-green-600 hover:bg-green-700"
                            disabled={loading}
                          >
                            <Save className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                            className="h-8 px-3"
                            disabled={loading}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartEdit(category)}
                            className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            disabled={loading}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          {deleteConfirm === category.id ? (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                                className="h-8 px-3 bg-red-600 hover:bg-red-700 text-xs"
                                disabled={loading}
                              >
                                {loading ? "Deleting..." : "Confirm"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeleteConfirm(null)}
                                className="h-8 px-3 text-xs"
                                disabled={loading}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDeleteConfirm(category.id)}
                              disabled={category.productCount > 0 || loading}
                              className={`h-8 px-3 ${
                                category.productCount > 0
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-700 hover:bg-red-50"
                              }`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warning Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-medium text-orange-800 mb-1">
                  Important Notes:
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Categories with existing products cannot be deleted</li>
                  <li>
                    • Renaming a category will update all associated products
                  </li>
                  <li>
                    • Category names must be unique and between 2-50 characters
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button onClick={handleClose} variant="outline" className="px-6 py-2">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryManagementModal;
