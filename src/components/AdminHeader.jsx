import React from "react";
import { Link } from "react-router-dom";
import { LogOut, Plus, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const AdminHeader = ({ onAddProduct, onEditCategories }) => {
  const [isOpen, setIsOpen] = useState(false); // test
  const { user } = useUser();

  return (
    <div className="container mx-auto px-7 sm:px-6 lg:px-8 pt-11">
      {/* Mobile Header */}
      <div className="flex flex-col space-y-4 sm:hidden">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Welcome, {user?.firstName || "Admin"}
            </p>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
        <button
          onClick={onEditCategories}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
        >
          <Settings size={18} className="mr-2" />
          Edit Categories
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Welcome, {user?.firstName || "Admin"}
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onEditCategories}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
          >
            <Settings size={18} className="mr-2" />
            Edit Categories
          </button>
          <button
            onClick={onAddProduct}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
