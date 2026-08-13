import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useData } from '../../context/DataContext';
import { ShoppingCart, Search, Eye, Trash2, CheckCircle2, Clock, Truck, XCircle, Phone, MessageSquare, MapPin, Printer, X, Filter } from 'lucide-react';
import { printOrderInvoice } from '../../utils/printHelper';

export default function AdminOrders() {
  const { orders, updateOrderStatus, setOrders } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingOrder, setViewingOrder] = useState(null);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      ord.id.toLowerCase().includes(searchLower) ||
      (ord.customerName && ord.customerName.toLowerCase().includes(searchLower)) ||
      (ord.phone && ord.phone.includes(searchLower)) ||
      (ord.city && ord.city.toLowerCase().includes(searchLower));
    return matchesStatus && matchesSearch;
  });

  const handleDeleteOrder = () => {
    if (deletingOrderId) {
      if (setOrders) {
        setOrders(prev => prev.filter(o => o.id !== deletingOrderId));
      }
      setDeletingOrderId(null);
    }
  };

  const handlePrint = (ord) => {
    const custDetails = {
      name: ord.customerName,
      phone: ord.phone,
      whatsapp: ord.whatsapp || ord.phone,
      city: ord.city,
      address: ord.address,
      pincode: ord.pincode
    };
    const cartItems = ord.items || [];
    const totalSub = ord.totalAmount || 0;
    const totalOrig = cartItems.reduce((s, i) => s + (i.originalPrice || i.price * 5) * i.quantity, 0);
    const savings = Math.max(0, totalOrig - totalSub);

    printOrderInvoice(cartItems, custDetails, totalOrig, savings, totalSub);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'Shipped':
        return <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-extrabold flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Shipped</span>;
      case 'Delivered':
        return <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-extrabold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-extrabold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-extrabold flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#090714] text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full max-w-full overflow-x-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-serif-brand text-white">Customer Orders</h1>
            <p className="text-sm text-slate-400">View customer orders, delivery addresses, and update order statuses</p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold self-start sm:self-auto">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#140f26] p-4 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID, customer, phone, or city..."
              className="w-full bg-[#1a142e] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {['all', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize whitespace-nowrap ${
                  statusFilter === st ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-4">
          {filteredOrders.map((ord) => (
            <div key={ord.id} className="p-4 rounded-2xl bg-[#140f26] border border-white/10 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono font-bold text-amber-400 text-xs">{ord.id}</span>
                {getStatusBadge(ord.orderStatus)}
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-white text-sm">{ord.customerName}</div>
                <div className="text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href={`tel:${ord.phone}`} className="hover:underline text-amber-300 font-mono">{ord.phone}</a>
                </div>
                {ord.city && (
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ord.city} {ord.pincode ? `(${ord.pincode})` : ''}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Payable</span>
                  <span className="text-amber-400 font-extrabold text-base">₹{ord.totalAmount?.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setViewingOrder(ord)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors"
                    title="View Order Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePrint(ord)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition-colors"
                    title="Print PDF Invoice"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingOrderId(ord.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                    title="Delete Order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-[#140f26] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-300 font-bold uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Order Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-400">{ord.id}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="font-bold text-white text-sm">{ord.customerName}</div>
                      <div className="text-slate-400 text-[11px] font-mono flex items-center gap-1">
                        <span>📱 {ord.phone}</span>
                        {ord.whatsapp && (
                          <a
                            href={`https://wa.me/91${ord.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline font-bold"
                          >
                            (WhatsApp)
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div>{ord.city || '-'}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-xs">{ord.address}</div>
                    </td>
                    <td className="p-4 text-slate-400">{ord.orderDate || '-'}</td>
                    <td className="p-4 font-extrabold text-amber-400 text-sm">₹{ord.totalAmount?.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="bg-[#1a142e] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewingOrder(ord)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePrint(ord)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition-colors"
                          title="Print PDF Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingOrderId(ord.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                          title="Delete Order"
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

        {/* View Order Modal */}
        {viewingOrder && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <div onClick={() => setViewingOrder(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-[#140f26] border border-amber-500/30 rounded-3xl p-6 space-y-5 shadow-2xl z-10 text-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs text-amber-400 font-mono font-bold">{viewingOrder.id}</span>
                  <h3 className="text-lg font-bold font-serif-brand text-white">Order Details</h3>
                </div>
                <button onClick={() => setViewingOrder(null)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Info Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{viewingOrder.customerName}</span>
                  {getStatusBadge(viewingOrder.orderStatus)}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 text-slate-300 border-t border-white/10">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Phone Number</span>
                    <a href={`tel:${viewingOrder.phone}`} className="font-mono text-amber-300 font-bold">{viewingOrder.phone}</a>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">WhatsApp</span>
                    <a
                      href={`https://wa.me/91${(viewingOrder.whatsapp || viewingOrder.phone || '').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-emerald-400 font-bold hover:underline"
                    >
                      {viewingOrder.whatsapp || viewingOrder.phone} 💬
                    </a>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[10px]">Delivery Address</span>
                    <div className="text-slate-200">{viewingOrder.address || '-'}</div>
                    <div className="text-amber-400 font-semibold">{viewingOrder.city} {viewingOrder.pincode ? `- ${viewingOrder.pincode}` : ''}</div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ordered Crackers List</h4>
                <div className="divide-y divide-white/5 border border-white/10 rounded-2xl bg-black/20 overflow-hidden text-xs max-h-56 overflow-y-auto">
                  {(viewingOrder.items || []).map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-2">
                      <div>
                        {item.tamilName && <div className="text-amber-400 text-[10px] font-bold">{item.tamilName}</div>}
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.quantity} x ₹{item.price} / {item.unit || 'pkt'}</div>
                      </div>
                      <div className="font-mono font-bold text-amber-300 text-sm">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Total & Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Net Payable Total</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono">₹{viewingOrder.totalAmount?.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={() => handlePrint(viewingOrder)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingOrderId && (
          <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
            <div onClick={() => setDeletingOrderId(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-[#140f26] border border-red-500/40 rounded-3xl p-6 space-y-4 text-center z-10">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif-brand">Delete Order Record</h3>
              <p className="text-xs text-slate-300">Are you sure you want to delete order record <strong className="text-amber-300">{deletingOrderId}</strong>?</p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button onClick={() => setDeletingOrderId(null)} className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-bold text-xs cursor-pointer">
                  Cancel
                </button>
                <button onClick={handleDeleteOrder} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md cursor-pointer">
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
