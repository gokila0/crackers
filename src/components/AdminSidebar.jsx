import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  ShoppingCart, 
  LogOut, 
  Sparkles,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/admin/products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { path: '/admin/contacts', label: 'Customer Contacts', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* MOBILE TOP BAR (Visible on phones & small screens < md) */}
      <div className="md:hidden bg-[#0f0c1d] border-b border-white/10 p-4 sticky top-0 z-40 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif-brand font-bold text-white text-sm leading-tight">Admin Portal</h2>
            <p className="text-[9px] text-amber-400 font-semibold uppercase">Omaadhi Shivam</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400 text-xs font-bold flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer"
            aria-label="Toggle Admin Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU DRAWER */}
      {mobileOpen && (
        <div className="md:hidden bg-[#140f26] border-b border-white/10 p-4 space-y-3 sticky top-[69px] z-40 shadow-2xl">
          <nav className="grid grid-cols-2 gap-2">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-xs text-amber-400 font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Visible on md and larger screens >= 768px) */}
      <aside className="hidden md:flex w-64 bg-[#0f0c1d] border-r border-white/10 flex-col justify-between min-h-screen p-4 sticky top-0 shrink-0">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-brand font-bold text-white text-base leading-tight">Admin Portal</h2>
              <p className="text-[10px] text-amber-400 font-semibold uppercase">Omaadhi Shivam</p>
            </div>
          </div>

          {/* Back to Customer Website Link */}
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>View Customer Website</span>
          </Link>

          {/* Sidebar Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Action */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
