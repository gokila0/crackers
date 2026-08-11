import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function SafetyTipsSection() {
  const dos = [
    "Always buy firecrackers from authorized licensed Sivakasi dealers.",
    "Store fireworks in a cool, dry place away from heat and electric outlets.",
    "Always wear 100% cotton clothing while handling or lighting fireworks.",
    "Keep a bucket of clean water or sand ready near the lighting area.",
    "Ignite crackers outdoors in open spaces, away from dry grass or trees.",
    "Light only one cracker at a time and maintain a safe distance.",
    "Ensure strict adult supervision for children at all times."
  ];

  const donts = [
    "Never attempt to relight a dud or unexploded firecracker.",
    "Do not light crackers while holding them in your hand.",
    "Never ignite fireworks inside enclosed rooms, balconies, or near vehicles.",
    "Avoid wearing synthetic, loose, or nylon clothes while lighting crackers.",
    "Do not carry firecrackers in your pockets.",
    "Never throw crackers at people, animals, or passing vehicles.",
    "Do not store crackers near kitchen gas cylinders or flammable liquids."
  ];

  return (
    <section id="safety" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 border-t border-amber-200">
      
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-black uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Safety Precautions</span>
        </div>
        <h2 className="font-serif-brand text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
          Fire Safety Guidelines
        </h2>
        <p className="text-amber-900 font-bold text-xs sm:text-sm">
          Simple precautions to keep your family safe during festival celebrations
        </p>
      </div>

      {/* Grid of Do's & Don'ts (HIGH CONTRAST LIGHT THEME & SIMPLE ENGLISH) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DO'S Card */}
        <div className="bg-emerald-50/90 border-2 border-emerald-400 rounded-3xl p-6 space-y-4 shadow-md">
          <div className="flex items-center gap-3 border-b border-emerald-300 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-950">DO'S</h3>
              <p className="text-xs font-bold text-emerald-800">Recommended safety practices</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm font-extrabold text-emerald-950">
            {dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 stroke-[3]" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'TS Card */}
        <div className="bg-rose-50/90 border-2 border-rose-400 rounded-3xl p-6 space-y-4 shadow-md">
          <div className="flex items-center gap-3 border-b border-rose-300 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-red-700 flex items-center justify-center text-white shadow-sm">
              <XCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-red-950">DON'TS</h3>
              <p className="text-xs font-bold text-red-800">Strictly avoid these actions</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm font-extrabold text-red-950">
            {donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5 stroke-[3]" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </section>
  );
}
