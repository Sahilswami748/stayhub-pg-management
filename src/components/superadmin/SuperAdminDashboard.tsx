import React from 'react';
import { CreditCard, Building, Users, Activity, TrendingUp, ShieldCheck, Server } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

export const SuperAdminDashboard: React.FC = () => {
  const saasMetrics = {
    mrr: 498000,
    totalCustomers: 142,
    totalBedsManaged: 14200,
    activeSubscriptions: 138,
    churnRate: '0.8%',
    systemHealth: '100% Operational'
  };

  const recentCustomers = [
    { name: 'UrbanNest Jaipur', plan: 'PRO', beds: 120, mrr: 4999, owner: 'Sahil Sharma' },
    { name: 'Kota Student Residency', plan: 'PRO', beds: 80, mrr: 4999, owner: 'Vikas Meena' },
    { name: 'Bangalore Tech Stays', plan: 'BUSINESS', beds: 250, mrr: 9999, owner: 'Anish Rao' },
    { name: 'Delhi Student Hub', plan: 'BASIC', beds: 50, mrr: 1999, owner: 'Preeti Singh' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-bold text-rose-300">
              PLATFORM CONSOLE
            </span>
            <h1 className="mt-2 text-2xl font-black">StayHub Super Admin</h1>
            <p className="mt-1 text-xs text-slate-300">Platform MRR, customer subscriptions & multi-tenant isolation analytics</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            <Server className="h-4 w-4 text-emerald-400" />
            <span>Multi-Tenant DB Active</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Recurring Revenue (MRR)</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(saasMetrics.mrr)}</p>
          <p className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +18.4% this month
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total PG / Hostel Owners</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{saasMetrics.totalCustomers}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">138 Active Subscriptions</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Beds Managed</span>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{saasMetrics.totalBedsManaged.toLocaleString('en-IN')}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">Across 42 Cities in India</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform Churn Rate</span>
          <p className="mt-2 text-2xl font-black text-emerald-600">{saasMetrics.churnRate}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">Industry lowest churn</p>
        </div>
      </div>

      {/* Customer Subscriptions Table */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Active Customer Subscriptions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Property / Business</th>
                <th className="px-4 py-3 font-bold">Owner Name</th>
                <th className="px-4 py-3 font-bold">Plan Tier</th>
                <th className="px-4 py-3 font-bold">Bed Count</th>
                <th className="px-4 py-3 font-bold">Monthly Fee</th>
                <th className="px-4 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentCustomers.map((c, i) => (
                <tr key={i}>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{c.name}</td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.owner}</td>
                  <td className="px-4 py-3.5 font-extrabold text-brand-600">{c.plan}</td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.beds} Beds</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{formatCurrency(c.mrr)}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
