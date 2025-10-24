import express from 'express';

const router = express.Router();

// Mock leads data - replace with database
const leads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    source: 'Hoowla',
    status: 'New',
    assignedTo: 'Agent 1',
    lastActionAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    notes: 'Interested in solar panels for residential use',
    outcomeCode: '',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    source: 'Comparison Site',
    status: 'Contacted',
    assignedTo: 'Agent 2',
    lastActionAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Looking for commercial solar solutions',
    outcomeCode: '',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    phone: '+1 (555) 345-6789',
    source: 'Direct',
    status: 'Interested',
    assignedTo: 'Agent 1',
    lastActionAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    notes: 'Budget: $5,000 - $10,000',
    outcomeCode: '',
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.d@email.com',
    phone: '+1 (555) 456-7890',
    source: 'Hoowla',
    status: 'Quote Sent',
    assignedTo: 'Agent 3',
    lastActionAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    notes: 'Quote for 10kW system',
    outcomeCode: '',
  },
];

// Get all leads
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, search, source, status, assignedTo } = req.query;
    
    let filteredLeads = [...leads];
    
    // Apply filters
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredLeads = filteredLeads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm) ||
        lead.phone.includes(searchTerm)
      );
    }
    
    if (source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === source);
    }
    
    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === status);
    }
    
    if (assignedTo) {
      filteredLeads = filteredLeads.filter(lead => lead.assignedTo === assignedTo);
    }
    
    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        leads: paginatedLeads,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(filteredLeads.length / Number(limit)),
          totalItems: filteredLeads.length,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get lead by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const lead = leads.find(l => l.id === id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create new lead
router.post('/', (req, res) => {
  try {
    const { name, email, phone, source, notes } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and phone are required'
      });
    }
    
    const newLead = {
      id: (leads.length + 1).toString(),
      name,
      email,
      phone,
      source: source || 'Direct',
      status: 'New',
      assignedTo: '',
      lastActionAt: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes || '',
      outcomeCode: '',
    };
    
    leads.push(newLead);
    
    res.status(201).json({
      success: true,
      data: newLead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update lead
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: leads[leadIndex]
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Assign lead
router.post('/:id/assign', (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      assignedTo,
      status: 'Assigned',
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: leads[leadIndex]
    });
  } catch (error) {
    console.error('Assign lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update lead status/outcome
router.post('/:id/outcome', (req, res) => {
  try {
    const { id } = req.params;
    const { status, outcomeCode, notes } = req.body;
    
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      status,
      outcomeCode: outcomeCode || leads[leadIndex].outcomeCode,
      notes: notes || leads[leadIndex].notes,
      lastActionAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: leads[leadIndex]
    });
  } catch (error) {
    console.error('Update outcome error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export { router as leadRoutes };
