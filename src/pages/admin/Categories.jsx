import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useData } from '../../context/DataContext';
import { Plus, Edit3, Trash2, Layers, X, RotateCcw } from 'lucide-react';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory, resetCategoriesToDefault } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCatId, setDeletingCatId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: '🎆',
  });

  const resetForm = () => {
    setFormData({ name: '', icon: '🎆' });
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || '',
      icon: cat.icon || '🎆'
    });
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      setEditingCategory(null);
    } else {
      addCategory(formData);
      setIsAddModalOpen(false);
    }
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (deletingCatId) {
      deleteCategory(deletingCatId);
      setDeletingCatId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#090714] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-serif-brand text-white">Category Management</h1>
            <p className="text-sm text-slate-400">Add, edit, or delete product categories for the storefront</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                if (window.confirm('Restore categories back to default list?')) {
                  resetCategoriesToDefault();
                }
              }}
              className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Restore Defaults</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Category</span>
            </button>
          </div>
        </div>

        {/* Categories List Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const itemCount = products.filter(p => p.category === cat.id).length;
            const isProtected = cat.id === 'all';

            return (
              <div
                key={cat.id}
                className="p-6 rounded-3xl bg-[#140f26] border border-white/10 space-y-4 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                    {cat.icon || '✨'}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold font-mono">
                    {itemCount} Items
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-serif-brand">{cat.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">ID: {cat.id}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {!isProtected && (
                    <button
                      onClick={() => setDeletingCatId(cat.id)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add / Edit Category Modal */}
        {(isAddModalOpen || editingCategory) && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <div onClick={() => { setIsAddModalOpen(false); setEditingCategory(null); }} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative w-full max-w-md bg-[#140f26] border border-amber-500/30 rounded-3xl p-6 space-y-6 shadow-2xl z-10 text-slate-100">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold font-serif-brand text-white">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button onClick={() => { setIsAddModalOpen(false); setEditingCategory(null); }} className="p-2 rounded-full hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Multi-Colour Shots"
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Icon Emoji / Symbol</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g. 🎆 or 🚀"
                    className="w-full bg-[#1a142e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => { setIsAddModalOpen(false); setEditingCategory(null); }}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold shadow-lg cursor-pointer"
                  >
                    {editingCategory ? 'Save Changes' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Category Confirmation Modal */}
        {deletingCatId && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <div onClick={() => setDeletingCatId(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-[#140f26] border border-red-500/40 rounded-3xl p-6 space-y-4 text-center z-10">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif-brand">Delete Category</h3>
              <p className="text-xs text-slate-300">
                Are you sure you want to delete category <strong className="text-amber-300">{categories.find(c => c.id === deletingCatId)?.name}</strong>?
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingCatId(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md cursor-pointer"
                >
                  Yes, Delete Category
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
