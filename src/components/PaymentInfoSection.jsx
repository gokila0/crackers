import React from 'react';
import { CreditCard, Building2, Smartphone, ShieldCheck, CheckCircle } from 'lucide-react';

export default function PaymentInfoSection() {
  return (
    <section id="payment" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 border-t border-white/10">
      
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest">
          <CreditCard className="w-4 h-4" />
          <span>Verified Payment Gateway</span>
        </div>
        <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Payment & Bank Details
        </h2>
        <p className="text-slate-300 text-sm">
          Pay securely via NEFT, RTGS, IMPS, or UPI (Google Pay, PhonePe, Paytm) directly to Om Aadhishivam Crackers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bank Account Details */}
        <div className="bg-[#161224] border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-amber-300">Bank Transfer (NEFT / RTGS / IMPS)</h3>
              <p className="text-xs text-slate-400">Official Factory Business Account</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Account Name:</span>
              <span className="font-bold text-white">OM AADHISHIVAM CRACKERS</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Bank Name:</span>
              <span className="font-bold text-white">Tamilnad Mercantile Bank (TMB)</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Account No:</span>
              <span className="font-mono font-bold text-amber-400 text-base">084150050892015</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">IFSC Code:</span>
              <span className="font-mono font-bold text-amber-400 text-base">TMBL0000084</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Branch:</span>
              <span className="font-bold text-white">Sivakasi Main Branch</span>
            </div>
          </div>
        </div>

        {/* UPI & Mobile Banking */}
        <div className="bg-[#161224] border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-indigo-300">UPI Instant Payment (GPay / PhonePe)</h3>
              <p className="text-xs text-slate-400">Scan or Pay using registered numbers</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">GPay / PhonePe / Paytm:</span>
              <span className="font-mono font-bold text-emerald-400 text-base">+91 84892 73614</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Secondary Contact UPI:</span>
              <span className="font-mono font-bold text-emerald-400 text-base">+91 78068 53112</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">UPI ID:</span>
              <span className="font-mono font-bold text-amber-400">8489273614@okbizaxis</span>
            </div>
            
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-amber-200">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>After payment, send your transaction screenshot on WhatsApp to <strong>+91 78068 53112</strong> for instant order confirmation & receipt!</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
