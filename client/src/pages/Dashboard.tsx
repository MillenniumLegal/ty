import React from 'react';
import { Users, UserCheck, TrendingUp, PoundSterling, Clock, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Mock data - replace with actual API calls
  const stats = {
    totalLeads: 1247,
    newLeads: 23,
    activeLeads: 156,
    closedLeads: 89,
    conversionRate: 12.5,
    totalSales: 45600,
    assignedLeads: 134,
    unassignedLeads: 22,
  };

  // Role-based recent activity
  const getRecentActivity = () => {
    if (user?.role === 'Agent') {
      return [
        { id: 1, action: 'Lead contacted', lead: 'John Smith', time: '2 minutes ago', type: 'assignment' },
        { id: 2, action: 'Quote sent', lead: 'Sarah Johnson', time: '15 minutes ago', type: 'quote' },
        { id: 3, action: 'Follow-up completed', lead: 'Mike Wilson', time: '1 hour ago', type: 'payment' },
        { id: 4, action: 'New lead assigned to you', lead: 'Emma Davis', time: '2 hours ago', type: 'followup' },
      ];
    } else {
      return [
        { id: 1, action: 'New conveyancing lead assigned', lead: 'John Smith', time: '2 minutes ago', type: 'assignment' },
        { id: 2, action: 'Conveyancing quote sent', lead: 'Sarah Johnson', time: '15 minutes ago', type: 'quote' },
        { id: 3, action: 'Payment received', lead: 'Mike Wilson', time: '1 hour ago', type: 'payment' },
        { id: 4, action: 'Follow-up scheduled', lead: 'Emma Davis', time: '2 hours ago', type: 'followup' },
      ];
    }
  };

  const recentActivity = getRecentActivity();

  // Role-based dashboard cards
  const getStatCards = () => {
    if (user?.role === 'Agent') {
      // Agents only see their assigned leads and personal metrics
      return [
        {
          title: 'My Assigned Leads',
          value: '12',
          icon: User,
          color: 'bg-blue-500',
          change: '+2',
          changeType: 'positive' as const,
        },
        {
          title: 'Leads Contacted Today',
          value: '8',
          icon: UserCheck,
          color: 'bg-green-500',
          change: '+3',
          changeType: 'positive' as const,
        },
        {
          title: 'Follow-ups Due',
          value: '5',
          icon: Clock,
          color: 'bg-yellow-500',
          change: '-1',
          changeType: 'negative' as const,
        },
        {
          title: 'Quotes Sent',
          value: '3',
          icon: CheckCircle,
          color: 'bg-purple-500',
          change: '+1',
          changeType: 'positive' as const,
        }
      ];
    } else {
      // Management sees full overview
      return [
        {
          title: 'Total Leads',
          value: stats.totalLeads.toLocaleString(),
          icon: Users,
          color: 'bg-blue-500',
          change: '+12%',
          changeType: 'positive' as const,
        },
        {
          title: 'New Leads',
          value: stats.newLeads,
          icon: UserCheck,
          color: 'bg-green-500',
          change: '+5',
          changeType: 'positive' as const,
        },
        {
          title: 'Active Leads',
          value: stats.activeLeads,
          icon: Clock,
          color: 'bg-yellow-500',
          change: '-3',
          changeType: 'negative' as const,
        },
        {
          title: 'Closed Leads',
          value: stats.closedLeads,
          icon: CheckCircle,
          color: 'bg-purple-500',
          change: '+8',
          changeType: 'positive' as const,
        },
        {
          title: 'Conversion Rate',
          value: `${stats.conversionRate}%`,
          icon: TrendingUp,
          color: 'bg-teal-500',
          change: '+2.1%',
          changeType: 'positive' as const,
        },
        {
          title: 'Total Sales',
          value: `£${stats.totalSales.toLocaleString()}`,
          icon: PoundSterling,
          color: 'bg-green-500',
          change: '+£2,400',
          changeType: 'positive' as const,
        },
      ];
    }
  };

  const statCards = getStatCards();

  // Quick action handlers
  const handleViewMyLeads = () => {
    navigate('/lead-management?filter=assigned');
  };

  const handleCreateQuote = () => {
    navigate('/quotes?action=create');
  };

  const handleScheduleFollowups = () => {
    navigate('/diary?action=schedule');
  };

  const handleViewPerformance = () => {
    navigate('/reports?type=performance');
  };

  const handleViewUnassignedLeads = () => {
    navigate('/lead-management?filter=unassigned');
  };

  const handleGenerateReport = () => {
    navigate('/reports?type=overview');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.role === 'Agent' ? 'My Dashboard' : 'Dashboard'}
        </h1>
        <p className="text-gray-600">
          {user?.role === 'Agent' 
            ? `Welcome back, ${user.name}! Here's your personal lead overview.`
            : 'Welcome back! Here\'s what\'s happening with your conveyancing leads.'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'assignment' ? 'bg-blue-500' :
                  activity.type === 'quote' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.lead}</p>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {user?.role === 'Agent' ? (
              <>
                <button 
                  className="w-full btn-primary text-left"
                  onClick={handleViewMyLeads}
                >
                  View My Assigned Leads
                </button>
                <button 
                  className="w-full btn-secondary text-left"
                  onClick={handleCreateQuote}
                >
                  Create New Conveyancing Quote
                </button>
                <button 
                  className="w-full btn-success text-left"
                  onClick={handleScheduleFollowups}
                >
                  Schedule Follow-ups
                </button>
                <button 
                  className="w-full btn-secondary text-left"
                  onClick={handleViewPerformance}
                >
                  View My Performance
                </button>
              </>
            ) : (
              <>
                <button 
                  className="w-full btn-primary text-left"
                  onClick={handleViewUnassignedLeads}
                >
                  View Unassigned Conveyancing Leads
                </button>
                <button 
                  className="w-full btn-secondary text-left"
                  onClick={handleGenerateReport}
                >
                  Generate Conveyancing Report
                </button>
                <button 
                  className="w-full btn-success text-left"
                  onClick={handleCreateQuote}
                >
                  Create New Conveyancing Quote
                </button>
                <button 
                  className="w-full btn-secondary text-left"
                  onClick={handleScheduleFollowups}
                >
                  Schedule Follow-ups
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lead Status Overview - Only for Management */}
      {user?.role !== 'Agent' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.newLeads}</div>
              <div className="text-sm text-blue-600">New Leads</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.activeLeads}</div>
              <div className="text-sm text-yellow-600">Active</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.closedLeads}</div>
              <div className="text-sm text-green-600">Closed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{stats.unassignedLeads}</div>
              <div className="text-sm text-gray-600">Unassigned</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
