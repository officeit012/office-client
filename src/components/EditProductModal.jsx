import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Package,
  Image,
  Tag,
  DollarSign,
  FileText,
  Settings,
  Edit3,
  X,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
} from "./ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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
import { cn } from "@/lib/utils";

// Custom DialogContent with significantly smoother closing transition
const CustomDialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:duration-500 data-[state=open]:duration-200 ease-in-out sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
CustomDialogContent.displayName = "CustomDialogContent";

const EditProductModal = ({
  isOpen,
  onClose,
  onEditProduct,
  product,
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

  const [specFields, setSpecFields] = useState([{ key: "", value: "" }]);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  // Use availableCategories prop if provided, otherwise fallback to default categories
  const categories = availableCategories || [
    "Computers",
    "Printers",
    "Networking",
    "Software",
    "Accessories",
  ];

  // Function to check if current data differs from original
  const checkForChanges = (currentFormData, currentSpecFields, original) => {
    if (!original) return false;

    // Check basic form fields
    if (
      currentFormData.name !== original.name ||
      currentFormData.price !== original.price?.toString() ||
      currentFormData.discount !== (original.discount?.toString() || "") ||
      currentFormData.category !== original.category ||
      currentFormData.image !== original.image ||
      currentFormData.description !== original.description ||
      currentFormData.availability !== original.availability
    ) {
      return true;
    }

    // Check specifications
    const originalSpecs = original.specs || {};
    const currentSpecs = {};
    currentSpecFields.forEach((spec) => {
      if (spec.key && spec.value) {
        currentSpecs[spec.key] = spec.value;
      }
    });

    // Compare specs objects
    const originalSpecsKeys = Object.keys(originalSpecs).sort();
    const currentSpecsKeys = Object.keys(currentSpecs).sort();

    if (originalSpecsKeys.length !== currentSpecsKeys.length) {
      return true;
    }

    for (let key of originalSpecsKeys) {
      if (originalSpecs[key] !== currentSpecs[key]) {
        return true;
      }
    }

    return false;
  };

  // Populate form when product changes
  useEffect(() => {
    if (product) {
      const initialFormData = {
        name: product.name || "",
        price: product.price?.toString() || "",
        discount: product.discount?.toString() || "",
        category: product.category || "",
        image: product.image || "",
        description: product.description || "",
        availability: product.availability || "In Stock",
        specs: product.specs || {},
      };

      setFormData(initialFormData);
      setOriginalData(product);

      // Convert specs object to array format for editing
      const specsArray = Object.entries(product.specs || {}).map(
        ([key, value]) => ({
          key,
          value,
        })
      );
      setSpecFields(
        specsArray.length > 0 ? specsArray : [{ key: "", value: "" }]
      );
      setHasChanges(false);
      setErrors({});
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    // Check for changes
    const hasActualChanges = checkForChanges(
      updatedFormData,
      specFields,
      originalData
    );
    setHasChanges(hasActualChanges);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    // Check for changes
    const hasActualChanges = checkForChanges(
      updatedFormData,
      specFields,
      originalData
    );
    setHasChanges(hasActualChanges);

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
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
    const updatedFormData = {
      ...formData,
      specs: newSpecs,
    };
    setFormData(updatedFormData);

    // Check for changes
    const hasActualChanges = checkForChanges(
      updatedFormData,
      newSpecFields,
      originalData
    );
    setHasChanges(hasActualChanges);
  };

  const addSpecField = () => {
    const newSpecFields = [...specFields, { key: "", value: "" }];
    setSpecFields(newSpecFields);

    // Check for changes
    const hasActualChanges = checkForChanges(
      formData,
      newSpecFields,
      originalData
    );
    setHasChanges(hasActualChanges);
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
      const updatedFormData = {
        ...formData,
        specs: newSpecs,
      };
      setFormData(updatedFormData);

      // Check for changes
      const hasActualChanges = checkForChanges(
        updatedFormData,
        newSpecFields,
        originalData
      );
      setHasChanges(hasActualChanges);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Create updated product object
    const updatedProduct = {
      ...product,
      ...formData,
      price: parseFloat(formData.price),
      discount: formData.discount ? parseFloat(formData.discount) : 0,
    };

    onEditProduct(updatedProduct);
    handleClose();
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
    setErrors({});
    setHasChanges(false);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <CustomDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Edit3 className="w-6 h-6 text-purple-600" />
            Edit Product
          </DialogTitle>
          <DialogDescription>
            Make changes to "{product.name}" below. All fields are editable.
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
                  htmlFor="edit-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Product Name *
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="edit-category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
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
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="edit-image"
                  className="text-sm font-medium text-gray-700"
                >
                  Image URL *
                </Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className={errors.image ? "border-red-500" : ""}
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <DollarSign className="w-5 h-5 text-green-600" />
              Pricing & Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="edit-price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price (Rs.) *
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="edit-discount"
                  className="text-sm font-medium text-gray-700"
                >
                  Discount Price (Rs.)
                </Label>
                <Input
                  id="edit-discount"
                  name="discount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="0.00 (optional)"
                  className={errors.discount ? "border-red-500" : ""}
                />
                {errors.discount && (
                  <p className="text-red-500 text-xs mt-1">{errors.discount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="edit-availability"
                  className="text-sm font-medium text-gray-700"
                >
                  Availability *
                </Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) =>
                    handleSelectChange("availability", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <FileText className="w-5 h-5 text-purple-600" />
              Product Details
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="edit-description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description *
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed product description"
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Settings className="w-5 h-5 text-orange-600" />
              Specifications
            </h3>

            <div className="space-y-4">
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
                      placeholder="e.g., Processor, RAM, Storage"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700">
                      Value
                    </Label>
                    <Input
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                      }
                      placeholder="e.g., Intel i7, 16GB, 512GB SSD"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSpecField}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    {specFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpecField(index)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {errors.specs && (
                <p className="text-red-500 text-xs mt-1">{errors.specs}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!hasChanges}
              className={
                hasChanges
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed px-5 py-2"
              }
            >
              Confirm Changes
            </Button>
          </div>
        </form>
      </CustomDialogContent>
    </Dialog>
  );
};

export default EditProductModal;
