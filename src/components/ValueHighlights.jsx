import React from 'react';
import { Tag, PackageCheck, ShieldCheck } from 'lucide-react';

export default function ValueHighlights() {
  const highlights = [
    {
      id: 1,
      icon: <Tag className="w-6 h-6 text-amber-400" />,
      bg: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
      title: 'Up to 80% off',
      desc: 'Direct Sivakasi factory pricing on every category'
    },
    {
      id: 2,
      icon: <PackageCheck className="w-6 h-6 text-cyan-400" />,
      bg: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
      title: 'Live stock',
      desc: 'Real availability, no surprise cancellations'
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      bg: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
      title: 'Safe handling',
      desc: 'Licensed storage and careful moisture-proof packing'
    }
  ];

  return (
    <section className="w-full bg-[#120e22] border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {highlights.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.bg} border shrink-0`}>
              {item.icon}
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-normal mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
