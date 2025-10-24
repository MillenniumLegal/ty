import React, { useState, useEffect } from 'react';
import { Download, Filter, BarChart3, TrendingUp, Users, PoundSterling, Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Reports: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30');

  // Handle URL parameters for report type
  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setSelectedReport(type);
    }
  }, [searchParams]);

  // Mock data - replace with actual API calls
  const reportData = {
    overview: {
      totalLeads: 1247,
      conversionRate: 12.5,
      totalRevenue: 45600,
      averageDealSize: 3200,
      leadsBySource: [
        { source: 'Hoowla', count: 450, percentage: 36 },
        { source: 'Comparison Site', count: 380, percentage: 30 },
        { source: 'Direct', count: 250, percentage: 20 },
        { source: 'Referral', count: 167, percentage: 14 },
      ],
      leadsByStatus: [
        { status: 'New', count: 89, percentage: 7 },
        { status: 'Contacted', count: 234, percentage: 19 },
        { status: 'Interested', count: 156, percentage: 13 },
        { status: 'Quote Sent', count: 98, percentage: 8 },
        { status: 'Sold', count: 156, percentage: 13 },
        { status: 'Closed', count: 514, percentage: 40 },
      ],
    },
    performance: {
      topAgents: [
        { name: 'Agent 1', leads: 89, conversions: 12, revenue: 15600 },
        { name: 'Agent 2', leads: 76, conversions: 10, revenue: 13200 },
        { name: 'Agent 3', leads: 65, conversions: 8, revenue: 10800 },
      ],
      monthlyTrends: [
        { month: 'Jan', leads: 89, revenue: 15600 },
        { month: 'Feb', leads: 95, revenue: 18200 },
        { month: 'Mar', leads: 78, revenue: 14200 },
        { month: 'Apr', leads: 102, revenue: 19800 },
      ],
    },
  };

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'leads', name: 'Lead Analysis', icon: Users },
    { id: 'revenue', name: 'Revenue Report', icon: PoundSterling },
  ];

  const handleExport = (format: 'csv' | 'excel') => {
    // Mock export functionality
    console.log(`Exporting ${selectedReport} report as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Analytics and insights for your CRM</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleExport('csv')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleExport('excel')}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedReport === report.id
                    ? 'bg-navy-100 text-navy-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{report.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-3xl font-bold text-gray-900">{reportData.overview.totalLeads}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600">{reportData.overview.conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600">£{reportData.overview.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600">£{reportData.overview.averageDealSize.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Avg Deal Size</div>
            </div>
          </div>

          {/* Leads by Source */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads by Source</h3>
              <div className="space-y-3">
                {reportData.overview.leadsBySource.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{item.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{item.count}</div>
                      <div className="text-xs text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads by Status</h3>
              <div className="space-y-3">
                {reportData.overview.leadsByStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-yellow-500' :
                        index === 2 ? 'bg-green-500' :
                        index === 3 ? 'bg-purple-500' :
                        index === 4 ? 'bg-green-600' : 'bg-gray-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{item.status}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{item.count}</div>
                      <div className="text-xs text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Report */}
      {selectedReport === 'performance' && (
        <div className="space-y-6">
          {/* Top Agents */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Agent</th>
                    <th className="table-header">Leads</th>
                    <th className="table-header">Conversions</th>
                    <th className="table-header">Revenue</th>
                    <th className="table-header">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.performance.topAgents.map((agent, index) => (
                    <tr key={index}>
                      <td className="table-cell font-medium text-gray-900">{agent.name}</td>
                      <td className="table-cell">{agent.leads}</td>
                      <td className="table-cell">{agent.conversions}</td>
                      <td className="table-cell">£{agent.revenue.toLocaleString()}</td>
                      <td className="table-cell">
                        {Math.round((agent.conversions / agent.leads) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Month</th>
                    <th className="table-header">Leads</th>
                    <th className="table-header">Revenue</th>
                    <th className="table-header">Avg Deal Size</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.performance.monthlyTrends.map((month, index) => (
                    <tr key={index}>
                      <td className="table-cell font-medium text-gray-900">{month.month}</td>
                      <td className="table-cell">{month.leads}</td>
                      <td className="table-cell">£{month.revenue.toLocaleString()}</td>
                      <td className="table-cell">£{Math.round(month.revenue / month.leads).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Other report types would go here */}
      {selectedReport === 'leads' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Analysis Report</h3>
          <p className="text-gray-600">Detailed lead analysis coming soon...</p>
        </div>
      )}

      {selectedReport === 'revenue' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Report</h3>
          <p className="text-gray-600">Revenue analysis coming soon...</p>
        </div>
      )}
    </div>
  );
};



