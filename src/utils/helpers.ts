export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ACTIVE':
    case 'PAID':
    case 'APPROVED':
    case 'RESOLVED':
    case 'EXCELLENT':
    case 'VERIFIED':
    case 'AVAILABLE':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
    case 'PENDING':
    case 'IN_PROGRESS':
    case 'ASSIGNED':
    case 'PARTIALLY_OCCUPIED':
    case 'GOOD':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
    case 'OVERDUE':
    case 'REJECTED':
    case 'BLOCKED':
    case 'URGENT':
    case 'EXPIRED':
    case 'AT_RISK':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800';
    case 'OCCUPIED':
    case 'FULL':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
    case 'RESERVED':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800';
    case 'MAINTENANCE':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};
