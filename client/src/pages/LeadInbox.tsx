import React, { useState } from 'react';
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
  Archive
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  assignedTo?: string;
  createdAt: string;
  lastActionAt?: string;
  notes?: string;
  contactAttempts: number;
  maxAttempts: number;
}

export const LeadInbox: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLeadForAssign, setSelectedLeadForAssign] = useState<Lead | null>(null);

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
      createdAt: '2024-01-15T10:30:00Z',
      contactAttempts: 0,
      maxAttempts: 5,
      notes: 'Interested in residential conveyancing'
    },
    {
      id: 'L-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+44 1704 773289',
      source: 'Comparison Site',
      quoteId: 'Q-002',
      quoteAmount: 1500,
      priority: 'Medium',
      status: 'New',
      createdAt: '2024-01-15T11:15:00Z',
      contactAttempts: 0,
      maxAttempts: 5,
      notes: 'Commercial property transaction'
    },
    {
      id: 'L-003',
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+44 1704 773290',
      source: 'Direct',
      quoteId: 'Q-003',
      quoteAmount: 1800,
      priority: 'Low',
      status: 'Assigned',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-15T09:45:00Z',
      lastActionAt: '2024-01-15T12:00:00Z',
      contactAttempts: 1,
      maxAttempts: 5,
      notes: 'First contact made, interested in quote'
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
      status: 'Contacted',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-14T14:20:00Z',
      lastActionAt: '2024-01-15T08:30:00Z',
      contactAttempts: 2,
      maxAttempts: 5,
      notes: 'Called twice, no answer. Sent SMS follow-up.'
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
    
    return matchesSearch && matchesStatus && matchesSource;
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

  const getAttemptStatus = (attempts: number, maxAttempts: number) => {
    if (attempts === 0) return { color: 'text-gray-500', text: 'No attempts' };
    if (attempts < maxAttempts) return { color: 'text-yellow-600', text: `${attempts}/${maxAttempts} attempts` };
    return { color: 'text-red-600', text: 'Max attempts reached' };
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
    setSelectedLeadForAssign(lead);
    setShowAssignModal(true);
  };

  const handleBulkAssign = () => {
    // Implement bulk assignment logic
    console.log('Bulk assign leads:', selectedLeads);
  };

  const handleContactLead = (lead: Lead, method: 'call' | 'email' | 'sms') => {
    console.log(`Contact ${lead.name} via ${method}`);
    // Implement contact logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Inbox</h1>
          <p className="text-gray-600">Manage and assign incoming leads</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
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
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.status === 'New').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Assigned</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.status === 'Assigned').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contacted</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.status === 'Contacted').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-500">
              <Archive className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Max Attempts</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.contactAttempts >= l.maxAttempts).length}
              </p>
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
              <button className="btn-secondary text-sm">
                Export Selected
              </button>
              <button className="btn-danger text-sm">
                Archive Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                  />
                </th>
                <th className="table-header">Lead</th>
                <th className="table-header">Source</th>
                <th className="table-header">Priority</th>
                <th className="table-header">Status</th>
                <th className="table-header">Assigned To</th>
                <th className="table-header">Quote</th>
                <th className="table-header">Attempts</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                    />
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {lead.source}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="table-cell text-sm text-gray-900">
                    {lead.assignedTo || 'Unassigned'}
                  </td>
                  <td className="table-cell">
                    {lead.quoteAmount ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">£{lead.quoteAmount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{lead.quoteId}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">No quote</span>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className={`text-sm font-medium ${getAttemptStatus(lead.contactAttempts, lead.maxAttempts).color}`}>
                      {getAttemptStatus(lead.contactAttempts, lead.maxAttempts).text}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-1">
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="View Details"
                        onClick={() => console.log('View lead:', lead.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="Edit Lead"
                        onClick={() => console.log('Edit lead:', lead.id)}
                      >
                        <Edit className="h-4 w-4" />
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && selectedLeadForAssign && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Lead: {selectedLeadForAssign.name}
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
                  console.log('Assign lead:', selectedLeadForAssign.id);
                  setShowAssignModal(false);
                }}
              >
                Assign Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
