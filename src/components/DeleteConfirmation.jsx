import React, { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DeleteConfirmation = ({
  onConfirm,
  itemName,
  triggerClassName = "",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children || (
          <button
            className={`text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors ${triggerClassName}`}
          >
            <Trash2 size={18} />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-80 sm:w-96"
        align="center"
        side="top"
        sideOffset={8}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="text-sm text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-900">"{itemName}"</span>?{" "}
            This will permanently remove the product from your inventory.
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteConfirmation;
