import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Archive,
  AlertTriangle
} from 'lucide-react';

interface OutcomeCode {
  id: string;
  name: string;
  description: string;
  category: 'Contact' | 'Interest' | 'Follow-up' | 'Close' | 'Archive';
  nextActions: string[];
  autoSchedule: boolean;
  scheduleDelay: number; // hours
  maxAttempts: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WorkflowRule {
  id: string;
  outcomeCodeId: string;
  action: 'Call' | 'SMS' | 'Email' | 'Schedule' | 'Archive' | 'Reassign';
  delay: number; // hours
  isActive: boolean;
  template?: string;
}

export const OutcomeCodes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeCode | null>(null);

  // Mock data - replace with actual API calls
  const outcomeCodes: OutcomeCode[] = [
    {
      id: 'OC-001',
      name: 'Called - No Answer',
      description: 'Lead was called but no answer received',
      category: 'Contact',
      nextActions: ['Schedule callback', 'Send SMS', 'Send email'],
      autoSchedule: true,
      scheduleDelay: 2,
      maxAttempts: 3,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'OC-002',
      name: 'Interested - Quote Requested',
      description: 'Lead is interested and has requested a quote',
      category: 'Interest',
      nextActions: ['Send quote', 'Schedule follow-up call', 'Add to interested list'],
      autoSchedule: true,
      scheduleDelay: 1,
      maxAttempts: 5,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'OC-003',
      name: 'Not Interested',
      description: 'Lead has explicitly stated they are not interested',
      category: 'Archive',
      nextActions: ['Archive lead', 'Send follow-up in 6 months'],
      autoSchedule: false,
      scheduleDelay: 0,
      maxAttempts: 0,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'OC-004',
      name: 'Quote Sent - Awaiting Response',
      description: 'Quote has been sent and waiting for client response',
      category: 'Follow-up',
      nextActions: ['Follow up in 3 days', 'Send reminder email', 'Call to discuss'],
      autoSchedule: true,
      scheduleDelay: 72,
      maxAttempts: 3,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'OC-005',
      name: 'Sold - Ready to Proceed',
      description: 'Lead has agreed to proceed with the service',
      category: 'Close',
      nextActions: ['Generate invoice', 'Send payment link', 'Instruct solicitor'],
      autoSchedule: true,
      scheduleDelay: 0,
      maxAttempts: 0,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'OC-006',
      name: 'Max Attempts Reached',
      description: 'Maximum contact attempts have been reached',
      category: 'Archive',
      nextActions: ['Archive lead', 'Add to future follow-up list'],
      autoSchedule: false,
      scheduleDelay: 0,
      maxAttempts: 0,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }
  ];

  const workflowRules: WorkflowRule[] = [
    {
      id: 'WR-001',
      outcomeCodeId: 'OC-001',
      action: 'Call',
      delay: 2,
      isActive: true,
      template: 'Follow-up call template'
    },
    {
      id: 'WR-002',
      outcomeCodeId: 'OC-001',
      action: 'SMS',
      delay: 4,
      isActive: true,
      template: 'No answer SMS template'
    },
    {
      id: 'WR-003',
      outcomeCodeId: 'OC-002',
      action: 'Email',
      delay: 1,
      isActive: true,
      template: 'Quote email template'
    },
    {
      id: 'WR-004',
      outcomeCodeId: 'OC-004',
      action: 'Call',
      delay: 72,
      isActive: true,
      template: 'Quote follow-up call template'
    }
  ];

  const filteredOutcomes = outcomeCodes.filter(outcome => {
    const matchesSearch = outcome.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        outcome.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || outcome.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Contact': return 'bg-blue-100 text-blue-800';
      case 'Interest': return 'bg-green-100 text-green-800';
      case 'Follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'Close': return 'bg-purple-100 text-purple-800';
      case 'Archive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Call': return <Phone className="h-4 w-4" />;
      case 'SMS': return <MessageSquare className="h-4 w-4" />;
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'Schedule': return <Clock className="h-4 w-4" />;
      case 'Archive': return <Archive className="h-4 w-4" />;
      case 'Reassign': return <Edit className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleEditOutcome = (outcome: OutcomeCode) => {
    setSelectedOutcome(outcome);
    setShowEditModal(true);
  };

  const handleToggleActive = (outcomeId: string) => {
    console.log('Toggle active status for outcome:', outcomeId);
  };

  const handleDeleteOutcome = (outcomeId: string) => {
    console.log('Delete outcome:', outcomeId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outcome Codes</h1>
          <p className="text-gray-600">Manage outcome codes and workflow rules</p>
        </div>
        <button 
          className="btn-primary flex items-center space-x-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Add Outcome Code</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Codes</p>
              <p className="text-2xl font-bold text-gray-900">{outcomeCodes.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {outcomeCodes.filter(o => o.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500">
              <Pause className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">
                {outcomeCodes.filter(o => !o.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Workflow Rules</p>
              <p className="text-2xl font-bold text-gray-900">{workflowRules.length}</p>
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
                placeholder="Search outcome codes..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Contact">Contact</option>
              <option value="Interest">Interest</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Close">Close</option>
              <option value="Archive">Archive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Outcome Codes Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Outcome Code</th>
                <th className="table-header">Category</th>
                <th className="table-header">Next Actions</th>
                <th className="table-header">Auto Schedule</th>
                <th className="table-header">Max Attempts</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOutcomes.map((outcome) => (
                <tr key={outcome.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{outcome.name}</div>
                      <div className="text-sm text-gray-500">{outcome.description}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(outcome.category)}`}>
                      {outcome.category}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">
                      {outcome.nextActions.slice(0, 2).join(', ')}
                      {outcome.nextActions.length > 2 && (
                        <span className="text-gray-500"> +{outcome.nextActions.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {outcome.autoSchedule ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-900">
                        {outcome.autoSchedule ? `${outcome.scheduleDelay}h delay` : 'Manual'}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm font-medium text-gray-900">
                      {outcome.maxAttempts}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleActive(outcome.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          outcome.isActive ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            outcome.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-600">
                        {outcome.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="Edit"
                        onClick={() => handleEditOutcome(outcome)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-600" 
                        title="Delete"
                        onClick={() => handleDeleteOutcome(outcome.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workflow Rules Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Rules</h3>
        <div className="space-y-4">
          {workflowRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getActionIcon(rule.action)}
                <div>
                  <div className="font-medium text-gray-900">{rule.action}</div>
                  <div className="text-sm text-gray-500">
                    {rule.delay}h delay • {rule.template}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  rule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {rule.isActive ? 'Active' : 'Inactive'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {showCreateModal ? 'Create Outcome Code' : 'Edit Outcome Code'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome Name
                  </label>
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="e.g., Called - No Answer"
                    defaultValue={selectedOutcome?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="input-field">
                    <option value="Contact">Contact</option>
                    <option value="Interest">Interest</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Close">Close</option>
                    <option value="Archive">Archive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea 
                  className="input-field"
                  rows={3}
                  placeholder="Describe what this outcome means..."
                  defaultValue={selectedOutcome?.description || ''}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Delay (hours)
                  </label>
                  <input 
                    type="number" 
                    className="input-field"
                    placeholder="0"
                    defaultValue={selectedOutcome?.scheduleDelay || 0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Attempts
                  </label>
                  <input 
                    type="number" 
                    className="input-field"
                    placeholder="5"
                    defaultValue={selectedOutcome?.maxAttempts || 5}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Actions
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Schedule callback</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Send SMS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Send email</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Archive lead</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedOutcome(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  console.log('Save outcome code');
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setSelectedOutcome(null);
                }}
              >
                {showCreateModal ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
