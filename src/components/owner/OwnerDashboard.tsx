import React from 'react';
import {
  Building2, Users, Bed, CreditCard, AlertTriangle, TrendingUp, CheckCircle,
  Activity, ArrowUpRight, ArrowDownRight, Sparkles, PieChart, ShieldCheck,
  Zap, Calendar, Clock, ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency, getStatusBadge } from '../../utils/helpers';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

interface OwnerDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ setActiveTab }) => {
  const { properties, currentPropertyId, rooms, beds, tenants, invoices, complaints, activityLogs, setDailyBriefOpen } = useStore();
  const currentProperty = properties.find(p => p.id === currentPropertyId) || properties[0];

  const occupancyRate = Math.round((currentProperty.occupiedSeats / currentProperty.totalSeats) * 100);

  const pendingInvoices = invoices.filter(i => i.status === 'PENDING' || i.status === 'OVERDUE');
  const totalPendingAmount = pendingInvoices.reduce((acc, i) => acc + i.totalPayable, 0);

  const openComplaints = complaints.filter(c => c.status !== 'RESOLVED' && c.status !== 'CLOSED');

  // Chart data
  const revenueTrendData = [
    { month: 'May', revenue: 940000, collected: 920000 },
    { month: 'Jun', revenue: 980000, collected: 960000 },
    { month: 'Jul', revenue: 1020000, collected: 1010000 },
    { month: 'Aug', revenue: 1060000, collected: 1045000 },
    { month: 'Sep', revenue: 1064000, collected: 995000 },
  ];

  const bedStatusData = [
    { name: 'Occupied', count: currentProperty.occupiedSeats, color: '#0284c7' },
    { name: 'Reserved', count: currentProperty.reservedSeats, color: '#a855f7' },
    { name: 'Available', count: currentProperty.availableSeats, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-6 text-white shadow-xl dark:from-slate-950 dark:to-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-500/20 px-3 py-1 text-[11px] font-bold text-brand-300 backdrop-blur-md">
              LIVE OPERATIONS OS
            </span>
            <span className="text-xs text-slate-400">• Updated 1 min ago</span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {currentProperty.name}
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            {currentProperty.address}, {currentProperty.city} — {currentProperty.totalBuildings} Buildings, {currentProperty.totalRooms} Rooms, {currentProperty.totalSeats} Total Seats
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDailyBriefOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-amber-500/20 px-4 py-2.5 text-xs font-bold text-amber-300 backdrop-blur-md hover:bg-amber-500/30 transition-all border border-amber-500/30"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Daily Briefing</span>
          </button>
          <button
            onClick={() => setActiveTab('beds')}
            className="flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-500 transition-all"
          >
            <Bed className="h-4 w-4" />
            <span>Visual Bed Matrix</span>
          </button>
        </div>
      </div>

      {/* Top Level 10-Second KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Occupancy Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Occupancy</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{occupancyRate}%</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5" /> +2.4%
            </span>
          </div>
          <div className="mt-3">
            <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-indigoCustom-500 transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <span>{currentProperty.occupiedSeats} Occupied</span>
              <span>{currentProperty.availableSeats} Available</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">This Month Revenue</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {formatCurrency(currentProperty.monthlyRevenue)}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>88% Rent collected so far</span>
          </p>
        </div>

        {/* Pending Rent Dues */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Rent</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {formatCurrency(totalPendingAmount)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              {pendingInvoices.length} Overdue Payments
            </span>
            <button
              onClick={() => setActiveTab('payments')}
              className="text-[11px] font-bold text-brand-600 hover:underline dark:text-brand-400"
            >
              Collect →
            </button>
          </div>
        </div>

        {/* Complaints Ticket Status */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Open Complaints</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{openComplaints.length}</span>
            <span className="text-xs font-medium text-slate-500">Unresolved</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Avg Resolution: 3.2 hrs</span>
            <button
              onClick={() => setActiveTab('complaints')}
              className="text-[11px] font-bold text-brand-600 hover:underline dark:text-brand-400"
            >
              Dispatch →
            </button>
          </div>
        </div>
      </div>

      {/* Differentiator Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Property Health Score */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Property Health Score</h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              91 / 100
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Combined index based on occupancy, rent collection rate, and complaint SLA performance.
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Bed Occupancy (93%)</span>
                <span className="text-emerald-600">Excellent</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '93%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Rent Collection (88%)</span>
                <span className="text-amber-600">Good</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Complaint SLA (95%)</span>
                <span className="text-emerald-600">Super Fast</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Smart Vacancy Forecast */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Smart Vacancy Forecast</h2>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Predictive availability based on notice periods, lease end dates & reservations.
          </p>

          <div className="mt-4 rounded-2xl bg-amber-50/60 p-4 border border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                3 Beds Becoming Available Next Month
              </span>
              <span className="rounded-md bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                Oct 2026
              </span>
            </div>
            <p className="mt-1 text-[11px] text-amber-800 dark:text-amber-300">
              Room 204 (Bed B), Room 301 (Bed A), Room 108 (Bed C) move-out expected.
            </p>
            <button
              onClick={() => setActiveTab('beds')}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:underline dark:text-amber-300"
            >
              Open Waitlist & Allocate →
            </button>
          </div>
        </div>

        {/* Quick Operational Actions */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Quick Actions</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Common operational workflows</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setActiveTab('tenants')}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center transition-all hover:border-brand-500 hover:bg-brand-50/50 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <Users className="h-5 w-5 text-brand-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Onboard Tenant</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center transition-all hover:border-emerald-500 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Collect Rent</span>
            </button>

            <button
              onClick={() => setActiveTab('complaints')}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center transition-all hover:border-amber-500 hover:bg-amber-50/50 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <Activity className="h-5 w-5 text-amber-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Dispatch Tech</span>
            </button>

            <button
              onClick={() => setActiveTab('copilot')}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center transition-all hover:border-purple-500 hover:bg-purple-50/50 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Ask AI Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Live Activity Stream */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue & Collection Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Revenue & Payment Collection Trend</h2>
              <p className="text-xs text-slate-500">Monthly billing vs actual collections (INR)</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              +12.8% YoY Growth
            </span>
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorColl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value: any) => [`₹${Number(value || 0).toLocaleString('en-IN')}`, 'Amount']} />
                <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" name="Billed Revenue" />
                <Area type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorColl)" name="Collected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity Logs */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity Stream</h2>
          <p className="text-xs text-slate-500">Live operational events</p>

          <div className="mt-4 space-y-3.5">
            {activityLogs.slice(0, 5).map(log => (
              <div key={log.id} className="flex items-start gap-3 text-xs border-b border-slate-100 pb-2.5 last:border-0 dark:border-slate-800">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/30">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
                    <span className="text-[10px] text-slate-400">• {log.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-slate-600 dark:text-slate-400">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
