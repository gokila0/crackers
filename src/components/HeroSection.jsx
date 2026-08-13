import React from 'react';
import { ArrowRight, Tag, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import FireworksCanvas from './FireworksCanvas';

export default function HeroSection({ onShopNow, onViewOffers }) {
  return (
    <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#0c081c] overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* Dynamic Animated Fireworks Canvas & Temple Backdrop */}
      <FireworksCanvas />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto lg:mx-0 lg:ml-12 xl:ml-20 space-y-6">

        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-400/60 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-amber-500/10 animate-pulse">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>PRICE LIST - 2026 • 80% MEGA DISCOUNT</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Om Aadhishivam <span className="text-festive-gradient drop-shadow-md">Crackers</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          Direct from Sivakasi factory — Madathupatti - Sattur Main Road, Madathupatti. Explore 133+ varieties across 20 categories with guaranteed <span className="text-amber-400 font-bold">80% Wholesale Discount</span>!
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Shop Now Primary Button */}
          <button
            onClick={onShopNow}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/30 hover:shadow-orange-500/40 flex items-center gap-2.5 transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            <span>View 2026 Price List</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* WhatsApp Direct Inquiry Button */}
          <a
            href="https://wa.me/917806853112?text=Hello%20Om%20Aadhishivam%20Crackers,%20I%20want%20to%20inquire%20about%20the%202026%20Crackers%20Price%20List"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-base border border-emerald-400/40 backdrop-blur-md transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg flex items-center gap-2"
          >
            <span>WhatsApp Quick Order</span>
          </a>
        </div>

        {/* Contact Numbers Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-300 font-bold">
          <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">📱 84892 73614</span>
          <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">📱 78068 53112</span>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" /> 100% Genuine Sivakasi Quality
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> CSIR-NEERI Green Certified
          </span>
        </div>
      </div>
    </section>
  );
}
