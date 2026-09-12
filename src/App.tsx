import React, { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { OwnerDashboard } from './components/owner/OwnerDashboard';
import { BedMatrixView } from './components/owner/BedMatrixView';
import { TenantDirectory } from './components/owner/TenantDirectory';
import { PaymentLedger } from './components/owner/PaymentLedger';
import { ComplaintCenter } from './components/owner/ComplaintCenter';
import { AICopilotOwner } from './components/owner/AICopilotOwner';
import { DailyBriefModal } from './components/owner/DailyBriefModal';
import { TenantDashboard } from './components/tenant/TenantDashboard';
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard';
import { LandingPage } from './components/landing/LandingPage';
import { Building, Users, Utensils, Wrench, BarChart3, QrCode } from 'lucide-react';
import { formatCurrency } from './utils/helpers';

export const App: React.FC = () => {
  const { currentRole, properties, messMenus, staff, assets } = useStore();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Sync role switch with appropriate default tab
  useEffect(() => {
    if (currentRole === 'TENANT') {
      setActiveTab('tenant_dashboard');
    } else if (currentRole === 'SUPER_ADMIN') {
      setActiveTab('saas_dashboard');
    } else if (activeTab === 'tenant_dashboard' || activeTab === 'saas_dashboard') {
      setActiveTab('dashboard');
    }
  }, [currentRole]);

  // Dark mode handler
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currentProp = properties[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Container */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {activeTab !== 'landing' && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* OWNER VIEWS */}
          {activeTab === 'dashboard' && <OwnerDashboard setActiveTab={setActiveTab} />}
          {activeTab === 'beds' && <BedMatrixView />}
          {activeTab === 'tenants' && <TenantDirectory />}
          {activeTab === 'payments' && <PaymentLedger />}
          {activeTab === 'complaints' && <ComplaintCenter />}
          {activeTab === 'copilot' && <AICopilotOwner />}
          {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}

          {/* Properties Details Tab */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-extrabold">Properties & Buildings Management</h1>
                  <p className="text-xs text-slate-500">Configure buildings, floors, rules, amenities & emergency contacts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {properties.map(p => (
                  <div key={p.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                    <img src={p.image} alt={p.name} className="h-44 w-full rounded-2xl object-cover" />
                    <div>
                      <h2 className="text-lg font-black">{p.name}</h2>
                      <p className="text-xs text-slate-500">{p.address}, {p.city}, {p.state} - {p.pincode}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3 dark:border-slate-800">
                      <div>
                        <span className="font-bold text-slate-500">Buildings:</span> {p.totalBuildings}
                      </div>
                      <div>
                        <span className="font-bold text-slate-500">Total Seats:</span> {p.totalSeats} Beds
                      </div>
                      <div>
                        <span className="font-bold text-slate-500">Gender Allowed:</span> {p.genderAllowed}
                      </div>
                      <div>
                        <span className="font-bold text-slate-500">Monthly Revenue:</span> {formatCurrency(p.monthlyRevenue)}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-slate-700 dark:text-slate-300">Enabled Amenities:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-600 dark:bg-brand-950/40">WiFi Fiber</span>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/40">Food Included</span>
                        <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-600 dark:bg-purple-950/40">CCTV & Gate Security</span>
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950/40">24/7 Power Backup</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KYC & Agreements Tab */}
          {activeTab === 'kyc_agreements' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-extrabold">Digital KYC Vault & Rental Agreements</h1>
                <p className="text-xs text-slate-500">Verified tenant documents, Aadhaar records & digital lease contracts</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">All Uploaded Verification Documents</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Aadhaar Card (Rahul Sharma)</p>
                      <p className="text-[10px] text-slate-400">Uploaded 2025-08-01 • Aadhaar #: 4521 8890 1234</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">VERIFIED</span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Signed Lease Agreement (Room 101 Bed A)</p>
                      <p className="text-[10px] text-slate-400">Digitally accepted by Rahul Sharma</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">ACTIVE LEASE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visitors & Leave Tab */}
          {activeTab === 'visitors_leave' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-extrabold">Visitor Entries & Digital Leave Logs</h1>
                <p className="text-xs text-slate-500">Gate pass QR verifications and resident out-of-building leave applications</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <h2 className="text-sm font-bold">Approved Visitor Gate Passes</h2>
                  <div className="rounded-2xl bg-slate-50 p-3 text-xs dark:bg-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">Vikas Sharma (Brother of Rahul Sharma)</p>
                    <p className="text-[10px] text-slate-400">Visit Date: 2026-09-13 | Code: PASS-90812</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <h2 className="text-sm font-bold">Leave Requests</h2>
                  <div className="rounded-2xl bg-slate-50 p-3 text-xs dark:bg-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">Rahul Sharma (Room 101)</p>
                    <p className="text-[10px] text-slate-400">Leave: 2026-09-20 to 2026-09-25 | Reason: Family function</p>
                    <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">APPROVED</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mess Tab */}
          {activeTab === 'mess' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-extrabold">Food & Mess Management</h1>
                <p className="text-xs text-slate-500">Weekly meal menus, feedback & meal preferences</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {messMenus.map(m => (
                  <div key={m.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-2">
                    <span className="font-extrabold text-brand-600 text-sm">{m.day}</span>
                    <div className="text-xs space-y-1 pt-1">
                      <p><span className="font-bold text-slate-700 dark:text-slate-300">Breakfast:</span> {m.breakfast}</p>
                      <p><span className="font-bold text-slate-700 dark:text-slate-300">Lunch:</span> {m.lunch}</p>
                      <p><span className="font-bold text-slate-700 dark:text-slate-300">Snacks:</span> {m.snacks}</p>
                      <p><span className="font-bold text-slate-700 dark:text-slate-300">Dinner:</span> {m.dinner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assets & Staff Tab */}
          {activeTab === 'assets_staff' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-extrabold">Assets & Staff Task Tracking</h1>
                <p className="text-xs text-slate-500">Property hardware inventory & staff work schedules</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <h2 className="text-sm font-bold">Property Staff Directory</h2>
                  {staff.map(s => (
                    <div key={s.id} className="flex justify-between items-center rounded-2xl bg-slate-50 p-3 text-xs dark:bg-slate-800">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{s.fullName} ({s.role})</p>
                        <p className="text-[10px] text-slate-400">Mobile: {s.phone}</p>
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(s.salary)}/mo</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <h2 className="text-sm font-bold">Property Assets & Equipment</h2>
                  {assets.map(a => (
                    <div key={a.id} className="flex justify-between items-center rounded-2xl bg-slate-50 p-3 text-xs dark:bg-slate-800">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{a.name} (x{a.quantity})</p>
                        <p className="text-[10px] text-slate-400">Location: {a.location}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">{a.condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profitability & Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-extrabold">Profitability & Financial Reports</h1>
                <p className="text-xs text-slate-500">RevPAR, occupancy earnings & net profit margins</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold text-slate-400">Total Billed Revenue</p>
                  <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">{formatCurrency(1064000)}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold text-slate-400">Operating Expenses (Staff, Food, Electricity)</p>
                  <p className="text-2xl font-black mt-1 text-rose-600">{formatCurrency(412000)}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold text-slate-400">Net Estimated Profit Margin</p>
                  <p className="text-2xl font-black mt-1 text-emerald-600">{formatCurrency(652000)} (61%)</p>
                </div>
              </div>
            </div>
          )}

          {/* TENANT VIEWS */}
          {activeTab === 'tenant_dashboard' && <TenantDashboard />}

          {/* SUPER ADMIN VIEW */}
          {activeTab === 'saas_dashboard' && <SuperAdminDashboard />}
        </main>
      </div>

      {/* Daily Briefing Popup Modal */}
      <DailyBriefModal />
    </div>
  );
};

export default App;
