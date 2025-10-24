import React, { useState } from 'react';
import { Save, Plus, Edit, Trash2, Users, Settings as SettingsIcon, Bell, Shield, Target, TrendingUp } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditQuota, setShowEditQuota] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [quotaData, setQuotaData] = useState({
    dailyQuota: 0,
    weeklyQuota: 0,
    monthlyQuota: 0,
    priorityLeads: 0,
    maxConcurrent: 0
  });
  const [showGlobalQuotaModal, setShowGlobalQuotaModal] = useState(false);
  const [showAddOutcomeModal, setShowAddOutcomeModal] = useState(false);
  const [globalQuotaData, setGlobalQuotaData] = useState({
    dailyQuota: 0,
    weeklyQuota: 0,
    monthlyQuota: 0,
    priorityLeads: 0,
    maxConcurrent: 0
  });
  const [newOutcomeCode, setNewOutcomeCode] = useState({
    code: '',
    name: '',
    nextAction: '',
    autoSchedule: false,
    scheduleDelay: 0
  });

  // Mock data - replace with actual API calls
  const users = [
    { id: '1', name: 'Admin User', email: 'admin@crm.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Manager User', email: 'manager@crm.com', role: 'Manager', status: 'Active' },
    { id: '3', name: 'Agent 1', email: 'agent1@crm.com', role: 'Agent', status: 'Active' },
    { id: '4', name: 'Agent 2', email: 'agent2@crm.com', role: 'Agent', status: 'Inactive' },
  ];

  const agentQuotas = [
    {
      id: '3',
      name: 'Agent 1',
      email: 'agent1@crm.com',
      dailyQuota: 15,
      weeklyQuota: 75,
      monthlyQuota: 300,
      priorityLeads: 3,
      maxConcurrent: 5,
      currentLeads: 8,
      todayAssigned: 3,
      weeklyAssigned: 12,
      monthlyAssigned: 45,
      performance: 85
    },
    {
      id: '4',
      name: 'Agent 2',
      email: 'agent2@crm.com',
      dailyQuota: 12,
      weeklyQuota: 60,
      monthlyQuota: 240,
      priorityLeads: 2,
      maxConcurrent: 4,
      currentLeads: 6,
      todayAssigned: 2,
      weeklyAssigned: 8,
      monthlyAssigned: 32,
      performance: 78
    }
  ];

  const outcomeCodes = [
    { id: '1', code: 'CALLED', name: 'Called - No Answer', nextAction: 'sms', autoSchedule: true, scheduleDelay: 2 },
    { id: '2', code: 'INTERESTED', name: 'Interested', nextAction: 'email', autoSchedule: true, scheduleDelay: 1 },
    { id: '3', code: 'NOT_INTERESTED', name: 'Not Interested', nextAction: 'archive', autoSchedule: false },
    { id: '4', code: 'QUOTE_SENT', name: 'Quote Sent', nextAction: 'call', autoSchedule: true, scheduleDelay: 24 },
  ];

  const tabs = [
    { id: 'users', name: 'Users', icon: Users },
    { id: 'quotas', name: 'Lead Quotas', icon: Target },
    { id: 'outcomes', name: 'Outcome Codes', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'Agent': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditQuota = (agent: any) => {
    setSelectedAgent(agent);
    setQuotaData({
      dailyQuota: agent.dailyQuota,
      weeklyQuota: agent.weeklyQuota,
      monthlyQuota: agent.monthlyQuota,
      priorityLeads: agent.priorityLeads,
      maxConcurrent: agent.maxConcurrent
    });
    setShowEditQuota(true);
  };

  const handleSaveQuota = () => {
    console.log('Save quota for agent:', selectedAgent.id, quotaData);
    setShowEditQuota(false);
    setSelectedAgent(null);
  };

  const getQuotaStatus = (assigned: number, quota: number) => {
    const percentage = (assigned / quota) * 100;
    if (percentage >= 100) return { status: 'Full', color: 'text-red-600 bg-red-50' };
    if (percentage >= 80) return { status: 'Near Limit', color: 'text-yellow-600 bg-yellow-50' };
    return { status: 'Available', color: 'text-green-600 bg-green-50' };
  };

  const handleSetGlobalQuota = () => {
    setShowGlobalQuotaModal(true);
  };

  const handleSaveGlobalQuota = () => {
    console.log('Setting global quotas:', globalQuotaData);
    setShowGlobalQuotaModal(false);
    setGlobalQuotaData({
      dailyQuota: 0,
      weeklyQuota: 0,
      monthlyQuota: 0,
      priorityLeads: 0,
      maxConcurrent: 0
    });
  };

  const handleAddOutcomeCode = () => {
    setShowAddOutcomeModal(true);
  };

  const handleSaveOutcomeCode = () => {
    console.log('Adding new outcome code:', newOutcomeCode);
    setShowAddOutcomeModal(false);
    setNewOutcomeCode({
      code: '',
      name: '',
      nextAction: '',
      autoSchedule: false,
      scheduleDelay: 0
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage system configuration and users</p>
      </div>

      {/* Tab Navigation */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-navy-100 text-navy-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            <button 
              onClick={() => setShowAddUser(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add User</span>
            </button>
          </div>

          <div className="card p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="table-cell font-medium text-gray-900">{user.name}</td>
                      <td className="table-cell text-gray-900">{user.email}</td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600" title="Delete">
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
        </div>
      )}

      {/* Lead Quotas Tab */}
      {activeTab === 'quotas' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Lead Quotas Management</h2>
              <p className="text-sm text-gray-600">Set daily, weekly, and monthly lead quotas for agents</p>
            </div>
            <button 
              className="btn-primary flex items-center space-x-2"
              onClick={handleSetGlobalQuota}
            >
              <Plus className="h-5 w-5" />
              <span>Set Global Quotas</span>
            </button>
          </div>

          {/* Quota Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-500">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Daily Quota</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agentQuotas.reduce((sum, agent) => sum + agent.dailyQuota, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-500">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Leads Assigned Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agentQuotas.reduce((sum, agent) => sum + agent.todayAssigned, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{agentQuotas.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Quotas Table */}
          <div className="card p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Agent</th>
                    <th className="table-header">Daily Quota</th>
                    <th className="table-header">Weekly Quota</th>
                    <th className="table-header">Monthly Quota</th>
                    <th className="table-header">Priority Leads</th>
                    <th className="table-header">Max Concurrent</th>
                    <th className="table-header">Current Status</th>
                    <th className="table-header">Performance</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agentQuotas.map((agent) => {
                    const dailyStatus = getQuotaStatus(agent.todayAssigned, agent.dailyQuota);
                    const weeklyStatus = getQuotaStatus(agent.weeklyAssigned, agent.weeklyQuota);
                    const monthlyStatus = getQuotaStatus(agent.monthlyAssigned, agent.monthlyQuota);
                    
                    return (
                      <tr key={agent.id} className="hover:bg-gray-50">
                        <td className="table-cell">
                          <div>
                            <div className="font-medium text-gray-900">{agent.name}</div>
                            <div className="text-sm text-gray-500">{agent.email}</div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{agent.dailyQuota}</span>
                            <span className="text-sm text-gray-500">({agent.todayAssigned} assigned)</span>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${dailyStatus.color}`}>
                            {dailyStatus.status}
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{agent.weeklyQuota}</span>
                            <span className="text-sm text-gray-500">({agent.weeklyAssigned} assigned)</span>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${weeklyStatus.color}`}>
                            {weeklyStatus.status}
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{agent.monthlyQuota}</span>
                            <span className="text-sm text-gray-500">({agent.monthlyAssigned} assigned)</span>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${monthlyStatus.color}`}>
                            {monthlyStatus.status}
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="font-medium text-gray-900">{agent.priorityLeads}</span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{agent.maxConcurrent}</span>
                            <span className="text-sm text-gray-500">({agent.currentLeads} current)</span>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium">Daily:</span> {agent.todayAssigned}/{agent.dailyQuota}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Weekly:</span> {agent.weeklyAssigned}/{agent.weeklyQuota}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Monthly:</span> {agent.monthlyAssigned}/{agent.monthlyQuota}
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${agent.performance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{agent.performance}%</span>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex space-x-2">
                            <button 
                              className="text-gray-400 hover:text-gray-600" 
                              title="Edit Quota"
                              onClick={() => handleEditQuota(agent)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-600" title="View Details">
                              <TrendingUp className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Outcome Codes Tab */}
      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Outcome Codes</h2>
            <button 
              className="btn-primary flex items-center space-x-2"
              onClick={handleAddOutcomeCode}
            >
              <Plus className="h-5 w-5" />
              <span>Add Outcome Code</span>
            </button>
          </div>

          <div className="card p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Code</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Next Action</th>
                    <th className="table-header">Auto Schedule</th>
                    <th className="table-header">Delay (hours)</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {outcomeCodes.map((code) => (
                    <tr key={code.id} className="hover:bg-gray-50">
                      <td className="table-cell font-medium text-gray-900">{code.code}</td>
                      <td className="table-cell text-gray-900">{code.name}</td>
                      <td className="table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {code.nextAction}
                        </span>
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          code.autoSchedule ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {code.autoSchedule ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="table-cell text-gray-900">{code.scheduleDelay || '-'}</td>
                      <td className="table-cell">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600" title="Delete">
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
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
          
          <div className="card">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Lead Assignments</p>
                  <p className="text-sm text-gray-600">Get notified when new leads are assigned to you</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Received</p>
                  <p className="text-sm text-gray-600">Get notified when payments are received</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Overdue Payments</p>
                  <p className="text-sm text-gray-600">Get notified about overdue payments</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-md font-semibold text-gray-900 mb-4">SMS Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Urgent Lead Updates</p>
                  <p className="text-sm text-gray-600">Get SMS for urgent lead updates</p>
                </div>
                <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" />
              </div>
            </div>
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Settings</span>
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
          
          <div className="card">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Password Policy</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Password Length</label>
                <input type="number" className="input-field mt-1" defaultValue="8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
                <input type="number" className="input-field mt-1" defaultValue="90" />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Session Management</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                <input type="number" className="input-field mt-1" defaultValue="30" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" defaultChecked />
                <label className="ml-2 text-sm text-gray-700">Require re-authentication for sensitive actions</label>
              </div>
            </div>
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Settings</span>
          </button>
        </div>
      )}

      {/* Quota Edit Modal */}
      {showEditQuota && selectedAgent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Quotas for {selectedAgent.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowEditQuota(false)}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Quota</label>
                  <input
                    type="number"
                    className="input-field"
                    value={quotaData.dailyQuota}
                    onChange={(e) => setQuotaData({...quotaData, dailyQuota: parseInt(e.target.value) || 0})}
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum leads per day</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Quota</label>
                  <input
                    type="number"
                    className="input-field"
                    value={quotaData.weeklyQuota}
                    onChange={(e) => setQuotaData({...quotaData, weeklyQuota: parseInt(e.target.value) || 0})}
                    min="0"
                    max="250"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum leads per week</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Quota</label>
                  <input
                    type="number"
                    className="input-field"
                    value={quotaData.monthlyQuota}
                    onChange={(e) => setQuotaData({...quotaData, monthlyQuota: parseInt(e.target.value) || 0})}
                    min="0"
                    max="1000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum leads per month</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Leads</label>
                  <input
                    type="number"
                    className="input-field"
                    value={quotaData.priorityLeads}
                    onChange={(e) => setQuotaData({...quotaData, priorityLeads: parseInt(e.target.value) || 0})}
                    min="0"
                    max="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">High priority leads per day</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Leads</label>
                  <input
                    type="number"
                    className="input-field"
                    value={quotaData.maxConcurrent}
                    onChange={(e) => setQuotaData({...quotaData, maxConcurrent: parseInt(e.target.value) || 0})}
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum active leads at once</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Current Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Today:</span>
                    <span className="ml-2 font-medium">{selectedAgent.todayAssigned}/{selectedAgent.dailyQuota}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">This Week:</span>
                    <span className="ml-2 font-medium">{selectedAgent.weeklyAssigned}/{selectedAgent.weeklyQuota}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">This Month:</span>
                    <span className="ml-2 font-medium">{selectedAgent.monthlyAssigned}/{selectedAgent.monthlyQuota}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Performance:</span>
                    <span className="ml-2 font-medium text-green-600">{selectedAgent.performance}%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowEditQuota(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSaveQuota}
                >
                  Save Quotas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Quota Modal */}
      {showGlobalQuotaModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Set Global Quotas</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowGlobalQuotaModal(false)}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Quota</label>
                  <input
                    type="number"
                    className="input-field"
                    value={globalQuotaData.dailyQuota}
                    onChange={(e) => setGlobalQuotaData({...globalQuotaData, dailyQuota: parseInt(e.target.value) || 0})}
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum leads per day for all agents</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Quota</label>
                  <input
                    type="number"
                    className="input-field"
                    value={globalQuotaData.weeklyQuota}
                    onChange={(e) => setGlobalQuotaData({...globalQuotaData, weeklyQuota: parseInt(e.target.value) || 0})}
                    min="0"
                    max="250"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum leads per week for all agents</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Quota</label>
                  <input
                    type="number"
                    className="input-field"
                    value={globalQuotaData.monthlyQuota}
                    onChange={(e) => setGlobalQuotaData({...globalQuotaData, monthlyQuota: parseInt(e.target.value) || 0})}
                    min="0"
                    max="1000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum leads per month for all agents</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Leads</label>
                  <input
                    type="number"
                    className="input-field"
                    value={globalQuotaData.priorityLeads}
                    onChange={(e) => setGlobalQuotaData({...globalQuotaData, priorityLeads: parseInt(e.target.value) || 0})}
                    min="0"
                    max="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">High priority leads per day for all agents</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Leads</label>
                  <input
                    type="number"
                    className="input-field"
                    value={globalQuotaData.maxConcurrent}
                    onChange={(e) => setGlobalQuotaData({...globalQuotaData, maxConcurrent: parseInt(e.target.value) || 0})}
                    min="0"
                    max="20"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum active leads at once for all agents</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowGlobalQuotaModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSaveGlobalQuota}
                >
                  Set Global Quotas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Outcome Code Modal */}
      {showAddOutcomeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Outcome Code</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowAddOutcomeModal(false)}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newOutcomeCode.code}
                    onChange={(e) => setNewOutcomeCode({...newOutcomeCode, code: e.target.value})}
                    placeholder="e.g., INT, NOT, BUS"
                  />
                  <p className="text-xs text-gray-500 mt-1">Short code for the outcome</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newOutcomeCode.name}
                    onChange={(e) => setNewOutcomeCode({...newOutcomeCode, name: e.target.value})}
                    placeholder="e.g., Interested, Not Interested, Busy"
                  />
                  <p className="text-xs text-gray-500 mt-1">Full name of the outcome</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Next Action</label>
                  <select
                    className="input-field"
                    value={newOutcomeCode.nextAction}
                    onChange={(e) => setNewOutcomeCode({...newOutcomeCode, nextAction: e.target.value})}
                  >
                    <option value="">Select next action...</option>
                    <option value="Call Back">Call Back</option>
                    <option value="Send Quote">Send Quote</option>
                    <option value="Schedule Follow-up">Schedule Follow-up</option>
                    <option value="Close Lead">Close Lead</option>
                    <option value="Reassign">Reassign</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto Schedule</label>
                  <select
                    className="input-field"
                    value={newOutcomeCode.autoSchedule.toString()}
                    onChange={(e) => setNewOutcomeCode({...newOutcomeCode, autoSchedule: e.target.value === 'true'})}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Delay (hours)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newOutcomeCode.scheduleDelay}
                    onChange={(e) => setNewOutcomeCode({...newOutcomeCode, scheduleDelay: parseInt(e.target.value) || 0})}
                    min="0"
                    max="168"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hours to wait before scheduling (0-168)</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowAddOutcomeModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSaveOutcomeCode}
                >
                  Add Outcome Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
