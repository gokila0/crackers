import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Tag, 
  MessageSquare, 
  ShoppingCart, 
  LogOut, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/admin/products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { path: '/admin/categories', label: 'Categories', icon: <Layers className="w-5 h-5" /> },
    { path: '/admin/offers', label: 'Offers', icon: <Tag className="w-5 h-5" /> },
    { path: '/admin/contacts', label: 'Customer Contacts', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-[#0f0c1d] border-r border-white/10 flex flex-col justify-between min-h-screen p-4 sticky top-0 shrink-0">
      
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
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all active:scale-95"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
