import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Sparkles, Menu, X, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

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
    { id: 'products', label: 'PRODUCTS (PRICE LIST)' },
    { id: 'safety', label: 'SAFETY TIPS' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white shadow-xl transition-all border-b-2 border-amber-400">



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-2.5 group shrink min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-all shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 animate-pulse" />
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-serif-brand text-sm sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-amber-200 transition-colors truncate">
              Om Aadhishivam <span className="text-amber-300">Crackers</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-black text-amber-100">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors py-1 relative tracking-wider ${activeTab === item.id
                  ? 'text-amber-300 font-black'
                  : 'hover:text-white'
                }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Search Bar & User Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Search Box */}
          <div className="relative hidden md:block w-44 xl:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crackers..."
              className="w-full bg-amber-50 text-xs text-slate-900 font-medium placeholder-slate-500 pl-9 pr-3 py-2 rounded-full border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>

          {/* Admin Portal Button (Desktop / Tablet) */}
          <Link
            to="/admin/products"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-black transition-all shadow-sm active:scale-95"
            title="Open Admin Portal to add crackers & edit prices"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin</span>
          </Link>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative p-2 sm:p-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md transition-all group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-black flex items-center justify-center border-2 border-red-900 shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-full bg-black/20 text-white border border-white/20 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-red-950 border-t border-white/10 px-4 py-4 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crackers..."
              className="w-full bg-amber-50 text-sm text-slate-900 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none"
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
                className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${activeTab === item.id ? 'bg-amber-400 text-slate-950 font-black' : 'text-amber-100 hover:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <Link
              to="/admin/products"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Portal Login</span>
              </div>
              <span className="text-[10px] text-amber-300 font-semibold">Manage Products →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
