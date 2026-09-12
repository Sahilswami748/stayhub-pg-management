import type { Property, Building, Room, Bed, Tenant, RentInvoice, Complaint, Notice, VisitorPass, LeaveRequest, MessMenu, Staff, Asset, ActivityLog, Subscription } from '../types';

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'UrbanNest Jaipur',
    type: 'Co-living',
    genderAllowed: 'Unisex',
    address: 'Plot 42, Malviya Nagar Sector 3',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302017',
    totalBuildings: 2,
    totalFloors: 5,
    totalRooms: 40,
    totalSeats: 120,
    occupiedSeats: 112,
    availableSeats: 3,
    reservedSeats: 5,
    monthlyRevenue: 1064000,
    foodAvailable: true,
    wifiAvailable: true,
    laundryAvailable: true,
    parkingAvailable: true,
    securityAvailable: true,
    cctvAvailable: true,
    powerBackup: true,
    helplineNumber: '+91 98290 12345',
    emergencyContact: '+91 98290 99999',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-modern co-living residence with high-speed WiFi, 4-time meals, AC rooms, rooftop lounge & 24/7 security.'
  },
  {
    id: 'prop-2',
    name: 'Kota Student Residency',
    type: 'Student Residence',
    genderAllowed: 'Male',
    address: 'Road No. 1, Landmark City, Kunhari',
    city: 'Kota',
    state: 'Rajasthan',
    pincode: '324008',
    totalBuildings: 1,
    totalFloors: 4,
    totalRooms: 30,
    totalSeats: 80,
    occupiedSeats: 75,
    availableSeats: 2,
    reservedSeats: 3,
    monthlyRevenue: 637500,
    foodAvailable: true,
    wifiAvailable: true,
    laundryAvailable: true,
    parkingAvailable: false,
    securityAvailable: true,
    cctvAvailable: true,
    powerBackup: true,
    helplineNumber: '+91 94140 54321',
    emergencyContact: '+91 94140 88888',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    description: 'Quiet, study-friendly environment for JEE/NEET aspirants with nutritional diet, biometric gate and study library.'
  },
  {
    id: 'prop-3',
    name: 'Bangalore Tech Stays',
    type: 'Working Professional Residence',
    genderAllowed: 'Unisex',
    address: '14th Main, HSR Layout Sector 4',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560102',
    totalBuildings: 2,
    totalFloors: 6,
    totalRooms: 50,
    totalSeats: 150,
    occupiedSeats: 142,
    availableSeats: 3,
    reservedSeats: 5,
    monthlyRevenue: 1704000,
    foodAvailable: true,
    wifiAvailable: true,
    laundryAvailable: true,
    parkingAvailable: true,
    securityAvailable: true,
    cctvAvailable: true,
    powerBackup: true,
    helplineNumber: '+91 98800 67890',
    emergencyContact: '+91 98800 11111',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    description: 'Premium techie PG near tech parks, work desks in rooms, high speed fiber optic WiFi and gym facility.'
  }
];

export const mockBuildings: Building[] = [
  {
    id: 'bld-1',
    propertyId: 'prop-1',
    name: 'Block A (Main Wing)',
    code: 'BLD-A',
    totalFloors: 3,
    totalRooms: 24,
    totalSeats: 72,
    occupiedSeats: 68,
    availableSeats: 2,
    managerName: 'Rajesh Kumar',
    contact: '+91 98290 11111'
  },
  {
    id: 'bld-2',
    propertyId: 'prop-1',
    name: 'Block B (Annex)',
    code: 'BLD-B',
    totalFloors: 2,
    totalRooms: 16,
    totalSeats: 48,
    occupiedSeats: 44,
    availableSeats: 1,
    managerName: 'Suresh Meena',
    contact: '+91 98290 22222'
  }
];

