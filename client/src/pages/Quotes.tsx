import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Download, Send, FileText, Save, History, Calculator, Trash2, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'Legal Fees' | 'Disbursements' | 'VAT' | 'Other';
}

interface Quote {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  version: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  totalAmount: number;
  vatAmount: number;
  netAmount: number;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  items: QuoteItem[];
  notes?: string;
  terms?: string;
}

export const Quotes: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState<Partial<QuoteItem>>({
    description: '',
    quantity: 1,
    unitPrice: 0,
    category: 'Legal Fees'
  });

  // Handle URL parameters for actions
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'create') {
      handleCreateQuote();
    }
  }, [searchParams]);

  // Mock data - replace with actual API calls
  const quotes: Quote[] = [
    {
      id: 'Q-001',
      leadId: 'L-001',
      leadName: 'John Smith',
      leadEmail: 'john.smith@email.com',
      leadPhone: '+44 1704 773288',
      version: 1,
      status: 'Draft',
      totalAmount: 1200,
      vatAmount: 240,
      netAmount: 960,
      validUntil: '2024-02-15T23:59:59Z',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      items: [
        {
          id: 'QI-001',
          description: 'Residential Conveyancing - Purchase',
          quantity: 1,
          unitPrice: 800,
          total: 800,
          category: 'Legal Fees'
        },
        {
          id: 'QI-002',
          description: 'Land Registry Fees',
          quantity: 1,
          unitPrice: 200,
          total: 200,
          category: 'Disbursements'
        },
        {
          id: 'QI-003',
          description: 'VAT (20%)',
          quantity: 1,
          unitPrice: 200,
          total: 200,
          category: 'VAT'
        }
      ],
      notes: 'Standard residential conveyancing quote',
      terms: 'Payment due within 30 days of acceptance'
    },
    {
      id: 'Q-002',
      leadId: 'L-002',
      leadName: 'Sarah Johnson',
      leadEmail: 'sarah.j@email.com',
      leadPhone: '+44 1704 773289',
      version: 2,
      status: 'Sent',
      totalAmount: 1500,
      vatAmount: 300,
      netAmount: 1200,
      validUntil: '2024-02-20T23:59:59Z',
      createdAt: '2024-01-14T14:30:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      sentAt: '2024-01-15T09:15:00Z',
      items: [
        {
          id: 'QI-004',
          description: 'Commercial Property Purchase',
          quantity: 1,
          unitPrice: 1000,
          total: 1000,
          category: 'Legal Fees'
        },
        {
          id: 'QI-005',
          description: 'Searches and Enquiries',
          quantity: 1,
          unitPrice: 300,
          total: 300,
          category: 'Disbursements'
        },
        {
          id: 'QI-006',
          description: 'VAT (20%)',
          quantity: 1,
          unitPrice: 200,
          total: 200,
          category: 'VAT'
        }
      ],
      notes: 'Commercial property transaction with additional searches',
      terms: 'Payment due within 14 days of acceptance'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowEditor(true);
    setIsEditing(true);
  };

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowEditor(true);
    setIsEditing(false);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedQuote(null);
    setIsEditing(false);
  };

  const handleSaveQuote = () => {
    console.log('Save quote:', selectedQuote?.id);
    setIsEditing(false);
  };

  const handleSendQuote = () => {
    setShowSendModal(true);
  };

  const handleAddItem = () => {
    if (selectedQuote && newItem.description && newItem.unitPrice) {
      const item: QuoteItem = {
        id: `QI-${Date.now()}`,
        description: newItem.description,
        quantity: newItem.quantity || 1,
        unitPrice: newItem.unitPrice,
        total: (newItem.quantity || 1) * newItem.unitPrice,
        category: newItem.category || 'Legal Fees'
      };
      
      console.log('Add item:', item);
      setNewItem({
        description: '',
        quantity: 1,
        unitPrice: 0,
        category: 'Legal Fees'
      });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    console.log('Remove item:', itemId);
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

  const filteredQuotes = quotes.filter(quote =>
    quote.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.leadEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conveyancing Quotes</h1>
          <p className="text-gray-600">Manage and track all your conveyancing quotes</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Quote</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotes..."
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
              <option>Accepted</option>
              <option>Rejected</option>
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

      {/* Quotes Table */}
      <div className="card p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Quote ID</th>
                <th className="table-header">Lead</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
                <th className="table-header">Created</th>
                <th className="table-header">Last Edited</th>
                <th className="table-header">Version</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{quote.id}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{quote.leadName}</div>
                      <div className="text-sm text-gray-500">{quote.leadEmail}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="font-medium text-gray-900">
                      £{quote.totalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    {new Date(quote.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    v{quote.version}
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="View"
                        onClick={() => handleViewQuote(quote)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="Edit"
                        onClick={() => handleEditQuote(quote)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="Download"
                        onClick={() => console.log('Download quote:', quote.id)}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600" 
                        title="Send"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setShowSendModal(true);
                        }}
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{quotes.length}</div>
          <div className="text-sm text-gray-600">Total Quotes</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            £{quotes.filter(q => q.status === 'Accepted').reduce((sum, q) => sum + q.totalAmount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Accepted Value</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {quotes.filter(q => q.status === 'Sent').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600">
            {Math.round((quotes.filter(q => q.status === 'Accepted').length / quotes.length) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Acceptance Rate</div>
        </div>
      </div>

      {/* Pagination */}
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

      {/* Quote Editor Modal */}
      {showEditor && selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? 'Edit' : 'View'} Quote {selectedQuote.id} - Version {selectedQuote.version}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCloseEditor}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Quote Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Lead Information</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Name: {selectedQuote.leadName}</div>
                    <div className="text-sm text-gray-600">Email: {selectedQuote.leadEmail}</div>
                    <div className="text-sm text-gray-600">Phone: {selectedQuote.leadPhone}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Quote Details</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedQuote.status)}`}>{selectedQuote.status}</span></div>
                    <div className="text-sm text-gray-600">Created: {formatDateTime(selectedQuote.createdAt)}</div>
                    <div className="text-sm text-gray-600">Valid Until: {formatDateTime(selectedQuote.validUntil)}</div>
                  </div>
                </div>
              </div>

              {/* Quote Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Quote Items</h4>
                  {isEditing && (
                    <button className="btn-primary text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </button>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="table-header">Description</th>
                        <th className="table-header">Category</th>
                        <th className="table-header">Quantity</th>
                        <th className="table-header">Unit Price</th>
                        <th className="table-header">Total</th>
                        {isEditing && <th className="table-header">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedQuote.items.map((item) => (
                        <tr key={item.id}>
                          <td className="table-cell">
                            <div className="font-medium text-gray-900">{item.description}</div>
                          </td>
                          <td className="table-cell">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {item.category}
                            </span>
                          </td>
                          <td className="table-cell">
                            {isEditing ? (
                              <input 
                                type="number" 
                                className="w-20 input-field"
                                value={item.quantity}
                                onChange={(e) => console.log('Update quantity:', item.id, e.target.value)}
                              />
                            ) : (
                              <span className="text-sm text-gray-900">{item.quantity}</span>
                            )}
                          </td>
                          <td className="table-cell">
                            {isEditing ? (
                              <input 
                                type="number" 
                                className="w-24 input-field"
                                value={item.unitPrice}
                                onChange={(e) => console.log('Update unit price:', item.id, e.target.value)}
                              />
                            ) : (
                              <span className="text-sm text-gray-900">£{item.unitPrice.toLocaleString()}</span>
                            )}
                          </td>
                          <td className="table-cell">
                            <span className="font-medium text-gray-900">£{item.total.toLocaleString()}</span>
                          </td>
                          {isEditing && (
                            <td className="table-cell">
                              <button 
                                className="text-red-400 hover:text-red-600"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quote Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Net Amount:</span>
                    <span className="text-sm font-medium text-gray-900">£{selectedQuote.netAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">VAT (20%):</span>
                    <span className="text-sm font-medium text-gray-900">£{selectedQuote.vatAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-semibold text-gray-900">£{selectedQuote.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Notes and Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  {isEditing ? (
                    <textarea 
                      className="input-field"
                      rows={4}
                      value={selectedQuote.notes || ''}
                      onChange={(e) => console.log('Update notes:', e.target.value)}
                      placeholder="Add quote notes..."
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{selectedQuote.notes || 'No notes added'}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Terms & Conditions</h4>
                  {isEditing ? (
                    <textarea 
                      className="input-field"
                      rows={4}
                      value={selectedQuote.terms || ''}
                      onChange={(e) => console.log('Update terms:', e.target.value)}
                      placeholder="Add terms and conditions..."
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{selectedQuote.terms || 'No terms specified'}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button 
                  className="btn-secondary"
                  onClick={handleCloseEditor}
                >
                  Close
                </button>
                {isEditing && (
                  <>
                    <button 
                      className="btn-secondary flex items-center space-x-2"
                      onClick={() => setShowHistory(true)}
                    >
                      <History className="h-4 w-4" />
                      <span>History</span>
                    </button>
                    <button 
                      className="btn-primary flex items-center space-x-2"
                      onClick={handleSaveQuote}
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Quote</span>
                    </button>
                  </>
                )}
                <button 
                  className="btn-primary flex items-center space-x-2"
                  onClick={handleSendQuote}
                >
                  <Send className="h-4 w-4" />
                  <span>Send Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Quote Modal */}
      {showSendModal && selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Send Quote to {selectedQuote.leadName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="input-field"
                  defaultValue={selectedQuote.leadEmail}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input 
                  type="text" 
                  className="input-field"
                  defaultValue={`Quote ${selectedQuote.id} - Millennium Legal`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  className="input-field"
                  rows={4}
                  defaultValue="Please find attached your quote for legal services. If you have any questions, please don't hesitate to contact us."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="btn-secondary"
                onClick={() => setShowSendModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  console.log('Send quote:', selectedQuote.id);
                  setShowSendModal(false);
                }}
              >
                Send Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
