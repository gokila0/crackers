import React from 'react';
import { ShoppingBag, ArrowRight, Receipt } from 'lucide-react';

export default function StickyEstimatorBar({ cartItems, onOpenCart }) {
  const totalProductsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const netPayable = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grossOriginal = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price * 5) * item.quantity, 0);
  const totalSavings = Math.max(0, grossOriginal - netPayable);

  // Bar stays permanently visible on page load even with 0 items

  return (
    <div className="sticky top-0 z-40 w-full bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 border-b-2 border-yellow-400 shadow-2xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-white">
        
        {/* Selected Products Count */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 shadow-sm">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-red-900 shadow-md animate-pulse">
              {totalProductsCount}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-amber-200 uppercase font-black tracking-wider">
              Products Selected
            </span>
            <span className="text-sm sm:text-base font-black text-yellow-300">
              {totalProductsCount} {totalProductsCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        {/* Overall Total Amount */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right sm:text-left">
            <span className="text-[10px] text-amber-200 uppercase font-black tracking-wider">
              Overall Total (80% Off)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-2xl font-black text-yellow-300 font-mono">
                ₹{netPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Quick Order / View Estimate Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 border border-yellow-300"
          >
            <Receipt className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span className="hidden sm:inline">View Estimate / Order</span>
            <span className="sm:hidden">Order</span>
            <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}
