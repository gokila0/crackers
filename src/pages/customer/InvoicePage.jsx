import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Printer, MessageCircle, ArrowLeft } from 'lucide-react';

export default function InvoicePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { orders } = useData();

  const orderId = searchParams.get('id') || 'ORD-2026-4806';
  const autoPrint = searchParams.get('autoPrint') === 'true';

  // Find order in state or localStorage
  const savedOrders = orders.length > 0 ? orders : JSON.parse(localStorage.getItem('appOrders') || '[]');
  const order = savedOrders.find(o => o.id === orderId) || {
    id: orderId,
    customerName: 'Gokila N',
    address: '171, SALIYAR SOUTH STREET Srivilliputhur Virudhunagar Tamil Nadu India, 626126',
    city: 'VIRUDHUNAGAR',
    pincode: '626126',
    phone: '17806974545',
    whatsapp: '17806974545',
    customerEmail: 'gokigokin2@gmail.com',
    orderDate: '24 Sept 2026, 9:02 pm',
    totalAmount: 3680,
    items: [
      {
        id: 1,
        name: 'Bada Peacock Crackling (5 in 1)',
        originalPrice: 2300,
        price: 460,
        unit: '1 BOX',
        quantity: 8
      }
    ]
  };

  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const cartItems = order.items || [];
  let totalMarketAmount = 0;
  let totalDiscountAmount = 0;
  let totalNetAmount = 0;

  const itemRows = cartItems.map((item, idx) => {
    const marketPrice = Number(item.originalPrice || (item.price * 5));
    const qty = Number(item.quantity);
    const unit = item.unit || '1 BOX';
    const marketTotal = marketPrice * qty;
    const perc = Math.round(((marketPrice - item.price) / marketPrice) * 100);
    const discAmt = (marketPrice - item.price) * qty;
    const netAmt = item.price * qty;

    totalMarketAmount += marketTotal;
    totalDiscountAmount += discAmt;
    totalNetAmount += netAmt;

    return {
      sno: idx + 1,
      name: item.name,
      marketPrice,
      unit,
      qty,
      marketTotal,
      perc,
      discAmt,
      netAmt
    };
  });

  const displayMarketTotal = (totalMarketAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const displayDiscTotal = (totalDiscountAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const displayNetTotal = (order.totalAmount || totalNetAmount).toLocaleString('en-IN');

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    let text = `*OM AADHI SHIVAM CRACKERS*\n`;
    text += `Madathupatti to Sattur Main Road , Madathupatti, Sivakasi\n\n`;
    text += `📄 *OFFICIAL PDF INVOICE ORDER:* ${order.id}\n`;
    text += `👤 *Customer:* ${order.customerName}\n`;
    text += `💰 *Net Amount:* Rs. ${displayNetTotal}\n\n`;
    text += `🔗 *View & Download PDF Invoice:* ${window.location.origin}/invoice?id=${order.id}\n\n`;
    text += `Thank you for your business with us.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/917806853112?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8 font-sans">
      {/* Top Action Bar (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-md border border-slate-200 print:hidden">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send PDF Link on WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Invoice Document Box matching PDF Screenshot Exactly */}
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 border border-slate-300 shadow-xl print:shadow-none print:border-none print:p-0">
        
        {/* Header Section */}
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-black text-rose-700 tracking-tight font-serif uppercase">
              OM AADHI SHIVAM CRACKERS
            </h1>
          </div>
          <div className="text-right text-xs font-bold text-slate-800 leading-snug">
            <div>+91 7806853112</div>
            <div>+91 7806853112</div>
            <div>Email : manikandaprabhu5307@gmail.com</div>
          </div>
        </div>

        {/* Sub Header Address Bar */}
        <div className="text-center border-t border-b border-slate-900 py-2 mb-6">
          <div className="font-bold text-sm text-slate-950">Om Aadhi Shivam Crackers</div>
          <div className="text-xs text-slate-800">Madathupatti to Sattur Main Road , Madathupatti, Sivakasi</div>
        </div>

        {/* Customer & Order Metadata Grid */}
        <div className="grid grid-cols-2 border border-slate-300 mb-6 text-xs divide-x divide-slate-300">
          {/* Left Column: Customer details */}
          <div className="divide-y divide-slate-300">
            <div className="grid grid-cols-3 p-2 bg-sky-50 font-bold">
              <span className="col-span-1 text-slate-700">Customer Name</span>
              <span className="col-span-2 text-slate-950 font-extrabold">{order.customerName || 'Valued Customer'}</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span className="col-span-1 font-bold text-slate-700">Address</span>
              <span className="col-span-2 text-slate-900">{order.address || '-'}{order.city ? `, ${order.city}` : ''}{order.pincode ? ` - ${order.pincode}` : ''}</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span className="col-span-1 font-bold text-slate-700">Phone</span>
              <span className="col-span-2 text-slate-900">{order.phone || '-'}</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span className="col-span-1 font-bold text-slate-700">Whatsapp</span>
              <span className="col-span-2 text-slate-900">{order.whatsapp || order.phone || '-'}</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span className="col-span-1 font-bold text-slate-700">Email</span>
              <span className="col-span-2 text-slate-900">{order.customerEmail || order.email || '-'}</span>
            </div>
          </div>

          {/* Right Column: Order ID & Date */}
          <div className="divide-y divide-slate-300">
            <div className="grid grid-cols-3 p-2 bg-sky-50 font-bold">
              <span className="col-span-1 text-slate-700">Order ID</span>
              <span className="col-span-2 text-slate-950 font-extrabold">{order.id}</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span className="col-span-1 font-bold text-slate-700">Order Date</span>
              <span className="col-span-2 text-slate-900">{order.orderDate || new Date().toISOString().split('T')[0]}</span>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <table className="w-full border-collapse border border-slate-900 text-xs mb-6">
          <thead>
            <tr className="bg-sky-200 text-slate-950 font-bold border-b border-slate-900">
              <th className="border border-slate-900 p-2 text-center w-12">S.No</th>
              <th className="border border-slate-900 p-2 text-left">Item Name</th>
              <th className="border border-slate-900 p-2 text-right">Market Price</th>
              <th className="border border-slate-900 p-2 text-center">Per</th>
              <th className="border border-slate-900 p-2 text-center">Qty</th>
              <th className="border border-slate-900 p-2 text-right">Total</th>
              <th className="border border-slate-900 p-2 text-center">Perc</th>
              <th className="border border-slate-900 p-2 text-right">80% Disc Amt</th>
              <th className="border border-slate-900 p-2 text-right">Net Amt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300 text-slate-900">
            {itemRows.map((row) => (
              <tr key={row.sno} className="hover:bg-slate-50">
                <td className="border border-slate-900 p-2 text-center">{row.sno}</td>
                <td className="border border-slate-900 p-2 font-medium">{row.name}</td>
                <td className="border border-slate-900 p-2 text-right">{row.marketPrice}</td>
                <td className="border border-slate-900 p-2 text-center">{row.unit}</td>
                <td className="border border-slate-900 p-2 text-center">{row.qty}</td>
                <td className="border border-slate-900 p-2 text-right">{row.marketTotal}</td>
                <td className="border border-slate-900 p-2 text-center">{row.perc}%</td>
                <td className="border border-slate-900 p-2 text-right">{row.discAmt.toFixed(2)}</td>
                <td className="border border-slate-900 p-2 text-right font-bold">{row.netAmt.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div className="text-right space-y-1 font-bold text-sm text-slate-950 mb-10">
          <div>Total Amount : Rs. {displayMarketTotal}</div>
          <div>Discount Amount : Rs. {displayDiscTotal}</div>
          <div className="text-base font-black text-rose-800 pt-1">Total Amount : Rs. {displayNetTotal}</div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs italic text-slate-700 border-t border-slate-200 pt-4">
          Thank you for your business with us.
        </div>

      </div>
    </div>
  );
}
