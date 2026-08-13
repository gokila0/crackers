import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContactBar() {
  return (
    <div className="fixed bottom-4 right-3 z-30 flex flex-col items-end gap-2 opacity-90 hover:opacity-100 transition-opacity">
      {/* Direct Phone Call */}
      <a
        href="tel:+918489273614"
        className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label="Call Om Aadhishivam Crackers"
        title="Call Shop: +91 84892 73614"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Direct WhatsApp Chat */}
      <a
        href="https://wa.me/917806853112?text=Hello%20Om%20Aadhishivam%20Crackers,%20I%20want%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Direct Order: +91 78068 53112"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
      </a>
    </div>
  );
}
