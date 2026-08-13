import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useData } from '../../context/DataContext';
import { Package, Layers, ShoppingCart, Users, Tag, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const { products, categories, orders, offers, contacts } = useData();

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(o => o.customerEmail)).size + 1;
  const activeOffers = offers.filter(o => o.status === 'Active').length;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

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

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Live Revenue: ₹{totalRevenue}
            </span>
          </div>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#140f26] border border-white/10 space-y-2 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Products</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">{totalProducts}</div>
            <Link to="/admin/products" className="text-xs text-amber-400 hover:underline inline-block font-semibold">
              Manage Products →
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[#140f26] border border-white/10 space-y-2 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Orders</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">{totalOrders}</div>
            <Link to="/admin/orders" className="text-xs text-emerald-400 hover:underline inline-block font-semibold">
              View Orders →
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[#140f26] border border-white/10 space-y-2 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Customers</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">{totalCustomers}</div>
            <span className="text-xs text-slate-400 font-semibold block">Registered & Guest Buyers</span>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#140f26] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-serif-brand">Recent Customer Orders</h2>
              <Link to="/admin/orders" className="text-xs text-amber-400 font-bold hover:underline">View All</Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 font-semibold uppercase">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-mono font-bold text-amber-400">{ord.id}</td>
                      <td className="p-3 font-medium">{ord.customerName}</td>
                      <td className="p-3 font-extrabold">₹{ord.totalAmount}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          ord.orderStatus === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                          ord.orderStatus === 'Cancelled' ? 'bg-red-500/20 text-red-300' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {ord.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Messages & Stock Alerts */}
          <div className="p-6 rounded-3xl bg-[#140f26] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-serif-brand">Customer Messages</h2>
              <Link to="/admin/contacts" className="text-xs text-amber-400 font-bold hover:underline">
                View ({contacts.length})
              </Link>
            </div>

            <div className="space-y-3">
              {contacts.slice(0, 3).map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-amber-300">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{c.date}</span>
                  </div>
                  <div className="text-xs text-white font-semibold line-clamp-1">{c.subject}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
