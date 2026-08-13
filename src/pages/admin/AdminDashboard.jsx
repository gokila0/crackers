import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useData } from '../../context/DataContext';
import { Package, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const { products } = useData();
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-[#090714] text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-serif-brand text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Welcome to Omaadhi Shivam Crackers Control Center</p>
          </div>
        </div>

        {/* Total Products / Items Stat Card */}
        <div className="max-w-md">
          <div className="p-6 rounded-3xl bg-[#140f26] border border-amber-500/30 space-y-4 hover:border-amber-500/60 transition-all shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Total Items Catalog</span>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="text-5xl font-black text-white font-mono">{totalProducts}</div>
              <p className="text-xs text-slate-400 font-medium mt-1">Available Cracker Varieties</p>
            </div>

            <div className="pt-2 border-t border-white/10">
              <Link
                to="/admin/products"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <span>Manage Products & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
