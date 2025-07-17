import { Info, Star, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FeaturedProductsInfoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200">
          <Info size={20} className="text-gray-500 hover:text-purple-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Info className="w-5 h-5 text-purple-600" />
            Important Notes
          </DialogTitle>
          <DialogDescription className="mx-1 text-sm mb-0.5">
            Please read carefully to understand how the featured products system
            works.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 text-sm text-gray-600">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h2 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 ml-1" />
              Featured Products Logic
            </h2>
            <div className="space-y-4 text-amber-800">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  You can toggle{" "}
                  <span className="font-semibold">
                    0 to 8 featured products
                  </span>{" "}
                  at any time.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  The{" "}
                  <span className="font-semibold">
                    Featured Products section
                  </span>{" "}
                  on the homepage will only be visible when{" "}
                  <span className="font-semibold">4 or more products</span> are
                  featured.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  If you have{" "}
                  <span className="font-semibold">
                    0, 1, 2, or 3 featured products
                  </span>
                  , the section will be automatically hidden from visitors.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-amber-100 rounded-full text-xs flex-shrink-0 mt-0.5">
                  4
                </span>
                <p>
                  <span className="font-semibold">Maximum limit:</span> You
                  cannot feature more than 8 products. Attempting to exceed this
                  limit will show an error message.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h2 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600 ml-1" />
              Visibility Examples
            </h2>
            <div className="space-y-2 text-blue-800 text-xs">
              <div className="flex items-center justify-between bg-white rounded p-2 mx-0.5">
                <span>0-3 Featured Products</span>
                <div className="flex items-center gap-1 text-red-600">
                  <EyeOff className="w-3 h-3" />
                  <span className="text-xs">Hidden</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white rounded p-2 mx-0.5">
                <span>4+ Featured Products</span>
                <div className="flex items-center gap-1 text-green-600">
                  <Eye className="w-3 h-3" />
                  <span className="text-xs">Visible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeaturedProductsInfoModal;
