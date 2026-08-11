import React from 'react';
import { AlertTriangle, Tag, Sparkles } from 'lucide-react';

export default function SupremeCourtNotice() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      {/* Lana Crackers 80% Discount Banner */}
      <div className="bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 border border-amber-500/40 rounded-2xl p-4 text-center text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Festival Offer</span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-amber-300 font-extrabold text-lg sm:text-2xl tracking-tight block sm:inline">
              MINIMUM ORDER ₹3,000 ONLY/-
            </span>
            <span className="hidden sm:inline mx-3 text-amber-400/60 font-light">•</span>
            <span className="text-white font-extrabold text-base sm:text-xl text-amber-200">
              80% FLAT DISCOUNT ON ALL ITEMS
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs bg-black/40 px-3 py-1 rounded-xl border border-amber-400/30">
            <Tag className="w-3.5 h-3.5" />
            <span>Sivakasi Factory Rate</span>
          </div>
        </div>
      </div>

    </div>
  );
}
