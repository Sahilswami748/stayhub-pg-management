import React, { useState } from 'react';
import { RentInvoice } from '../../types';
import { useStore } from '../../store/useStore';
import { formatCurrency, getStatusBadge } from '../../utils/helpers';
import { generateRentReceiptPDF } from '../../utils/pdfGenerator';
import { CreditCard, Download, Bell, AlertCircle, CheckCircle2, ShieldCheck, RefreshCw, Send } from 'lucide-react';

export const PaymentLedger: React.FC = () => {
  const { invoices, tenants, properties, payInvoice } = useStore();
  const [selectedInvoice, setSelectedInvoice] = useState<RentInvoice | null>(null);
  const [notificationSentMsg, setNotificationSentMsg] = useState('');

  const currentProp = properties[0];

  const handleSendReminder = (inv: RentInvoice) => {
    setNotificationSentMsg(`Rent payment reminder sent to ${inv.tenantName} (+91 98765 43210) via WhatsApp & SMS!`);
    setTimeout(() => setNotificationSentMsg(''), 4000);
  };

  const handleCollectPayment = (paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash') => {
    if (!selectedInvoice) return;
    payInvoice(selectedInvoice.id, paymentMethod);
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Rent & Payment Ledger</h1>
          <p className="text-xs text-slate-500">Track invoices, send automated reminders & collect rent via Razorpay/UPI</p>
        </div>
      </div>

      {notificationSentMsg && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-3 text-xs font-bold text-emerald-600 border border-emerald-500/20 dark:text-emerald-400">
          <Send className="h-4 w-4 animate-bounce" />
          <span>{notificationSentMsg}</span>
        </div>
      )}

      {/* Invoice Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Invoice #</th>
                <th className="px-4 py-3 font-bold">Tenant Name</th>
                <th className="px-4 py-3 font-bold">Room & Bed</th>
                <th className="px-4 py-3 font-bold">Billing Period</th>
                <th className="px-4 py-3 font-bold">Total Amount</th>
                <th className="px-4 py-3 font-bold">Due Date</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map(inv => {
                const tenant = tenants.find(t => t.id === inv.tenantId) || tenants[0];
                const isPaid = inv.status === 'PAID';

                return (
                  <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-800 dark:text-slate-200">
                      {inv.tenantName}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                      Room {inv.roomNumber} ({inv.bedNumber})
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                      {inv.billingPeriod}
                    </td>
                    <td className="px-4 py-3.5 font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(inv.totalPayable)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {inv.dueDate}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${getStatusBadge(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isPaid ? (
                          <button
                            onClick={() => generateRentReceiptPDF(inv, tenant, currentProp)}
                            className="flex items-center gap-1 rounded-xl bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>PDF Receipt</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSendReminder(inv)}
                              className="flex items-center gap-1 rounded-xl bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300"
                              title="Send automatic WhatsApp/SMS reminder"
                            >
                              <Bell className="h-3 w-3" />
                              <span>Remind</span>
                            </button>
                            <button
                              onClick={() => setSelectedInvoice(inv)}
                              className="flex items-center gap-1 rounded-xl bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-brand-700 shadow-sm"
                            >
                              <CreditCard className="h-3 w-3" />
                              <span>Collect</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Collection Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Record Rent Payment</h2>
            <p className="text-xs text-slate-500">Collect payment for {selectedInvoice.tenantName} ({selectedInvoice.billingPeriod})</p>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 space-y-1">
              <p className="text-xs text-slate-500">Total Payable Amount:</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(selectedInvoice.totalPayable)}</p>
            </div>

            <div className="mt-4 space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Select Payment Gateway Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCollectPayment('UPI')}
                  className="rounded-2xl border border-brand-200 bg-brand-50/50 p-3 text-left font-bold text-brand-900 hover:bg-brand-100/50 dark:border-brand-900/40 dark:bg-brand-950/20 dark:text-brand-300"
                >
                  <p className="text-xs">📱 Razorpay UPI / QR</p>
                  <p className="text-[10px] text-slate-500 font-normal">GPay, PhonePe, Paytm</p>
                </button>
                <button
                  onClick={() => handleCollectPayment('Credit Card')}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left font-bold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <p className="text-xs">💳 Credit / Debit Card</p>
                  <p className="text-[10px] text-slate-500 font-normal">Visa, Mastercard</p>
                </button>
                <button
                  onClick={() => handleCollectPayment('Net Banking')}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left font-bold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <p className="text-xs">🏦 Net Banking</p>
                  <p className="text-[10px] text-slate-500 font-normal">HDFC, ICICI, SBI</p>
                </button>
                <button
                  onClick={() => handleCollectPayment('Cash')}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left font-bold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <p className="text-xs">💵 Physical Cash</p>
                  <p className="text-[10px] text-slate-500 font-normal">Counter collection</p>
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
