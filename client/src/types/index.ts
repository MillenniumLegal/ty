// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Agent';
  createdAt: string;
  updatedAt: string;
}

// Lead Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Hoowla' | 'Comparison Site' | 'Direct' | 'Referral';
  quoteId?: string;
  assignedTo?: string;
  status: 'New' | 'Assigned' | 'Contacted' | 'Interested' | 'Quote Sent' | 'Sold' | 'Closed' | 'Archived';
  stage: 'New' | 'Call-1' | 'Call-2' | 'Call-3' | 'Call-4' | 'Call-5' | 'Interested' | 'Ready to Instruct' | 'Awaiting Payment' | 'Awaiting Client Info' | 'Completed';
  outcomeCode?: string;
  createdAt: string;
  updatedAt: string;
  lastActionAt?: string;
  notes?: string;
  contactAttempts: number;
  maxAttempts: number;
  priority: 'High' | 'Medium' | 'Low';
}

// Quote Types
export interface Quote {
  id: string;
  leadId: string;
  amount: number;
  details: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  createdAt: string;
  lastEditedAt: string;
  version: number;
}

// Attempt Types
export interface Attempt {
  id: string;
  leadId: string;
  attemptType: 'call' | 'sms' | 'email';
  status: 'scheduled' | 'completed' | 'failed' | 'no_answer';
  timestamp: string;
  notes?: string;
  userId: string;
  outcomeCode?: string;
}

// Invoice Types
export interface Invoice {
  id: string;
  leadId: string;
  stripePaymentId?: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issuedAt: string;
  paidAt?: string;
  dueDate: string;
}

// Log Types
export interface Log {
  id: string;
  userId: string;
  action: string;
  targetType: 'lead' | 'quote' | 'attempt' | 'invoice' | 'user';
  targetId: string;
  timestamp: string;
  details?: string;
}

// Outcome Code Types
export interface OutcomeCode {
  id: string;
  code: string;
  name: string;
  description: string;
  nextAction: 'sms' | 'email' | 'call' | 'schedule' | 'archive';
  autoSchedule?: boolean;
  scheduleDelay?: number; // hours
  isActive: boolean;
}

// Dashboard Stats
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  activeLeads: number;
  closedLeads: number;
  conversionRate: number;
  totalSales: number;
  assignedLeads: number;
  unassignedLeads: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser extends User {
  token: string;
}

// Filter Types
export interface LeadFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  source?: string;
  assignedTo?: string;
  status?: string;
  outcomeCode?: string;
}

// Assignme