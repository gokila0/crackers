import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function AnnouncementBanner() {
  const items = [
    "📲 FOR QUICK ORDERS & PRICE QUOTATION WHATSAPP: +91 78068 53112 / +91 84892 73614",
    "📞 DIRECT FACTORY CALLS: +91 84892 73614 / +91 78068 53112",
    "💥 80% FLAT DISCOUNT ON ALL ITEMS • MINIMUM ORDER ₹3,000 ONLY",
    "✨ 100% GENUINE SIVAKASI DIRECT FACTORY SUPPLY"
  ];

  return (
    <div className="w-full bg-gradient-to-r from-red-900 via-amber-700 to-red-900 text-amber-200 font-extrabold text-xs sm:text-sm py-2 overflow-hidden border-y border-amber-400/50 shadow-md relative z-20">
      <div className="flex w-max animate-marquee-scroll">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-6 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow shrink-0" />
            <span className="tracking-wide uppercase font-black">{text}</span>
            <a
              href="https://api.whatsapp.com/send?phone=917806853112&text=Hello%20Om%20Aadhishivam%20Crackers!%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-0.5 rounded-full shadow-sm font-extrabold transition-all"
            >
              <MessageSquare className="w-3 h-3 fill-white" />
              <span>WhatsApp: +91 78068 53112</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
