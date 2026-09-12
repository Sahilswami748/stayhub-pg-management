import React, { useState } from 'react';
import { UserRole } from '../../types';
import { useStore } from '../../store/useStore';
import { Shield, UserCheck, Wrench, ShieldAlert, CreditCard, LayoutDashboard } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'OWNER', label: 'PG Owner', icon: <Shield className="h-3.5 w-3.5" />, color: 'bg-brand-500 text-white' },
    { role: 'TENANT', label: 'Tenant / Resident', icon: <UserCheck className="h-3.5 w-3.5" />, color: 'bg-emerald-500 text-white' },
    { role: 'WARDEN', label: 'Warden', icon: <ShieldAlert className="h-3.5 w-3.5" />, color: 'bg-amber-500 text-white' },
    { role: 'STAFF', label: 'Staff / Tech', icon: <Wrench className="h-3.5 w-3.5" />, color: 'bg-indigo-500 text-white' },
    { role: 'MANAGER', label: 'Property Manager', icon: <LayoutDashboard className="h-3.5 w-3.5" />, color: 'bg-purple-500 text-white' },
    { role: 'SUPER_ADMIN', label: 'Super Admin SaaS', icon: <CreditCard className="h-3.5 w-3.5" />, color: 'bg-rose-500 text-white' },
  ];

  const activeRoleObj = roles.find(r => r.role === currentRole) || roles[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all ${activeRoleObj.color}`}
      >
        {activeRoleObj.icon}
        <span>{activeRoleObj.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Switch Persona / View
          </div>
          <div className="space-y-1">
            {roles.map(r => (
              <button
                key={r.role}
                onClick={() => {
                  setRole(r.role);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                  currentRole === r.role
                    ? 'bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded-md ${r.color}`}>
                  {r.icon}
                </div>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