export const mockRooms: Room[] = [
  {
    id: 'room-101',
    floorId: 'flr-1',
    buildingId: 'bld-1',
    propertyId: 'prop-1',
    roomNumber: '101',
    capacity: 3,
    currentOccupancy: 2,
    monthlyRent: 9500,
    securityDeposit: 10000,
    acType: 'AC',
    attachedBathroom: true,
    balcony: true,
    foodIncluded: true,
    status: 'PARTIALLY_OCCUPIED'
  },
  {
    id: 'room-102',
    floorId: 'flr-1',
    buildingId: 'bld-1',
    propertyId: 'prop-1',
    roomNumber: '102',
    capacity: 2,
    currentOccupancy: 2,
    monthlyRent: 11000,
    securityDeposit: 12000,
    acType: 'AC',
    attachedBathroom: true,
    balcony: false,
    foodIncluded: true,
    status: 'FULL'
  },
  {
    id: 'room-201',
    floorId: 'flr-2',
    buildingId: 'bld-1',
    propertyId: 'prop-1',
    roomNumber: '201',
    capacity: 3,
    currentOccupancy: 3,
    monthlyRent: 9000,
    securityDeposit: 10000,
    acType: 'NON_AC',
    attachedBathroom: true,
    balcony: true,
    foodIncluded: true,
    status: 'FULL'
  },
  {
    id: 'room-204',
    floorId: 'flr-2',
    buildingId: 'bld-1',
    propertyId: 'prop-1',
    roomNumber: '204',
    capacity: 2,
    currentOccupancy: 1,
    monthlyRent: 9500,
    securityDeposit: 10000,
    acType: 'AC',
    attachedBathroom: true,
    balcony: true,
    foodIncluded: true,
    status: 'PARTIALLY_OCCUPIED'
  },
  {
    id: 'room-301',
    floorId: 'flr-3',
    buildingId: 'bld-1',
    propertyId: 'prop-1',
    roomNumber: '301',
    capacity: 2,
    currentOccupancy: 0,
    monthlyRent: 9500,
    securityDeposit: 10000,
    acType: 'AC',
    attachedBathroom: true,
    balcony: false,
    foodIncluded: true,
    status: 'AVAILABLE'
  }
];

export const mockBeds: Bed[] = [
  {
    id: 'bed-101-a',
    roomId: 'room-101',
    propertyId: 'prop-1',
    bedNumber: 'Bed A',
    status: 'OCCUPIED',
    currentTenantId: 'ten-1',
    currentTenantName: 'Rahul Sharma'
  },
  {
    id: 'bed-101-b',
    roomId: 'room-101',
    propertyId: 'prop-1',
    bedNumber: 'Bed B',
    status: 'OCCUPIED',
    currentTenantId: 'ten-2',
    currentTenantName: 'Aman Verma'
  },
  {
    id: 'bed-101-c',
    roomId: 'room-101',
    propertyId: 'prop-1',
    bedNumber: 'Bed C',
    status: 'AVAILABLE'
  },
  {
    id: 'bed-102-a',
    roomId: 'room-102',
    propertyId: 'prop-1',
    bedNumber: 'Bed A',
    status: 'OCCUPIED',
    currentTenantId: 'ten-3',
    currentTenantName: 'Priya Patel'
  },
  {
    id: 'bed-102-b',
    roomId: 'room-102',
    propertyId: 'prop-1',
    bedNumber: 'Bed B',
    status: 'OCCUPIED',
    currentTenantId: 'ten-4',
    currentTenantName: 'Ananya Sen'
  },
  {
    id: 'bed-204-a',
    roomId: 'room-204',
    propertyId: 'prop-1',
    bedNumber: 'Bed A',
    status: 'OCCUPIED',
    currentTenantId: 'ten-5',
    currentTenantName: 'Rohan Gupta'
  },
  {
    id: 'bed-204-b',
    roomId: 'room-204',
    propertyId: 'prop-1',
    bedNumber: 'Bed B',
    status: 'AVAILABLE'
  }
];

