import React from 'react';

export default function MinimumOrderModal({ isOpen, onClose, subtotal = 0, totalOriginal = 0, minAmount = 3000 }) {
  if (!isOpen) return null;

  const remaining = Math.max(0, minAmount - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Warning Icon Circle */}
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-[3px] border-amber-500 flex items-center justify-center text-amber-600 shadow-md">
          <span className="text-4xl font-black leading-none select-none font-sans">!</span>
        </div>

        {/* Message Content */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif-brand">
            Minimum Order ₹{minAmount.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-extrabold leading-relaxed">
            Sivakasi factory wholesale orders require a minimum net amount of <span className="text-red-700 font-black">₹{minAmount.toLocaleString('en-IN')}</span> after 80% discount.
          </p>
        </div>

        {/* Amount Breakdown Card */}
        {subtotal > 0 && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs space-y-2 text-left shadow-inner">
            <div className="flex justify-between text-slate-600 font-bold">
              <span>Gross Market Price (MRP):</span>
              <span className="line-through font-mono">₹{totalOriginal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-red-800 font-black">
              <span>Your Current Net Total:</span>
              <span className="font-mono text-sm">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {remaining > 0 && (
              <div className="flex justify-between text-amber-900 font-black border-t border-amber-200 pt-2 text-xs">
                <span>Add More Products Worth:</span>
                <span className="font-mono text-red-700 font-black bg-red-100 px-2 py-0.5 rounded-md">
                  + ₹{remaining.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* OK Action Button */}
        <div className="pt-1">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 hover:from-red-600 hover:to-amber-600 active:scale-95 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Add More Products
          </button>
        </div>
      </div>
    </div>
  );
}
