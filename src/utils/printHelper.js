import { PRODUCTS } from '../data/products';

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
      <div className="header">
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

export function printOrderInvoice(cartItems, customerDetails, totalOriginal, totalSavings, subtotal) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Quotation - Om Aadhishivam Crackers</title>
      <style>
        body { font-family: sans-serif; padding: 25px; color: #111; }
        .header { border-bottom: 2px solid #d97706; padding-bottom: 15px; margin-bottom: 20px; }
        .blessing { color: #d97706; font-weight: bold; font-size: 13px; text-align: center; }
        .shop-title { color: #991b1b; font-size: 26px; font-weight: bold; text-align: center; }
        .shop-tamil { color: #b45309; font-size: 20px; font-weight: bold; text-align: center; }
        .customer-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
        th { background-color: #f1f5f9; font-weight: bold; }
        .right { text-align: right; }
        .summary { margin-top: 20px; width: 300px; float: right; font-size: 14px; }
        .summary-row { display: flex; justify-content: space-between; padding: 5px 0; }
        .total-row { font-size: 18px; font-weight: bold; color: #b45309; border-top: 2px solid #d97706; padding-top: 8px; }
        .footer-note { clear: both; margin-top: 40px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        @media print { button { display: none; } }
      </style>
    </head>
    <body>
      <button onclick="window.print()" style="margin-bottom: 15px; padding: 10px 20px; background: #d97706; color: white; border: none; font-weight: bold; cursor: pointer; border-radius: 6px;">
        🖨️ Print / Save Order PDF
      </button>

      <div class="header">
        <div class="blessing">ஸ்ரீ மேடயாண்டி துணை</div>
        <div class="shop-title">OM AADHISHIVAM CRACKERS</div>
        <div class="shop-tamil">ஓம ஆதிசிவம் பட்டாசு கடை</div>
        <div style="text-align: center; font-size: 12px; margin-top: 6px; color: #4b5563;">
          மடத்துப்பட்டி - சாத்தூர் மெயின்ரோடு, மடத்துப்பட்டி, சிவகாசி (Madathupatti - Sattur Main Road, Madathupatti, Sivakasi)<br/>
          Contacts: +91 84892 73614 / +91 78068 53112
        </div>
      </div>

      <div class="customer-box">
        <strong>CUSTOMER DETAILS:</strong><br/>
        Name: ${customerDetails.name || 'Valued Customer'}<br/>
        Phone / WhatsApp: ${customerDetails.phone || '-'}<br/>
        Delivery Address: ${customerDetails.address || '-'}<br/>
        City / Pincode: ${customerDetails.city || '-'}
      </div>

      <h3>ORDERED ITEMS LIST</h3>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Name</th>
            <th>பட்டாசின் பெயர்</th>
            <th>Qty</th>
            <th>Rate</th>
            <th class="right">Total</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems.map((item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.name}</td>
              <td>${item.tamilName || '-'}</td>
              <td>${item.quantity} ${item.unit || ''}</td>
              <td>₹${item.price}</td>
              <td class="right">₹${item.price * item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <span>Total MRP Value:</span>
          <span style="text-decoration: line-through;">₹${totalOriginal}</span>
        </div>
        <div class="summary-row" style="color: #047857; font-weight: bold;">
          <span>80% Factory Savings:</span>
          <span>- ₹${totalSavings}</span>
        </div>
        <div class="summary-row total-row">
          <span>Net Payable Amount:</span>
          <span>₹${subtotal}</span>
        </div>
      </div>

      <div class="footer-note">
        Thank you for ordering with Om Aadhishivam Crackers, Sivakasi!<br/>
        For any order inquiries, call +91 84892 73614 or +91 78068 53112.
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
