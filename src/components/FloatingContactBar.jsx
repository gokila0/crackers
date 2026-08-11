import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';

export default function FloatingContactBar({ cartCount, onOpenCart }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick Cart Floating Button */}
      <button
        onClick={onOpenCart}
        className="group relative p-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-2xl shadow-amber-500/40 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Open Shopping Cart"
        title="View Festival Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white font-extrabold text-xs flex items-center justify-center border-2 border-slate-950 shadow-md animate-bounce">
            {cartCount}
          </span>
        )}
      </button>

      {/* Direct Phone Call */}
      <a
        href="tel:+919488724240"
        className="p-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/40 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Call Om Aadhishivam Crackers"
        title="Call Shop: +91 94887 24240"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Direct WhatsApp Chat */}
      <a
        href="https://wa.me/917806853112?text=Hello%20Om%20Aadhishivam%20Crackers,%20I%20want%20to%20place%20an%20order%20for%20crackers"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center animate-pulse"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Direct Order: +91 78068 53112"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
}
