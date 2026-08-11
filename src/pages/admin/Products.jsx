import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useData } from '../../context/DataContext';
import { Plus, Search, Edit3, Trash2, Eye, X, Check, Filter } from 'lucide-react';

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();

  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    tamilName: '',
    codeNo: '',
    imageUrl: '',
    image: '🎆',
    category: 'night',
    subCategory: 'rockets-siren',
    desc: '',
    originalPrice: 1000,
    price: 200,
    unit: '1 BOX',
    discount: '80% OFF',
    stock: 100,
    productType: 'Standard',
    status: 'Active'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      tamilName: '',
      codeNo: String(products.length + 1),
      imageUrl: '',
      image: '🎆',
      category: 'night',
      subCategory: 'rockets-siren',
      desc: '',
      originalPrice: 1000,
      price: 200,
      unit: '1 BOX',
      discount: '80% OFF',
      stock: 100,
      productType: 'Standard',
      status: 'Active'
    });
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      tamilName: prod.tamilName || '',
      codeNo: prod.codeNo || '',
      imageUrl: prod.imageUrl || '',
      image: prod.image || '🎆',
      category: prod.category || 'night',
      subCategory: prod.subCategory || '',
      desc: prod.desc || '',
      originalPrice: prod.originalPrice || 0,
      price: prod.price || 0,
      unit: prod.unit || '1 BOX',
      discount: prod.discount || '80% OFF',
      stock: prod.stock || 50,
      productType: prod.productType || 'Standard',
      status: prod.status || 'Active'
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
      setIsAddModalOpen(false);
    }
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchLower) ||
                          (p.codeNo && String(p.codeNo).includes(searchLower)) ||
                          (p.tamilName && p.tamilName.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090714] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-serif-brand text-white">Product Management</h1>
            <p className="text-sm text-slate-400">Add, view, update, and manage all cracker catalog items</p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#140f26] p-4 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, code #, or Tamil name..."
              className="w-full bg-[#1a142e] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategoryFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              All ({products.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.slug || cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategoryFilter === (cat.slug || cat.id) ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#140f26] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-300 font-bold uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Code #</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Market Price</th>
                  <th className="p-4">Discount Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center overflow-hidden shrink-0">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain p-0.5" />
                        ) : (
                          <span className="text-xl">{p.image || '🎆'}</span>
                        )}
                      </div>
                      <div>
                        {p.tamilName && <div className="text-amber-400 font-semibold text-[11px]">{p.tamilName}</div>}
                        <div className="font-bold text-white text-sm">{p.name}</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-300">#{p.codeNo}</td>
                    <td className="p-4 font-semibold text-slate-300 capitalize">{p.category}</td>
                    <td className="p-4 text-slate-400 line-through">₹{p.originalPrice}</td>
                    <td className="p-4 font-extrabold text-amber-400 text-sm">₹{p.price} <span className="text-[10px] text-slate-400 font-normal">/ {p.unit}</span></td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock > 20 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        p.status === 'Active' || !p.status ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {p.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewingProduct(p)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-400 transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(p.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {(isAddModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            
            <div className="relative w-full max-w-2xl bg-[#140f26] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl z-10 text-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold font-serif-brand text-white">
                  {editingProduct ? 'Update Product Details' : 'Add New Cracker Product'}
                </h3>
                <button onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="p-2 rounded-full hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Product English Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. 12 Color Aerial Fancy Shots"
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Tamil Name (தமிழ் பெயர்)</label>
                  <input
                    type="text"
                    value={formData.tamilName}
                    onChange={(e) => setFormData({ ...formData, tamilName: e.target.value })}
                    placeholder="e.g. நயகரா பென்சில்"
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Code Number</label>
                  <input
                    type="text"
                    value={formData.codeNo}
                    onChange={(e) => setFormData({ ...formData, codeNo: e.target.value })}
                    placeholder="e.g. 25"
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="night">Night Crackers</option>
                    <option value="day">Day Crackers</option>
                    <option value="kids">Kids Crackers</option>
                    <option value="sparklers">Sparkles</option>
                    <option value="gift-boxes">Gift Box</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300">Product Image URL (e.g. /products/nayagar-pencil.png)</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="e.g. /products/nayagar-pencil.png or https://..."
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Market Price (Original ₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Discount Price (Selling ₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Packing Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="1 BOX / 1 PKT"
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300">Description</label>
                  <textarea
                    rows={3}
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    placeholder="Enter safety notes, color emissions, or specs..."
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold shadow-lg"
                  >
                    {editingProduct ? 'Save Changes' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingProductId && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <div onClick={() => setDeletingProductId(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-[#140f26] border border-red-500/40 rounded-3xl p-6 space-y-4 text-center z-10">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif-brand">Confirm Product Deletion</h3>
              <p className="text-xs text-slate-400">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingProductId(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-md"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {viewingProduct && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <div onClick={() => setViewingProduct(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative w-full max-w-md bg-[#140f26] border border-amber-500/30 rounded-3xl p-6 space-y-4 text-slate-100 z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold font-serif-brand text-lg text-white">Product Preview</h3>
                <button onClick={() => setViewingProduct(null)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-2">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center overflow-hidden">
                  {viewingProduct.imageUrl ? (
                    <img src={viewingProduct.imageUrl} alt={viewingProduct.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-4xl">{viewingProduct.image || '🎆'}</span>
                  )}
                </div>
                <div className="text-amber-400 font-bold text-xs">#{viewingProduct.codeNo} {viewingProduct.tamilName}</div>
                <h4 className="text-xl font-bold text-white">{viewingProduct.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{viewingProduct.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-center border-t border-white/10 pt-3">
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-slate-400 block text-[10px]">Price</span>
                  <span className="text-amber-400 font-bold text-base">₹{viewingProduct.price}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-slate-400 block text-[10px]">Available Stock</span>
                  <span className="text-emerald-400 font-bold text-base">{viewingProduct.stock} units</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
