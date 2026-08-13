import React from 'react';
import { X, ShoppingCart, Star, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#161224] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden text-slate-100 z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 pt-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.discount}</span>
            </div>
            {product.tamilName && (
              <div className="text-amber-300 text-sm font-semibold mb-1">
                {product.tamilName}
              </div>
            )}
            <h3 className="text-2xl font-bold text-white font-serif-brand">{product.name}</h3>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white/[0.02] space-y-1">
            <span className="text-slate-400 block text-[10px]">Packing Unit</span>
            <span className="text-white font-bold">{product.unit}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.02] space-y-1">
            <span className="text-slate-400 block text-[10px]">Safety Grade</span>
            <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Green
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.02] space-y-1">
            <span className="text-slate-400 block text-[10px]">Sub-Category</span>
            <span className="text-amber-300 font-bold text-[11px] truncate block">
              {product.subCategoryName || product.groupName}
            </span>
          </div>
        </div>

        {/* Product Description */}
        <p className="text-slate-300 text-sm leading-relaxed">
          {product.desc}
        </p>

        {/* Pricing & Add to Cart */}
        <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/5">
          <div>
            {product.originalPrice > 0 && (
              <span className="text-xs text-slate-500 line-through block">Market Price: ₹{product.originalPrice}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-amber-400">₹{product.price}</span>
              <span className="text-xs text-slate-400">/ {product.unit}</span>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
