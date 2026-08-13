import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Sparkles, Menu, X, Phone, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Header({
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'safety', label: 'SAFETY TIPS' },
    { id: 'contact', label: 'CONTACT US' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xl">
      {/* 1. Top Tier: Deep Maroon Running Contact & Notice Ticker Bar */}
      <div className="bg-[#a81c3b] text-white text-xs py-2 overflow-hidden border-b border-rose-800 shadow-inner">
        <div className="flex w-max animate-marquee-scroll">
          {[1, 2].map((loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 mx-4 font-bold text-rose-100 shrink-0">
              <span className="flex items-center gap-2">
                Buy Crackers Online For Tamil, Telugu, Hindi & English Call
                <a href="tel:+918489273614" className="flex items-center gap-1 hover:text-yellow-300 font-extrabold underline decoration-yellow-400">
                  <Phone className="w-3.5 h-3.5" /> +91 84892 73614
                </a>
                ,
                <a href="tel:+917806853112" className="hover:text-yellow-300 font-extrabold underline decoration-yellow-400">
                  +91 78068 53112
                </a>
              </span>

              <span className="text-yellow-400 font-black">•</span>

              <span className="flex items-center gap-2">
                For Wholesale Orders Call
                <a href="tel:+917806853112" className="flex items-center gap-1 hover:text-yellow-300 font-extrabold underline decoration-yellow-400">
                  <Phone className="w-3.5 h-3.5" /> +91 78068 53112
                </a>
              </span>

              <span className="text-yellow-400 font-black">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Middle Tier: Clean White Header with Contacts, Brand Logo & WhatsApp Button */}
      <div className="bg-white text-slate-900 border-b border-rose-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Contacts (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-extrabold text-slate-700">
            <a href="mailto:omaadhishivam@gmail.com" className="flex items-center gap-1.5 hover:text-red-700 transition-colors">
              <Mail className="w-4 h-4 text-red-600" />
              <span>omaadhishivam@gmail.com</span>
            </a>
            <a href="tel:+918489273614" className="flex items-center gap-1.5 hover:text-red-700 transition-colors">
              <Phone className="w-4 h-4 text-red-600" />
              <span>+91 84892 73614</span>
            </a>
          </div>

          {/* Center Brand Logo & Title */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all shrink-0">
              <Sparkles className="w-6 h-6 fill-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif-brand text-lg sm:text-2xl font-black text-red-700 tracking-tight leading-tight group-hover:text-red-800 transition-colors">
                Om Aadhishivam <span className="text-amber-600">Crackers</span>
              </span>
              <span className="text-[10px] text-amber-800 font-extrabold tracking-wider uppercase">Direct Sivakasi Wholesale</span>
            </div>
          </a>

          {/* Right Actions: WhatsApp CTA + Search + Cart + Admin */}
          <div className="flex items-center gap-3">
            {/* Direct WhatsApp Button */}
            <a
              href="https://wa.me/917806853112?text=Hello%20Om%20Aadhishivam%20Crackers,%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>+91 78068 53112</span>
            </a>

            {/* Admin Portal Button */}
            <Link
              to="/admin/products"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-black transition-all shadow-sm active:scale-95"
              title="Open Admin Portal to add crackers & edit prices"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin</span>
            </Link>

            {/* Cart Icon Button */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold shadow-md transition-all group cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-yellow-400 text-slate-950 text-[11px] font-black flex items-center justify-center border-2 border-red-900 shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Bottom Tier: Deep Crimson Maroon Menu Bar */}
      <nav className="bg-[#a81c3b] hidden lg:block text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-1 text-xs font-extrabold tracking-wider uppercase">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-7 py-3.5 transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-yellow-400 text-slate-950 font-black shadow-md'
                    : 'hover:bg-rose-800 text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#a81c3b] text-white border-t border-rose-800 px-4 py-4 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crackers..."
              className="w-full bg-white text-sm text-slate-900 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                  activeTab === item.id ? 'bg-yellow-400 text-slate-950 font-black' : 'text-white hover:bg-rose-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-rose-800 flex items-center justify-between gap-2">
            <a
              href="https://wa.me/917806853112?text=Hello%20Om%20Aadhishivam%20Crackers,%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Order</span>
            </a>
            <Link
              to="/admin/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
