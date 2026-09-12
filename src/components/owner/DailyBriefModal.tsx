import React from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, TrendingUp, Users, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/helpers';

export const DailyBriefModal: React.FC = () => {
  const { isDailyBriefOpen, setDailyBriefOpen, properties, invoices, complaints, beds, tenants } = useStore();

  if (!isDailyBriefOpen) return null;

  const currentProp = properties[0];
  const pendingInvoices = invoices.filter(i => i.status === 'PENDING' || i.status === 'OVERDUE');
  const totalPending = pendingInvoices.reduce((a, b) => a + b.totalPayable, 0);
  const openComplaints = complaints.filter(c => c.status !== 'RESOLVED' && c.status !== 'CLOSED');
  const availableBedsCount = beds.filter(b => b.status === 'AVAILABLE').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-brand-600 via-indigoCustom-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={() => setDailyBriefOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-1.5 text-white hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-300 animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Owner Daily Brief</span>
          </div>
          <h2 className="mt-1 text-2xl font-black">Good Morning, Owner! 👋</h2>
          <p className="mt-1 text-xs text-white/80">Here is your 15-second business breakdown for today.</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-bold">Yesterday's Rent</span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-emerald-900 dark:text-emerald-200">
                {formatCurrency(9880)}
              </p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">1 Tenant Paid (UPI)</p>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-3.5 dark:border-rose-900/40 dark:bg-rose-950/20">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-bold">Pending Dues</span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-rose-900 dark:text-rose-200">
                {formatCurrency(totalPending)}
              </p>
              <p className="text-[10px] text-rose-600 dark:text-rose-400">{pendingInvoices.length} Payments overdue</p>
            </div>
          </div>

          {/* Key Bullet Highlights */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Occupancy Rate: </span>
                <span className="text-slate-600 dark:text-slate-400">{currentProp.occupiedSeats} / {currentProp.totalSeats} Beds Occupied ({Math.round((currentProp.occupiedSeats/currentProp.totalSeats)*100)}%)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Open Complaints: </span>
                <span className="text-slate-600 dark:text-slate-400">{openComplaints.length} active issue (Ticket {openComplaints[0]?.ticketNumber || 'CMP-10291'} - Plumbing)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Users className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Upcoming Move-Outs: </span>
                <span className="text-slate-600 dark:text-slate-400">1 Tenant in Notice Period (Room 204 expected vacant Oct 1)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDailyBriefOpen(false)}
            className="w-full rounded-2xl bg-brand-600 py-3 text-xs font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-700 transition-all"
          >
            Got it, Let's Manage!
          </button>
        </div>
      </div>
    </div>
  );
};
