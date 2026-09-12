import React, { useState } from 'react';
import { Tenant } from '../../types';
import { useStore } from '../../store/useStore';
import { formatCurrency, getStatusBadge } from '../../utils/helpers';
import { Users, Plus, Search, Filter, Phone, Mail, FileText, CheckCircle2, ShieldCheck, LogOut, Download } from 'lucide-react';
import { generateRentalAgreementPDF } from '../../utils/pdfGenerator';

export const TenantDirectory: React.FC = () => {
  const { tenants, properties, rooms, beds, addTenant, checkoutTenant, searchQuery } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // New Tenant Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2002-01-01');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [fatherMotherName, setFatherMotherName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [collegeCompany, setCollegeCompany] = useState('');
  const [occupation, setOccupation] = useState<'Student' | 'Working Professional' | 'Other'>('Student');
  const [selectedBedId, setSelectedBedId] = useState('');

  const currentProp = properties[0];
  const availableBeds = beds.filter(b => b.status === 'AVAILABLE');

  const filteredTenants = tenants.filter(t => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return t.fullName.toLowerCase().includes(q) || t.phone.includes(q) || t.roomNumber.includes(q);
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bed = beds.find(b => b.id === selectedBedId);
    const room = rooms.find(r => r.id === bed?.roomId);

    addTenant({
      fullName,
      phone,
      email,
      dob,
      gender,
      fatherMotherName,
      emergencyContact,
      aadhaarNumber,
      permanentAddress,
      collegeCompany,
      occupation,
      joiningDate: new Date().toISOString().split('T')[0],
      propertyId: currentProp.id,
      propertyName: currentProp.name,
      buildingId: 'bld-1',
      roomId: room?.id || 'room-101',
      roomNumber: room?.roomNumber || '101',
      bedId: selectedBedId || 'bed-101-c',
      bedNumber: bed?.bedNumber || 'Bed C',
      rentAmount: room?.monthlyRent || 9500,
      securityDeposit: room?.securityDeposit || 10000,
      status: 'ACTIVE',
      paymentHealthScore: 'EXCELLENT',
      tenantExperienceScore: 5.0,
      documents: [],
      agreementAccepted: true,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
    });

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Tenants Directory & Onboarding</h1>
          <p className="text-xs text-slate-500">Manage resident profiles, digital KYC documents & checkout settlements</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-700 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Onboard New Tenant</span>
        </button>
      </div>

      {/* Tenant Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTenants.map(tenant => (
          <div
            key={tenant.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={tenant.photo}
                  alt={tenant.fullName}
                  className="h-12 w-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white">{tenant.fullName}</h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    Room {tenant.roomNumber} ({tenant.bedNumber})
                  </p>
                </div>
              </div>

              <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${getStatusBadge(tenant.status)}`}>
                {tenant.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{tenant.email}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-slate-500">Rent Amount:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{formatCurrency(tenant.rentAmount)}/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Payment Reliability:</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${getStatusBadge(tenant.paymentHealthScore)}`}>
                  {tenant.paymentHealthScore}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => generateRentalAgreementPDF(tenant, currentProp)}
                className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-slate-100 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
              >
                <Download className="h-3.5 w-3.5 text-brand-600" />
                <span>Agreement</span>
              </button>
              <button
                onClick={() => checkoutTenant(tenant.id, tenant.securityDeposit)}
                className="flex items-center justify-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Checkout</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tenant Registration & Allocation</h2>
            <p className="text-xs text-slate-500">Fill details to auto-allocate bed & generate agreement</p>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rohan Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    required
                    type="text"
                    placeholder="+91 98765 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="rohan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Aadhaar Number</label>
                  <input
                    required
                    type="text"
                    placeholder="12 digit Aadhaar"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Available Bed</label>
                <select
                  required
                  value={selectedBedId}
                  onChange={(e) => setSelectedBedId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="">-- Choose Bed --</option>
                  {availableBeds.map(b => (
                    <option key={b.id} value={b.id}>
                      Room {b.roomId} ({b.bedNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Permanent Address</label>
                <textarea
                  rows={2}
                  placeholder="Full permanent residential address"
                  value={permanentAddress}
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-700"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
