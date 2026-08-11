import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#090712] border-t border-white/10 text-slate-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">

        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif-brand text-xl font-bold text-white tracking-tight">
              omaadhishivamcrackers
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            India's most trusted direct-from-Sivakasi crackers shopping platform. Premium quality, factory pricing, and safe handling.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#home" className="hover:text-amber-400 transition-colors">Home Banner</a></li>
            <li><a href="#offers" className="hover:text-amber-400 transition-colors">Promotional Offers</a></li>
            <li><a href="#products" className="hover:text-amber-400 transition-colors">Sivakasi Catalog</a></li>
            <li><a href="#about" className="hover:text-amber-400 transition-colors">About Sivakasi Factory</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#offers" className="hover:text-amber-400 transition-colors">Night Aerial Crackers</a></li>
            <li><a href="#offers" className="hover:text-amber-400 transition-colors">Daytime Sound Shells</a></li>
            <li><a href="#offers" className="hover:text-amber-400 transition-colors">Kids Pencil Sparklers</a></li>
            <li><a href="#offers" className="hover:text-amber-400 transition-colors">Family Deluxe Gift Boxes</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sivakasi Shop Contact</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>மடத்துப்பட்டி - சாத்தூர் மெயின்ரோடு, மடத்துப்பட்டி, சிவகாசி<br /><span className="text-slate-400">(Madathupatti - Sattur Main Road, Madathupatti, Sivakasi)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+91 78068 53112 / +91 63803 53078</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+91 84892 74614 / +91 94887 24240</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Safety Compliance Note */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Strictly compliant with Explosives Act & CSIR-NEERI Green Cracker Guidelines. Sale to minors under 18 prohibited.</span>
        </div>
        <p className="text-slate-500">
          © {new Date().getFullYear()} Om Aadhishivam Crackers (ஓம ஆதிசிவம் பட்டாசு கடை). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
