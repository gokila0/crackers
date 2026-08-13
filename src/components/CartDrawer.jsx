import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, MessageCircle, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { printOrderInvoice } from '../utils/printHelper';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'customerDetails' | 'success'
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    city: '',
    state: 'Tamil Nadu',
    address: '',
    pincode: ''
  });

  const MIN_ORDER_AMOUNT = 3000;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginal = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price * 5) * item.quantity, 0);
  const totalSavings = Math.max(0, totalOriginal - subtotal);
  const minOrderProgress = Math.min(100, Math.round((subtotal / MIN_ORDER_AMOUNT) * 100));
  const remainingForMinOrder = Math.max(0, MIN_ORDER_AMOUNT - subtotal);

  const handleWhatsAppOrder = () => {
    let text = `*NEW ESTIMATE ORDER - OM AADHISHIVAM CRACKERS*\n\n`;
    text += `*CUSTOMER DETAILS:*\n`;
    text += `👤 Name: ${customerDetails.name || 'Valued Customer'}\n`;
    text += `📞 Phone: ${customerDetails.phone || '-'}\n`;
    text += `📱 WhatsApp: ${customerDetails.whatsapp || customerDetails.phone || '-'}\n`;
    text += `🏙️ City: ${customerDetails.city || '-'}\n`;
    text += `📍 Address: ${customerDetails.address || '-'} ${customerDetails.pincode ? `(${customerDetails.pincode})` : ''}\n\n`;
    text += `*ITEMIZED ESTIMATE ORDER LIST:*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} x ${item.quantity} [${item.unit}] = ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    text += `\n*NET ESTIMATE TOTAL:* ₹${subtotal.toLocaleString('en-IN')}\n\n`;
    text += `Please confirm my order and send payment bank details. Thank you!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/917806853112?text=${encodedText}`, '_blank');

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    setCheckoutStep('success');
  };

  const handlePrintPDF = () => {
    printOrderInvoice(cartItems, customerDetails, totalOriginal, totalSavings, subtotal);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#fffdf5] border-l-4 border-amber-500 text-slate-950 flex flex-col justify-between shadow-2xl">
          
          {/* Drawer Header (HIGH CONTRAST FESTIVE BANNER) */}
          <div className="p-5 bg-gradient-to-r from-red-800 via-rose-800 to-amber-800 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-wide font-serif-brand">Om Aadhishivam Order Estimate</h2>
                <p className="text-xs text-yellow-300 font-bold">Direct Sivakasi Wholesale • 80% Off</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Checkout Success View */}
          {checkoutStep === 'success' ? (
            <div className="p-8 text-center space-y-6 my-auto">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center animate-bounce shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-amber-950 font-serif-brand">Order Sent via WhatsApp!</h3>
                <p className="text-sm font-bold text-slate-800">
                  Thank you for placing your order estimate with <span className="text-red-700 font-black">Om Aadhishivam Crackers</span>!
                </p>
                <p className="text-xs text-amber-950 font-extrabold bg-amber-100 p-3 rounded-2xl border border-amber-300">
                  Our team in Sivakasi will confirm your items and dispatch date on WhatsApp shortly (+91 78068 53112).
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handlePrintPDF}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download Order Invoice PDF</span>
                </button>

                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-black text-sm transition-colors cursor-pointer border border-amber-400"
                >
                  Back to Shop
                </button>
              </div>
            </div>
          ) : checkoutStep === 'customerDetails' ? (
            
            /* Customer Address & Contact Details Step */
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fffdf5]">
              <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3">
                <h3 className="font-black text-base text-amber-950">Delivery & Customer Info</h3>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs text-red-700 font-black hover:underline cursor-pointer"
                >
                  ← Back to Items
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-950 font-black mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2.5 text-slate-950 font-extrabold placeholder-slate-400 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-950 font-black mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile number"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2.5 text-slate-950 font-extrabold placeholder-slate-400 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-950 font-black mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="WhatsApp number"
                      value={customerDetails.whatsapp}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, whatsapp: e.target.value })}
                      className="w-full bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2.5 text-slate-950 font-extrabold placeholder-slate-400 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-950 font-black mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chennai, Madurai"
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                      className="w-full bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2.5 text-slate-950 font-extrabold placeholder-slate-400 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-950 font-black mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={customerDetails.pincode}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
                      className="w-full bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2.5 text-slate-950 font-extrabold placeholder-slate-400 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-950 font-black mb-1">Full Delivery Address *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="House No, Street, Landmark..."
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    className="w-full bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2.5 text-slate-950 font-extrabold placeholder-slate-400 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Order Breakdown Summary Box */}
              <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-bold">
                  <span>Gross Market MRP:</span>
                  <span className="line-through font-mono">₹{totalOriginal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-extrabold">
                  <span>80% Festival Discount:</span>
                  <span className="font-mono">- ₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-amber-950 border-t border-amber-300 pt-2">
                  <span>Net Estimated Total:</span>
                  <span className="font-mono text-base text-red-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Order via WhatsApp (+91 78068 53112)</span>
                </button>
              </div>

            </div>
          ) : (
            
            /* Items List Step */
            <>
              {/* Minimum Order Progress Bar */}
              <div className="px-5 py-3 bg-amber-100/90 border-b-2 border-amber-300 space-y-1.5">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-amber-950">Minimum Order Progress (₹3,000):</span>
                  <span className={subtotal >= MIN_ORDER_AMOUNT ? 'text-emerald-800 font-black' : 'text-red-700 font-black'}>
                    {subtotal >= MIN_ORDER_AMOUNT ? 'Eligible for Dispatch ✓' : `Add ₹${remainingForMinOrder.toLocaleString('en-IN')} more`}
                  </span>
                </div>
                <div className="w-full bg-white border border-amber-300 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${subtotal >= MIN_ORDER_AMOUNT ? 'bg-emerald-600' : 'bg-red-600'}`}
                    style={{ width: `${minOrderProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List (DARK HIGH-CONTRAST TEXT) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#fffdf5]">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-amber-700 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-amber-950">Your Estimate List is Empty</h3>
                      <p className="text-xs font-bold text-slate-700">Select crackers from the catalog to build your order estimate.</p>
                    </div>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border-2 border-amber-300 flex items-center justify-between gap-3 shadow-sm hover:border-amber-500 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="min-w-0 space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-950 truncate">{item.name}</h4>
                          <div className="text-xs text-slate-800 font-bold flex items-center gap-1.5">
                            <span className="font-black text-red-700 font-mono">₹{item.price}</span>
                            <span>/ {item.unit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-400 rounded-xl p-1 shadow-sm">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-amber-300 hover:bg-red-600 hover:text-white text-slate-900 font-black flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3 stroke-[3]" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-slate-950">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-black flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer (HIGH CONTRAST LIGHT THEME) */}
              {cartItems.length > 0 && (
                <div className="p-5 bg-amber-100/90 border-t-2 border-amber-400 space-y-4 shadow-lg">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-700 font-bold">
                      <span>Total Market Price:</span>
                      <span className="line-through font-mono">₹{totalOriginal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-800 font-black">
                      <span>80% Festival Discount:</span>
                      <span className="font-mono">- ₹{totalSavings.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-amber-950 border-t border-amber-300 pt-2">
                      <span>Net Estimated Amount:</span>
                      <span className="font-mono text-xl text-red-800">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onClearCart}
                      className="py-2.5 rounded-xl bg-white border border-rose-300 hover:bg-rose-100 text-rose-800 font-black text-xs transition-colors cursor-pointer"
                    >
                      Clear List
                    </button>
                    <button
                      onClick={() => setCheckoutStep('customerDetails')}
                      disabled={subtotal < MIN_ORDER_AMOUNT}
                      className="py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>Proceed to Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
