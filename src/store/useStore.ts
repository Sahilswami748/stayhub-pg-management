import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserRole, Property, Building, Room, Bed, Tenant, RentInvoice,
  Complaint, Notice, VisitorPass, LeaveRequest, MessMenu, Staff,
  Asset, ActivityLog, Subscription, ComplaintStatus, LeaveStatus, VisitorStatus, BedStatus
} from '../types';
import {
  mockProperties, mockBuildings, mockRooms, mockBeds, mockTenants,
  mockInvoices, mockComplaints, mockNotices, mockVisitorPasses,
  mockLeaveRequests, mockMessMenus, mockStaff, mockAssets,
  mockActivityLogs, mockSubscription
} from '../data/mockData';

interface AppState {
  currentRole: UserRole;
  currentPropertyId: string;
  currentTenantId: string; // for tenant role view
  searchQuery: string;
  isDailyBriefOpen: boolean;
  
  properties: Property[];
  buildings: Building[];
  rooms: Room[];
  beds: Bed[];
  tenants: Tenant[];
  invoices: RentInvoice[];
  complaints: Complaint[];
  notices: Notice[];
  visitorPasses: VisitorPass[];
  leaveRequests: LeaveRequest[];
  messMenus: MessMenu[];
  staff: Staff[];
  assets: Asset[];
  activityLogs: ActivityLog[];
  subscription: Subscription;

  // Actions
  setRole: (role: UserRole) => void;
  setPropertyId: (propertyId: string) => void;
  setTenantId: (tenantId: string) => void;
  setSearchQuery: (query: string) => void;
  setDailyBriefOpen: (open: boolean) => void;

  // Bed & Room operations
  allocateBed: (bedId: string, tenantId: string) => void;
  transferBed: (tenantId: string, newBedId: string, reason: string) => void;
  updateBedStatus: (bedId: string, status: BedStatus) => void;

  // Tenant operations
  addTenant: (tenant: Omit<Tenant, 'id'>) => void;
  checkoutTenant: (tenantId: string, refundAmount: number) => void;

  // Financial & Invoice operations
  payInvoice: (invoiceId: string, paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash') => void;

  // Complaints
  addComplaint: (category: Complaint['category'], description: string, priority: Complaint['priority']) => void;
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus, staffId?: string) => void;
  addComplaintMessage: (complaintId: string, text: string, senderRole: string) => void;
  rateComplaint: (complaintId: string, rating: number) => void;

  // Notices, Visitor, Leave
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => void;
  addVisitorPass: (visitor: Omit<VisitorPass, 'id' | 'passCode' | 'status' | 'tenantId' | 'tenantName' | 'roomNumber'>) => void;
  updateVisitorStatus: (id: string, status: VisitorStatus) => void;
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id' | 'status' | 'tenantId' | 'tenantName' | 'roomNumber'>) => void;
  updateLeaveStatus: (id: string, status: LeaveStatus) => void;

  // AI Query Resolver
  askAICopilot: (query: string, mode: 'OWNER' | 'TENANT') => string;
  resetDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentRole: 'OWNER',
      currentPropertyId: 'prop-1',
      currentTenantId: 'ten-1',
      searchQuery: '',
      isDailyBriefOpen: false,

      properties: mockProperties,
      buildings: mockBuildings,
      rooms: mockRooms,
      beds: mockBeds,
      tenants: mockTenants,
      invoices: mockInvoices,
      complaints: mockComplaints,
      notices: mockNotices,
      visitorPasses: mockVisitorPasses,
      leaveRequests: mockLeaveRequests,
      messMenus: mockMessMenus,
      staff: mockStaff,
      assets: mockAssets,
      activityLogs: mockActivityLogs,
      subscription: mockSubscription,

