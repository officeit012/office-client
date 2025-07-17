import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  availabilityFilter,
  onAvailabilityChange,
  isMobileOpen,
  onMobileClose,
}) => {
  const availabilityOptions = ["All", "In Stock", "Out of Stock"];

  const handleAvailabilityChange = (availability) => {
    if (availability === "All") {
      onAvailabilityChange([]);
    } else {
      onAvailabilityChange([availability]);
    }
  };

  const clearAllFilters = () => {
    onCategoryChange(null);
    onPriceRangeChange([0, maxPrice]);
    onAvailabilityChange([]); // This sets to "All" by default
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              !selectedCategory
                ? "bg-purple-100 text-purple-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={onPriceRangeChange}
              min={0}
              max={maxPrice}
              step={1}
              className="w-full [&_[data-slot='slider-track']]:bg-gray-200 [&_[data-slot='slider-range']]:bg-purple-700 [&_[data-slot='slider-thumb']]:border-purple-700 [&_[data-slot='slider-thumb']]:ring-purple-700/50"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Rs. {priceRange[0]}</span>
            <span>Rs. {priceRange[1]}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) =>
                onPriceRangeChange([Number(e.target.value), priceRange[1]])
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], Number(e.target.value)])
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Availability</h3>
        <RadioGroup
          value={
            availabilityFilter.length === 0
              ? "All"
              : availabilityFilter[0] || "All"
          }
          onValueChange={handleAvailabilityChange}
        >
          {availabilityOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <RadioGroupItem
                value={option}
                id={`availability-${option}`}
                className="border-gray-300 text-purple-700 focus-visible:ring-purple-700/50 data-[state=checked]:border-purple-700 data-[state=checked]:text-purple-700 [&_[data-slot='radio-group-indicator']_.lucide-circle]:fill-purple-700"
              />
              <label
                htmlFor={`availability-${option}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Clear Filters */}
      <div>
        <button
          onClick={clearAllFilters}
          className="w-full px-4 py-2 text-sm text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  // Desktop version
  if (!isMobileOpen) {
    return (
      <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm border">
        {sidebarContent}
      </div>
    );
  }

  // Mobile full-screen version
  return (
    <div className="fixed inset-0 z-50 md:hidden bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0">
        <h2 className="text-lg font-semibold">Filter Products</h2>
        <button
          onClick={onMobileClose}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-8 pb-24">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-3">
              <button
                onClick={() => onCategoryChange(null)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                  !selectedCategory
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-base ${
                    selectedCategory === category
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="space-y-6">
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={onPriceRangeChange}
                  min={0}
                  max={maxPrice}
                  step={1}
                  className="w-full [&_[data-slot='slider-track']]:bg-gray-200 [&_[data-slot='slider-range']]:bg-purple-700 [&_[data-slot='slider-thumb']]:border-purple-700 [&_[data-slot='slider-thumb']]:ring-purple-700/50"
                />
              </div>
              <div className="flex justify-between text-base font-medium text-gray-700">
                <span>Rs. {priceRange[0]}</span>
                <span>Rs. {priceRange[1]}</span>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      onPriceRangeChange([
                        Number(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Min"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      onPriceRangeChange([
                        priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Availability</h3>
            <RadioGroup
              value={
                availabilityFilter.length === 0
                  ? "All"
                  : availabilityFilter[0] || "All"
              }
              onValueChange={handleAvailabilityChange}
              className="space-y-1"
            >
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option}
                    id={`availability-mobile-${option}`}
                    className="h-5 w-5 border-gray-300 text-purple-700 focus-visible:ring-purple-700/50 data-[state=checked]:border-purple-700 data-[state=checked]:text-purple-700 [&_[data-slot='radio-group-indicator']_.lucide-circle]:fill-purple-700 [&_[data-slot='radio-group-indicator']_.lucide-circle]:w-3 [&_[data-slot='radio-group-indicator']_.lucide-circle]:h-3"
                  />
                  <label
                    htmlFor={`availability-mobile-${option}`}
                    className="text-base text-gray-700 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="flex-shrink-0 p-4 bg-white border-t">
        <button
          onClick={clearAllFilters}
          className="w-full px-6 py-4 text-base text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors font-medium"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
