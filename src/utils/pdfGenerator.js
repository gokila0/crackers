import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateAndSendPDFOrder(cartItems, customerDetails, orderInfo = {}, targetPhone = '7806853112') {
  const orderId = orderInfo.id || customerDetails.orderId || 'ORD-2026-8097';
  const orderDate = orderInfo.orderDate || customerDetails.orderDate || new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  // 1. Create temporary off-screen HTML element for PDF snapshot
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.width = '800px';
  container.style.padding = '30px';
  container.style.backgroundColor = '#ffffff';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.fontSize = '12px';
  container.style.color = '#000000';

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
        <td style="border: 1px solid #000; padding: 6px; text-align: center;">${idx + 1}</td>
        <td style="border: 1px solid #000; padding: 6px;">${item.name}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: right;">${marketPrice}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: center;">${unit}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: center;">${qty}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: right;">${totalMkt}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: center;">${perc}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: right;">${discAmt.toFixed(2)}</td>
        <td style="border: 1px solid #000; padding: 6px; text-align: right; font-weight: bold;">${netAmt.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const displayMarketTotal = (calcMarketTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const displayDiscTotal = (calcDiscTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const displayNetTotal = (calcNetTotal).toLocaleString('en-IN');

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
      <div>
        <div style="font-size: 22px; font-weight: bold; color: #d91b5c; font-family: 'Arial Black', sans-serif; text-transform: uppercase;">OM AADHI SHIVAM CRACKERS</div>
      </div>
      <div style="text-align: right; font-size: 12px; font-weight: bold; line-height: 1.4;">
        +91 7806853112<br/>
        +91 7806853112<br/>
        Email : manikandaprabhu5307@gmail.com
      </div>
    </div>

    <div style="text-align: center; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 6px 0; margin-bottom: 15px;">
      <div style="font-weight: bold; font-size: 14px;">Om Aadhi Shivam Crackers</div>
      <div style="font-size: 11px; margin-top: 2px;">Madathupatti to Sattur Main Road , Madathupatti, Sivakasi</div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11px;">
      <tr>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold; width: 18%;">Customer Name</td>
        <td style="border: 1px solid #ccc; padding: 6px; width: 32%;">${customerDetails.name || customerDetails.customerName || 'Valued Customer'}</td>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold; width: 18%;">Order ID</td>
        <td style="border: 1px solid #ccc; padding: 6px; width: 32%;">${orderId}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold;">Address</td>
        <td style="border: 1px solid #ccc; padding: 6px;">${customerDetails.address || '-'}${customerDetails.city ? `, ${customerDetails.city}` : ''}${customerDetails.pincode ? ` - ${customerDetails.pincode}` : ''}</td>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold;">Order Date</td>
        <td style="border: 1px solid #ccc; padding: 6px;">${orderDate}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold;">Phone</td>
        <td style="border: 1px solid #ccc; padding: 6px;">${customerDetails.phone || customerDetails.customerPhone || '-'}</td>
        <td style="border: 1px solid #ccc; padding: 6px;"></td>
        <td style="border: 1px solid #ccc; padding: 6px;"></td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold;">Whatsapp</td>
        <td style="border: 1px solid #ccc; padding: 6px;">${customerDetails.whatsapp || customerDetails.phone || '-'}</td>
        <td style="border: 1px solid #ccc; padding: 6px;"></td>
        <td style="border: 1px solid #ccc; padding: 6px;"></td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff; font-weight: bold;">Email</td>
        <td style="border: 1px solid #ccc; padding: 6px;">${customerDetails.email || customerDetails.customerEmail || '-'}</td>
        <td style="border: 1px solid #ccc; padding: 6px;"></td>
        <td style="border: 1px solid #ccc; padding: 6px;"></td>
      </tr>
    </table>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10px;">
      <thead>
        <tr style="background-color: #ffffff;">
          <th style="border: 1px solid #000; padding: 6px; width: 5%;">S.No</th>
          <th style="border: 1px solid #000; padding: 6px; width: 30%; text-align: left;">Item Name</th>
          <th style="border: 1px solid #000; padding: 6px; width: 10%; text-align: right;">Market Price</th>
          <th style="border: 1px solid #000; padding: 6px; width: 8%; text-align: center;">Per</th>
          <th style="border: 1px solid #000; padding: 6px; width: 5%; text-align: center;">Qty</th>
          <th style="border: 1px solid #000; padding: 6px; width: 10%; text-align: right;">Total</th>
          <th style="border: 1px solid #000; padding: 6px; width: 6%; text-align: center;">Perc</th>
          <th style="border: 1px solid #000; padding: 6px; width: 12%; text-align: right;">80% Disc Amt</th>
          <th style="border: 1px solid #000; padding: 6px; width: 14%; text-align: right;">Net Amt</th>
        </tr>
      </thead>
      <tbody>
        ${itemRowsHtml}
      </tbody>
    </table>

    <div style="text-align: right; margin-top: 15px; font-size: 13px; font-weight: bold; line-height: 1.6;">
      <div>Total Amount : Rs. ${displayMarketTotal}</div>
      <div>Discount Amount : Rs. ${displayDiscTotal}</div>
      <div style="font-size: 15px; font-weight: bold; margin-top: 4px;">Total Amount : Rs. ${displayNetTotal}</div>
    </div>

    <div style="margin-top: 30px; text-align: center; font-size: 12px; font-style: italic; color: #444;">
      Thank you for your business with us.
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, { scale: 2, useCORS: true });
    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    const fileName = `Om_Aadhi_Shivam_Invoice_${orderId}.pdf`;
    const pdfBlob = pdf.output('blob');
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

    // 2. Format WhatsApp Order message in requested table template & send to Owner +91 78068 53112
    const OWNER_PHONE = '7806853112';

    let text = `*NEW ESTIMATE ORDER - OM AADHISHIVAM CRACKERS*\n\n`;
    text += `*CUSTOMER DETAILS:*\n`;
    text += `👤 Name: ${customerDetails.name || customerDetails.customerName || 'Valued Customer'}\n`;
    text += `📞 Phone: ${customerDetails.phone || customerDetails.customerPhone || '-'}\n`;
    text += `📱 WhatsApp: ${customerDetails.whatsapp || customerDetails.phone || '-'}\n`;
    text += `🏙️ City: ${customerDetails.city || '-'}\n`;
    text += `📍 Address: ${customerDetails.address || '-'}${customerDetails.pincode ? ` (${customerDetails.pincode})` : ''}\n\n`;

    text += `*ITEMIZED ESTIMATE ORDER LIST:*\n`;
    text += `----------------------------------------\n`;
    text += `S.No | Item Name | Qty | Unit | Rate | Total\n`;
    text += `----------------------------------------\n`;

    cartItems.forEach((item, index) => {
      const qty = Number(item.quantity);
      const unit = item.unit || '1 BOX';
      const rate = Number(item.price);
      const total = rate * qty;
      text += `${index + 1}. ${item.name} | ${qty} | ${unit} | ₹${rate} | ₹${total.toLocaleString('en-IN')}\n`;
    });

    text += `----------------------------------------\n`;
    text += `*NET ESTIMATE TOTAL:* ₹${calcNetTotal.toLocaleString('en-IN')}\n`;
    text += `----------------------------------------\n\n`;
    text += `Please confirm my order and send payment bank details. Thank you!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/91${OWNER_PHONE}?text=${encoded}`, '_blank');

  } catch (error) {
    console.error('Error generating PDF:', error);
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
