import { PRODUCTS } from '../data/products';

export function generateWhatsAppOrderMessage(cartItems, customerDetails, orderInfo = {}) {
  const orderId = orderInfo.id || customerDetails.orderId || '0026';
  const orderDate = orderInfo.orderDate || customerDetails.orderDate || new Date().toISOString().split('T')[0];

  let totalMarketAmount = 0;
  let totalDiscountAmount = 0;
  let totalNetAmount = 0;

  let text = `OM AADHI SHIVAM CRACKERS\n`;
  text += `Madathupatti to Sattur Main Road , Madathupatti, Sivakasi\n`;
  text += `Phone: +91 7806853112\n`;
  text += `Email : manikandaprabhu5307@gmail.com\n\n`;

  text += `Customer Name: ${customerDetails.name || customerDetails.customerName || 'Valued Customer'}\n`;
  text += `Address: ${customerDetails.address || '-'}${customerDetails.city ? `, ${customerDetails.city}` : ''}${customerDetails.pincode ? ` - ${customerDetails.pincode}` : ''}\n`;
  text += `Phone: ${customerDetails.phone || customerDetails.customerPhone || '-'}\n`;
  text += `Whatsapp: ${customerDetails.whatsapp || customerDetails.phone || '-'}\n`;
  text += `Email: ${customerDetails.email || customerDetails.customerEmail || '-'}\n`;
  text += `Order ID: ${orderId}\n`;
  text += `Order Date: ${orderDate}\n\n`;

  text += `----------------------------------------\n`;
  text += `ITEMIZED ORDER LIST:\n`;
  text += `----------------------------------------\n`;
  text += `S.No | Item Name | Market Price | Per | Qty | Total | Perc | 80% Disc Amt | Net Amt\n\n`;

  cartItems.forEach((item, index) => {
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

    text += `${index + 1}. ${item.name}\n`;
    text += `Market Price: ${marketPrice} | Per: ${unit} | Qty: ${qty} | Total: ${marketTotal} | Perc: ${perc}% | 80% Disc Amt: ${discAmt.toFixed(2)} | Net Amt: ${netAmt.toFixed(2)}\n\n`;
  });

  text += `----------------------------------------\n`;
  text += `Total Amount : Rs. ${totalMarketAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  text += `Discount Amount : Rs. ${totalDiscountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  text += `Total Amount : Rs. ${totalNetAmount.toLocaleString('en-IN')}\n\n`;
  
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
  text += `📄 VIEW & DOWNLOAD OFFICIAL PDF INVOICE:\n`;
  text += `${origin}/invoice?id=${orderId}&autoPrint=true\n\n`;

  text += `Thank you for your business with us.`;

  return text;
}

export function printOfficialPriceList(customProducts) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const itemsToPrint = (customProducts && customProducts.length > 0) ? customProducts : PRODUCTS;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Om Aadhishivam Crackers - Price List 2026</title>
      <style>
        body { font-family: sans-serif; padding: 20px; color: #111; }
        .header { text-align: center; border-bottom: 2px solid #d97706; padding-bottom: 15px; margin-bottom: 20px; }
        .blessing { color: #d97706; font-weight: bold; font-size: 14px; }
        .shop-title { color: #991b1b; font-size: 28px; font-weight: bold; margin: 5px 0; }
        .shop-tamil { color: #b45309; font-size: 22px; font-weight: bold; }
        .badge { background: #fef3c7; color: #92400e; padding: 4px 12px; font-weight: bold; border-radius: 20px; font-size: 13px; display: inline-block; margin-top: 5px; }
        .contact-info { font-size: 12px; margin-top: 10px; color: #374151; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
        th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
        .mrp { text-decoration: line-through; color: #64748b; }
        .discount-price { font-weight: bold; color: #047857; }
        .footer-note { margin-top: 25px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="blessing">ஸ்ரீ மேடயாண்டி துணை</div>
        <div class="shop-title">OM AADHISHIVAM CRACKERS</div>
        <div class="shop-tamil">ஓம ஆதிசிவம் பட்டாசு கடை</div>
        <div class="badge">SIVAKASI PRICE LIST - 2026 • 80% MEGA DISCOUNT</div>
        <div class="contact-info">
          <strong>Address:</strong> மடத்துப்பட்டி - சாத்தூர் மெயின்ரோடு, மடத்துப்பட்டி, சிவகாசி (Madathupatti - Sattur Main Road, Madathupatti, Sivakasi)<br/>
          <strong>WhatsApp:</strong> 78068 53112 | <strong>Phone:</strong> 84892 73614 / 78068 53112
        </div>
      </div>

      <button onclick="window.print()" style="margin-bottom: 15px; padding: 8px 16px; background: #d97706; color: white; border: none; font-weight: bold; cursor: pointer; border-radius: 6px;">
        🖨️ Print / Save as PDF
      </button>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name (English)</th>
            <th>பட்டாசின் பெயர் (Tamil)</th>
            <th>Market MRP</th>
            <th>80% Discount Price</th>
            <th>Per Unit</th>
          </tr>
        </thead>
        <tbody>
          ${itemsToPrint.map((p, idx) => `
            <tr>
              <td><strong>${idx + 1}</strong></td>
              <td>${p.name}</td>
              <td>${p.tamilName || '-'}</td>
              <td class="mrp">₹${p.originalPrice || '-'}</td>
              <td class="discount-price">₹${p.price}</td>
              <td>${p.unit}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer-note">
        Thank you for choosing Om Aadhishivam Crackers, Sivakasi. All prices are subject to terms & availability.
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function printOrderInvoice(cartItems, customerDetails, totalOriginal, totalSavings, subtotal, orderInfo = {}) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const orderId = orderInfo.id || customerDetails.orderId || '0026';
  const orderDate = orderInfo.orderDate || customerDetails.orderDate || new Date().toISOString().split('T')[0];

  let calcMarketTotal = 0;
  let calcDiscTotal = 0;
  let calcNetTotal = 0;

  const itemRowsHtml = cartItems.map((item, idx) => {
    const marketPrice = Number(item.originalPrice || (item.price * 5));
    const qty = Number(item.quantity);
    const unit = item.unit || '1 BOX';
    const totalMkt = marketPrice * qty;
    const perc = Math.round(((marketPrice - item.price) / marketPrice) * 100);
    const discAmt = (marketPrice - item.price) * qty;
    const netAmt = item.price * qty;

    calcMarketTotal += totalMkt;
    calcDiscTotal += discAmt;
    calcNetTotal += netAmt;

    return `
      <tr>
        <td style="text-align: center;">${idx + 1}</td>
        <td>${item.name}</td>
        <td style="text-align: right;">${marketPrice}</td>
        <td style="text-align: center;">${unit}</td>
        <td style="text-align: center;">${qty}</td>
        <td style="text-align: right;">${totalMkt}</td>
        <td style="text-align: center;">${perc}</td>
        <td style="text-align: right;">${discAmt.toFixed(2)}</td>
        <td style="text-align: right; font-weight: bold;">${netAmt.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const displayMarketTotal = (totalOriginal || calcMarketTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const displayDiscTotal = (totalSavings || calcDiscTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const displayNetTotal = (subtotal || calcNetTotal).toLocaleString('en-IN');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Invoice ${orderId} - Om Aadhi Shivam Crackers</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #000; font-size: 12px; }
        .top-bar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .logo-title { font-size: 22px; font-weight: bold; color: #d91b5c; font-family: 'Arial Black', sans-serif; text-transform: uppercase; }
        .contacts { text-align: right; font-size: 13px; font-weight: bold; line-height: 1.4; }
        .shop-header-box { text-align: center; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 6px 0; margin-bottom: 15px; }
        .shop-name { font-weight: bold; font-size: 15px; }
        .shop-addr { font-size: 12px; margin-top: 2px; }
        
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        .info-table td { border: 1px solid #ccc; padding: 6px 8px; vertical-align: top; }
        .info-label { background-color: #e8f4fc; font-weight: bold; width: 15%; }
        .info-val { width: 35%; }

        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; }
        .items-table th, .items-table td { border: 1px solid #000; padding: 6px; }
        .items-table th { background-color: #cde4f7; font-weight: bold; text-align: center; }

        .summary-container { text-align: right; margin-top: 15px; font-size: 14px; font-weight: bold; line-height: 1.6; }
        .summary-line { margin-bottom: 4px; }
        .footer-thankyou { margin-top: 30px; text-align: center; font-size: 13px; font-style: italic; }

        @media print {
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 15px;">
        <button onclick="window.print()" style="padding: 8px 18px; background: #d91b5c; color: white; border: none; font-weight: bold; cursor: pointer; border-radius: 5px; font-size: 13px;">
          🖨️ Print / Download PDF Invoice
        </button>
      </div>

      <div class="top-bar">
        <div>
          <div class="logo-title">OM AADHI SHIVAM CRACKERS</div>
        </div>
        <div class="contacts">
          +91 7806853112<br/>
          +91 7806853112<br/>
          Email : manikandaprabhu5307@gmail.com
        </div>
      </div>

      <div class="shop-header-box">
        <div class="shop-name">Om Aadhi Shivam Crackers</div>
        <div class="shop-addr">Madathupatti to Sattur Main Road , Madathupatti, Sivakasi</div>
      </div>

      <table class="info-table">
        <tr>
          <td class="info-label">Customer Name</td>
          <td class="info-val">${customerDetails.name || customerDetails.customerName || 'Valued Customer'}</td>
          <td class="info-label">Order ID</td>
          <td class="info-val">${orderId}</td>
        </tr>
        <tr>
          <td class="info-label">Address</td>
          <td class="info-val">${customerDetails.address || '-'}${customerDetails.city ? `, ${customerDetails.city}` : ''}${customerDetails.pincode ? ` - ${customerDetails.pincode}` : ''}</td>
          <td class="info-label">Order Date</td>
          <td class="info-val">${orderDate}</td>
        </tr>
        <tr>
          <td class="info-label">Phone</td>
          <td class="info-val">${customerDetails.phone || customerDetails.customerPhone || '-'}</td>
          <td class="info-label"></td>
          <td class="info-val"></td>
        </tr>
        <tr>
          <td class="info-label">Whatsapp</td>
          <td class="info-val">${customerDetails.whatsapp || customerDetails.phone || '-'}</td>
          <td class="info-label"></td>
          <td class="info-val"></td>
        </tr>
        <tr>
          <td class="info-label">Email</td>
          <td class="info-val">${customerDetails.email || customerDetails.customerEmail || '-'}</td>
          <td class="info-label"></td>
          <td class="info-val"></td>
        </tr>
      </table>

      <table class="items-table">
        <thead>
          <tr>
            <th style="width: 5%;">S.No</th>
            <th style="width: 30%;">Item Name</th>
            <th style="width: 10%;">Market Price</th>
            <th style="width: 7%;">Per</th>
            <th style="width: 5%;">Qty</th>
            <th style="width: 10%;">Total</th>
            <th style="width: 6%;">Perc</th>
            <th style="width: 12%;">80% Disc Amt</th>
            <th style="width: 15%;">Net Amt</th>
          </tr>
        </thead>
        <tbody>
          ${itemRowsHtml}
        </tbody>
      </table>

      <div class="summary-container">
        <div class="summary-line">Total Amount : Rs. ${displayMarketTotal}</div>
        <div class="summary-line">Discount Amount : Rs. ${displayDiscTotal}</div>
        <div class="summary-line" style="font-size: 16px;">Total Amount : Rs. ${displayNetTotal}</div>
      </div>

      <div class="footer-thankyou">
        Thank you for your business with us.
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

