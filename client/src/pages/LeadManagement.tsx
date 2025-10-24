import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { LeadSidebar } from '@/components/Layout/LeadSidebar';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Archive,
  Calendar,
  Target,
  TrendingUp,
  X,
  FileText,
  CreditCard,
  History,
  Send,
  Save,
  ArrowLeft,
  User
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Hoowla' | 'Comparison Site' | 'Direct' | 'Referral';
  quoteId?: string;
  quoteAmount?: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Assigned' | 'Contacted' | 'Interested' | 'Quote Sent' | 'Sold' | 'Closed' | 'Archived';
  stage: 'New' | 'Call-1' | 'Call-2' | 'Call-3' | 'Call-4' | 'Call-5' | 'Interested' | 'Ready to Instruct' | 'Awaiting Payment' | 'Awaiting Client Info' | 'Completed';
  assignedTo?: string;
  createdAt: string;
  lastActionAt?: string;
  notes?: string;
  contactAttempts: number;
  maxAttempts: number;
  ageInHours: number;
  isOverdue: boolean;
}

export const LeadManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');
  const [filterAge, setFilterAge] = useState('All');
  const [viewMode, setViewMode] = useState<'inbox'>('inbox');
  const [selectedStage, setSelectedStage] = useState('all');
  const [showLeadSidebar, setShowLeadSidebar] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [selectedOutcomeCode, setSelectedOutcomeCode] = useState('');
  const [showCommunicationPanel, setShowCommunicationPanel] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [showBulkExportModal, setShowBulkExportModal] = useState(false);
  const [showBulkArchiveModal, setShowBulkArchiveModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Direct' as const,
    priority: 'Medium' as const,
    notes: ''
  });
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: '',
    source: '',
    priority: '',
    status: '',
    assignedTo: '',
    ageRange: ''
  });

  // Handle URL parameters for filtering
  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'assigned') {
      setFilterStatus('Assigned');
    } else if (filter === 'unassigned') {
      setFilterStatus('New');
    }
  }, [searchParams]);

  // Mock data - replace with actual API calls
  const leads: Lead[] = [
    {
      id: 'L-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+44 1704 773288',
      source: 'Hoowla',
      quoteId: 'Q-001',
      quoteAmount: 1200,
      priority: 'High',
      status: 'New',
      stage: 'New',
      createdAt: '2024-01-15T08:00:00Z',
      contactAttempts: 0,
      maxAttempts: 5,
      ageInHours: 6,
      isOverdue: false
    },
    {
      id: 'L-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+44 1704 773289',
      source: 'Comparison Site',
      quoteId: 'Q-002',
      quoteAmount: 1500,
      priority: 'High',
      status: 'New',
      stage: 'Call-1',
      createdAt: '2024-01-14T14:30:00Z',
      contactAttempts: 1,
      maxAttempts: 5,
      ageInHours: 19.5,
      isOverdue: true
    },
    {
      id: 'L-003',
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+44 1704 773290',
      source: 'Direct',
      quoteId: 'Q-003',
      quoteAmount: 1800,
      priority: 'Medium',
      status: 'Assigned',
      stage: 'Call-3',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-14T10:15:00Z',
      lastActionAt: '2024-01-14T11:00:00Z',
      contactAttempts: 1,
      maxAttempts: 5,
      ageInHours: 22.75,
      isOverdue: false
    },
    {
      id: 'L-004',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      phone: '+44 1704 773291',
      source: 'Hoowla',
      quoteId: 'Q-004',
      quoteAmount: 2000,
      priority: 'Low',
      status: 'Contacted',
      assignedTo: 'Agent 2',
      stage: 'Call-2',
      createdAt: '2024-01-13T16:45:00Z',
      lastActionAt: '2024-01-14T09:00:00Z',
      contactAttempts: 2,
      maxAttempts: 5,
      ageInHours: 40.25,
      isOverdue: false
    },
    {
      id: 'L-004',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      phone: '+44 1704 773291',
      source: 'Hoowla',
      quoteId: 'Q-004',
      quoteAmount: 2000,
      priority: 'High',
      status: 'Interested',
      stage: 'Interested',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-13T09:00:00Z',
      lastActionAt: '2024-01-14T15:30:00Z',
      contactAttempts: 2,
      maxAttempts: 5,
      ageInHours: 47,
      isOverdue: false,
      notes: 'Call back scheduled for tomorrow'
    },
    {
      id: 'L-005',
      name: 'David Brown',
      email: 'david.b@email.com',
      phone: '+44 1704 773292',
      source: 'Direct',
      quoteId: 'Q-005',
      quoteAmount: 1600,
      priority: 'Medium',
      status: 'Quote Sent',
      stage: 'Ready to Instruct',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-12T11:00:00Z',
      lastActionAt: '2024-01-14T16:00:00Z',
      contactAttempts: 3,
      maxAttempts: 5,
      ageInHours: 65,
      isOverdue: false,
      notes: 'Ready to proceed with instruction'
    },
    {
      id: 'L-006',
      name: 'Lisa Taylor',
      email: 'lisa.t@email.com',
      phone: '+44 1704 773293',
      source: 'Comparison Site',
      quoteId: 'Q-006',
      quoteAmount: 1400,
      priority: 'Low',
      status: 'Sold',
      stage: 'Awaiting Payment',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-11T14:00:00Z',
      lastActionAt: '2024-01-14T17:00:00Z',
      contactAttempts: 4,
      maxAttempts: 5,
      ageInHours: 75,
      isOverdue: false,
      notes: 'Payment pending'
    },
    // New Leads - Not contacted
    {
      id: 'L-007',
      name: 'Robert Anderson',
      email: 'robert.a@email.com',
      phone: '+44 1704 773294',
      source: 'Hoowla',
      quoteId: 'Q-007',
      quoteAmount: 1350,
      priority: 'High',
      status: 'New',
      stage: 'New',
      createdAt: '2024-01-15T10:30:00Z',
      contactAttempts: 0,
      maxAttempts: 5,
      ageInHours: 3.5,
      isOverdue: false,
      notes: 'Urgent - needs immediate contact'
    },
    {
      id: 'L-008',
      name: 'Jennifer White',
      email: 'jennifer.w@email.com',
      phone: '+44 1704 773295',
      source: 'Direct',
      quoteId: 'Q-008',
      quoteAmount: 2200,
      priority: 'Medium',
      status: 'New',
      stage: 'New',
      createdAt: '2024-01-15T09:15:00Z',
      contactAttempts: 0,
      maxAttempts: 5,
      ageInHours: 4.75,
      isOverdue: false,
      notes: 'Referred by existing client'
    },
    {
      id: 'L-009',
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '+44 1704 773296',
      source: 'Comparison Site',
      quoteId: 'Q-009',
      quoteAmount: 1800,
      priority: 'High',
      status: 'New',
      stage: 'New',
      createdAt: '2024-01-15T08:45:00Z',
      contactAttempts: 0,
      maxAttempts: 5,
      ageInHours: 5.25,
      isOverdue: false,
      notes: 'High value property'
    },
    // Call-1 Stage
    {
      id: 'L-010',
      name: 'Sarah Davis',
      email: 'sarah.d@email.com',
      phone: '+44 1704 773297',
      source: 'Hoowla',
      quoteId: 'Q-010',
      quoteAmount: 1600,
      priority: 'Medium',
      status: 'Contacted',
      stage: 'Call-1',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-14T16:20:00Z',
      lastActionAt: '2024-01-15T09:00:00Z',
      contactAttempts: 1,
      maxAttempts: 5,
      ageInHours: 20.5,
      isOverdue: false,
      notes: 'No answer on first call'
    },
    {
      id: 'L-011',
      name: 'David Wilson',
      email: 'david.w@email.com',
      phone: '+44 1704 773298',
      source: 'Direct',
      quoteId: 'Q-011',
      quoteAmount: 1950,
      priority: 'High',
      status: 'Contacted',
      stage: 'Call-1',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-14T14:10:00Z',
      lastActionAt: '2024-01-15T10:30:00Z',
      contactAttempts: 1,
      maxAttempts: 5,
      ageInHours: 20.33,
      isOverdue: false,
      notes: 'Left voicemail, waiting for callback'
    },
    // Call-2 Stage
    {
      id: 'L-012',
      name: 'Emma Thompson',
      email: 'emma.t@email.com',
      phone: '+44 1704 773299',
      source: 'Comparison Site',
      quoteId: 'Q-012',
      quoteAmount: 1750,
      priority: 'Medium',
      status: 'Contacted',
      stage: 'Call-2',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-13T11:30:00Z',
      lastActionAt: '2024-01-15T08:45:00Z',
      contactAttempts: 2,
      maxAttempts: 5,
      ageInHours: 52.25,
      isOverdue: true,
      notes: 'Second attempt - still no answer'
    },
    {
      id: 'L-013',
      name: 'James Miller',
      email: 'james.m@email.com',
      phone: '+44 1704 773300',
      source: 'Hoowla',
      quoteId: 'Q-013',
      quoteAmount: 2100,
      priority: 'High',
      status: 'Contacted',
      stage: 'Call-2',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-13T09:15:00Z',
      lastActionAt: '2024-01-15T11:00:00Z',
      contactAttempts: 2,
      maxAttempts: 5,
      ageInHours: 54.75,
      isOverdue: true,
      notes: 'Busy signal on second call'
    },
    // Call-3 Stage
    {
      id: 'L-014',
      name: 'Lisa Garcia',
      email: 'lisa.g@email.com',
      phone: '+44 1704 773301',
      source: 'Direct',
      quoteId: 'Q-014',
      quoteAmount: 1450,
      priority: 'Medium',
      status: 'Contacted',
      stage: 'Call-3',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-12T15:45:00Z',
      lastActionAt: '2024-01-15T09:30:00Z',
      contactAttempts: 3,
      maxAttempts: 5,
      ageInHours: 65.75,
      isOverdue: true,
      notes: 'Third attempt - phone went to voicemail'
    },
    // Call-4 Stage
    {
      id: 'L-015',
      name: 'Robert Johnson',
      email: 'robert.j@email.com',
      phone: '+44 1704 773302',
      source: 'Comparison Site',
      quoteId: 'Q-015',
      quoteAmount: 1850,
      priority: 'High',
      status: 'Contacted',
      stage: 'Call-4',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-11T10:20:00Z',
      lastActionAt: '2024-01-15T10:15:00Z',
      contactAttempts: 4,
      maxAttempts: 5,
      ageInHours: 83.92,
      isOverdue: true,
      notes: 'Fourth attempt - line busy'
    },
    {
      id: 'L-016',
      name: 'Jennifer Martinez',
      email: 'jennifer.m@email.com',
      phone: '+44 1704 773303',
      source: 'Hoowla',
      quoteId: 'Q-016',
      quoteAmount: 1650,
      priority: 'Medium',
      status: 'Contacted',
      stage: 'Call-4',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-11T08:30:00Z',
      lastActionAt: '2024-01-15T11:45:00Z',
      contactAttempts: 4,
      maxAttempts: 5,
      ageInHours: 87.25,
      isOverdue: true,
      notes: 'Fourth attempt - no answer'
    },
    // Call-5 Stage (Final attempt)
    {
      id: 'L-017',
      name: 'Michael Davis',
      email: 'michael.d@email.com',
      phone: '+44 1704 773304',
      source: 'Direct',
      quoteId: 'Q-017',
      quoteAmount: 2000,
      priority: 'High',
      status: 'Contacted',
      stage: 'Call-5',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-10T14:15:00Z',
      lastActionAt: '2024-01-15T12:00:00Z',
      contactAttempts: 5,
      maxAttempts: 5,
      ageInHours: 105.75,
      isOverdue: true,
      notes: 'Final attempt - no response, consider closing'
    },
    // Interested Stage
    {
      id: 'L-018',
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+44 1704 773305',
      source: 'Hoowla',
      quoteId: 'Q-018',
      quoteAmount: 1900,
      priority: 'High',
      status: 'Interested',
      stage: 'Interested',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-13T13:20:00Z',
      lastActionAt: '2024-01-15T14:30:00Z',
      contactAttempts: 2,
      maxAttempts: 5,
      ageInHours: 49.17,
      isOverdue: false,
      notes: 'Very interested, call back scheduled for tomorrow 2pm'
    },
    {
      id: 'L-019',
      name: 'David Thompson',
      email: 'david.t@email.com',
      phone: '+44 1704 773306',
      source: 'Comparison Site',
      quoteId: 'Q-019',
      quoteAmount: 1750,
      priority: 'Medium',
      status: 'Interested',
      stage: 'Interested',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-12T16:45:00Z',
      lastActionAt: '2024-01-15T15:00:00Z',
      contactAttempts: 3,
      maxAttempts: 5,
      ageInHours: 46.25,
      isOverdue: false,
      notes: 'Interested, wants to discuss tomorrow morning'
    },
    // Ready to Instruct Stage
    {
      id: 'L-020',
      name: 'Emma Anderson',
      email: 'emma.a@email.com',
      phone: '+44 1704 773307',
      source: 'Direct',
      quoteId: 'Q-020',
      quoteAmount: 2200,
      priority: 'High',
      status: 'Quote Sent',
      stage: 'Ready to Instruct',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-11T11:00:00Z',
      lastActionAt: '2024-01-15T16:15:00Z',
      contactAttempts: 4,
      maxAttempts: 5,
      ageInHours: 85.25,
      isOverdue: false,
      notes: 'Ready to proceed, waiting for instruction documents'
    },
    {
      id: 'L-021',
      name: 'James Brown',
      email: 'james.b@email.com',
      phone: '+44 1704 773308',
      source: 'Hoowla',
      quoteId: 'Q-021',
      quoteAmount: 1950,
      priority: 'Medium',
      status: 'Quote Sent',
      stage: 'Ready to Instruct',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-10T15:30:00Z',
      lastActionAt: '2024-01-15T17:00:00Z',
      contactAttempts: 5,
      maxAttempts: 5,
      ageInHours: 97.5,
      isOverdue: false,
      notes: 'Quote accepted, ready for instruction'
    },
    // Awaiting Payment Stage
    {
      id: 'L-022',
      name: 'Lisa Johnson',
      email: 'lisa.j@email.com',
      phone: '+44 1704 773309',
      source: 'Comparison Site',
      quoteId: 'Q-022',
      quoteAmount: 1800,
      priority: 'High',
      status: 'Sold',
      stage: 'Awaiting Payment',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-09T12:15:00Z',
      lastActionAt: '2024-01-15T18:00:00Z',
      contactAttempts: 5,
      maxAttempts: 5,
      ageInHours: 131.75,
      isOverdue: false,
      notes: 'Payment of £1800 pending, sent invoice yesterday'
    },
    {
      id: 'L-023',
      name: 'Robert Wilson',
      email: 'robert.w@email.com',
      phone: '+44 1704 773310',
      source: 'Direct',
      quoteId: 'Q-023',
      quoteAmount: 2100,
      priority: 'Medium',
      status: 'Sold',
      stage: 'Awaiting Payment',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-08T14:45:00Z',
      lastActionAt: '2024-01-15T19:30:00Z',
      contactAttempts: 5,
      maxAttempts: 5,
      ageInHours: 152.75,
      isOverdue: false,
      notes: 'Payment of £2100 due today'
    },
    // Awaiting Client Info Stage
    {
      id: 'L-024',
      name: 'Jennifer Davis',
      email: 'jennifer.d@email.com',
      phone: '+44 1704 773311',
      source: 'Hoowla',
      quoteId: 'Q-024',
      quoteAmount: 1650,
      priority: 'Medium',
      status: 'Quote Sent',
      stage: 'Awaiting Client Info',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-07T10:20:00Z',
      lastActionAt: '2024-01-15T20:00:00Z',
      contactAttempts: 5,
      maxAttempts: 5,
      ageInHours: 177.67,
      isOverdue: false,
      notes: 'Waiting for property details and ID documents'
    },
    {
      id: 'L-025',
      name: 'Michael Thompson',
      email: 'michael.t@email.com',
      phone: '+44 1704 773312',
      source: 'Comparison Site',
      quoteId: 'Q-025',
      quoteAmount: 1950,
      priority: 'High',
      status: 'Quote Sent',
      stage: 'Awaiting Client Info',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-06T16:30:00Z',
      lastActionAt: '2024-01-15T21:15:00Z',
      contactAttempts: 5,
      maxAttempts: 5,
      ageInHours: 201.75,
      isOverdue: false,
      notes: 'Need mortgage details and solicitor information'
    }
  ];

  const agents = [
    { id: 'agent1', name: 'Agent 1', role: 'Agent' },
    { id: 'agent2', name: 'Agent 2', role: 'Agent' },
    { id: 'agent3', name: 'Agent 3', role: 'Agent' },
    { id: 'manager1', name: 'Manager 1', role: 'Manager' }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSource = filterSource === 'All' || lead.source === filterSource;
    const matchesAge = filterAge === 'All' || 
      (filterAge === 'New' && lead.ageInHours < 24) ||
      (filterAge === 'Old' && lead.ageInHours >= 24) ||
      (filterAge === 'Overdue' && lead.isOverdue);
    const matchesStage = selectedStage === 'all' || 
      (selectedStage === 'unassigned' ? !lead.assignedTo : 
       selectedStage === 'overdue' ? lead.isOverdue && (user?.role === 'Agent' ? lead.assignedTo === 'Agent 1' : true) :
       selectedStage === 'highPriority' ? lead.priority === 'High' && (user?.role === 'Agent' ? lead.assignedTo === 'Agent 1' : true) :
       selectedStage === 'completedToday' ? lead.status === 'Sold' && (user?.role === 'Agent' ? lead.assignedTo === 'Agent 1' : true) :
       lead.stage === selectedStage);
    
    return matchesSearch && matchesStatus && matchesSource && matchesAge && matchesStage;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-yellow-100 text-yellow-800';
      case 'Contacted': return 'bg-purple-100 text-purple-800';
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Quote Sent': return 'bg-indigo-100 text-indigo-800';
      case 'Sold': return 'bg-emerald-100 text-emerald-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgeColor = (ageInHours: number, isOverdue: boolean) => {
    if (isOverdue) return 'text-red-600';
    if (ageInHours >= 24) return 'text-orange-600';
    if (ageInHours >= 12) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatAge = (ageInHours: number) => {
    if (ageInHours < 1) return `${Math.round(ageInHours * 60)}m`;
    if (ageInHours < 24) return `${Math.round(ageInHours)}h`;
    return `${Math.round(ageInHours / 24)}d ${Math.round(ageInHours % 24)}h`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const handleAssignLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowAssignModal(true);
  };

  const handleContactLead = (lead: Lead, method: 'call' | 'email' | 'sms') => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
    setShowCommunicationPanel(true);
    // Scroll to communication center after a brief delay to ensure it's rendered
    setTimeout(() => {
      const communicationCenter = document.querySelector('[data-communication-center]');
      if (communicationCenter) {
        communicationCenter.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const getNextAction = (outcomeCode: string) => {
    const actionMap: { [key: string]: string } = {
      'Called - No Answer': 'Schedule Callback - 2 hours',
      'Called - Voicemail': 'Schedule Callback - 4 hours',
      'Called - Busy': 'Schedule Callback - 1 hour',
      'Number Invalid': 'Mark as Invalid',
      'Interested - Call Back': 'Schedule Callback - 1 day',
      'Interested - Reviewing': 'Send Follow-up Email - 2 days',
      'Not Interested': 'Archive Lead',
      'Sold!': 'Generate Invoice',
      'Wrong Number': 'Archive Lead',
      'Callback Scheduled': 'Wait for Scheduled Time'
    };
    return actionMap[outcomeCode] || 'No action defined';
  };

  const handleBulkAssign = () => {
    setShowBulkAssignModal(true);
  };

  const handleBulkExport = () => {
    setShowBulkExportModal(true);
  };

  const handleBulkArchive = () => {
    setShowBulkArchiveModal(true);
  };

  const handleAddLead = () => {
    setShowAddLeadModal(true);
  };

  const handleSaveNewLead = () => {
    console.log('Save new lead:', newLead);
    // Here you would typically make an API call to save the lead
    setShowAddLeadModal(false);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      source: 'Direct',
      priority: 'Medium',
      notes: ''
    });
  };

  const handleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleApplyFilters = () => {
    console.log('Apply advanced filters:', advancedFilters);
    // Here you would apply the filters to the leads list
    setShowAdvancedFilters(false);
  };

  const handleClearFilters = () => {
    setAdvancedFilters({
      dateRange: '',
      source: '',
      priority: '',
      status: '',
      assignedTo: '',
      ageRange: ''
    });
  };

  const handleStageSelect = (stage: string) => {
    setSelectedStage(stage);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  const getStats = () => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const unassignedLeads = leads.filter(l => !l.assignedTo).length;
    const overdueLeads = leads.filter(l => l.isOverdue).length;
    const avgAge = leads.reduce((sum, lead) => sum + lead.ageInHours, 0) / totalLeads;
    const oldestLead = leads.reduce((oldest, lead) => 
      lead.ageInHours > oldest.ageInHours ? lead : oldest
    );

    return {
      totalLeads,
      newLeads,
      unassignedLeads,
      overdueLeads,
      avgAge: Math.round(avgAge * 10) / 10,
      oldestAge: oldestLead.ageInHours,
      oldestLead: oldestLead.name
    };
  };

  const stats = getStats();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Hierarchical Lead Sidebar */}
      {showLeadSidebar && (
        <LeadSidebar 
          onStageSelect={handleStageSelect}
          selectedStage={selectedStage}
          userRole={user?.role || 'Agent'}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setShowLeadSidebar(!showLeadSidebar)}
                title={showLeadSidebar ? 'Hide Lead Pipeline' : 'Show Lead Pipeline'}
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                <p className="text-gray-600">Manage leads, assignments, and contact attempts</p>
              </div>
            </div>
        <div className="flex space-x-3">
          <button 
            className="btn-secondary flex items-center space-x-2"
            onClick={handleAdvancedFilters}
          >
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </button>
          <button 
            className="btn-primary flex items-center space-x-2"
            onClick={handleAddLead}
          >
            <UserPlus className="h-5 w-5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newLeads}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unassigned</p>
              <p className="text-2xl font-bold text-gray-900">{stats.unassignedLeads}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-500">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdueLeads}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Age</p>
              <p className="text-2xl font-bold text-gray-900">{formatAge(stats.avgAge)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, email, or phone..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Quote Sent">Quote Sent</option>
              <option value="Sold">Sold</option>
              <option value="Closed">Closed</option>
              <option value="Archived">Archived</option>
            </select>
            <select 
              className="input-field"
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
            >
              <option value="All">All Sources</option>
              <option value="Hoowla">Hoowla</option>
              <option value="Comparison Site">Comparison Site</option>
              <option value="Direct">Direct</option>
              <option value="Referral">Referral</option>
            </select>
            <select 
              className="input-field"
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
            >
              <option value="All">All Ages</option>
              <option value="New">New (&lt; 24h)</option>
              <option value="Old">Old (≥ 24h)</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedLeads.length} lead(s) selected
            </span>
            <div className="flex space-x-2">
              <button 
                className="btn-primary text-sm"
                onClick={handleBulkAssign}
              >
                Assign Selected
              </button>
              <button 
                className="btn-secondary text-sm"
                onClick={handleBulkExport}
              >
                Export Selected
              </button>
              <button 
                className="btn-danger text-sm"
                onClick={handleBulkArchive}
              >
                Archive Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leads Display - Card Layout */}
      {filteredLeads.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600 mb-4">
            {selectedStage === 'all' 
              ? 'No leads match the current filters' 
              : `No leads found in the "${selectedStage}" stage`}
          </p>
          <div className="text-sm text-gray-500">
            <p>Total leads in system: {leads.length}</p>
            <p>Selected stage: {selectedStage}</p>
            <p>Search term: "{searchTerm}"</p>
            <p>Status filter: {filterStatus}</p>
            <p>Source filter: {filterSource}</p>
            <p>Age filter: {filterAge}</p>
            {selectedStage === 'unassigned' && (
              <div className="mt-2 p-2 bg-yellow-50 rounded">
                <p className="font-medium">Unassigned leads debug:</p>
                <p>Leads without assignedTo: {leads.filter(l => !l.assignedTo).length}</p>
                <p>Unassigned lead names: {leads.filter(l => !l.assignedTo).map(l => l.name).join(', ')}</p>
              </div>
            )}
            {selectedStage === 'overdue' && (
              <div className="mt-2 p-2 bg-red-50 rounded">
                <p className="font-medium">Overdue leads debug:</p>
                <p>Overdue leads count: {leads.filter(l => l.isOverdue).length}</p>
                <p>Overdue lead names: {leads.filter(l => l.isOverdue).map(l => l.name).join(', ')}</p>
              </div>
            )}
            {selectedStage === 'highPriority' && (
              <div className="mt-2 p-2 bg-orange-50 rounded">
                <p className="font-medium">High Priority leads debug:</p>
                <p>High priority leads count: {leads.filter(l => l.priority === 'High').length}</p>
                <p>High priority lead names: {leads.filter(l => l.priority === 'High').map(l => l.name).join(', ')}</p>
              </div>
            )}
            {selectedStage === 'completedToday' && (
              <div className="mt-2 p-2 bg-green-50 rounded">
                <p className="font-medium">Completed Today debug:</p>
                <p>Sold leads count: {leads.filter(l => l.status === 'Sold').length}</p>
                <p>Sold lead names: {leads.filter(l => l.status === 'Sold').map(l => l.name).join(', ')}</p>
                <p>Today's date: {new Date().toDateString()}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => (
          <div key={lead.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.email}</p>
                <p className="text-sm text-gray-500">{lead.phone}</p>
              </div>
              <div className="flex space-x-1">
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => handleSelectLead(lead.id)}
                  className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Source:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {lead.source}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Priority:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                  {lead.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assigned:</span>
                <span className="text-sm text-gray-900">
                  {lead.assignedTo || <span className="text-red-600 font-medium">Unassigned</span>}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Age:</span>
                <span className={`text-sm font-medium ${getAgeColor(lead.ageInHours, lead.isOverdue)}`}>
                  {formatAge(lead.ageInHours)}
                  {lead.isOverdue && <span className="text-red-600 ml-1">(Overdue)</span>}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Attempts:</span>
                <span className="text-sm text-gray-900">
                  {lead.contactAttempts}/{lead.maxAttempts}
                  {lead.contactAttempts >= lead.maxAttempts && <span className="text-red-600 ml-1">(Max)</span>}
                </span>
              </div>
              {lead.quoteAmount && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quote:</span>
                  <span className="text-sm font-medium text-gray-900">£{lead.quoteAmount.toLocaleString()}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 pt-3 border-t border-gray-200">
              <button 
                className="text-gray-400 hover:text-gray-600" 
                title="View Details"
                onClick={() => handleViewLead(lead)}
              >
                <Eye className="h-4 w-4" />
              </button>
              <button 
                className="text-blue-400 hover:text-blue-600" 
                title="Call"
                onClick={() => handleContactLead(lead, 'call')}
              >
                <Phone className="h-4 w-4" />
              </button>
              <button 
                className="text-green-400 hover:text-green-600" 
                title="Email"
                onClick={() => handleContactLead(lead, 'email')}
              >
                <Mail className="h-4 w-4" />
              </button>
              <button 
                className="text-purple-400 hover:text-purple-600" 
                title="SMS"
                onClick={() => handleContactLead(lead, 'sms')}
              >
                <MessageSquare className="h-4 w-4" />
              </button>
              <button 
                className="text-yellow-400 hover:text-yellow-600" 
                title="Assign"
                onClick={() => handleAssignLead(lead)}
              >
                <UserPlus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && selectedLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Lead: {selectedLead.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Agent
                </label>
                <select className="input-field">
                  <option value="">Choose an agent...</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} ({agent.role})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select className="input-field">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea 
                  className="input-field"
                  rows={3}
                  placeholder="Add assignment notes..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="btn-secondary"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  console.log('Assign lead:', selectedLead.id);
                  setShowAssignModal(false);
                }}
              >
                Assign Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Lead Detail Modal */}
      {showLeadDetail && selectedLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setShowLeadDetail(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Lead: {selectedLead.id} | {selectedLead.name} | £{selectedLead.quoteAmount?.toLocaleString() || 'No Quote'} | Status: {selectedLead.status}
                  </h2>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowLeadDetail(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Details & Quote Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Details */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Client Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedLead.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedLead.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedLead.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Source:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedLead.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Priority:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedLead.priority)}`}>
                        {selectedLead.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Assigned:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedLead.assignedTo || <span className="text-red-600">Unassigned</span>}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Information */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Quote Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quote ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedLead.quoteId || 'No Quote'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedLead.quoteAmount ? `£${selectedLead.quoteAmount.toLocaleString()}` : 'No Quote'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(selectedLead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                        {selectedLead.status}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="btn-secondary text-sm flex items-center space-x-1">
                        <Edit className="h-4 w-4" />
                        <span>Edit Quote</span>
                      </button>
                      <button className="btn-secondary text-sm flex items-center space-x-1">
                        <Send className="h-4 w-4" />
                        <span>Resend Quote</span>
                      </button>
                      <button className="btn-primary text-sm flex items-center space-x-1">
                        <CreditCard className="h-4 w-4" />
                        <span>Generate Invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outcome Code Selection */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Outcome Code Selection
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {[
                    'Called - No Answer',
                    'Called - Voicemail', 
                    'Called - Busy',
                    'Number Invalid',
                    'Interested - Call Back',
                    'Interested - Reviewing',
                    'Not Interested',
                    'Sold!',
                    'Wrong Number',
                    'Callback Scheduled'
                  ].map((outcome) => (
                    <button
                      key={outcome}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedOutcomeCode === outcome
                          ? 'bg-navy-950 text-white border-navy-950'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedOutcomeCode(outcome)}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
                {selectedOutcomeCode && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Selected:</strong> {selectedOutcomeCode} → Next: {getNextAction(selectedOutcomeCode)}
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Attempt History */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Contact Attempt History
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Attempt 1: Call | 14:30 | No answer | Auto-scheduled in 1 hour</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Attempt 2: Call | 15:30 | Voicemail left | Outcome: Called - Voicemail</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-800">Next: Call scheduled for 2024-01-16 09:00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">Remaining attempts: 3</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="btn-secondary text-sm flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Log Manual Call</span>
                  </button>
                  <button className="btn-secondary text-sm flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>Send SMS</span>
                  </button>
                  <button className="btn-secondary text-sm flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </button>
                  <button className="btn-primary text-sm flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Follow-up</span>
                  </button>
                </div>
              </div>

              {/* Communication Panel Toggle */}
              <div className="flex justify-center">
                <button 
                  className="btn-primary flex items-center space-x-2"
                  onClick={() => setShowCommunicationPanel(!showCommunicationPanel)}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Open Communication Center</span>
                </button>
              </div>

              {/* Communication Center */}
              {showCommunicationPanel && (
                <div className="card border-2 border-blue-200" data-communication-center>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">COMMUNICATION CENTER - Lead: {selectedLead.id}</h3>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setShowCommunicationPanel(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Call Panel */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Quick Call Panel</h4>
                      <button className="w-full btn-primary flex items-center justify-center space-x-2">
                        <Phone className="h-5 w-5" />
                        <span>Call Now - {selectedLead.phone}</span>
                      </button>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">Call Log:</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>• 14:30 - 2 min</p>
                          <p>• 15:30 - 1 min (voicemail)</p>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm">Open 3CX Panel</button>
                    </div>

                    {/* SMS Templates */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">SMS Templates</h4>
                      <div className="space-y-2">
                        {['Initial Follow-up', 'Quote Reminder', 'Sold Confirmation', 'Custom SMS...'].map((template) => (
                          <button
                            key={template}
                            className={`w-full p-2 text-sm rounded-lg border transition-colors ${
                              selectedTemplate === template
                                ? 'bg-navy-950 text-white border-navy-950'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedTemplate(template)}
                          >
                            📱 {template}
                          </button>
                        ))}
                      </div>
                      {selectedTemplate && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Message:</label>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            rows={3}
                            placeholder="Hi John, just following up on your quote..."
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                          />
                          <button className="btn-primary text-sm w-full">Send SMS</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Templates */}
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium text-gray-900">Email Templates & History</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Initial Quote', 'Follow-up 1', 'Follow-up 2', 'Final Notice'].map((template) => (
                        <button
                          key={template}
                          className="p-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
                        >
                          ✉️ {template}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Subject: Your Quote Follow-up - {selectedLead.name}</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                        rows={4}
                        placeholder="Hi John,

