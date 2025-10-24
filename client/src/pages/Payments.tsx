import React, { useState } from 'react';
import { Search, Plus, Eye, Download, CreditCard, PoundSterling, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Payments: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const payments = [
    {
      id: 'INV-001',
      leadName: 'John Smith',
      leadEmail: 'john.smith@email.com',
      amount: 2500,
      status: 'Paid',
      issuedAt: '2024-01-15',
      paidAt: '2024-01-16',
      dueDate: '2024-01-30',
      stripePaymentId: 'pi_1234567890',
    },
    {
      id: 'INV-002',
      leadName: 'Sarah Johnson',
      leadEmail: 'sarah.j@email.com',
      amount: 3200,
      status: 'Sent',
      issuedAt: '2024-01-14',
      paidAt: null,
      dueDate: '2024-01-29',
      stripePaymentId: null,
    },
    {
      id: 'INV-003',
      leadName: 'Mike Wilson',
      leadEmail: 'mike.w@email.com',
      amount: 1800,
      status: 'Overdue',
      issuedAt: '2024-01-10',
      paidAt: null,
      dueDate: '2024-01-25',
      stripePaymentId: null,
    },
    {
      id: 'INV-004',
      leadName: 'Emma Davis',
      leadEmail: 'emma.d@email.com',
      amount: 4200,
      status: 'Draft',
      issuedAt: '2024-01-12',
      paidAt: null,
      dueDate: '2024-01-27',
      stripePaymentId: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.leadEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'Sent')
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueAmount = payments
    .filter(p => p.status === 'Overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage invoices and payment tracking</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {user?.role !== 'Agent' ? (
          <>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-500">
                  <PoundSterling className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">£{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-500">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">£{pendingAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-red-500">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">£{overdueAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card col-span-4">
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Management</h3>
              <p className="text-gray-600">Access to payment information is restricted to management roles.</p>
            </div>
          </div>
        )}
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paid This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.filter(p => p.status === 'Paid').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="input-field">
              <option>All Status</option>
              <option>Draft</option>
              <option>Sent</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
            <select className="input-field">
              <option>All Time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table - Only for Admin/Manager */}
      {user?.role !== 'Agent' && (
        <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Invoice ID</th>
                <th className="table-header">Lead</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
                <th className="table-header">Issued</th>
                <th className="table-header">Due Date</th>
                <th className="table-header">Paid Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{payment.id}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{payment.leadName}</div>
                      <div className="text-sm text-gray-500">{payment.leadEmail}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="font-medium text-gray-900">
                      £{payment.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    {new Date(payment.issuedAt).toLocaleDateString()}
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    {new Date(payment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      {payment.status === 'Sent' && (
                        <button className="text-gray-400 hover:text-gray-600" title="Send Reminder">
                          <CreditCard className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Recent Activity - Only for Admin/Manager */}
      {user?.role !== 'Agent' && (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payment Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Payment received from John Smith</p>
              <p className="text-sm text-gray-600">£2,500 - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Invoice sent to Sarah Johnson</p>
              <p className="text-sm text-gray-600">£3,200 - 1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Payment overdue for Mike Wilson</p>
              <p className="text-sm text-gray-600">£1,800 - 3 days ago</p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Pagination - Only for Admin/Manager */}
      {user?.role !== 'Agent' && (
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
          <span className="font-medium">4</span> results
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary text-sm">Previous</button>
          <button className="btn-primary text-sm">1</button>
          <button className="btn-secondary text-sm">Next</button>
        </div>
      </div>
      )}
    </div>
  );
};



