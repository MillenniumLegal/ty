import express from 'express';

const router = express.Router();

// Mock quotes data - replace with database
const quotes = [
  {
    id: 'Q-001',
    leadId: '1',
    leadName: 'John Smith',
    leadEmail: 'john.smith@email.com',
    amount: 2500,
    details: 'Residential solar panel installation - 5kW system',
    status: 'Draft',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    lastEditedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    version: 1,
  },
  {
    id: 'Q-002',
    leadId: '2',
    leadName: 'Sarah Johnson',
    leadEmail: 'sarah.j@email.com',
    amount: 3200,
    details: 'Commercial solar panel installation - 8kW system',
    status: 'Sent',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastEditedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    version: 2,
  },
  {
    id: 'Q-003',
    leadId: '3',
    leadName: 'Mike Wilson',
    leadEmail: 'mike.w@email.com',
    amount: 1800,
    details: 'Small residential solar panel installation - 3kW system',
    status: 'Accepted',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastEditedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    version: 1,
  },
  {
    id: 'Q-004',
    leadId: '4',
    leadName: 'Emma Davis',
    leadEmail: 'emma.d@email.com',
    amount: 4200,
    details: 'Large residential solar panel installation - 10kW system',
    status: 'Rejected',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    lastEditedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    version: 1,
  },
];

// Get all quotes
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, leadId } = req.query;
    
    let filteredQuotes = [...quotes];
    
    // Apply filters
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredQuotes = filteredQuotes.filter(quote =>
        quote.leadName.toLowerCase().includes(searchTerm) ||
        quote.leadEmail.toLowerCase().includes(searchTerm) ||
        quote.id.toLowerCase().includes(searchTerm)
      );
    }
    
    if (status) {
      filteredQuotes = filteredQuotes.filter(quote => quote.status === status);
    }
    
    if (leadId) {
      filteredQuotes = filteredQuotes.filter(quote => quote.leadId === leadId);
    }
    
    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        quotes: paginatedQuotes,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(filteredQuotes.length / Number(limit)),
          totalItems: filteredQuotes.length,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get quote by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const quote = quotes.find(q => q.id === id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create new quote
router.post('/', (req, res) => {
  try {
    const { leadId, leadName, leadEmail, amount, details } = req.body;
    
    if (!leadId || !leadName || !leadEmail || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID, name, email, and amount are required'
      });
    }
    
    const newQuote = {
      id: `Q-${String(quotes.length + 1).padStart(3, '0')}`,
      leadId,
      leadName,
      leadEmail,
      amount: Number(amount),
      details: details || '',
      status: 'Draft',
      createdAt: new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
      version: 1,
    };
    
    quotes.push(newQuote);
    
    res.status(201).json({
      success: true,
      data: newQuote
    });
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update quote
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const quoteIndex = quotes.findIndex(q => q.id === id);
    if (quoteIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    // Increment version if amount or details changed
    const versionIncrement = 
      (updates.amount && updates.amount !== quotes[quoteIndex].amount) ||
      (updates.details && updates.details !== quotes[quoteIndex].details);
    
    quotes[quoteIndex] = {
      ...quotes[quoteIndex],
      ...updates,
      version: versionIncrement ? quotes[quoteIndex].version + 1 : quotes[quoteIndex].version,
      lastEditedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: quotes[quoteIndex]
    });
  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update quote status
router.post('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const quoteIndex = quotes.findIndex(q => q.id === id);
    if (quoteIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    quotes[quoteIndex] = {
      ...quotes[quoteIndex],
      status,
      lastEditedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: quotes[quoteIndex]
    });
  } catch (error) {
    console.error('Update quote status error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get quote history
router.get('/:id/history', (req, res) => {
  try {
    const { id } = req.params;
    const quote = quotes.find(q => q.id === id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    // Mock history - in real app, this would come from a separate history table
    const history = [
      {
        id: '1',
        action: 'Quote created',
        timestamp: quote.createdAt,
        user: 'System',
        changes: null
      },
      {
        id: '2',
        action: 'Quote updated',
        timestamp: quote.lastEditedAt,
        user: 'Agent 1',
        changes: { amount: quote.amount, details: quote.details }
      }
    ];
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Get quote history error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export { router as quoteRoutes };
