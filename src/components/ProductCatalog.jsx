import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Star, Sparkles, Filter, Tag, Check, Table, LayoutGrid, Plus, Minus, Image as ImageIcon, X } from 'lucide-react';
import { CATEGORIES, SUB_CATEGORIES, PRODUCTS } from '../data/products';
import { printOfficialPriceList } from '../utils/printHelper';
import { useData } from '../context/DataContext';

// PDF Sections Order (Grouped by Day Crackers -> Night Crackers -> Kids & Sparklers -> Gift Boxes)
const PDF_SECTION_ORDER = [
  // 1. DAY CRACKERS (ONE SOUND CRACKERS FIRST, WALA GARLANDS LAST)
  'ONE SOUND CRACKERS',
  'ADIYAL PAPER BOMB',
  'BOMBS',
  'BIJILI',
  'CHORSA & GIANT CRACKERS',
  'WALA GARLANDS',

  // 2. NIGHT CRACKERS
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

  // 3. KIDS & SPARKLERS
  'PENCIL COLLECTIONS',
  'MATCHES BOXES',
  'MATCHE BOXES',
  'KIDS SPECIAL VERITES',
  'ELECTRIC SPARKLERS',

  // 4. GIFT BOXES
  'GIFT BOXES'
];

export default function ProductCatalog({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onAddToCart,
  onQuickView,
  cartItems = [],
  onUpdateQuantity
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' (Lana style) or 'grid'
  const [zoomImage, setZoomImage] = useState(null);

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);

  const dataContext = useData();
  const allProducts = (dataContext?.products && dataContext.products.length > 0) ? dataContext.products : PRODUCTS;
  const availableCategories = (dataContext?.categories && dataContext.categories.length > 0) ? dataContext.categories : CATEGORIES;

  const currentSubCategories = SUB_CATEGORIES[selectedCategory] || [];

  const filteredProducts = allProducts.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    let matchesSubCategory = true;
    if (selectedCategory !== 'all' && selectedSubCategory !== 'all') {
      if (selectedSubCategory.startsWith('all-')) {
        matchesSubCategory = true;
      } else {
        matchesSubCategory = item.subCategory === selectedSubCategory;
      }
    }

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchLower) ||
      (item.tamilName && item.tamilName.toLowerCase().includes(searchLower)) ||
      (item.codeNo && item.codeNo.toString().includes(searchLower)) ||
      (item.subCategoryName && item.subCategoryName.toLowerCase().includes(searchLower)) ||
      item.desc.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  // Helper to get current quantity in cart for any product
  const getProductQuantity = (productId) => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item ? item.quantity : 0;
  };

  // Group filtered products by section heading matching PDF format
  const groupedProductsMap = {};
  filteredProducts.forEach((product) => {
    const sectionName = (product.groupName || product.subCategoryName || 'OTHER CRACKERS').toUpperCase();
    if (!groupedProductsMap[sectionName]) {
      groupedProductsMap[sectionName] = [];
    }
    groupedProductsMap[sectionName].push(product);
  });

  // Sort section titles according to requested order: Day Crackers -> Night Crackers -> Kids & Sparklers -> Gift Boxes
  const sortedSectionTitles = Object.keys(groupedProductsMap).sort((a, b) => {
    const indexA = PDF_SECTION_ORDER.findIndex((sec) => a.includes(sec) || sec.includes(a));
    const indexB = PDF_SECTION_ORDER.findIndex((sec) => b.includes(sec) || sec.includes(b));
    const posA = indexA === -1 ? 999 : indexA;
    const posB = indexB === -1 ? 999 : indexB;
    return posA - posB;
  });

  return (
    <section id="products" className="py-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 border-t border-amber-200">

      {/* Category Tabs */}
      <div className="space-y-5">

        {/* Level 1: Main Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-amber-200">
          {availableCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 text-white shadow-lg font-black scale-105'
                  : 'bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300'
                }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Level 2: Sub-Category Filter Pills */}
        {selectedCategory !== 'all' && currentSubCategories.length > 0 && (
          <div className="bg-amber-50/90 p-3.5 sm:p-4 rounded-2xl border-2 border-amber-300 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              <span>Sub-Categories in {availableCategories.find(c => c.id === selectedCategory)?.name}:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {currentSubCategories.map((subCat) => {
                const isActive = selectedSubCategory === subCat.id;
                return (
                  <button
                    key={subCat.id}
                    onClick={() => setSelectedSubCategory(subCat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${isActive
                        ? 'bg-red-700 border-2 border-red-800 text-white font-black shadow-md'
                        : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300/80'
                      }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{subCat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* No Products Found Alert */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-amber-300 space-y-3">
          <Filter className="w-10 h-10 text-amber-700 mx-auto" />
          <h3 className="text-base font-bold text-amber-950">No crackers found matching your selection</h3>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }}
            className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-colors"
          >
            Show All Crackers
          </button>
        </div>
      ) : (

        /* =========================================================
           LANA CRACKERS TABULAR PRICE LIST WITH ORDERED PDF HEADINGS
           ========================================================= */
        <>
          {/* MOBILE VIEW (CARDS FOR MOBILE SCREENS) */}
          <div className="block md:hidden space-y-4">
            {sortedSectionTitles.map((sectionTitle) => {
              const sectionItems = groupedProductsMap[sectionTitle];
              return (
                <div key={`mob-sec-${sectionTitle}`} className="space-y-2">
                  <div className="py-2.5 px-3 rounded-xl text-center font-black uppercase text-xs sm:text-sm tracking-wider bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 text-yellow-300 border border-yellow-400/60 shadow-md">
                    ⚡ {sectionTitle} ⚡
                  </div>

                  <div className="space-y-2">
                    {sectionItems.map((product) => {
                      const qty = getProductQuantity(product.id);
                      const rowTotal = qty * product.price;
                      const isSelected = qty > 0;

                      return (
                        <div
                          key={`mob-${product.id}`}
                          className={`p-3 rounded-2xl border-2 transition-all space-y-2.5 shadow-sm ${
                            isSelected ? 'bg-amber-100/90 border-amber-500 shadow-md' : 'bg-white border-amber-300/80'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              {product.tamilName && (
                                <div className="text-red-800 text-[11px] font-black line-clamp-1">
                                  {product.tamilName}
                                </div>
                              )}
                              <h4 className="font-black text-slate-950 text-xs sm:text-sm leading-tight">
                                {product.name}
                              </h4>
                            </div>
                            <span className="shrink-0 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-[10px] font-black text-amber-950">
                              {product.unit}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-amber-200/80">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[11px] text-slate-400 line-through font-mono">₹{product.originalPrice}</span>
                              <span className="text-sm font-black text-red-700 font-mono">₹{product.price}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Quantity Touch Buttons */}
                              <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-400 rounded-xl p-1 shadow-sm">
                                <button
                                  onClick={() => onUpdateQuantity(product.id, Math.max(0, qty - 1))}
                                  className="w-7 h-7 rounded-lg bg-white border border-amber-300 active:bg-red-600 active:text-white text-slate-900 font-black flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
                                  disabled={qty === 0}
                                >
                                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                                </button>

                                <input
                                  type="number"
                                  min="0"
                                  value={qty}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    onUpdateQuantity(product.id, isNaN(val) ? 0 : Math.max(0, val));
                                  }}
                                  className="w-8 text-center bg-transparent text-slate-950 font-black text-xs focus:outline-none rounded-md"
                                />

                                <button
                                  onClick={() => {
                                    if (qty === 0) {
                                      onAddToCart(product);
                                    } else {
                                      onUpdateQuantity(product.id, qty + 1);
                                    }
                                  }}
                                  className="w-7 h-7 rounded-lg bg-amber-600 active:bg-amber-500 text-white font-black flex items-center justify-center transition-all cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                </button>
                              </div>

                              <div className="w-16 text-right font-black text-red-800 font-mono text-xs sm:text-sm">
                                {rowTotal > 0 ? `₹${rowTotal.toLocaleString('en-IN')}` : <span className="text-slate-400 font-normal">₹0</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP VIEW (TABULAR LAYOUT FOR TABLETS & DESKTOPS) */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border-2 border-amber-400 shadow-xl bg-white">
            <table className="w-full text-left border-collapse lana-table min-w-[700px]">
              <thead>
                <tr className="bg-[#fef3c7] text-[#78350f] text-xs font-black uppercase border-b-2 border-amber-400">
                  <th className="py-3 px-4 text-[#78350f] font-black">Product Name (பெயர்)</th>
                  <th className="py-3 px-3 text-center text-[#78350f] font-black">Packing Unit</th>
                  <th className="py-3 px-3 text-right text-[#78350f] font-black">Actual Price (Rs)</th>
                  <th className="py-3 px-3 text-right text-red-700 font-black">Amount (80% Off)</th>
                  <th className="py-3 px-3 text-center text-[#78350f] font-black">Quantity</th>
                  <th className="py-3 px-4 text-right text-red-800 font-black">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200/60 text-xs sm:text-sm font-medium">
                {sortedSectionTitles.map((sectionTitle) => {
                  const sectionItems = groupedProductsMap[sectionTitle];
                  return (
                    <React.Fragment key={`section-${sectionTitle}`}>
                      {/* PDF SECTION FORMAT HEADING BANNER */}
                      <tr className="category-header-row">
                        <td
                          colSpan={6}
                          className="py-3 px-4 text-center font-black uppercase text-sm sm:text-base tracking-widest bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 text-yellow-300 border-y-2 border-yellow-400 shadow-md"
                        >
                          ⚡ {sectionTitle} ⚡
                        </td>
                      </tr>

                      {/* SECTION PRODUCTS */}
                      {sectionItems.map((product, index) => {
                        const qty = getProductQuantity(product.id);
                        const rowTotal = qty * product.price;
                        const isSelected = qty > 0;

                        return (
                          <tr
                            key={product.id}
                            className={`transition-colors hover:bg-amber-100 ${isSelected ? 'bg-amber-200/70 border-l-4 border-amber-600' : index % 2 === 0 ? 'bg-[#fff9e6]' : 'bg-white'
                              }`}
                          >
                            {/* Product Name */}
                            <td className="py-2.5 px-4 font-bold">
                              {product.tamilName && (
                                <div className="text-red-800 text-xs font-black line-clamp-1">
                                  {product.tamilName}
                                </div>
                              )}
                              <div className="font-black text-slate-950 text-xs sm:text-sm">
                                {product.name}
                              </div>
                            </td>

                            {/* Content Unit */}
                            <td className="py-2.5 px-3 text-center font-black text-slate-900">
                              <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-[11px] font-black text-amber-950">
                                {product.unit}
                              </span>
                            </td>

                            {/* Original Price */}
                            <td className="py-2.5 px-3 text-right text-slate-500 line-through font-mono font-bold">
                              ₹{product.originalPrice}
                            </td>

                            {/* Discounted Price */}
                            <td className="py-2.5 px-3 text-right font-black text-red-700 font-mono text-sm sm:text-base">
                              ₹{product.price}
                            </td>

                            {/* Quantity Input Controls */}
                            <td className="py-2.5 px-3 text-center">
                              <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-400 rounded-xl p-1 shadow-sm">
                                <button
                                  onClick={() => onUpdateQuantity(product.id, Math.max(0, qty - 1))}
                                  className="w-6 h-6 rounded-lg bg-white border border-amber-300 hover:bg-red-600 hover:text-white text-slate-900 font-black flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
                                  disabled={qty === 0}
                                >
                                  <Minus className="w-3 h-3 stroke-[3]" />
                                </button>

                                <input
                                  type="number"
                                  min="0"
                                  value={qty}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    onUpdateQuantity(product.id, isNaN(val) ? 0 : Math.max(0, val));
                                  }}
                                  className="w-10 text-center bg-transparent text-slate-950 font-black text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-md"
                                />

                                <button
                                  onClick={() => {
                                    if (qty === 0) {
                                      onAddToCart(product);
                                    } else {
                                      onUpdateQuantity(product.id, qty + 1);
                                    }
                                  }}
                                  className="w-6 h-6 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-black flex items-center justify-center transition-all cursor-pointer"
                                >
                                  <Plus className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>
                            </td>

                            {/* Row Total */}
                            <td className="py-2.5 px-4 text-right font-black text-red-800 font-mono text-sm sm:text-base">
                              {rowTotal > 0 ? (
                                <span>₹{rowTotal.toLocaleString('en-IN')}</span>
                              ) : (
                                <span className="text-slate-400 font-medium">₹0</span>
                              )}
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
        </>
      )}

      {/* Lightbox Zoom Image Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative bg-white border-2 border-amber-500 rounded-3xl p-6 max-w-lg w-full space-y-4 text-center shadow-2xl">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-amber-100 hover:bg-red-600 hover:text-white text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-44 h-44 mx-auto rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center overflow-hidden">
              {zoomImage.imageUrl ? (
                <img src={zoomImage.imageUrl} alt={zoomImage.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-6xl">{zoomImage.image}</span>
              )}
            </div>

            <div>
              {zoomImage.tamilName && (
                <h4 className="text-red-800 font-black text-base mt-1">{zoomImage.tamilName}</h4>
              )}
              <h3 className="text-xl font-black text-slate-950">{zoomImage.name}</h3>
              <p className="text-slate-600 text-xs mt-2 font-medium">{zoomImage.desc}</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="text-slate-500 line-through font-mono font-bold">₹{zoomImage.originalPrice}</span>
              <span className="text-2xl font-black text-red-700 font-mono">₹{zoomImage.price}</span>
              <span className="text-xs text-amber-950 font-bold bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-400">
                {zoomImage.unit}
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
