import React, { useState } from 'react';
import { Building2, Shield, Sparkles, CheckCircle2, Zap, ArrowRight, Star, CreditCard, Users, QrCode, FileCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  const { setRole } = useStore();
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'BASIC' | 'PRO' | 'BUSINESS'>('PRO');

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-8 text-center text-white shadow-2xl md:p-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-extrabold text-brand-300 backdrop-blur-md border border-brand-500/30">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>INDIA'S #1 PG & HOSTEL OPERATIONS SAAS</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Run Your PG & Hostel Entirely From One Place.
          </h1>

          <p className="text-sm font-medium text-slate-300 sm:text-base leading-relaxed">
            Replace 5 different apps. Manage rooms, beds, tenant KYC, Razorpay rent payments, maintenance tickets, visitor passes, staff & AI analytics in one delightful dashboard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setRole('OWNER');
                setActiveTab('dashboard');
              }}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-indigoCustom-500 px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-brand-500/30 hover:scale-105 transition-all"
            >
              <span>Explore Owner Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                setRole('TENANT');
                setActiveTab('tenant_dashboard');
              }}
              className="flex items-center gap-2 rounded-2xl bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>Test Mobile Tenant PWA</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            Everything You Need to Scale Your PG Business
          </h2>
          <p className="mt-2 text-xs font-medium text-slate-500">
            Designed for Indian PG & hostel owners — beginner simple, enterprise powerful.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/40">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Visual Bed & Room Matrix</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instantly see occupied, reserved, available & maintenance seats across all buildings and floors. Allocate or transfer beds in 1 click.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Razorpay & UPI Online Rent</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tenants pay rent via GPay, PhonePe, Cards. Automatic server verification, PDF receipts & WhatsApp payment reminders.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/40">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Property Copilot</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ask questions in plain English: "Who owes rent?", "Which beds become available next month?", "Show unresolved complaints".
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/40">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Complaint Auto-Dispatch</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Plumbing complaints route to plumber, WiFi to IT tech. In-ticket tenant chat & SLA performance tracking.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-900/40">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Digital KYC & Agreement Vault</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Aadhaar, Passport, Police verification documents & digitally signed lease agreement PDF generator.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Visitor QR & Gate Pass</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tenants request visitor entry or leave permissions digitally. Security approves via gate pass code.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="rounded-3xl bg-slate-50 p-8 dark:bg-slate-900/50 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Simple Transparent SaaS Pricing</h2>
          <p className="mt-1 text-xs text-slate-500">Choose the plan suited for your bed capacity</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: 'FREE', title: 'Starter Free', beds: 'Up to 20 Beds', price: '₹0', period: 'Forever Free', desc: 'Basic room registry' },
            { id: 'BASIC', title: 'Basic PG', beds: 'Up to 100 Beds', price: '₹1,999', period: '/month', desc: 'Complaints, rent reminders & receipts' },
            { id: 'PRO', title: 'Pro Hostel', beds: 'Up to 500 Beds', price: '₹4,999', period: '/month', desc: 'AI Copilot, Razorpay & PDF agreements', popular: true },
            { id: 'BUSINESS', title: 'Enterprise', beds: 'Unlimited Beds', price: '₹9,999', period: '/month', desc: 'Multi-city, custom branding & dedicated manager' },
          ].map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 transition-all flex flex-col justify-between ${
                plan.popular
                  ? 'border-2 border-brand-500 bg-white shadow-xl dark:bg-slate-900 ring-4 ring-brand-500/10'
                  : 'border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="mb-2 inline-block rounded-full bg-brand-600 px-3 py-1 text-[10px] font-extrabold uppercase text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.title}</h3>
                <p className="text-xs font-semibold text-brand-600">{plan.beds}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{plan.desc}</p>
              </div>

              <button
                onClick={() => {
                  setRole('OWNER');
                  setActiveTab('dashboard');
                }}
                className={`mt-6 w-full rounded-2xl py-3 text-xs font-extrabold shadow-md transition-all ${
                  plan.popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