export const mockTenants: Tenant[] = [
  {
    id: 'ten-1',
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    dob: '2001-05-14',
    gender: 'Male',
    fatherMotherName: 'Ramesh Sharma',
    emergencyContact: '+91 98765 00000',
    aadhaarNumber: '4521 8890 1234',
    permanentAddress: '12, M.G. Road, Udaipur, Rajasthan',
    collegeCompany: 'MNIT Jaipur',
    occupation: 'Student',
    joiningDate: '2025-08-01',
    expectedLeavingDate: '2026-07-31',
    propertyId: 'prop-1',
    propertyName: 'UrbanNest Jaipur',
    buildingId: 'bld-1',
    roomId: 'room-101',
    roomNumber: '101',
    bedId: 'bed-101-a',
    bedNumber: 'Bed A',
    rentAmount: 9500,
    securityDeposit: 10000,
    status: 'ACTIVE',
    paymentHealthScore: 'EXCELLENT',
    tenantExperienceScore: 4.8,
    agreementAccepted: true,
    agreementAcceptedDate: '2025-08-01',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    documents: [
      { id: 'doc-1', type: 'Aadhaar', fileName: 'Aadhaar_Card_Rahul.pdf', uploadDate: '2025-08-01', status: 'VERIFIED', url: '#' },
      { id: 'doc-2', type: 'College ID', fileName: 'MNIT_ID_Rahul.jpg', uploadDate: '2025-08-01', status: 'VERIFIED', url: '#' },
      { id: 'doc-3', type: 'Rental Agreement', fileName: 'Signed_Agreement_101A.pdf', uploadDate: '2025-08-01', status: 'VERIFIED', url: '#' }
    ]
  },
  {
    id: 'ten-2',
    fullName: 'Aman Verma',
    phone: '+91 97854 12399',
    email: 'aman.verma@example.com',
    dob: '1999-11-20',
    gender: 'Male',
    fatherMotherName: 'Sanjay Verma',
    emergencyContact: '+91 97854 00000',
    aadhaarNumber: '7812 3456 9012',
    permanentAddress: 'C-45, Shastri Nagar, Jodhpur, Rajasthan',
    collegeCompany: 'Infosys Jaipur',
    occupation: 'Working Professional',
    joiningDate: '2025-09-15',
    propertyId: 'prop-1',
    propertyName: 'UrbanNest Jaipur',
    buildingId: 'bld-1',
    roomId: 'room-101',
    roomNumber: '101',
    bedId: 'bed-101-b',
    bedNumber: 'Bed B',
    rentAmount: 9500,
    securityDeposit: 10000,
    status: 'ACTIVE',
    paymentHealthScore: 'GOOD',
    tenantExperienceScore: 4.5,
    agreementAccepted: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    documents: [
      { id: 'doc-4', type: 'Aadhaar', fileName: 'Aadhaar_Aman.pdf', uploadDate: '2025-09-15', status: 'VERIFIED', url: '#' }
    ]
  },
  {
    id: 'ten-3',
    fullName: 'Priya Patel',
    phone: '+91 94141 88877',
    email: 'priya.patel@example.com',
    dob: '2002-03-10',
    gender: 'Female',
    fatherMotherName: 'Bharat Patel',
    emergencyContact: '+91 94141 00000',
    aadhaarNumber: '3344 5566 7788',
    permanentAddress: 'Navrangpura, Ahmedabad, Gujarat',
    collegeCompany: 'Jaipur National University',
    occupation: 'Student',
    joiningDate: '2025-07-10',
    propertyId: 'prop-1',
    propertyName: 'UrbanNest Jaipur',
    buildingId: 'bld-1',
    roomId: 'room-102',
    roomNumber: '102',
    bedId: 'bed-102-a',
    bedNumber: 'Bed A',
    rentAmount: 11000,
    securityDeposit: 12000,
    status: 'ACTIVE',
    paymentHealthScore: 'AT_RISK',
    tenantExperienceScore: 4.2,
    agreementAccepted: true,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    documents: [
      { id: 'doc-5', type: 'Aadhaar', fileName: 'Aadhaar_Priya.pdf', uploadDate: '2025-07-10', status: 'VERIFIED', url: '#' }
    ]
  }
];

