export type UserRole = 'SUPER_ADMIN' | 'OWNER' | 'MANAGER' | 'WARDEN' | 'STAFF' | 'TENANT';

export type PropertyType = 'PG' | 'Hostel' | 'Co-living' | 'Student Residence' | 'Working Professional Residence';
export type GenderType = 'Male' | 'Female' | 'Unisex';
export type BedStatus = 'OCCUPIED' | 'AVAILABLE' | 'RESERVED' | 'MAINTENANCE';
export type RoomStatus = 'AVAILABLE' | 'FULL' | 'PARTIALLY_OCCUPIED' | 'RESERVED' | 'MAINTENANCE' | 'BLOCKED';
export type TenantStatus = 'ACTIVE' | 'PENDING_VERIFICATION' | 'NOTICE_PERIOD' | 'CHECKED_OUT' | 'BLOCKED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIALLY_PAID' | 'OVERDUE' | 'REFUNDED';
export type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type ComplaintStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type VisitorStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  propertyId?: string;
  tenantId?: string;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  genderAllowed: GenderType;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalBuildings: number;
  totalFloors: number;
  totalRooms: number;
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  reservedSeats: number;
  monthlyRevenue: number;
  foodAvailable: boolean;
  wifiAvailable: boolean;
  laundryAvailable: boolean;
  parkingAvailable: boolean;
  securityAvailable: boolean;
  cctvAvailable: boolean;
  powerBackup: boolean;
  helplineNumber: string;
  emergencyContact: string;
  image: string;
  description: string;
}

export interface Building {
  id: string;
  propertyId: string;
  name: string;
  code: string;
  totalFloors: number;
  totalRooms: number;
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  managerName: string;
  contact: string;
}

export interface Floor {
  id: string;
  buildingId: string;
  floorNumber: number;
  name: string;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
}

export interface Room {
  id: string;
  floorId: string;
  buildingId: string;
  propertyId: string;
  roomNumber: string;
  capacity: number;
  currentOccupancy: number;
  monthlyRent: number;
  securityDeposit: number;
  acType: 'AC' | 'NON_AC';
  attachedBathroom: boolean;
  balcony: boolean;
  foodIncluded: boolean;
  status: RoomStatus;
}

export interface Bed {
  id: string;
  roomId: string;
  propertyId: string;
  bedNumber: string; // e.g. "Bed A", "Bed B"
  status: BedStatus;
  currentTenantId?: string;
  currentTenantName?: string;
  reservedFor?: string;
  availableDate?: string;
}

export interface TenantDocument {
  id: string;
  type: 'Aadhaar' | 'Driving License' | 'Passport' | 'College ID' | 'Company ID' | 'Police Verification' | 'Rental Agreement';
  fileName: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'VERIFIED' | 'PENDING' | 'EXPIRED';
  url: string;
}

export interface Tenant {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'Male' | 'Female';
  fatherMotherName: string;
  emergencyContact: string;
  aadhaarNumber: string;
  permanentAddress: string;
  collegeCompany: string;
  occupation: 'Student' | 'Working Professional' | 'Other';
  joiningDate: string;
  expectedLeavingDate?: string;
  propertyId: string;
  propertyName: string;
  buildingId: string;
  roomId: string;
  roomNumber: string;
  bedId: string;
  bedNumber: string;
  rentAmount: number;
  securityDeposit: number;
  status: TenantStatus;
  paymentHealthScore: 'EXCELLENT' | 'GOOD' | 'AT_RISK' | 'OVERDUE';
  tenantExperienceScore: number; // e.g., 4.8 / 5
  documents: TenantDocument[];
  agreementAccepted: boolean;
  agreementAcceptedDate?: string;
  photo: string;
}

export interface RentInvoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  bedNumber: string;
  billingPeriod: string;
  rentAmount: number;
  electricityCharge: number;
  messCharge: number;
  lateFee: number;
  discount: number;
  totalPayable: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash';
  transactionId?: string;
}

export interface ComplaintMessage {
  id: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  roomNumber: string;
  category: 'Electricity' | 'Plumbing' | 'Cleaning' | 'WiFi' | 'Furniture' | 'AC' | 'Water' | 'Food' | 'Security' | 'Other';
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
  resolvedAt?: string;
  feedbackRating?: number; // 1 to 5
  messages: ComplaintMessage[];
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  targetAudience: 'ALL' | 'PROPERTY' | 'TENANT';
  propertyId?: string;
  priority: 'NORMAL' | 'HIGH' | 'EMERGENCY';
  createdAt: string;
  authorName: string;
}

export interface VisitorPass {
  id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  visitorName: string;
  visitorPhone: string;
  relationship: string;
  visitDate: string;
  visitTime: string;
  status: VisitorStatus;
  passCode: string;
}

export interface LeaveRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  leavingDate: string;
  returnDate: string;
  reason: string;
  emergencyContact: string;
  status: LeaveStatus;
}

export interface MessMenu {
  id: string;
  propertyId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export interface Staff {
  id: string;
  fullName: string;
  phone: string;
  role: 'Plumber' | 'Electrician' | 'Housekeeping' | 'Security' | 'Warden' | 'Cook' | 'Manager';
  assignedPropertyId: string;
  salary: number;
  joiningDate: string;
  status: 'ACTIVE' | 'ON_LEAVE';
  assignedTasksCount: number;
}

export interface Asset {
  id: string;
  propertyId: string;
  name: string;
  category: string;
  quantity: number;
  condition: 'EXCELLENT' | 'GOOD' | 'REPAIR_NEEDED' | 'REPLACED';
  location: string;
  purchaseDate: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
}

export interface Subscription {
  plan: 'FREE' | 'BASIC' | 'PRO' | 'BUSINESS';
  maxBeds: number;
  monthlyPrice: number;
  renewalDate: string;
  activeStatus: boolean;
}
