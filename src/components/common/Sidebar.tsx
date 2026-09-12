import React from 'react';
import {
  LayoutDashboard, Building, Grid, Users, CreditCard, MessageSquare,
  FileCheck, Utensils, Wrench, BarChart3, Bot, Globe, Shield, Ticket,
  QrCode, Calendar, PackageCheck, AlertCircle
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentRole } = useStore();

  const ownerNavItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties & Buildings', icon: Building },
    { id: 'beds', label: 'Visual Bed Matrix', icon: Grid },
    { id: 'tenants', label: 'Tenants Directory', icon: Users },
    { id: 'payments', label: 'Rent & Payments', icon: CreditCard },
    { id: 'kyc_agreements', label: 'KYC & Agreements', icon: FileCheck },
    { id: 'complaints', label: 'Smart Complaints', icon: Ticket },
    { id: 'visitors_leave', label: 'Visitors & Leave', icon: QrCode },
    { id: 'mess', label: 'Mess & Food Menu', icon: Utensils },
    { id: 'assets_staff', label: 'Assets & Staff', icon: Wrench },
    { id: 'analytics', label: 'Profit & Analytics', icon: BarChart3 },
    { id: 'copilot', label: 'AI Property Copilot', icon: Bot },
    { id: 'landing', label: 'SaaS Landing Page', icon: Globe },
  ];

  const tenantNavItems = [
    { id: 'tenant_dashboard', label: 'My Room & Rent', icon: LayoutDashboard },
    { id: 'tenant_payments', label: 'Pay Rent & Receipts', icon: CreditCard },
    { id: 'tenant_complaints', label: 'Raise Complaint', icon: Ticket },
    { id: 'tenant_agreement', label: 'My Agreement & KYC', icon: FileCheck },
    { id: 'tenant_pass', label: 'Visitor Pass & Leave', icon: QrCode },
    { id: 'tenant_mess', label: 'Mess Menu', icon: Utensils },
    { id: 'tenant_copilot', label: 'AI Assistant', icon: Bot },
  ];

  const superAdminNavItems = [
    { id: 'saas_dashboard', label: 'Platform Revenue', icon: BarChart3 },
    { id: 'saas_customers', label: 'All PG Customers', icon: Building },
    { id: 'saas_plans', label: 'Subscription Tiers', icon: CreditCard },
    { id: 'landing', label: 'SaaS Marketing Page', icon: Globe },
  ];

  let items = ownerNavItems;
  if (currentRole === 'TENANT') items = tenantNavItems;
  if (currentRole === 'SUPER_ADMIN') items = superAdminNavItems;

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 hidden md:block">
      <div className="space-y-1">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-600 shadow-sm dark:bg-brand-900/30 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
