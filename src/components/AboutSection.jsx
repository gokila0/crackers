import React from 'react';
import { Award, Factory, Truck, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct From Sivakasi</span>
        </div>
        <h2 className="font-serif-brand text-3xl sm:text-4xl font-black text-amber-950">
          About Om Aadhishivam Crackers
        </h2>
        <p className="text-slate-900 font-medium text-base leading-relaxed">
          Located at <span className="text-amber-900 font-extrabold">Madathupatti - Sattur Main Road, Madathupatti, Sivakasi</span>, Om Aadhishivam Crackers is your trusted hub for authentic Sivakasi fireworks. We offer direct-from-factory wholesale & retail crackers with an extraordinary <span className="text-red-700 font-black">80% Mega Discount</span> on our 2026 Price List.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-3xl bg-amber-50/90 border-2 border-amber-300 space-y-3 shadow-md">
          <Factory className="w-8 h-8 text-amber-700" />
          <h3 className="text-lg font-black text-amber-950">100% Factory Direct</h3>
          <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
            Eliminating middleman markups. Enjoy genuine wholesale prices straight from Sivakasi manufacturing facilities.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-amber-50/90 border-2 border-amber-300 space-y-3 shadow-md">
          <Award className="w-8 h-8 text-amber-700" />
          <h3 className="text-lg font-black text-amber-950">Certified Green Crackers</h3>
          <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
            Reduced emissions and lower decibels tested under CSIR-NEERI government environmental guidelines.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-amber-50/90 border-2 border-amber-300 space-y-3 shadow-md">
          <Truck className="w-8 h-8 text-amber-700" />
          <h3 className="text-lg font-black text-amber-950">Insured Dispatch</h3>
          <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
            Professional heavy transport packaging in moisture-sealed shockproof containers for pan-India delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