export const mockInvoices: RentInvoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-0901',
    tenantId: 'ten-1',
    tenantName: 'Rahul Sharma',
    propertyId: 'prop-1',
    propertyName: 'UrbanNest Jaipur',
    roomNumber: '101',
    bedNumber: 'Bed A',
    billingPeriod: 'September 2026',
    rentAmount: 9500,
    electricityCharge: 450,
    messCharge: 0,
    lateFee: 0,
    discount: 0,
    totalPayable: 9950,
    status: 'PENDING',
    dueDate: '2026-09-05'
  },
  {
    id: 'inv-100',
    invoiceNumber: 'INV-2026-0801',
    tenantId: 'ten-1',
    tenantName: 'Rahul Sharma',
    propertyId: 'prop-1',
    propertyName: 'UrbanNest Jaipur',
    roomNumber: '101',
    bedNumber: 'Bed A',
    billingPeriod: 'August 2026',
    rentAmount: 9500,
    electricityCharge: 380,
    messCharge: 0,
    lateFee: 0,
    discount: 0,
    totalPayable: 9880,
    status: 'PAID',
    dueDate: '2026-08-05',
    paidDate: '2026-08-04',
    paymentMethod: 'UPI',
    transactionId: 'PAY-UPI-8891024'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-0902',
    tenantId: 'ten-3',
    tenantName: 'Priya Patel',
    propertyId: 'prop-1',
    propertyName: 'UrbanNest Jaipur',
    roomNumber: '102',
    bedNumber: 'Bed A',
    billingPeriod: 'September 2026',
    rentAmount: 11000,
    electricityCharge: 600,
    messCharge: 0,
    lateFee: 200,
    discount: 0,
    totalPayable: 11800,
    status: 'OVERDUE',
    dueDate: '2026-09-05'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: 'cmp-1',
    ticketNumber: 'CMP-10291',
    tenantId: 'ten-1',
    tenantName: 'Rahul Sharma',
    propertyId: 'prop-1',
    roomNumber: '101',
    category: 'Plumbing',
    description: 'Bathroom washbasin tap is leaking slowly and causing water wastage.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignedStaffId: 'stf-1',
    assignedStaffName: 'Ramesh (Plumber)',
    createdAt: '2026-09-11 09:30 AM',
    messages: [
      { id: 'm1', senderName: 'Rahul Sharma', senderRole: 'Tenant', text: 'Bathroom washbasin tap is leaking.', timestamp: '09:30 AM' },
      { id: 'm2', senderName: 'Rajesh (Manager)', senderRole: 'Manager', text: 'Assigned to plumber Ramesh. He will visit by 4 PM.', timestamp: '10:15 AM' }
    ]
  },
  {
    id: 'cmp-2',
    ticketNumber: 'CMP-10284',
    tenantId: 'ten-2',
    tenantName: 'Aman Verma',
    propertyId: 'prop-1',
    roomNumber: '101',
    category: 'WiFi',
    description: 'WiFi signal strength is weak inside Room 101 after 8 PM.',
    priority: 'HIGH',
    status: 'RESOLVED',
    assignedStaffId: 'stf-2',
    assignedStaffName: 'Sunil (IT Support)',
    createdAt: '2026-09-08 08:00 PM',
    resolvedAt: '2026-09-09 11:00 AM',
    feedbackRating: 5,
    messages: [
      { id: 'm3', senderName: 'Aman Verma', senderRole: 'Tenant', text: 'WiFi disconnects frequently in evening.', timestamp: '08:00 PM' },
      { id: 'm4', senderName: 'Sunil (IT)', senderRole: 'Staff', text: 'Rebooted router access point on Floor 1. Please check now.', timestamp: '11:00 AM' }
    ]
  }
];

export const mockNotices: Notice[] = [
  {
    id: 'not-1',
    title: '⚠️ Water Tank Maintenance & Cleaning Notice',
    content: 'Overhead water tank cleaning is scheduled for Sunday, 14 Sept from 2:00 PM to 5:00 PM. Water supply will be paused during this period.',
    targetAudience: 'ALL',
    propertyId: 'prop-1',
    priority: 'HIGH',
    createdAt: '2026-09-10',
    authorName: 'Management Office'
  },
  {
    id: 'not-2',
    title: '🔔 Monthly Rent Due Reminder for September',
    content: 'All residents are requested to clear their monthly rent by the 5th of September to avoid late fee charges.',
    targetAudience: 'ALL',
    propertyId: 'prop-1',
    priority: 'NORMAL',
    createdAt: '2026-09-01',
    authorName: 'Accounts Office'
  }
];

export const mockVisitorPasses: VisitorPass[] = [
  {
    id: 'vis-1',
    tenantId: 'ten-1',
    tenantName: 'Rahul Sharma',
    roomNumber: '101',
    visitorName: 'Vikas Sharma',
    visitorPhone: '+91 98290 88776',
    relationship: 'Brother',
    visitDate: '2026-09-13',
    visitTime: '04:00 PM',
    status: 'APPROVED',
    passCode: 'PASS-90812'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'lev-1',
    tenantId: 'ten-1',
    tenantName: 'Rahul Sharma',
    roomNumber: '101',
    leavingDate: '2026-09-20',
    returnDate: '2026-09-25',
    reason: 'Family function at hometown Udaipur',
    emergencyContact: '+91 98765 00000',
    status: 'APPROVED'
  }
];

