import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatCurrency, getStatusBadge } from '../../utils/helpers';
import { PayRentModal } from './PayRentModal';
import { generateRentReceiptPDF, generateRentalAgreementPDF } from '../../utils/pdfGenerator';
import {
  CreditCard, Ticket, FileCheck, QrCode, Utensils, PhoneCall, AlertTriangle,
  Send, Sparkles, ShieldCheck, Download, Plus, CheckCircle2, MessageSquare, Clock
} from 'lucide-react';

export const TenantDashboard: React.FC = () => {
  const { tenants, currentTenantId, invoices, complaints, notices, visitorPasses, leaveRequests, messMenus, properties, addComplaint, addVisitorPass, addLeaveRequest } = useStore();
  const tenant = tenants.find(t => t.id === currentTenantId) || tenants[0];
  const currentProp = properties[0];

  const pendingInvoice = invoices.find(i => i.tenantId === tenant.id && i.status === 'PENDING') || invoices[0];
  const tenantComplaints = complaints.filter(c => c.tenantId === tenant.id);
  const tenantVisitorPasses = visitorPasses.filter(v => v.tenantId === tenant.id);

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'HOME' | 'COMPLAINTS' | 'VISITOR' | 'MESS' | 'HELPLINE'>('HOME');

  // Complaint Form
  const [cmpCategory, setCmpCategory] = useState<any>('Plumbing');
  const [cmpDesc, setCmpDesc] = useState('');
  const [cmpPriority, setCmpPriority] = useState<any>('MEDIUM');

  // Visitor Form
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [visitDate, setVisitDate] = useState('');

  const handleRaiseComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmpDesc) return;
    addComplaint(cmpCategory, cmpDesc, cmpPriority);
    setCmpDesc('');
    setActiveTab('COMPLAINTS');
  };

  const handleVisitorPassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName) return;
    addVisitorPass({ visitorName, visitorPhone, relationship, visitDate, visitTime: '04:00 PM' });
    setVisitorName('');
    setVisitorPhone('');
    setRelationship('');
    setActiveTab('VISITOR');
  };

  const todayMenu = messMenus.find(m => m.day === 'Monday') || messMenus[0];

  return (
    <div className="mx-auto max-w-lg space-y-5 pb-10">
      {/* Mobile Top Header Banner */}
      <div className="rounded-3xl bg-gradient-to-tr from-brand-600 via-indigoCustom-600 to-purple-600 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={tenant.photo}
              alt={tenant.fullName}
              className="h-11 w-11 rounded-full border-2 border-white/40 object-cover shadow-sm"
            />
            <div>
              <h1 className="text-xl font-black">Hello, {tenant.fullName.split(' ')[0]} 👋</h1>
              <p className="text-xs text-white/80">Room {tenant.roomNumber} | {tenant.bedNumber}</p>
            </div>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold backdrop-blur-md">
            {tenant.propertyName}
          </span>
        </div>

        {/* Rent Due Alert Box */}
        <div className="mt-5 rounded-2xl bg-white/15 p-4 backdrop-blur-md border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[11px] text-white/80 uppercase tracking-wider font-semibold">Monthly Rent Status</p>
              <p className="text-2xl font-black mt-0.5">{formatCurrency(tenant.rentAmount)}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-extrabold shadow-sm ${
              pendingInvoice.status === 'PAID' ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-400 text-amber-950'
            }`}>
              {pendingInvoice.status}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/20">
            <span className="text-xs text-white/90 font-medium">Due Date: {pendingInvoice.dueDate}</span>
            {pendingInvoice.status !== 'PAID' ? (
              <button
                onClick={() => setIsPayModalOpen(true)}
                className="rounded-xl bg-white px-4 py-2 text-xs font-black text-brand-700 shadow-md hover:bg-slate-100 transition-all"
              >
                PAY RENT NOW 💳
              </button>
            ) : (
              <button
                onClick={() => generateRentReceiptPDF(pendingInvoice, tenant, currentProp)}
                className="rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/30"
              >
                Download Receipt 📄
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('HOME')}
          className={`rounded-xl px-3 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'HOME' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('COMPLAINTS')}
          className={`rounded-xl px-3 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'COMPLAINTS' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500'
          }`}
        >
          Complaints ({tenantComplaints.length})
        </button>
        <button
          onClick={() => setActiveTab('VISITOR')}
          className={`rounded-xl px-3 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'VISITOR' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500'
          }`}
        >
          Gate Pass & Leave
        </button>
        <button
          onClick={() => setActiveTab('MESS')}
          className={`rounded-xl px-3 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'MESS' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500'
          }`}
        >
          Mess Menu
        </button>
        <button
          onClick={() => setActiveTab('HELPLINE')}
          className={`rounded-xl px-3 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'HELPLINE' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-500'
          }`}
        >
          Helpline 🚨
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'HOME' && (
        <div className="space-y-4">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => generateRentalAgreementPDF(tenant, currentProp)}
              className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:border-brand-500 dark:border-slate-800 dark:bg-slate-900"
            >
              <FileCheck className="h-6 w-6 text-brand-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">My Agreement PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('COMPLAINTS')}
              className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900"
            >
              <Ticket className="h-6 w-6 text-amber-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Raise Issue / Fix</span>
            </button>
          </div>

          {/* Today's Mess Menu Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Today's Mess Menu ({todayMenu.day})
                </h3>
              </div>
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600 dark:bg-orange-950/40">
                4 Meals Included
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Breakfast:</span>
                <span className="text-slate-600 dark:text-slate-400">{todayMenu.breakfast}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Lunch:</span>
                <span className="text-slate-600 dark:text-slate-400">{todayMenu.lunch}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Dinner:</span>
                <span className="text-slate-600 dark:text-slate-400">{todayMenu.dinner}</span>
              </div>
            </div>
          </div>

          {/* Active Notices */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Building Announcements
            </h3>

            {notices.map(n => (
              <div key={n.id} className="rounded-2xl bg-amber-50/60 p-3.5 border border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/40 space-y-1 mb-2">
                <p className="text-xs font-extrabold text-amber-900 dark:text-amber-200">{n.title}</p>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complaints Tab */}
      {activeTab === 'COMPLAINTS' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Raise New Issue Ticket</h3>
            <form onSubmit={handleRaiseComplaint} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Issue Category</label>
                <select
                  value={cmpCategory}
                  onChange={(e) => setCmpCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="Plumbing">Plumbing (Tap, Shower, Basin)</option>
                  <option value="Electricity">Electricity (Fan, Light, Switch)</option>
                  <option value="WiFi">WiFi / Internet Speed</option>
                  <option value="Cleaning">Housekeeping / Room Cleaning</option>
                  <option value="AC">AC / Air Cooling</option>
                  <option value="Food">Food / Mess Quality</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe your issue clearly..."
                  value={cmpDesc}
                  onChange={(e) => setCmpDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-700"
              >
                Submit Ticket & Dispatch Tech
              </button>
            </form>
          </div>

          {/* Ticket history */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              My Active & Past Tickets
            </h3>
            {tenantComplaints.map(c => (
              <div key={c.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">{c.ticketNumber} ({c.category})</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${getStatusBadge(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{c.description}</p>
                <p className="text-[10px] font-semibold text-brand-600">Assigned: {c.assignedStaffName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visitor Pass Tab */}
      {activeTab === 'VISITOR' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Request Visitor Gate Pass</h3>
            <form onSubmit={handleVisitorPassSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Visitor Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Vikas Sharma"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Relationship</label>
                  <input
                    required
                    type="text"
                    placeholder="Brother, Parent, Friend"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    required
                    type="text"
                    placeholder="+91 98000 00000"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-700"
              >
                Generate QR Gate Pass
              </button>
            </form>
          </div>

          {/* Passes list */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">My Visitor Passes</h3>
            {tenantVisitorPasses.map(v => (
              <div key={v.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex justify-between items-center">
                <div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">{v.visitorName} ({v.relationship})</p>
                  <p className="text-[11px] text-slate-500">Date: {v.visitDate} | Time: {v.visitTime}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-xs text-brand-600">{v.passCode}</span>
                  <p className="text-[10px] text-emerald-600 font-bold">APPROVED</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helpline Tab */}
      {activeTab === 'HELPLINE' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-6 w-6 animate-bounce" />
            <h3 className="text-sm font-extrabold">Emergency Helplines</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="rounded-2xl bg-rose-50 p-3 text-rose-900 font-bold dark:bg-rose-950/40 dark:text-rose-200 flex justify-between">
              <span>Owner Helpline:</span>
              <span>{currentProp.helplineNumber}</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 font-bold dark:bg-slate-800 flex justify-between">
              <span>Warden Desk (Surendra):</span>
              <span>+91 98281 77889</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 font-bold dark:bg-slate-800 flex justify-between">
              <span>Police Station:</span>
              <span>100</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 font-bold dark:bg-slate-800 flex justify-between">
              <span>Ambulance:</span>
              <span>102</span>
            </div>
          </div>
        </div>
      )}

      {/* Pay Rent Modal */}
      {isPayModalOpen && (
        <PayRentModal invoice={pendingInvoice} onClose={() => setIsPayModalOpen(false)} />
      )}
    </div>
  );
};
