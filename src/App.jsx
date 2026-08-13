import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnnouncementBanner from './components/AnnouncementBanner';
import HeroSection from './components/HeroSection';
import ValueHighlights from './components/ValueHighlights';
import SupremeCourtNotice from './components/SupremeCourtNotice';
import StickyEstimatorBar from './components/StickyEstimatorBar';
import ProductCatalog from './components/ProductCatalog';
import SafetyTipsSection from './components/SafetyTipsSection';
import PaymentInfoSection from './components/PaymentInfoSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import FloatingContactBar from './components/FloatingContactBar';
import { PRODUCTS } from './data/products';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Default empty cart (0 items)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Set permanent Light Theme
    document.documentElement.classList.remove('dark');
    document.body.classList.add('light-theme');
    document.body.classList.remove('theme-maroon', 'theme-sapphire', 'theme-emerald', 'theme-violet');
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === id);
      if (existing) {
        return prevItems.map((item) => (item.id === id ? { ...item, quantity } : item));
      }
      const prod = PRODUCTS.find((p) => p.id === id);
      if (prod) {
        return [...prevItems, { ...prod, quantity }];
      }
      return prevItems;
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleShopNow = () => {
    const catalogEl = document.getElementById('products');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewOffers = () => {
    const catalogEl = document.getElementById('products');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] bg-[#fffdf5] text-slate-900 selection:bg-amber-500 selection:text-slate-950 pt-[95px]">

      {/* 1. Fixed Live Order Estimator Bar (Top fixed) */}
      <StickyEstimatorBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Header Navigation Bar */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 4. Supreme Court Compliance & 80% Discount Banners */}
      <SupremeCourtNotice />

      {/* Main Content Area */}
      <main className="flex-1 space-y-4">


        {/* Sivakasi Product Catalog & Tabular Price Estimator */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Fire Safety Guidelines */}
        <SafetyTipsSection />

        {/* About Sivakasi Factory */}
        <AboutSection />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Floating Contact Bar */}
      <FloatingContactBar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer & Order Estimate Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
