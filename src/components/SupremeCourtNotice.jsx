import React from 'react';

export default function SupremeCourtNotice() {
  return (
    <div className="w-full bg-[#a81c3b] text-white py-5 px-4 text-center shadow-md border-b-2 border-red-900">
      <div className="max-w-2xl mx-auto space-y-0.5">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight leading-snug">
          Minimum Order 3000
        </h2>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight leading-snug">
          Rupees Only/-
        </h2>
        <p className="text-xl sm:text-3xl font-extrabold text-white pt-1">
          80% Discount
        </p>
      </div>
    </div>
  );
}
