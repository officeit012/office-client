import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Package,
  Image,
  Tag,
  DollarSign,
  FileText,
  Settings,
  Upload,
  X,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProductModal = ({
  isOpen,
  onClose,
  onAddProduct,
  products,
  availableCategories,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    image: "",
    description: "",
    availability: "In Stock",
    specs: {},
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [specFields, setSpecFields] = useState([{ key: "", value: "" }]);

  const [errors, setErrors] = useState({});

  // Use availableCategories prop if provided, otherwise fallback to extracting from products
  const categories =
    availableCategories ||
    (products
      ? [...new Set(products.map((product) => product.category))]
      : ["Computers", "Printers", "Networking", "Software", "Accessories"]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select an image file" }));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 5MB",
      }));
      return;
    }

    setSelectedFile(file);

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Clear any previous errors
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedFile) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(
        "http://localhost:8000/api/products/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      setErrors((prev) => ({
        ...prev,
        image: "Failed to upload image. Please try again.",
      }));
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecFields = [...specFields];
    newSpecFields[index][field] = value;
    setSpecFields(newSpecFields);

    // Update formData specs
    const newSpecs = {};
    newSpecFields.forEach((spec) => {
      if (spec.key && spec.value) {
        newSpecs[spec.key] = spec.value;
      }
    });
    setFormData((prev) => ({
      ...prev,
      specs: newSpecs,
    }));
  };

  const addSpecField = () => {
    setSpecFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeSpecField = (index) => {
    if (specFields.length > 1) {
      const newSpecFields = specFields.filter((_, i) => i !== index);
      setSpecFields(newSpecFields);

      // Update formData specs
      const newSpecs = {};
      newSpecFields.forEach((spec) => {
        if (spec.key && spec.value) {
          newSpecs[spec.key] = spec.value;
        }
      });
      setFormData((prev) => ({
        ...prev,
        specs: newSpecs,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!selectedFile) newErrors.image = "Product image is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // Validate discount
    if (formData.discount && parseFloat(formData.discount) < 0) {
      newErrors.discount = "Discount cannot be negative";
    }
    if (
      formData.discount &&
      parseFloat(formData.discount) >= parseFloat(formData.price)
    ) {
      newErrors.discount = "Discount must be less than price";
    }

    // Validate at least one spec
    const hasValidSpecs = specFields.some(
      (spec) => spec.key.trim() && spec.value.trim()
    );
    if (!hasValidSpecs) {
      newErrors.specs = "At least one specification is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // First upload the image to Cloudinary
      const imageUrl = await uploadImageToCloudinary();
      if (!imageUrl) {
        // Error already set in uploadImageToCloudinary
        return;
      }

      // Prepare product data for backend (no need to generate ID, backend handles it)
      const newProduct = {
        ...formData,
        image: imageUrl, // Use the uploaded image URL
        price: parseFloat(formData.price),
        discount: formData.discount ? parseFloat(formData.discount) : 0,
        featured: false, // New products are not featured by default
      };

      onAddProduct(newProduct);
      handleClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      setErrors((prev) => ({
        ...prev,
        image: "Failed to create product. Please try again.",
      }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      discount: "",
      category: "",
      image: "",
      description: "",
      availability: "In Stock",
      specs: {},
    });
    setSpecFields([{ key: "", value: "" }]);
    setSelectedFile(null);
    setImagePreview(null);
    setUploadingImage(false);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Package className="w-6 h-6 text-purple-600" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Tag className="w-5 h-5 text-purple-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., ThinkPad X1 Carbon"
                  className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <DollarSign className="w-5 h-5 text-green-600" />
              Pricing & Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price (Rs.) *
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`mt-1 ${errors.price ? "border-red-500" : ""}`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="discount"
                  className="text-sm font-medium text-gray-700"
                >
                  Discount Price (Rs.)
                </Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="0.00 (optional)"
                  className={`mt-1 ${errors.discount ? "border-red-500" : ""}`}
                />
                {errors.discount && (
                  <p className="text-red-500 text-xs">{errors.discount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="availability"
                  className="text-sm font-medium text-gray-700"
                >
                  Availability
                </Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, availability: value }))
                  }
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      errors.availability ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                {errors.availability && (
                  <p className="text-red-500 text-xs">{errors.availability}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <FileText className="w-5 h-5 text-blue-600" />
              Product Details
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Image className="w-4 h-4 inline mr-1" />
                  Product Image *
                </Label>

                {!selectedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-blue-400 hover:bg-blue-50 ${
                      errors.image
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">
                      Drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG, GIF (Max 5MB)
                    </p>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative bg-gradient-to-r from-slate-200 to-stone-100 rounded-lg p-4 border border-zinc-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ready to upload
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeSelectedFile}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed description of the product..."
                  className={`min-h-[100px] mt-1 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Settings className="w-5 h-5 text-orange-600" />
              Product Specifications
            </h3>

            <div className="space-y-3">
              {specFields.map((spec, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700">
                      Specification Name
                    </Label>
                    <Input
                      value={spec.key}
                      onChange={(e) =>
                        handleSpecChange(index, "key", e.target.value)
                      }
                      placeholder="e.g., Memory, Storage, Model, Battery, Resolution"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700">
                      Specification Value
                    </Label>
                    <Input
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                      }
                      placeholder="e.g., Intel Core i7, 16GB DDR4"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSpecField(index)}
                    disabled={specFields.length === 1}
                    className="h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {errors.specs && (
                <p className="text-red-500 text-xs">{errors.specs}</p>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={addSpecField}
                className="mt-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Specification
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={uploadingImage}
              className="px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Add Product
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
