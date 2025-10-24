import React, { useState } from 'react';
import { 
  Save, 
  Send, 
  Download, 
  Eye, 
  Edit, 
  History, 
  Plus, 
  Trash2,
  Calculator,
  FileText,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

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

interface QuoteHistory {
  id: string;
  quoteId: string;
  action: 'Created' | 'Updated' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  timestamp: string;
  userId: string;
  userName: string;
  notes?: string;
  changes?: string;
}

export const QuoteEditor: React.FC = () => {
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

  const quoteHistory: QuoteHistory[] = [
    {
      id: 'QH-001',
      quoteId: 'Q-001',
      action: 'Created',
      timestamp: '2024-01-15T10:00:00Z',
      userId: 'user1',
      userName: 'Agent 1',
      notes: 'Initial quote created'
    },
    {
      id: 'QH-002',
      quoteId: 'Q-001',
      action: 'Updated',
      timestamp: '2024-01-15T11:30:00Z',
      userId: 'user1',
      userName: 'Agent 1',
      changes: 'Updated legal fees from £750 to £800'
    },
    {
      id: 'QH-003',
      quoteId: 'Q-002',
      action: 'Sent',
      timestamp: '2024-01-15T09:15:00Z',
      userId: 'user2',
      userName: 'Agent 2',
      notes: 'Quote sent via email to client'
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Draft': return <Edit className="h-4 w-4" />;
      case 'Sent': return <Send className="h-4 w-4" />;
      case 'Accepted': return <CheckCircle className="h-4 w-4" />;
      case 'Rejected': return <AlertCircle className="h-4 w-4" />;
      case 'Expired': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
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
      
      // Update quote with new item
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

  const handleSaveQuote = () => {
    console.log('Save quote:', selectedQuote?.id);
    setIsEditing(false);
  };

  const handleSendQuote = () => {
    console.log('Send quote:', selectedQuote?.id);
    setShowSendModal(false);
  };

  const handleCreateNewVersion = () => {
    console.log('Create new version of quote:', selectedQuote?.id);
  };

  const calculateTotals = (items: QuoteItem[]) => {
    const netAmount = items.reduce((sum, item) => sum + item.total, 0);
    const vatAmount = netAmount * 0.2; // 20% VAT
    const totalAmount = netAmount + vatAmount;
    
    return { netAmount, vatAmount, totalAmount };
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
          <h1 className="text-2xl font-bold text-gray-900">Quote Editor</h1>
          <p className="text-gray-600">Create, edit, and manage quotes</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Quote History</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Quote</span>
          </button>
        </div>
      </div>

      {/* Quote Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Quote to Edit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((quote) => (
            <div 
              key={quote.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedQuote?.id === quote.id 
                  ? 'border-navy-500 bg-navy-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedQuote(quote)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{quote.leadName}</h4>
                  <p className="text-sm text-gray-500">{quote.leadEmail}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(quote.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div>Quote ID: {quote.id}</div>
                <div>Version: {quote.version}</div>
                <div>Total: £{quote.totalAmount.toLocaleString()}</div>
                <div>Valid until: {formatDateTime(quote.validUntil)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Editor */}
      {selectedQuote && (
        <div className="space-y-6">
          {/* Quote Header */}
          <div className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Quote {selectedQuote.id} - Version {selectedQuote.version}
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedQuote.leadName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedQuote.leadEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedQuote.leadPhone}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="btn-secondary flex items-center space-x-2"
                  onClick={() => setShowHistory(true)}
                >
                  <History className="h-4 w-4" />
                  <span>History</span>
                </button>
                <button 
                  className="btn-secondary flex items-center space-x-2"
                  onClick={() => console.log('Download quote')}
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button 
                  className="btn-secondary flex items-center space-x-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit'}</span>
                </button>
                <button 
                  className="btn-primary flex items-center space-x-2"
                  onClick={() => setShowSendModal(true)}
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quote Items */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quote Items</h3>
              {isEditing && (
                <button 
                  className="btn-primary text-sm"
                  onClick={handleCreateNewVersion}
                >
                  Create New Version
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

            {/* Add New Item */}
            {isEditing && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Add New Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Item description"
                      className="input-field"
                      value={newItem.description || ''}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <select 
                      className="input-field"
                      value={newItem.category || 'Legal Fees'}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
                    >
                      <option value="Legal Fees">Legal Fees</option>
                      <option value="Disbursements">Disbursements</option>
                      <option value="VAT">VAT</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Qty"
                      className="input-field"
                      value={newItem.quantity || 1}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Unit Price"
                      className="input-field"
                      value={newItem.unitPrice || 0}
                      onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="btn-primary text-sm"
                      onClick={handleAddItem}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quote Totals */}
          <div className="card">
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
          </div>

          {/* Quote Notes and Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
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
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
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

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button 
                className="btn-primary flex items-center space-x-2"
                onClick={handleSaveQuote}
              >
                <Save className="h-5 w-5" />
                <span>Save Quote</span>
              </button>
            </div>
          )}
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
                onClick={handleSendQuote}
              >
                Send Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote History Modal */}
      {showHistory && selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quote History - {selectedQuote.id}
            </h3>
            <div className="space-y-4">
              {quoteHistory.filter(h => h.quoteId === selectedQuote.id).map((history) => (
                <div key={history.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-navy-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{history.action}</span>
                      <span className="text-sm text-gray-500">by {history.userName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDateTime(history.timestamp)}
                    </div>
                    {history.notes && (
                      <div className="text-sm text-gray-700 mt-1">{history.notes}</div>
                    )}
                    {history.changes && (
                      <div className="text-sm text-blue-700 mt-1">{history.changes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                className="btn-secondary"
                onClick={() => setShowHistory(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
