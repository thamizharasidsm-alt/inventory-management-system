import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function numberToWords(n) {
  if (n === 0) return 'Zero';
  const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const fn = (num) => {
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num/10)] + (num%10 ? ' ' + a[num%10] : '');
    if (num < 1000) return a[Math.floor(num/100)] + ' Hundred' + (num%100 ? ' ' + fn(num%100) : '');
    if (num < 100000) return fn(Math.floor(num/1000)) + ' Thousand' + (num%1000 ? ' ' + fn(num%1000) : '');
    return fn(Math.floor(num/100000)) + ' Lakh' + (num%100000 ? ' ' + fn(num%100000) : '');
  };
  return fn(Math.round(n));
}

export default function BillPreviewModal({ bill, onClose }) {
  const printRef = useRef(null);
  const company = { name: 'InvManager Store', address: '123 Market Street, Chennai, TN 600001', phone: '+91 98765 43210', gst: '33AABCU1234D1Z5' };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const content = printRef.current.innerHTML;
    const style = `
      body { margin: 0; padding: 5mm; font-family: 'Courier New', monospace; font-size: 10px; color: #000; background: #fff; width: 76mm; }
      .bill-header { text-align: center; border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 10px; }
      .bill-header h2 { font-size: 16px; font-weight: 700; margin: 0 0 2px; }
      .bill-header p { font-size: 10px; color: #555; margin: 2px 0; }
      .bill-header .gstin { font-size: 9px; color: #888; }
      .bill-info { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 8px; font-size: 10px; }
      .bill-info div { margin: 1px 0; }
      .bill-items { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
      .bill-items th { padding: 4px 2px; text-align: left; font-size: 9px; border-bottom: 1px solid #ccc; text-transform: uppercase; }
      .bill-items td { padding: 3px 2px; font-size: 10px; border-bottom: 1px dotted #eee; }
      .bill-items .right { text-align: right; }
      .bill-items .center { text-align: center; }
      .bill-totals { border-top: 1px solid #ccc; padding-top: 6px; }
      .bill-totals .row { display: flex; justify-content: space-between; font-size: 10px; padding: 2px 0; }
      .bill-totals .row.grand { font-size: 14px; font-weight: 700; border-top: 1px double #000; padding-top: 6px; margin-top: 4px; }
      .bill-footer { text-align: center; border-top: 1px dashed #ccc; padding-top: 8px; margin-top: 10px; font-size: 9px; color: #555; }
      .bill-words { font-size: 9px; margin-top: 6px; padding-top: 6px; border-top: 1px dotted #ccc; }
    `;
    printWindow.document.write('<html><head><title>Invoice ' + bill.invoiceNo + '</title><style>' + style + '</style></head><body>' + content + '<script>window.print();window.close();</script></body></html>');
    printWindow.document.close();
  };

  const handlePDF = async () => {
    const el = printRef.current;
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#fff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', [80, canvas.height * 80 / canvas.width]);
    pdf.addImage(imgData, 'PNG', 0, 0, 80, canvas.height * 80 / canvas.width);
    pdf.save(`invoice_${bill.invoiceNo}.pdf`);
  };

  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3><i className="fas fa-receipt" style={{ color: 'var(--primary)' }} /> Invoice Preview</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto', maxHeight: '70vh', background: '#f5f5f5' }}>
          <div className="bill-preview" ref={printRef}>
            <div className="bill-header">
              <h2>{company.name}</h2>
              <p>{company.address}</p>
              <p>📞 {company.phone}</p>
              <p style={{ fontSize: 9, color: '#888' }}>GSTIN: {company.gst}</p>
            </div>
            <div className="bill-info">
              <div><strong>Invoice:</strong> {bill.invoiceNo}</div>
              <div style={{ textAlign: 'right' }}><strong>Date:</strong> {bill.date}</div>
              <div><strong>Customer:</strong> {bill.customer?.name || 'Walk-in'}</div>
              <div></div>
              {bill.customer?.phone && <div><strong>Phone:</strong> {bill.customer.phone}</div>}
              {bill.customer?.gst && <div style={{ textAlign: 'right' }}><strong>Cust GST:</strong> {bill.customer.gst}</div>}
            </div>
            <table className="bill-items">
              <thead>
                <tr>
                  <th style={{ width: 30 }}>#</th>
                  <th>Item</th>
                  <th className="center" style={{ width: 30 }}>Qty</th>
                  <th className="right" style={{ width: 55 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {item.productName}
                      <br /><small style={{ color: '#888' }}>Rate: ₹{item.price} | GST: {item.gstRate}%</small>
                    </td>
                    <td className="center">{item.qty}</td>
                    <td className="right">₹{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bill-totals">
              <div className="row"><span>Subtotal</span><span>₹{bill.subtotal.toFixed(2)}</span></div>
              <div className="row"><span>GST Total</span><span>₹{bill.totalGst.toFixed(2)}</span></div>
              {bill.discount > 0 && <div className="row"><span>Discount</span><span>-₹{bill.discount.toFixed(2)}</span></div>}
              <div className="row grand"><span>Grand Total</span><span>₹{bill.grandTotal.toFixed(2)}</span></div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 10, padding: '4px 0', marginTop: 4, borderTop: '1px dotted #ccc' }}>
              Payment Mode: <strong>{bill.paymentMode ? bill.paymentMode.toUpperCase() : 'CASH'}</strong>
            </div>
            <div className="bill-words">
              <strong>Amount in words:</strong> Rupees {numberToWords(bill.grandTotal)} only
            </div>
            <div className="bill-footer">
              <p>Thank you for your business!</p>
              <p>Goods once sold cannot be taken back.</p>
              <p>This is a computer-generated invoice.</p>
            </div>
          </div>
        </div>
        <div className="preview-actions" style={{ padding: '14px 20px', borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-primary" onClick={handlePrint}>
            <i className="fas fa-print" /> Print
          </button>
          <button className="btn btn-success" onClick={handlePDF}>
            <i className="fas fa-file-pdf" /> Download PDF
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
