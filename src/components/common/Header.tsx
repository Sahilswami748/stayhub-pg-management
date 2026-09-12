import React, { useState } from 'react';
import { Building2, Search, Bell, Sparkles, AlertTriangle, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import RoleSwitcher from './RoleSwitcher';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const { currentRole, properties, currentPropertyId, setPropertyId, searchQuery, setSearchQuery, setDailyBriefOpen, notices } = useStore();
  const currentProperty = properties.find(p => p.id === currentPropertyId) || properties[0];
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:px-6">
      {/* Brand & Property Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigoCustom-500 text-white shadow-md shadow-brand-500/20">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="hidden text-xl font-extrabold tracking-tight md:inline">Stay<span className="text-brand-600">Hub</span></span>
        </div>

        {currentRole === 'OWNER' || currentRole === 'MANAGER' ? (
          <div className="ml-2 hidden items-center gap-2 sm:flex">
            <span className="text-xs font-semibold text-slate-400">/</span>
            <select
              value={currentPropertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {properties.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.city})
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      {/* Global Search Bar */}
      <div className="mx-4 max-w-xs flex-1 md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tenant, room, bed, ticket, payment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {currentRole === 'OWNER' && (
          <button
            onClick={() => setDailyBriefOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:from-amber-500/20 hover:to-orange-500/20 dark:text-amber-400"
            title="Daily Operations Briefing"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-amber-500" />
            <span className="hidden sm:inline">Daily Brief</span>
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Bell className="h-4 w-4" />
            {notices.length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Notices & Alerts</span>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  {notices.length} Active
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {notices.map(n => (
                  <div key={n.id} className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/60">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                    <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">{n.content}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{n.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher */}
        <RoleSwitcher />
      </div>
    </header>
  );
};