      setRole: (role) => set({ currentRole: role }),
      setPropertyId: (id) => set({ currentPropertyId: id }),
      setTenantId: (id) => set({ currentTenantId: id }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setDailyBriefOpen: (open) => set({ isDailyBriefOpen: open }),

      allocateBed: (bedId, tenantId) => {
        const { beds, tenants, activityLogs } = get();
        const tenant = tenants.find(t => t.id === tenantId);
        if (!tenant) return;

        const updatedBeds = beds.map(b => b.id === bedId ? {
          ...b,
          status: 'OCCUPIED' as BedStatus,
          currentTenantId: tenant.id,
          currentTenantName: tenant.fullName
        } : b);

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: 'Management',
          actorRole: 'Owner/Manager',
          action: 'Bed Allocation',
          details: `Allocated ${bedId} to ${tenant.fullName}`
        };

        set({ beds: updatedBeds, activityLogs: [newLog, ...activityLogs] });
      },

      transferBed: (tenantId, newBedId, reason) => {
        const { beds, tenants, rooms, activityLogs } = get();
        const tenant = tenants.find(t => t.id === tenantId);
        const newBed = beds.find(b => b.id === newBedId);
        if (!tenant || !newBed) return;

        const oldBedId = tenant.bedId;
        const newRoom = rooms.find(r => r.id === newBed.roomId);

        const updatedBeds = beds.map(b => {
          if (b.id === oldBedId) return { ...b, status: 'AVAILABLE' as BedStatus, currentTenantId: undefined, currentTenantName: undefined };
          if (b.id === newBedId) return { ...b, status: 'OCCUPIED' as BedStatus, currentTenantId: tenant.id, currentTenantName: tenant.fullName };
          return b;
        });

        const updatedTenants = tenants.map(t => t.id === tenantId ? {
          ...t,
          bedId: newBed.id,
          bedNumber: newBed.bedNumber,
          roomId: newBed.roomId,
          roomNumber: newRoom?.roomNumber || t.roomNumber
        } : t);

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: 'Management',
          actorRole: 'Owner',
          action: 'Room Transfer',
          details: `Transferred ${tenant.fullName} from ${tenant.roomNumber} (${tenant.bedNumber}) to ${newRoom?.roomNumber} (${newBed.bedNumber}). Reason: ${reason}`
        };

