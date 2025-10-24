import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout/Layout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { LeadManagement } from '@/pages/LeadManagement';
import { Quotes } from '@/pages/Quotes';
import { Payments } from '@/pages/Payments';
import { ContactAttempts } from '@/pages/ContactAttempts';
import { OutcomeCodes } from '@/pages/OutcomeCodes';
import { Diary } from '@/pages/Diary';
import { LeadTimeTracking } from '@/pages/LeadTimeTracking';
import { Reports } from '@/pages/Reports';
import { Settings } from '@/pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead-management"
            element={
              <ProtectedRoute>
                <Layout>
                  <LeadManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quotes"
            element={
              <ProtectedRoute>
                <Layout>
                  <Quotes />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-attempts"
            element={
              <ProtectedRoute>
                <Layout>
                  <ContactAttempts />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/outcome-codes"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Layout>
                  <OutcomeCodes />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/diary"
            element={
              <ProtectedRoute>
                <Layout>
                  <Diary />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead-time-tracking"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Layout>
                  <LeadTimeTracking />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Layout>
                  <Payments />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