Just following up on the £1,200 quote we sent..."
                      />
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm">Insert Personalization Tags</button>
                        <button className="btn-secondary text-sm">Attach Quote</button>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-primary text-sm">Send Email</button>
                        <button className="btn-secondary text-sm">Schedule Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Template Management - Only for Admin/Manager */}
              {user?.role !== 'Agent' && (
                <div className="card border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Template Management
                    </h3>
                    <button 
                      className="btn-secondary text-sm"
                      onClick={() => setShowTemplateManager(!showTemplateManager)}
                    >
                      {showTemplateManager ? 'Hide Templates' : 'Manage Templates'}
                    </button>
                  </div>
                  
                  {showTemplateManager && (
                    <div className="space-y-6">
                      {/* SMS Templates */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">SMS Templates</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: 'Initial Follow-up', content: 'Hi {name}, just following up on your conveyancing quote. Please let me know if you have any questions.' },
                            { name: 'Quote Reminder', content: 'Hi {name}, your quote of £{amount} is still valid. Would you like to proceed with your conveyancing?' },
                            { name: 'Sold Confirmation', content: 'Hi {name}, congratulations! Your conveyancing is now in progress. We\'ll be in touch soon.' },
                            { name: 'Callback Reminder', content: 'Hi {name}, just a reminder that we\'ll call you at {time} today to discuss your conveyancing quote.' }
                          ].map((template) => (
                            <div key={template.name} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">{template.name}</h5>
                                <button 
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                  onClick={() => {
                                    setEditingTemplate(template.name);
                                    setTemplateContent(template.content);
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <p className="text-sm text-gray-600">{template.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Email Templates */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Email Templates</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: 'Initial Quote', content: 'Dear {name},\n\nThank you for your interest in our conveyancing services. Please find attached your detailed quote for £{amount}.\n\nBest regards,\nMillennium Legal Team' },
                            { name: 'Follow-up 1', content: 'Dear {name},\n\nI hope you\'re well. I wanted to follow up on the conveyancing quote we sent you. Do you have any questions?\n\nBest regards,\nMillennium Legal Team' },
                            { name: 'Follow-up 2', content: 'Dear {name},\n\nThis is our final follow-up regarding your conveyancing quote. The offer expires on {expiry_date}.\n\nBest regards,\nMillennium Legal Team' },
                            { name: 'Final Notice', content: 'Dear {name},\n\nYour conveyancing quote will expire soon. Please contact us if you\'d like to proceed.\n\nBest regards,\nMillennium Legal Team' }
                          ].map((template) => (
                            <div key={template.name} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">{template.name}</h5>
                                <button 
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                  onClick={() => {
                                    setEditingTemplate(template.name);
                                    setTemplateContent(template.content);
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 whitespace-pre-line">{template.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Template Editor Modal */}
                      {editingTemplate && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
                          <div className="bg-white rounded-lg w-full max-w-2xl">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                              <h3 className="text-lg font-semibold text-gray-900">Edit Template: {editingTemplate}</h3>
                              <button 
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                  setEditingTemplate('');
                                  setTemplateContent('');
                                }}
                              >
                                <X className="h-6 w-6" />
                              </button>
                            </div>
                            <div className="p-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Template Content
                                  </label>
                                  <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                                    rows={8}
                                    value={templateContent}
                                    onChange={(e) => setTemplateContent(e.target.value)}
                                    placeholder="Enter template content..."
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Use variables like {'{name}'}, {'{amount}'}, {'{time}'}, {'{expiry_date}'} for personalization
                                  </p>
                                </div>
                                <div className="flex justify-end space-x-3">
                                  <button 
                                    className="btn-secondary"
                                    onClick={() => {
                                      setEditingTemplate('');
                                      setTemplateContent('');
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    className="btn-primary"
                                    onClick={() => {
                                      console.log('Save template:', editingTemplate, templateContent);
                                      setEditingTemplate('');
                                      setTemplateContent('');
                                    }}
                                  >
                                    Save Template
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Assign Modal */}
      {showBulkAssignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Assign Selected Leads</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowBulkAssignModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Assign {selectedLeads.length} selected lead(s) to:
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to:</label>
                <select className="input-field">
                  <option value="">Select Agent</option>
                  <option value="agent1">John Smith</option>
                  <option value="agent2">Sarah Johnson</option>
                  <option value="agent3">Mike Wilson</option>
                  <option value="agent4">Emma Davis</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowBulkAssignModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    console.log('Bulk assign leads:', selectedLeads);
                    setShowBulkAssignModal(false);
                    setSelectedLeads([]);
                  }}
                >
                  Assign Leads
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Export Modal */}
      {showBulkExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Export Selected Leads</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowBulkExportModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Export {selectedLeads.length} selected lead(s) in:
              </p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="exportFormat" value="csv" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">CSV Format</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="exportFormat" value="excel" className="mr-2" />
                  <span className="text-sm text-gray-700">Excel Format</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="exportFormat" value="pdf" className="mr-2" />
                  <span className="text-sm text-gray-700">PDF Report</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowBulkExportModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    console.log('Bulk export leads:', selectedLeads);
                    setShowBulkExportModal(false);
                  }}
                >
                  Export Leads
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Archive Modal */}
      {showBulkArchiveModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Archive Selected Leads</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowBulkArchiveModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      This will archive {selectedLeads.length} selected lead(s). Archived leads will be moved to the archive and will not appear in the main lead list.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Archive Reason:</label>
                <select className="input-field">
                  <option value="">Select Reason</option>
                  <option value="completed">Lead Completed</option>
                  <option value="not_interested">Not Interested</option>
                  <option value="invalid_contact">Invalid Contact Information</option>
                  <option value="duplicate">Duplicate Lead</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowBulkArchiveModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => {
                    console.log('Bulk archive leads:', selectedLeads);
                    setShowBulkArchiveModal(false);
                    setSelectedLeads([]);
                  }}
                >
                  Archive Leads
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="card border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowAdvancedFilters(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select 
                className="input-field"
                value={advancedFilters.dateRange}
                onChange={(e) => setAdvancedFilters({...advancedFilters, dateRange: e.target.value})}
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <select 
                className="input-field"
                value={advancedFilters.source}
                onChange={(e) => setAdvancedFilters({...advancedFilters, source: e.target.value})}
              >
                <option value="">All Sources</option>
                <option value="Hoowla">Hoowla</option>
                <option value="Comparison Site">Comparison Site</option>
                <option value="Direct">Direct</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select 
                className="input-field"
                value={advancedFilters.priority}
                onChange={(e) => setAdvancedFilters({...advancedFilters, priority: e.target.value})}
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                className="input-field"
                value={advancedFilters.status}
                onChange={(e) => setAdvancedFilters({...advancedFilters, status: e.target.value})}
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Quote Sent">Quote Sent</option>
                <option value="Sold">Sold</option>
                <option value="Closed">Closed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
              <select 
                className="input-field"
                value={advancedFilters.assignedTo}
                onChange={(e) => setAdvancedFilters({...advancedFilters, assignedTo: e.target.value})}
              >
                <option value="">All Agents</option>
                <option value="unassigned">Unassigned</option>
                <option value="agent1">Agent 1</option>
                <option value="agent2">Agent 2</option>
                <option value="agent3">Agent 3</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Age</label>
              <select 
                className="input-field"
                value={advancedFilters.ageRange}
                onChange={(e) => setAdvancedFilters({...advancedFilters, ageRange: e.target.value})}
              >
                <option value="">All Ages</option>
                <option value="new">New (&lt; 24h)</option>
                <option value="old">Old (≥ 24h)</option>
                <option value="overdue">Overdue</option>
                <option value="veryOld">Very Old (≥ 72h)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              className="btn-secondary"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
            <button 
              className="btn-primary"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Lead</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowAddLeadModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newLead.name}
                    onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <select 
                    className="input-field"
                    value={newLead.source}
                    onChange={(e) => setNewLead({...newLead, source: e.target.value as any})}
                  >
                    <option value="Direct">Direct</option>
                    <option value="Hoowla">Hoowla</option>
                    <option value="Comparison Site">Comparison Site</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select 
                    className="input-field"
                    value={newLead.priority}
                    onChange={(e) => setNewLead({...newLead, priority: e.target.value as any})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  placeholder="Enter any additional notes about this lead"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddLeadModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSaveNewLead}
                disabled={!newLead.name || !newLead.email || !newLead.phone}
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};
