import React from 'react';
import { ArrowRight, Moon, Sun, Sparkles, Gift } from 'lucide-react';

export default function PromotionalOffers({ onSelectCategory }) {
  const categories = [
    {
      id: 'kids',
      title: 'Kids & Sparklers',
      subtext: '2 Categories: Kids Special & Electric Sparklers',
      desc: 'Kids Special Crackers (Pencils, Helicopter, Roll Caps, Novelties) & Electric Sparklers (7cm to 50cm & Umbrella Rotating).',
      icon: <Sparkles className="w-7 h-7 text-pink-400" />,
      color: 'from-pink-900/40 via-rose-900/30 to-amber-900/20',
      borderColor: 'group-hover:border-pink-500/60',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      badge: '2 Sub-Categories'
    },
    {
      id: 'gift-boxes',
      title: 'Gift Boxes',
      subtext: 'Complete Family Assortment Boxes',
      desc: '21 Item Silver Box (₹390), 31 Item Gold Box (₹550), 41 Item Platinum Box (₹720) & 51 Item Special Box (₹950).',
      icon: <Gift className="w-7 h-7 text-emerald-400" />,
      color: 'from-emerald-900/40 via-teal-900/30 to-amber-900/20',
      borderColor: 'group-hover:border-emerald-500/60',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      badge: 'Net Prices'
    },
    {
      id: 'day',
      title: 'Day Crackers',
      subtext: 'Loud Sound & Daytime Celebrations',
      desc: 'One Sound Crackers, Chorsa & Giant, Adiyal Paper Bombs, Sound Shell Bombs, Bijili & Garland Rolls.',
      icon: <Sun className="w-7 h-7 text-amber-400" />,
      color: 'from-amber-900/40 via-orange-900/30 to-amber-950/20',
      borderColor: 'group-hover:border-amber-500/60',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badge: '6 Sub-Categories'
    },
    {
      id: 'night',
      title: 'Night Crackers',
      subtext: 'Spectacular Night Sky Fireworks & Lights',
      desc: 'Ground Chakkar, Flower Pots, Rockets, Siren, Twinkling Star, Peacock Varieties, 2025 New Varieties, Multi Colour Shots & Fancy Single Pipes.',
      icon: <Moon className="w-7 h-7 text-cyan-400" />,
      color: 'from-purple-900/40 via-indigo-900/30 to-cyan-900/20',
      borderColor: 'group-hover:border-cyan-500/60',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      badge: '9 Sub-Categories'
    }
  ];

  return (
    <section id="offers" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="space-y-2">
        <div className="text-amber-400 text-xs font-extrabold uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Sivakasi Price List 2025 Collections</span>
        </div>
        <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Promotional Categories
        </h2>
        <p className="text-slate-300 text-base font-normal">
          Hand-picked categories structured straight from our factory price list with 80% discount.
        </p>
      </div>

      {/* 4 Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              onSelectCategory(cat.id);
              const catalogElement = document.getElementById('products');
              if (catalogElement) {
                catalogElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`group relative cursor-pointer rounded-3xl p-6 bg-[#161224] border border-white/15 ${cat.borderColor} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between min-h-[290px] overflow-hidden`}
          >
            {/* Ambient Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            {/* Top Icon & Badge */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all shadow-md">
                  {cat.icon}
                </div>
                <span className={`px-3 py-1 rounded-full border text-[11px] font-extrabold uppercase ${cat.badgeBg}`}>
                  {cat.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
                <div className="text-[11px] font-semibold text-amber-300/90 mb-2">
                  {cat.subtext}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 font-light">
                  {cat.desc}
                </p>
              </div>
            </div>

            {/* Explore Link */}
            <div className="relative z-10 pt-4 flex items-center gap-2 text-amber-400 font-bold text-sm group-hover:translate-x-1 transition-transform border-t border-white/10 mt-4">
              <span>Explore Category</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
