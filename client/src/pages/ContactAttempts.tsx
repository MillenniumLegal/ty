import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Calendar,
  User,
  Eye,
  Edit
} from 'lucide-react';

interface ContactAttempt {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  attemptType: 'Call' | 'SMS' | 'Email';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Failed' | 'Cancelled';
  scheduledAt: string;
  completedAt?: string;
  outcome?: string;
  notes?: string;
  agentId: string;
  agentName: string;
  attemptNumber: number;
  maxAttempts: number;
  priority: 'High' | 'Medium' | 'Low';
  businessHours: boolean;
}

export const ContactAttempts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [selectedAttempts, setSelectedAttempts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAttemptModal, setShowAttemptModal] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<ContactAttempt | null>(null);

  // Mock data - replace with actual API calls
  const contactAttempts: ContactAttempt[] = [
    {
      id: 'CA-001',
      leadId: 'L-001',
      leadName: 'John Smith',
      leadPhone: '+44 1704 773288',
      leadEmail: 'john.smith@email.com',
      attemptType: 'Call',
      status: 'Scheduled',
      scheduledAt: '2024-01-15T14:00:00Z',
      agentId: 'agent1',
      agentName: 'Agent 1',
      attemptNumber: 1,
      maxAttempts: 5,
      priority: 'High',
      businessHours: true
    },
    {
      id: 'CA-002',
      leadId: 'L-002',
      leadName: 'Sarah Johnson',
      leadPhone: '+44 1704 773289',
      leadEmail: 'sarah.j@email.com',
      attemptType: 'SMS',
      status: 'Completed',
      scheduledAt: '2024-01-15T10:30:00Z',
      completedAt: '2024-01-15T10:35:00Z',
      outcome: 'No response',
      notes: 'SMS sent successfully, no reply received',
      agentId: 'agent2',
      agentName: 'Agent 2',
      attemptNumber: 2,
      maxAttempts: 5,
      priority: 'Medium',
      businessHours: true
    },
    {
      id: 'CA-003',
      leadId: 'L-003',
      leadName: 'Mike Wilson',
      leadPhone: '+44 1704 773290',
      leadEmail: 'mike.w@email.com',
      attemptType: 'Email',
      status: 'In Progress',
      scheduledAt: '2024-01-15T11:00:00Z',
      agentId: 'agent1',
      agentName: 'Agent 1',
      attemptNumber: 1,
      maxAttempts: 5,
      priority: 'Low',
      businessHours: true
    },
    {
      id: 'CA-004',
      leadId: 'L-004',
      leadName: 'Emma Davis',
      leadPhone: '+44 1704 773291',
      leadEmail: 'emma.d@email.com',
      attemptType: 'Call',
      status: 'Failed',
      scheduledAt: '2024-01-15T09:00:00Z',
      completedAt: '2024-01-15T09:05:00Z',
      outcome: 'No answer',
      notes: 'Called 3 times, no answer. Voicemail left.',
      agentId: 'agent3',
      agentName: 'Agent 3',
      attemptNumber: 3,
      maxAttempts: 5,
      priority: 'High',
      businessHours: true
    },
    {
      id: 'CA-005',
      leadId: 'L-001',
      leadName: 'John Smith',
      leadPhone: '+44 1704 773288',
      leadEmail: 'john.smith@email.com',
      attemptType: 'Call',
      status: 'Scheduled',
      scheduledAt: '2024-01-16T09:00:00Z',
      agentId: 'agent1',
      agentName: 'Agent 1',
      attemptNumber: 2,
      maxAttempts: 5,
      priority: 'High',
      businessHours: true
    }
  ];

  const filteredAttempts = contactAttempts.filter(attempt => {
    const matchesSearch = attempt.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attempt.leadPhone.includes(searchTerm) ||
                         attempt.leadEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || attempt.attemptType === filterType;
    const matchesStatus = filterStatus === 'All' || attempt.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || attempt.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone className="h-4 w-4" />;
      case 'SMS': return <MessageSquare className="h-4 w-4" />;
      case 'Email': return <Mail className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Clock className="h-4 w-4" />;
      case 'In Progress': return <Play className="h-4 w-4" />;
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Failed': return <XCircle className="h-4 w-4" />;
      case 'Cancelled': return <Pause className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleSelectAttempt = (attemptId: string) => {
    setSelectedAttempts(prev => 
      prev.includes(attemptId) 
        ? prev.filter(id => id !== attemptId)
        : [...prev, attemptId]
    );
  };

  const handleViewAttempt = (attempt: ContactAttempt) => {
    setSelectedAttempt(attempt);
    setShowAttemptModal(true);
  };

  const handleEditAttempt = (attempt: ContactAttempt) => {
    setSelectedAttempt(attempt);
    setShowAttemptModal(true);
  };

  const handleStartAttempt = (attempt: ContactAttempt) => {
    console.log('Start attempt:', attempt.id);
  };

  const handleCompleteAttempt = (attempt: ContactAttempt) => {
    console.log('Complete attempt:', attempt.id);
  };

  const handleRescheduleAttempt = (attempt: ContactAttempt) => {
    console.log('Reschedule attempt:', attempt.id);
  };

  const handleCancelAttempt = (attempt: ContactAttempt) => {
    console.log('Cancel attempt:', attempt.id);
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, 'on attempts:', selectedAttempts);
    setSelectedAttempts([]);
    setShowBulkActions(false);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setFilterType('All');
    setFilterStatus('All');
    setFilterPriority('All');
    setSearchTerm('');
  };

  const handleSelectAll = () => {
    if (selectedAttempts.length === filteredAttempts.length) {
      setSelectedAttempts([]);
    } else {
      setSelectedAttempts(filteredAttempts.map(attempt => attempt.id));
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Attempts</h1>
          <p className="text-gray-600">Track and manage lead contact attempts</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="btn-secondary flex items-center space-x-2"
            onClick={() => console.log('Schedule batch attempts')}
          >
            <Calendar className="h-5 w-5" />
            <span>Schedule Batch</span>
          </button>
          <button 
            className="btn-primary flex items-center space-x-2"
            onClick={() => console.log('Create new attempt')}
          >
            <Phone className="h-5 w-5" />
            <span>New Attempt</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {contactAttempts.filter(a => a.status === 'Scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {contactAttempts.filter(a => a.status === 'In Progress').length}
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
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {contactAttempts.filter(a => a.status === 'Completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-500">
              <XCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">
                {contactAttempts.filter(a => a.status === 'Failed').length}
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
                placeholder="Search by lead name, phone, or email..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="input-field"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Call">Call</option>
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
            </select>
            <select 
              className="input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select 
              className="input-field"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAttempts.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedAttempts.length} attempt(s) selected
            </span>
            <div className="flex space-x-2">
              <button 
                className="btn-primary text-sm"
                onClick={() => handleBulkAction('execute')}
              >
                Execute Selected
              </button>
              <button 
                className="btn-secondary text-sm"
                onClick={() => handleBulkAction('reschedule')}
              >
                Reschedule
              </button>
              <button 
                className="btn-danger text-sm"
                onClick={() => handleBulkAction('cancel')}
              >
                Cancel Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Attempts Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">
                  <input
                    type="checkbox"
                    checked={selectedAttempts.length === filteredAttempts.length && filteredAttempts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                  />
                </th>
                <th className="table-header">Lead</th>
                <th className="table-header">Type</th>
                <th className="table-header">Status</th>
                <th className="table-header">Agent</th>
                <th className="table-header">Scheduled</th>
                <th className="table-header">Attempt</th>
                <th className="table-header">Priority</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={selectedAttempts.includes(attempt.id)}
                      onChange={() => handleSelectAttempt(attempt.id)}
                      className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                    />
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{attempt.leadName}</div>
                      <div className="text-sm text-gray-500">{attempt.leadPhone}</div>
                      <div className="text-sm text-gray-500">{attempt.leadEmail}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(attempt.attemptType)}
                      <span className="text-sm font-medium text-gray-900">{attempt.attemptType}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(attempt.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                        {attempt.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{attempt.agentName}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">
                      {formatDateTime(attempt.scheduledAt)}
                    </div>
                    {attempt.completedAt && (
                      <div className="text-xs text-gray-500">
                        Completed: {formatDateTime(attempt.completedAt)}
                      </div>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {attempt.attemptNumber}/{attempt.maxAttempts}
                    </div>
                    {attempt.attemptNumber >= attempt.maxAttempts && (
                      <div className="text-xs text-red-600">Max reached</div>
                    )}
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(attempt.priority)}`}>
                      {attempt.priority}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-1">
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="View Details"
                        onClick={() => handleViewAttempt(attempt)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {attempt.status === 'Scheduled' && (
                        <>
                          <button 
                            className="text-green-400 hover:text-green-600" 
                            title="Execute Now"
                            onClick={() => handleStartAttempt(attempt)}
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-blue-400 hover:text-blue-600" 
                            title="Reschedule"
                            onClick={() => handleRescheduleAttempt(attempt)}
                          >
                            <Calendar className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-400 hover:text-red-600" 
                            title="Cancel"
                            onClick={() => handleCancelAttempt(attempt)}
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="Edit"
                        onClick={() => handleEditAttempt(attempt)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attempt Details Modal */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Attempts</h3>
        <div className="space-y-4">
          {contactAttempts.slice(0, 3).map((attempt) => (
            <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getTypeIcon(attempt.attemptType)}
                <div>
                  <div className="font-medium text-gray-900">{attempt.leadName}</div>
                  <div className="text-sm text-gray-500">
                    {attempt.attemptType} • {attempt.agentName} • {formatDateTime(attempt.scheduledAt)}
                  </div>
                  {attempt.outcome && (
                    <div className="text-sm text-gray-600">Outcome: {attempt.outcome}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                  {attempt.status}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(attempt.priority)}`}>
                  {attempt.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