        set({ beds: updatedBeds, tenants: updatedTenants, activityLogs: [newLog, ...activityLogs] });
      },

      updateBedStatus: (bedId, status) => {
        const { beds } = get();
        set({ beds: beds.map(b => b.id === bedId ? { ...b, status } : b) });
      },

      addTenant: (newTenantData) => {
        const { tenants, beds, activityLogs } = get();
        const newId = `ten-${Date.now()}`;
        const newTenant: Tenant = {
          ...newTenantData,
          id: newId,
          paymentHealthScore: 'EXCELLENT',
          tenantExperienceScore: 5.0,
          agreementAccepted: true,
          documents: [
            { id: `doc-${Date.now()}`, type: 'Aadhaar', fileName: 'Aadhaar_Document.pdf', uploadDate: new Date().toISOString().split('T')[0], status: 'VERIFIED', url: '#' },
            { id: `doc-ag-${Date.now()}`, type: 'Rental Agreement', fileName: 'Signed_Rental_Agreement.pdf', uploadDate: new Date().toISOString().split('T')[0], status: 'VERIFIED', url: '#' }
          ]
        };

        const updatedBeds = beds.map(b => b.id === newTenantData.bedId ? {
          ...b,
          status: 'OCCUPIED' as BedStatus,
          currentTenantId: newId,
          currentTenantName: newTenantData.fullName
        } : b);

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: 'System',
          actorRole: 'Registration Engine',
          action: 'New Tenant Registered',
          details: `Registered ${newTenantData.fullName} into Room ${newTenantData.roomNumber}`
        };

        set({ tenants: [newTenant, ...tenants], beds: updatedBeds, activityLogs: [newLog, ...activityLogs] });
      },

      checkoutTenant: (tenantId, refundAmount) => {
        const { tenants, beds, activityLogs } = get();
        const tenant = tenants.find(t => t.id === tenantId);
        if (!tenant) return;

        const updatedTenants = tenants.map(t => t.id === tenantId ? { ...t, status: 'CHECKED_OUT' as const } : t);
        const updatedBeds = beds.map(b => b.id === tenant.bedId ? { ...b, status: 'AVAILABLE' as BedStatus, currentTenantId: undefined, currentTenantName: undefined } : b);

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: 'Management',
          actorRole: 'Owner',
          action: 'Tenant Checked Out',
          details: `Checked out ${tenant.fullName}. Security Deposit refunded: ₹${refundAmount}`
        };

        set({ tenants: updatedTenants, beds: updatedBeds, activityLogs: [newLog, ...activityLogs] });
      },

      payInvoice: (invoiceId, paymentMethod) => {
        const { invoices, activityLogs, tenants } = get();
        const txnId = `PAY-UPI-${Math.floor(1000000 + Math.random() * 9000000)}`;
        const paidDate = new Date().toISOString().split('T')[0];

        let paidTenantId = '';
        let paidAmount = 0;

        const updatedInvoices = invoices.map(inv => {
          if (inv.id === invoiceId) {
            paidTenantId = inv.tenantId;
            paidAmount = inv.totalPayable;
            return {
              ...inv,
              status: 'PAID' as const,
              paidDate,
              paymentMethod,
              transactionId: txnId
            };
          }
          return inv;
        });

        const updatedTenants = tenants.map(t => t.id === paidTenantId ? { ...t, paymentHealthScore: 'EXCELLENT' as const } : t);

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: 'Tenant Payment System',
          actorRole: 'System',
          action: 'Rent Collected',
          details: `Payment of ₹${paidAmount.toLocaleString('en-IN')} received via ${paymentMethod}. Txn ID: ${txnId}`
        };

        set({ invoices: updatedInvoices, tenants: updatedTenants, activityLogs: [newLog, ...activityLogs] });
      },

      addComplaint: (category, description, priority) => {
        const { complaints, currentTenantId, tenants, currentPropertyId, staff, activityLogs } = get();
        const tenant = tenants.find(t => t.id === currentTenantId) || tenants[0];
        
        let assignedStaff = staff.find(s => s.role.toLowerCase() === category.toLowerCase());
        if (!assignedStaff && category === 'Water') assignedStaff = staff.find(s => s.role === 'Plumber');
        if (!assignedStaff && category === 'AC') assignedStaff = staff.find(s => s.role === 'Electrician');
        if (!assignedStaff) assignedStaff = staff[0];

        const ticketNum = `CMP-${Math.floor(10000 + Math.random() * 90000)}`;

        const newComplaint: Complaint = {
          id: `cmp-${Date.now()}`,
          ticketNumber: ticketNum,
          tenantId: tenant.id,
          tenantName: tenant.fullName,
          propertyId: tenant.propertyId || currentPropertyId,
          roomNumber: tenant.roomNumber,
          category,
          description,
          priority,
          status: 'ASSIGNED',
          assignedStaffId: assignedStaff?.id,
          assignedStaffName: `${assignedStaff?.fullName} (${assignedStaff?.role})`,
          createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
          messages: [
            { id: 'm1', senderName: tenant.fullName, senderRole: 'Tenant', text: description, timestamp: 'Just now' },
            { id: 'm2', senderName: 'Auto Dispatcher', senderRole: 'System', text: `Complaint ticket ${ticketNum} auto-assigned to ${assignedStaff?.fullName} (${assignedStaff?.role}).`, timestamp: 'Just now' }
          ]
        };

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: tenant.fullName,
          actorRole: 'Tenant',
          action: 'Complaint Raised',
          details: `Raised ticket ${ticketNum} (${category}): ${description}`
        };

        set({ complaints: [newComplaint, ...complaints], activityLogs: [newLog, ...activityLogs] });
      },

      updateComplaintStatus: (complaintId, status, staffId) => {
        const { complaints, staff } = get();
        const assignedStaff = staff.find(s => s.id === staffId);

        set({
          complaints: complaints.map(c => c.id === complaintId ? {
            ...c,
            status,
            assignedStaffId: staffId || c.assignedStaffId,
            assignedStaffName: assignedStaff ? `${assignedStaff.fullName} (${assignedStaff.role})` : c.assignedStaffName,
            resolvedAt: status === 'RESOLVED' ? new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : c.resolvedAt
          } : c)
        });
      },

      addComplaintMessage: (complaintId, text, senderRole) => {
        const { complaints, tenants, currentTenantId } = get();
        const tenant = tenants.find(t => t.id === currentTenantId);
        const senderName = senderRole === 'Tenant' ? (tenant?.fullName || 'Tenant') : 'Management / Staff';

        const updatedComplaints = complaints.map(c => {
          if (c.id === complaintId) {
            return {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderName,
                  senderRole,
                  text,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]
            };
          }
          return c;
        });

        set({ complaints: updatedComplaints });
      },

      rateComplaint: (complaintId, rating) => {
        const { complaints } = get();
        set({
          complaints: complaints.map(c => c.id === complaintId ? { ...c, feedbackRating: rating, status: 'CLOSED' } : c)
        });
      },

      addNotice: (noticeData) => {
        const { notices, activityLogs } = get();
        const newNotice: Notice = {
          ...noticeData,
          id: `not-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0]
        };

        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actorName: noticeData.authorName,
          actorRole: 'Owner/Manager',
          action: 'Notice Published',
          details: noticeData.title
        };

        set({ notices: [newNotice, ...notices], activityLogs: [newLog, ...activityLogs] });
      },

      addVisitorPass: (vData) => {
        const { visitorPasses, tenants, currentTenantId } = get();
        const tenant = tenants.find(t => t.id === currentTenantId) || tenants[0];
        const passCode = `PASS-${Math.floor(10000 + Math.random() * 90000)}`;

        const newPass: VisitorPass = {
          ...vData,
          id: `vis-${Date.now()}`,
          tenantId: tenant.id,
          tenantName: tenant.fullName,
          roomNumber: tenant.roomNumber,
          status: 'APPROVED',
          passCode
        };

        set({ visitorPasses: [newPass, ...visitorPasses] });
      },

      updateVisitorStatus: (id, status) => {
        const { visitorPasses } = get();
        set({ visitorPasses: visitorPasses.map(v => v.id === id ? { ...v, status } : v) });
      },

      addLeaveRequest: (lData) => {
        const { leaveRequests, tenants, currentTenantId } = get();
        const tenant = tenants.find(t => t.id === currentTenantId) || tenants[0];

        const newLeave: LeaveRequest = {
          ...lData,
          id: `lev-${Date.now()}`,
          tenantId: tenant.id,
          tenantName: tenant.fullName,
          roomNumber: tenant.roomNumber,
          status: 'PENDING'
        };

        set({ leaveRequests: [newLeave, ...leaveRequests] });
      },

      updateLeaveStatus: (id, status) => {
        const { leaveRequests } = get();
        set({ leaveRequests: leaveRequests.map(l => l.id === id ? { ...l, status } : l) });
      },

      askAICopilot: (query, mode) => {
        const q = query.toLowerCase();
        const { properties, beds, invoices, complaints, tenants, messMenus, currentTenantId } = get();
        const currentProp = properties[0];

        if (mode === 'OWNER') {
          if (q.includes('vacant') || q.includes('available bed') || q.includes('free seat')) {
            const avail = beds.filter(b => b.status === 'AVAILABLE').length;
            return `You currently have ${avail} available beds across all properties. In ${currentProp.name}, there are ${currentProp.availableSeats} available seats ready for allocation.`;
          }
          if (q.includes('overdue') || q.includes('pending rent') || q.includes('unpaid')) {
            const overdueInvoices = invoices.filter(i => i.status === 'OVERDUE' || i.status === 'PENDING');
            const totalPending = overdueInvoices.reduce((acc, i) => acc + i.totalPayable, 0);
            return `Total pending rent is ₹${totalPending.toLocaleString('en-IN')}. Tenants with pending/overdue rent: ${overdueInvoices.map(i => i.tenantName).join(', ')}.`;
          }
          if (q.includes('revenue') || q.includes('income') || q.includes('collection')) {
            return `This month's projected revenue is ₹${currentProp.monthlyRevenue.toLocaleString('en-IN')}. Total rent collected so far is ₹9,880 from Rahul Sharma. Collection rate stands at 88%.`;
          }
          if (q.includes('complaint') || q.includes('issue') || q.includes('ticket')) {
            const openComp = complaints.filter(c => c.status !== 'RESOLVED' && c.status !== 'CLOSED');
            return `There are ${openComp.length} unresolved complaints. Latest complaint: Ticket ${openComp[0]?.ticketNumber || 'CMP-10291'} (${openComp[0]?.category || 'Plumbing'}) in Room ${openComp[0]?.roomNumber || '101'}.`;
          }
          return `Based on live property data: Occupancy is at ${Math.round((currentProp.occupiedSeats/currentProp.totalSeats)*100)}%, total monthly revenue is ₹${currentProp.monthlyRevenue.toLocaleString('en-IN')}, and overall property health score is 92/100.`;
        } else { // TENANT MODE
          const tenant = tenants.find(t => t.id === currentTenantId) || tenants[0];
          const tenantInv = invoices.find(i => i.tenantId === tenant.id && i.status === 'PENDING');
          if (q.includes('due') || q.includes('rent') || q.includes('pay')) {
            if (tenantInv) {
              return `Hi ${tenant.fullName}, your monthly rent of ₹${tenantInv.totalPayable.toLocaleString('en-IN')} for ${tenantInv.billingPeriod} is due on ${tenantInv.dueDate}. Payment status: ${tenantInv.status}.`;
            }
            return `Hi ${tenant.fullName}, your rent for August 2026 was paid on 04 Aug via UPI. Next cycle invoice generates on 1st October.`;
          }
          if (q.includes('menu') || q.includes('food') || q.includes('mess')) {
            const todayMenu = messMenus.find(m => m.day === 'Monday') || messMenus[0];
            return `Today's Mess Menu (${todayMenu.day}): Breakfast: ${todayMenu.breakfast} | Lunch: ${todayMenu.lunch} | Dinner: ${todayMenu.dinner}`;
          }
          if (q.includes('complaint') || q.includes('leak') || q.includes('wifi')) {
            return `To raise a complaint, click on "Raise Complaint" on your dashboard. Our auto-dispatcher assigns it directly to our building electrician/plumber.`;
          }
          if (q.includes('emergency') || q.includes('contact') || q.includes('helpline')) {
            return `Emergency Contacts: Owner Helpline: ${currentProp.helplineNumber} | Emergency Desk: ${currentProp.emergencyContact} | Warden Surendra: +91 98281 77889`;
          }
          return `Hello ${tenant.fullName}! You are assigned to Room ${tenant.roomNumber} (${tenant.bedNumber}). Monthly rent: ₹${tenant.rentAmount.toLocaleString('en-IN')}. How can I assist you today?`;
        }
      },

      resetDemoData: () => set({
        properties: mockProperties,
        buildings: mockBuildings,
        rooms: mockRooms,
        beds: mockBeds,
        tenants: mockTenants,
        invoices: mockInvoices,
        complaints: mockComplaints,
        notices: mockNotices,
        visitorPasses: mockVisitorPasses,
        leaveRequests: mockLeaveRequests,
        messMenus: mockMessMenus,
        staff: mockStaff,
        assets: mockAssets,
        activityLogs: mockActivityLogs,
        subscription: mockSubscription
      })
    }),
    {
      name: 'stayhub-storage-v1',
    }
  )
);
