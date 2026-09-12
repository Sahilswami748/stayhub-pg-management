import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/helpers';
import { RentInvoice } from '../../types';
import { CheckCircle2, ShieldCheck, QrCode, CreditCard, Lock, Sparkles } from 'lucide-react';
import { generateRentReceiptPDF } from '../../utils/pdfGenerator';

interface PayRentModalProps {
  invoice: RentInvoice;
  onClose: () => void;
}

export const PayRentModal: React.FC<PayRentModalProps> = ({ invoice, onClose }) => {
  const { payInvoice, tenants, properties } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking'>('UPI');
  const [upiId, setUpiId] = useState('rahul@upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tenant = tenants.find(t => t.id === invoice.tenantId) || tenants[0];
  const currentProp = properties[0];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      payInvoice(invoice.id, paymentMethod);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-600 to-indigoCustom-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-200">
                  Razorpay Secure Checkout
                </span>
                <Lock className="h-4 w-4 text-emerald-300" />
              </div>
              <h2 className="mt-1 text-xl font-black">Pay Rent Online</h2>
              <p className="text-xs text-white/80">{invoice.propertyName} — {invoice.billingPeriod}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500">Total Payable Amount</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(invoice.totalPayable)}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  Due {invoice.dueDate}
                </span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Select Payment Method</label>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between rounded-2xl border p-3 cursor-pointer text-xs font-bold transition-all ${paymentMethod === 'UPI' ? 'border-brand-500 bg-brand-50/50 text-brand-900 dark:bg-brand-950/20 dark:text-brand-200' : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300'}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payMethod" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                      <span>Instant UPI / QR Code (GPay, PhonePe, Paytm)</span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between rounded-2xl border p-3 cursor-pointer text-xs font-bold transition-all ${paymentMethod === 'Credit Card' ? 'border-brand-500 bg-brand-50/50 text-brand-900 dark:bg-brand-950/20 dark:text-brand-200' : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300'}`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payMethod" checked={paymentMethod === 'Credit Card'} onChange={() => setPaymentMethod('Credit Card')} />
                      <span>Debit / Credit Card (Visa, Mastercard, RuPay)</span>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === 'UPI' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-2/3 rounded-xl bg-brand-600 py-3 text-xs font-extrabold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 disabled:opacity-50"
                >
                  {isProcessing ? 'Verifying with Bank...' : `Pay ${formatCurrency(invoice.totalPayable)} Now`}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Payment Successful! 🎉</h2>
              <p className="mt-1 text-xs text-slate-500">Rent receipt generated & stamped automatically.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 text-xs text-left space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Transaction ID:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">PAY-UPI-8891024</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Paid Amount:</span>
                <span className="font-bold text-emerald-600">{formatCurrency(invoice.totalPayable)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => generateRentReceiptPDF(invoice, tenant, currentProp)}
                className="w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700"
              >
                Download PDF Receipt 📄
              </button>
              <button
                onClick={onClose}
                className="w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
