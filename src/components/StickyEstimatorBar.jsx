import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function StickyEstimatorBar({ cartItems, onOpenCart }) {
  const totalProductsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const netPayable = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 w-full bg-[#2b4ba2] text-white px-3 py-2 shadow-2xl border-t-2 border-blue-900">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
        {/* Top Stats Inputs Row */}
        <div className="w-full flex items-center justify-between gap-4 text-sm font-bold">
          <div className="flex items-center gap-2">
            <span>Products :</span>
            <input
              type="text"
              readOnly
              value={totalProductsCount}
              className="w-24 sm:w-32 bg-[#b4c6e7] text-slate-950 font-extrabold text-center py-1 px-2 rounded-sm border border-blue-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span>Overall Total :</span>
            <input
              type="text"
              readOnly
              value={netPayable}
              className="w-24 sm:w-32 bg-[#b4c6e7] text-slate-950 font-extrabold text-center py-1 px-2 rounded-sm border border-blue-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Center Cart Icon Button */}
        <button
          onClick={onOpenCart}
          className="bg-white hover:bg-slate-100 text-[#2b4ba2] p-2.5 rounded-lg border-2 border-blue-900 shadow-md transition-all active:scale-95 cursor-pointer mt-1"
          title="View Order Estimate"
          aria-label="View Order Estimate"
        >
          <ShoppingCart className="w-7 h-7 text-[#2b4ba2] stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
