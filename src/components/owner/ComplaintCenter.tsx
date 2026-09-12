import React, { useState } from 'react';
import { Complaint } from '../../types';
import { useStore } from '../../store/useStore';
import { getStatusBadge } from '../../utils/helpers';
import { Ticket, Wrench, MessageSquare, Send, CheckCircle2, Clock, Star, User, AlertTriangle } from 'lucide-react';

export const ComplaintCenter: React.FC = () => {
  const { complaints, staff, updateComplaintStatus, addComplaintMessage } = useStore();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(complaints[0] || null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !replyText.trim()) return;
    addComplaintMessage(selectedComplaint.id, replyText, 'Manager');
    setReplyText('');
  };

  const openCount = complaints.filter(c => c.status !== 'RESOLVED' && c.status !== 'CLOSED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Smart Complaint & Helpdesk Center</h1>
          <p className="text-xs text-slate-500">Auto-dispatched maintenance tickets, SLA tracking & in-ticket resident chat</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            {openCount} Open Tickets
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            Avg SLA: 3.2 Hrs
          </span>
        </div>
      </div>

      {/* Grid view: Ticket list + Chat drawer */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tickets List */}
        <div className="space-y-3 lg:col-span-1">
          {complaints.map(cmp => {
            const isSelected = selectedComplaint?.id === cmp.id;
            return (
              <div
                key={cmp.id}
                onClick={() => setSelectedComplaint(cmp)}
                className={`cursor-pointer rounded-3xl border p-4 transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/40 shadow-md dark:border-brand-500 dark:bg-brand-950/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-xs text-slate-900 dark:text-white">
                    {cmp.ticketNumber}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${getStatusBadge(cmp.status)}`}>
                    {cmp.status}
                  </span>
                </div>

                <h3 className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  {cmp.category} — Room {cmp.roomNumber}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{cmp.description}</p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400 dark:border-slate-800">
                  <span>Tenant: {cmp.tenantName}</span>
                  <span className="font-bold text-brand-600">{cmp.assignedStaffName}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ticket Chat & Management Drawer */}
        {selectedComplaint ? (
          <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                    {selectedComplaint.ticketNumber}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${getStatusBadge(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Category: {selectedComplaint.category} | Resident: {selectedComplaint.tenantName} (Room {selectedComplaint.roomNumber})
                </p>
              </div>

              {/* Status Update Control */}
              <select
                value={selectedComplaint.status}
                onChange={(e) => updateComplaintStatus(selectedComplaint.id, e.target.value as any)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            {/* Chat Thread */}
            <div className="mt-4 flex-1 overflow-y-auto space-y-3 max-h-[320px] pr-2">
              {selectedComplaint.messages.map(m => (
                <div key={m.id} className={`rounded-2xl p-3.5 text-xs ${
                  m.senderRole === 'Tenant' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' : 'bg-brand-50 text-brand-900 dark:bg-brand-950/30 dark:text-brand-200 border border-brand-200/50'
                }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{m.senderName} ({m.senderRole})</span>
                    <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  </div>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>

            {/* Send Reply */}
            <form onSubmit={handleSendReply} className="mt-4 flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Type update message to resident..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-2xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-700"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
