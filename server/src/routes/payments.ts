import express from 'express';

const router = express.Router();

// Mock payments data - replace with database
const payments = [
  {
    id: 'INV-001',
    leadId: '1',
    leadName: 'John Smith',
    leadEmail: 'john.smith@email.com',
    amount: 2500,
    status: 'Paid',
    issuedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    stripePaymentId: 'pi_1234567890',
  },
  {
    id: 'INV-002',
    leadId: '2',
    leadName: 'Sarah Johnson',
    leadEmail: 'sarah.j@email.com',
    amount: 3200,
    status: 'Sent',
    issuedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: null,
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    stripePaymentId: null,
  },
  {
    id: 'INV-003',
    leadId: '3',
    leadName: 'Mike Wilson',
    leadEmail: 'mike.w@email.com',
    amount: 1800,
    status: 'Overdue',
    issuedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: null,
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    stripePaymentId: null,
  },
  {
    id: 'INV-004',
    leadId: '4',
    leadName: 'Emma Davis',
    leadEmail: 'emma.d@email.com',
    amount: 4200,
    status: 'Draft',
    issuedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: null,
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    stripePaymentId: null,
  },
];

// Get all payments
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, leadId } = req.query;
    
    let filteredPayments = [...payments];
    
    // Apply filters
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredPayments = filteredPayments.filter(payment =>
        payment.leadName.toLowerCase().includes(searchTerm) ||
        payment.leadEmail.toLowerCase().includes(searchTerm) ||
        payment.id.toLowerCase().includes(searchTerm)
      );
    }
    
    if (status) {
      filteredPayments = filteredPayments.filter(payment => payment.status === status);
    }
    
    if (leadId) {
      filteredPayments = filteredPayments.filter(payment => payment.leadId === leadId);
    }
    
    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        payments: paginatedPayments,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(filteredPayments.length / Number(limit)),
          totalItems: filteredPayments.length,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get payment by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const payment = payments.find(p => p.id === id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create new payment/invoice
router.post('/', (req, res) => {
  try {
    const { leadId, leadName, leadEmail, amount, dueDate } = req.body;
    
    if (!leadId || !leadName || !leadEmail || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID, name, email, and amount are required'
      });
    }
    
    const newPayment = {
      id: `INV-${String(payments.length + 1).padStart(3, '0')}`,
      leadId,
      leadName,
      leadEmail,
      amount: Number(amount),
      status: 'Draft',
      issuedAt: new Date().toISOString(),
      paidAt: null,
      dueDate: dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stripePaymentId: null,
    };
    
    payments.push(newPayment);
    
    res.status(201).json({
      success: true,
      data: newPayment
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update payment
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const paymentIndex = payments.findIndex(p => p.id === id);
    if (paymentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    payments[paymentIndex] = {
      ...payments[paymentIndex],
      ...updates
    };
    
    res.json({
      success: true,
      data: payments[paymentIndex]
    });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update payment status
router.post('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, stripePaymentId } = req.body;
    
    const paymentIndex = payments.findIndex(p => p.id === id);
    if (paymentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    const updates: any = { status };
    
    if (status === 'Paid' && stripePaymentId) {
      updates.paidAt = new Date().toISOString();
      updates.stripePaymentId = stripePaymentId;
    }
    
    payments[paymentIndex] = {
      ...payments[paymentIndex],
      ...updates
    };
    
    res.json({
      success: true,
      data: payments[paymentIndex]
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Send payment link (Stripe integration)
router.post('/:id/send', (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    
    const payment = payments.find(p => p.id === id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
    
    // Mock Stripe integration
    const stripePaymentLink = `https://checkout.stripe.com/pay/cs_test_${id}`;
    
    // In real implementation, you would:
    // 1. Create Stripe checkout session
    // 2. Send email with payment link
    // 3. Update payment status to 'Sent'
    
    res.json({
      success: true,
      data: {
        paymentLink: stripePaymentLink,
        message: 'Payment link sent successfully'
      }
    });
  } catch (error) {
    console.error('Send payment error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get payment statistics
router.get('/stats/overview', (req, res) => {
  try {
    const totalRevenue = payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const pendingAmount = payments
      .filter(p => p.status === 'Sent')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const overdueAmount = payments
      .filter(p => p.status === 'Overdue')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const paidThisMonth = payments.filter(p => 
      p.status === 'Paid' && 
      new Date(p.paidAt!).getMonth() === new Date().getMonth()
    ).length;
    
    res.json({
      success: true,
      data: {
        totalRevenue,
        pendingAmount,
        overdueAmount,
        paidThisMonth,
        totalPayments: payments.length
      }
    });
  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export { router as paymentRoutes };
