import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, User, Menu, X, Sun, Moon, Shield, LogOut, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ theme, setTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { customerUser, customerLogout, isAdminAuthenticated } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/crackers', label: 'Crackers' },
    { path: '/offers', label: 'Offers' },
    { path: '/safety-tips', label: 'Safety Tips' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0a18]/95 backdrop-blur-md border-b border-white/10 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-all shadow-sm">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Omaadhi Shivam Crackers
            </span>
            <span className="text-[10px] text-amber-400/90 tracking-widest font-extrabold uppercase -mt-1">
              Sivakasi Direct Factory
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 relative ${
                isActive(link.path)
                  ? 'text-amber-400 font-extrabold'
                  : 'hover:text-amber-300'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-2.5 rounded-2xl bg-[#181329] hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-white/10 transition-all duration-300 active:scale-95 shadow-sm flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="relative p-2.5 rounded-2xl bg-[#181329] hover:bg-amber-500/20 text-slate-200 hover:text-amber-400 border border-white/10 transition-all active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] font-extrabold flex items-center justify-center border-2 border-[#0d0a18] shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Customer Auth Button / User Profile */}
          {customerUser ? (
            <div className="relative group hidden sm:block">
              <Link
                to="/my-orders"
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Hi, {customerUser.name.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Admin Portal Shortcut */}
          <Link
            to={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-white/10 transition-all hidden md:flex items-center gap-1.5 text-xs font-bold"
            title="Admin Portal"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Admin</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-[#181329] text-slate-200 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#130f24] border-b border-white/10 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            {customerUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/my-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => { customerLogout(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded-xl bg-red-500/20 text-red-300 text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Customer Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-white/10 text-white font-bold text-xs"
                >
                  Register
                </Link>
              </div>
            )}
            <Link
              to={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
