import express from 'express';

const router = express.Router();

// Mock reports data - replace with database queries
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

// Get overview report
router.get('/overview', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // In real implementation, filter data by date range
    res.json({
      success: true,
      data: reportData.overview
    });
  } catch (error) {
    console.error('Get overview report error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get performance report
router.get('/performance', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    res.json({
      success: true,
      data: reportData.performance
    });
  } catch (error) {
    console.error('Get performance report error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get lead analysis report
router.get('/leads', (req, res) => {
  try {
    const { startDate, endDate, source, status } = req.query;
    
    // Mock lead analysis data
    const leadAnalysis = {
      totalLeads: 1247,
      newLeads: 89,
      contactedLeads: 234,
      interestedLeads: 156,
      convertedLeads: 156,
      conversionRate: 12.5,
      averageTimeToContact: 2.5, // hours
      averageTimeToConvert: 7.2, // days
      leadsBySource: reportData.overview.leadsBySource,
      leadsByStatus: reportData.overview.leadsByStatus,
      dailyLeads: [
        { date: '2024-01-01', count: 12 },
        { date: '2024-01-02', count: 15 },
        { date: '2024-01-03', count: 8 },
        { date: '2024-01-04', count: 22 },
        { date: '2024-01-05', count: 18 },
      ]
    };
    
    res.json({
      success: true,
      data: leadAnalysis
    });
  } catch (error) {
    console.error('Get lead analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get revenue report
router.get('/revenue', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Mock revenue data
    const revenueReport = {
      totalRevenue: 45600,
      monthlyRevenue: [
        { month: 'Jan', revenue: 15600, deals: 5 },
        { month: 'Feb', revenue: 18200, deals: 6 },
        { month: 'Mar', revenue: 14200, deals: 4 },
        { month: 'Apr', revenue: 19800, deals: 7 },
      ],
      revenueBySource: [
        { source: 'Hoowla', revenue: 18200, percentage: 40 },
        { source: 'Comparison Site', revenue: 13600, percentage: 30 },
        { source: 'Direct', revenue: 9100, percentage: 20 },
        { source: 'Referral', revenue: 4700, percentage: 10 },
      ],
      averageDealSize: 3200,
      paymentStatus: {
        paid: 15600,
        pending: 18200,
        overdue: 11800,
      }
    };
    
    res.json({
      success: true,
      data: revenueReport
    });
  } catch (error) {
    console.error('Get revenue report error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Export report as CSV
router.get('/export/csv', (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.query;
    
    // Mock CSV export
    const csvData = `Report Type,Date Range,Generated At
${reportType},${startDate} to ${endDate},${new Date().toISOString()}
Total Leads,1247
Conversion Rate,12.5%
Total Revenue,45600`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${reportType}-report-${Date.now()}.csv`);
    res.send(csvData);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Export report as Excel
router.get('/export/excel', (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.query;
    
    // Mock Excel export - in real implementation, use a library like xlsx
    res.json({
      success: true,
      data: {
        message: 'Excel export functionality will be implemented with xlsx library',
        reportType,
        dateRange: `${startDate} to ${endDate}`
      }
    });
  } catch (error) {
    console.error('Export Excel error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get dashboard statistics
router.get('/dashboard', (req, res) => {
  try {
    const dashboardStats = {
      totalLeads: 1247,
      newLeads: 23,
      activeLeads: 156,
      closedLeads: 89,
      conversionRate: 12.5,
      totalSales: 45600,
      assignedLeads: 134,
      unassignedLeads: 22,
      recentActivity: [
        { id: 1, action: 'New lead assigned', lead: 'John Smith', time: '2 minutes ago', type: 'assignment' },
        { id: 2, action: 'Quote sent', lead: 'Sarah Johnson', time: '15 minutes ago', type: 'quote' },
        { id: 3, action: 'Payment received', lead: 'Mike Wilson', time: '1 hour ago', type: 'payment' },
        { id: 4, action: 'Follow-up scheduled', lead: 'Emma Davis', time: '2 hours ago', type: 'followup' },
      ]
    };
    
    res.json({
      success: true,
      data: dashboardStats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export { router as reportRoutes };