export const mockMessMenus: MessMenu[] = [
  { id: 'm-mon', propertyId: 'prop-1', day: 'Monday', breakfast: 'Aloo Paratha, Curd, Tea', lunch: 'Rajma Chawal, Roti, Salad', snacks: 'Samosa, Tea', dinner: 'Paneer Butter Masala, Roti, Rice, Kheer' },
  { id: 'm-tue', propertyId: 'prop-1', day: 'Tuesday', breakfast: 'Poha, Jalebi, Coffee', lunch: 'Kadi Pakoda, Rice, Roti', snacks: 'Veg Sandwich, Tea', dinner: 'Mix Veg, Dal Tadka, Roti, Rice' },
  { id: 'm-wed', propertyId: 'prop-1', day: 'Wednesday', breakfast: 'Idli Sambar, Chutney', lunch: 'Chole Bhature, Boondi Raita', snacks: 'Biscuit, Tea', dinner: 'Dal Makhani, Jeera Rice, Butter Roti, Gulab Jamun' },
  { id: 'm-thu', propertyId: 'prop-1', day: 'Thursday', breakfast: 'Puri Bhaji, Tea', lunch: 'Aloo Gobhi, Dal Fry, Rice, Roti', snacks: 'Pakoda, Tea', dinner: 'Shahi Paneer, Roti, Rice, Custard' },
  { id: 'm-fri', propertyId: 'prop-1', day: 'Friday', breakfast: 'Bread Butter / Omelette', lunch: 'Veg Biryani, Mirchi Salan', snacks: 'Dry Bhel, Tea', dinner: 'Kofta Curry, Roti, Rice, Halwa' },
  { id: 'm-sat', propertyId: 'prop-1', day: 'Saturday', breakfast: 'Uttapam, Coconut Chutney', lunch: 'Bhindi Masala, Dal, Rice, Roti', snacks: 'Mathri, Tea', dinner: 'Sev Tamatar, Roti, Pulav, Ice Cream' },
  { id: 'm-sun', propertyId: 'prop-1', day: 'Sunday', breakfast: 'Chole Puri, Tea', lunch: 'Special Veg Thali / Chicken Curry', snacks: 'Pastry, Coffee', dinner: 'Dal Baati Churma (Rajasthani Special)' }
];

export const mockStaff: Staff[] = [
  { id: 'stf-1', fullName: 'Ramesh Kumar', phone: '+91 98281 11223', role: 'Plumber', assignedPropertyId: 'prop-1', salary: 18000, joiningDate: '2024-01-10', status: 'ACTIVE', assignedTasksCount: 2 },
  { id: 'stf-2', fullName: 'Sunil Sharma', phone: '+91 98281 33445', role: 'Electrician', assignedPropertyId: 'prop-1', salary: 20000, joiningDate: '2024-03-01', status: 'ACTIVE', assignedTasksCount: 1 },
  { id: 'stf-3', fullName: 'Manju Devi', phone: '+91 98281 55667', role: 'Housekeeping', assignedPropertyId: 'prop-1', salary: 14000, joiningDate: '2023-11-15', status: 'ACTIVE', assignedTasksCount: 4 },
  { id: 'stf-4', fullName: 'Surendra Singh', phone: '+91 98281 77889', role: 'Warden', assignedPropertyId: 'prop-1', salary: 25000, joiningDate: '2023-06-01', status: 'ACTIVE', assignedTasksCount: 0 }
];

export const mockAssets: Asset[] = [
  { id: 'ast-1', propertyId: 'prop-1', name: 'Daikin 1.5 Ton Inverter AC', category: 'Electrical', quantity: 24, condition: 'EXCELLENT', location: 'Rooms 101-112', purchaseDate: '2024-04-10' },
  { id: 'ast-2', propertyId: 'prop-1', name: 'Kent Commercial RO Water Purifier', category: 'Water', quantity: 3, condition: 'GOOD', location: 'Dining Hall & Floors 1, 2', purchaseDate: '2024-02-15' },
  { id: 'ast-3', propertyId: 'prop-1', name: 'Kirloskar 25 kVA Diesel Generator', category: 'Power Backup', quantity: 1, condition: 'EXCELLENT', location: 'Ground Floor Plant Room', purchaseDate: '2023-10-01' }
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 'log-1', timestamp: '10:42 AM', actorName: 'Rahul Sharma', actorRole: 'Tenant', action: 'Paid Rent', details: 'Paid ₹9,880 for August 2026 via UPI' },
  { id: 'log-2', timestamp: '09:30 AM', actorName: 'Rahul Sharma', actorRole: 'Tenant', action: 'Raised Complaint', details: 'Ticket CMP-10291 (Plumbing)' },
  { id: 'log-3', timestamp: 'Yesterday', actorName: 'Rajesh Manager', actorRole: 'Manager', action: 'Room Reserved', details: 'Bed 204-B reserved for new joining' }
];

export const mockSubscription: Subscription = {
  plan: 'PRO',
  maxBeds: 500,
  monthlyPrice: 4999,
  renewalDate: '2026-12-31',
  activeStatus: true
};
