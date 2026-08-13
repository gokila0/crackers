import React, { useState, useEffect } from 'react';
import { CATEGORIES, SUB_CATEGORIES, PRODUCTS } from '../data/products';
import { useData } from '../context/DataContext';

// Section Group Ordering (matching Day -> Night -> Kids -> Gift Boxes)
const SECTION_ORDER = [
  'SINGLE SOUND CRACKERS',
  'ONE SOUND CRACKERS',
  'ADIYAL PAPER BOMB',
  'BOMBS',
  'BIJILI',
  'CHORSA & GIANT CRACKERS',
  'WALA GARLANDS',
  'ELECTRIC CRACKERS',
  'ROCKETS',
  'SIREN',
  'TWINKLING STAR',
  'FLOWER POTS',
  'GROUND CHAKKAR',
  'PEACOCK VERITES',
  'NEW VERITIES SHOWER - 2026 SPL',
  'MULTI COLOUR SHOTS',
  'FANCY SINGLE PIPE',
  'STEP FANCY SINGLE PIPE',
  'PENCIL COLLECTIONS',
  'MATCHES BOXES',
  'KIDS SPECIAL VERITES',
  'ELECTRIC SPARKLERS',
  'GIFT BOXES'
];

export default function ProductCatalog({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onAddToCart,
  cartItems = [],
  onUpdateQuantity
}) {
  const dataContext = useData();
  const allProducts = (dataContext?.products && dataContext.products.length > 0) ? dataContext.products : PRODUCTS;

  const getProductQuantity = (productId) => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = allProducts.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchLower) ||
      (item.tamilName && item.tamilName.toLowerCase().includes(searchLower)) ||
      (item.codeNo && item.codeNo.toString().includes(searchLower)) ||
      (item.subCategoryName && item.subCategoryName.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  // Group products by category group name
  const groupedProductsMap = {};
  filteredProducts.forEach((product) => {
    const sectionName = (product.groupName || product.subCategoryName || 'OTHER CRACKERS').toUpperCase();
    if (!groupedProductsMap[sectionName]) {
      groupedProductsMap[sectionName] = [];
    }
    groupedProductsMap[sectionName].push(product);
  });

  // Sort section titles
  const sortedSectionTitles = Object.keys(groupedProductsMap).sort((a, b) => {
    const indexA = SECTION_ORDER.findIndex((sec) => a.includes(sec) || sec.includes(a));
    const indexB = SECTION_ORDER.findIndex((sec) => b.includes(sec) || sec.includes(b));
    const posA = indexA === -1 ? 999 : indexA;
    const posB = indexB === -1 ? 999 : indexB;
    return posA - posB;
  });

  return (
    <section id="products" className="py-4 px-1 sm:px-4 max-w-5xl mx-auto space-y-4 pb-8">
      {/* Category Tab Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-amber-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#a81c3b] text-white font-extrabold'
              : 'bg-yellow-100 text-slate-900 border border-amber-300'
          }`}
        >
          All Collection
        </button>
        <button
          onClick={() => setSelectedCategory('day')}
          className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'day'
              ? 'bg-[#a81c3b] text-white font-extrabold'
              : 'bg-yellow-100 text-slate-900 border border-amber-300'
          }`}
        >
          ☀️ Day Crackers
        </button>
        <button
          onClick={() => setSelectedCategory('night')}
          className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'night'
              ? 'bg-[#a81c3b] text-white font-extrabold'
              : 'bg-yellow-100 text-slate-900 border border-amber-300'
          }`}
        >
          🌙 Night Crackers
        </button>
        <button
          onClick={() => setSelectedCategory('kids')}
          className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'kids'
              ? 'bg-[#a81c3b] text-white font-extrabold'
              : 'bg-yellow-100 text-slate-900 border border-amber-300'
          }`}
        >
          🧸 Kids & Sparklers
        </button>
        <button
          onClick={() => setSelectedCategory('giftboxes')}
          className={`px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'giftboxes'
              ? 'bg-[#a81c3b] text-white font-extrabold'
              : 'bg-yellow-100 text-slate-900 border border-amber-300'
          }`}
        >
          🎁 Gift Boxes
        </button>
      </div>

      {/* COMPACT FULL-WIDTH GRID TABLE MATCHING TARGET SCREENSHOT */}
      <div className="overflow-x-auto border-2 border-slate-900 bg-white shadow-lg rounded-none">
        <table className="w-full text-center border-collapse text-[11px] sm:text-xs">
          <thead>
            <tr className="bg-white text-slate-950 font-black border-b-2 border-slate-900 uppercase">
              <th className="py-2 px-1 border-r border-slate-900 w-12 sm:w-16">Image</th>
              <th className="py-2 px-1 border-r border-slate-900 min-w-[100px]">Product Name</th>
              <th className="py-2 px-1 border-r border-slate-900 w-14 sm:w-16">Content</th>
              <th className="py-2 px-1 border-r border-slate-900 w-16 sm:w-20">Actual Price (Rs)</th>
              <th className="py-2 px-1 border-r border-slate-900 w-14 sm:w-18">Amount (Rs)</th>
              <th className="py-2 px-1 border-r border-slate-900 w-14 sm:w-16">Quantity</th>
              <th className="py-2 px-1 w-14 sm:w-16">Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedSectionTitles.map((sectionTitle) => {
              const sectionItems = groupedProductsMap[sectionTitle];
              return (
                <React.Fragment key={`sec-${sectionTitle}`}>
                  {/* Category Header Row (Deep Crimson Maroon Background) */}
                  <tr>
                    <td
                      colSpan={7}
                      className="bg-[#a81c3b] text-white font-extrabold text-xs sm:text-sm py-1.5 px-2 border-y border-slate-900 uppercase tracking-wider text-center"
                    >
                      {sectionTitle}
                    </td>
                  </tr>

                  {/* Section Products (Bright Yellow Cell Backgrounds) */}
                  {sectionItems.map((product) => {
                    const qty = getProductQuantity(product.id);
                    const rowTotal = qty * product.price;

                    return (
                      <tr key={product.id} className="border-b border-slate-900 bg-[#ffff55] hover:bg-[#ffff22] transition-colors">
                        {/* Image */}
                        <td className="py-1 px-1 border-r border-slate-900 bg-white">
                          <div className="w-10 h-10 mx-auto flex items-center justify-center overflow-hidden border border-slate-300 bg-white">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-lg">{product.image || '🎆'}</span>
                            )}
                          </div>
                        </td>

                        {/* Product Name */}
                        <td className="py-1 px-1.5 border-r border-slate-900 font-extrabold text-slate-950 text-center">
                          {product.tamilName && (
                            <div className="text-[10px] text-red-900 font-black leading-tight">{product.tamilName}</div>
                          )}
                          <div className="leading-tight text-[11px] sm:text-xs">{product.name}</div>
                        </td>

                        {/* Content */}
                        <td className="py-1 px-1 border-r border-slate-900 font-bold text-slate-900 text-center">
                          {product.unit || '1 Pkt'}
                        </td>

                        {/* Actual Price */}
                        <td className="py-1 px-1 border-r border-slate-900 font-extrabold text-red-700 line-through font-mono text-center">
                          {product.originalPrice ? product.originalPrice.toFixed(2) : (product.price * 5).toFixed(2)}
                        </td>

                        {/* Amount */}
                        <td className="py-1 px-1 border-r border-slate-900 font-black text-slate-950 font-mono text-xs sm:text-sm text-center">
                          {product.price}
                        </td>

                        {/* Quantity Input */}
                        <td className="py-1 px-1 border-r border-slate-900 text-center">
                          <input
                            type="number"
                            min="0"
                            value={qty === 0 ? '' : qty}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              onUpdateQuantity(product.id, isNaN(val) ? 0 : Math.max(0, val));
                            }}
                            placeholder=""
                            className="w-11 sm:w-14 h-7 text-center bg-white border border-slate-900 font-black text-slate-950 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-none mx-auto block"
                          />
                        </td>

                        {/* Total */}
                        <td className="py-1 px-1 font-black text-slate-950 font-mono text-xs text-center bg-[#fffde7]">
                          {rowTotal > 0 ? rowTotal : ''}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
