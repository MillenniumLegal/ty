import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  UserPlus,
  Archive,
  Eye,
  Edit
} from 'lucide-react';

interface LeadTimeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Hoowla' | 'Comparison Site' | 'Direct' | 'Referral';
  status: 'New' | 'Assigned' | 'Contacted' | 'Interested' | 'Quote Sent' | 'Sold' | 'Closed' | 'Archived';
  assignedTo?: string;
  createdAt: string;
  assignedAt?: string;
  lastActionAt?: string;
  ageInHours: number;
  ageInDays: number;
  priority: 'High' | 'Medium' | 'Low';
  contactAttempts: number;
  maxAttempts: number;
  isOverdue: boolean;
  timeToAssignment?: number; // hours
  timeToFirstContact?: number; // hours
}

export const LeadTimeTracking: React.FC = () => {
  const [filterAge, setFilterAge] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');
  const [sortBy, setSortBy] = useState('age');

  // Mock data - replace with actual API calls
  const leads: LeadTimeData[] = [
    {
      id: 'L-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+44 1704 773288',
      source: 'Hoowla',
      status: 'New',
      createdAt: '2024-01-15T08:00:00Z',
      ageInHours: 6,
      ageInDays: 0.25,
      priority: 'High',
      contactAttempts: 0,
      maxAttempts: 5,
      isOverdue: false
    },
    {
      id: 'L-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+44 1704 773289',
      source: 'Comparison Site',
      status: 'New',
      createdAt: '2024-01-14T14:30:00Z',
      ageInHours: 19.5,
      ageInDays: 0.81,
      priority: 'High',
      contactAttempts: 0,
      maxAttempts: 5,
      isOverdue: true
    },
    {
      id: 'L-003',
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+44 1704 773290',
      source: 'Direct',
      status: 'Assigned',
      assignedTo: 'Agent 1',
      createdAt: '2024-01-14T10:15:00Z',
      assignedAt: '2024-01-14T11:00:00Z',
      ageInHours: 22.75,
      ageInDays: 0.95,
      priority: 'Medium',
      contactAttempts: 1,
      maxAttempts: 5,
      isOverdue: false,
      timeToAssignment: 0.75
    },
    {
      id: 'L-004',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      phone: '+44 1704 773291',
      source: 'Hoowla',
      status: 'Contacted',
      assignedTo: 'Agent 2',
      createdAt: '2024-01-13T16:45:00Z',
      assignedAt: '2024-01-13T17:30:00Z',
      lastActionAt: '2024-01-14T09:00:00Z',
      ageInHours: 40.25,
      ageInDays: 1.68,
      priority: 'Low',
      contactAttempts: 2,
      maxAttempts: 5,
      isOverdue: false,
      timeToAssignment: 0.75,
      timeToFirstContact: 16.5
    },
    {
      id: 'L-005',
      name: 'David Brown',
      email: 'david.b@email.com',
      phone: '+44 1704 773292',
      source: 'Referral',
      status: 'New',
      createdAt: '2024-01-12T09:20:00Z',
      ageInHours: 64.67,
      ageInDays: 2.69,
      priority: 'High',
      contactAttempts: 0,
      maxAttempts: 5,
      isOverdue: true
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesAge = filterAge === 'All' || 
      (filterAge === 'New' && lead.ageInHours < 24) ||
      (filterAge === 'Old' && lead.ageInHours >= 24) ||
      (filterAge === 'Overdue' && lead.isOverdue);
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSource = filterSource === 'All' || lead.source === filterSource;
    
    return matchesAge && matchesStatus && matchesSource;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return b.ageInHours - a.ageInHours;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'source':
        return a.source.localeCompare(b.source);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getAgeColor = (ageInHours: number, isOverdue: boolean) => {
    if (isOverdue) return 'text-red-600';
    if (ageInHours >= 24) return 'text-orange-600';
    if (ageInHours >= 12) return 'text-yellow-600';
    return 'text-green-600';
  };

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

  const handleAssignLead = (lead: LeadTimeData) => {
    console.log('Assign lead:', lead.id);
  };

  const handleContactLead = (lead: LeadTimeData, method: 'call' | 'email' | 'sms') => {
    console.log(`Contact ${lead.name} via ${method}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Time Tracking</h1>
          <p className="text-gray-600">Monitor lead age and assignment times</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Export Report</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Bulk Assign</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500">
              <AlertTriangle className="h-6 w-6 text-white" />
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
              <Clock className="h-6 w-6 text-white" />
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Oldest Unassigned Leads</h3>
          <div className="space-y-3">
            {leads
              .filter(l => !l.assignedTo)
              .sort((a, b) => b.ageInHours - a.ageInHours)
              .slice(0, 3)
              .map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.source} • {lead.email}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getAgeColor(lead.ageInHours, lead.isOverdue)}`}>
                      {formatAge(lead.ageInHours)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDateTime(lead.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Time to Assignment:</span>
              <span className="text-sm font-medium text-gray-900">
                {leads.filter(l => l.timeToAssignment).length > 0 
                  ? formatAge(leads.filter(l => l.timeToAssignment).reduce((sum, l) => sum + (l.timeToAssignment || 0), 0) / leads.filter(l => l.timeToAssignment).length)
                  : 'N/A'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Time to First Contact:</span>
              <span className="text-sm font-medium text-gray-900">
                {leads.filter(l => l.timeToFirstContact).length > 0 
                  ? formatAge(leads.filter(l => l.timeToFirstContact).reduce((sum, l) => sum + (l.timeToFirstContact || 0), 0) / leads.filter(l => l.timeToFirstContact).length)
                  : 'N/A'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Oldest Lead:</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.oldestLead} ({formatAge(stats.oldestAge)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="age">Sort by Age</option>
              <option value="name">Sort by Name</option>
              <option value="source">Sort by Source</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Lead</th>
                <th className="table-header">Source</th>
                <th className="table-header">Status</th>
                <th className="table-header">Assigned To</th>
                <th className="table-header">Age</th>
                <th className="table-header">Priority</th>
                <th className="table-header">Attempts</th>
                <th className="table-header">Created</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="table-cell text-sm text-gray-900">
                    {lead.assignedTo || (
                      <span className="text-red-600 font-medium">Unassigned</span>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className={`font-medium ${getAgeColor(lead.ageInHours, lead.isOverdue)}`}>
                      {formatAge(lead.ageInHours)}
                    </div>
                    {lead.isOverdue && (
                      <div className="text-xs text-red-600">Overdue</div>
                    )}
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.contactAttempts}/{lead.maxAttempts}
                    </div>
                    {lead.contactAttempts >= lead.maxAttempts && (
                      <div className="text-xs text-red-600">Max reached</div>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">
                      {formatDateTime(lead.createdAt)}
                    </div>
                    {lead.assignedAt && (
                      <div className="text-xs text-gray-500">
                        Assigned: {formatDateTime(lead.assignedAt)}
                      </div>
                    )}
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
                      {!lead.assignedTo && (
                        <button 
                          className="text-blue-400 hover:text-blue-600" 
                          title="Assign"
                          onClick={() => handleAssignLead(lead)}
                        >
                          <UserPlus className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        className="text-green-400 hover:text-green-600" 
                        title="Call"
                        onClick={() => handleContactLead(lead, 'call')}
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-purple-400 hover:text-purple-600" 
                        title="Email"
                        onClick={() => handleContactLead(lead, 'email')}
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-yellow-400 hover:text-yellow-600" 
                        title="SMS"
                        onClick={() => handleContactLead(lead, 'sms')}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
