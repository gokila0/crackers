import React from 'react';

export default function MinimumOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Orange Circle Exclamation Icon */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full border-[3px] border-[#f8ad74]/80 flex items-center justify-center text-[#f8ad74]">
          <span className="text-5xl sm:text-6xl font-light leading-none select-none font-sans">!</span>
        </div>

        {/* Message Content */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#333333] tracking-tight">
            Minimum Order ₹3,000
          </h3>
          <p className="text-sm sm:text-base text-[#666666] font-normal">
            Please add more products to continue.
          </p>
        </div>

        {/* OK Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-[#635bff] hover:bg-[#5249e0] active:scale-95 text-white font-semibold text-sm rounded-lg shadow-md transition-all cursor-pointer min-w-[90px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
