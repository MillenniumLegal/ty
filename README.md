# CRM Lead Automation System

A comprehensive CRM and Lead Automation System built with React + TypeScript + Tailwind on the frontend and Node.js + Express + PostgreSQL backend.

## 🚀 Features

### Core Functionality
- **Centralized Login System** with role-based access (Admin, Manager, Agent)
- **Lead Management** with automatic ingestion from multiple sources
- **Quote Management** with version control and history
- **Payment Processing** with Stripe integration
- **Automated Follow-up System** with 5-attempt contact policy
- **Comprehensive Reporting** with exportable data
- **Real-time Dashboard** with key metrics and analytics

### Integrations
- **Hoowla API** for lead ingestion
- **Comparison Websites** via webhook/email parser
- **Twilio** for SMS and call logging
- **Stripe** for payment processing
- **Email System** for automated communications

## 📁 Project Structure

```
crm-lead-automation/
├── client/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── context/        # React Context for state management
│   │   ├── types/          # TypeScript type definitions
│   │   └── api/            # API client functions
│   ├── public/
│   └── package.json
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/        # Database models
│   │   └── utils/          # Utility functions
│   └── package.json
└── package.json           # Root package.json for scripts
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** for database (or Supabase)
- **JWT** for authentication
- **bcryptjs** for password hashing

### Integrations
- **Twilio** for SMS and calls
- **Stripe** for payments
- **Nodemailer** for email
- **3CX** (optional) for call integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm-lead-automation
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp server/env.example server/.env
   
   # Edit the .env file with your configuration
   nano server/.env
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000

### Demo Credentials

- **Admin**: admin@crm.com / password123
- **Manager**: manager@crm.com / password123  
- **Agent**: agent@crm.com / password123

## 📊 Key Pages & Features

### Dashboard
- Overview of all leads, recent activity, conversion rates
- Key metrics cards and charts
- Quick action buttons
- Lead status overview

### Lead Management
- Comprehensive lead table with filtering and search
- Bulk actions for lead assignment
- Lead detail view with full history
- Outcome code workflow management

### Quote Management
- Create and edit quotes with version control
- Quote status tracking
- Export and sharing capabilities
- Quote history and analytics

### Payment Processing
- Stripe integration for secure payments
- Invoice generation and tracking
- Payment status monitoring
- Revenue analytics

### Reporting
- Multiple report types (Overview, Performance, Lead Analysis, Revenue)
- Export to CSV/Excel
- Date range filtering
- Agent performance metrics

### Settings (Admin Only)
- User management with role assignment
- Outcome code configuration
- Notification settings
- Security policies

## 🔧 Development Phases

### Phase 1: UI Dashboard & Login ✅
- [x] Project structure setup
- [x] Authentication system
- [x] Role-based routing
- [x] Dashboard with mock data
- [x] All placeholder pages

### Phase 2: Lead Ingestion & Assignment
- [ ] Hoowla API integration
- [ ] Lead assignment system
- [ ] Outcome code workflows
- [ ] Auto-assignment rules

### Phase 3: Communication Automation
- [ ] Twilio SMS integration
- [ ] Email automation
- [ ] Call logging system
- [ ] Follow-up scheduling

### Phase 4: Payment Integration
- [ ] Stripe checkout integration
- [ ] Invoice generation
- [ ] Payment tracking
- [ ] Revenue reporting

### Phase 5: Final Polish
- [ ] Error handling
- [ ] Performance optimization
- [ ] Testing
- [ ] Documentation

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist folder
```

### Backend (Railway/Heroku)
```bash
cd server
npm run build
# Deploy with environment variables
```

## 📝 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify token

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `POST /api/leads/:id/assign` - Assign lead
- `POST /api/leads/:id/outcome` - Update outcome

### Quotes
- `GET /api/quotes` - Get all quotes
- `POST /api/quotes` - Create quote
- `PUT /api/quotes/:id` - Update quote
- `POST /api/quotes/:id/status` - Update status

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create invoice
- `POST /api/payments/:id/send` - Send payment link
- `GET /api/payments/stats/overview` - Payment statistics

### Reports
- `GET /api/reports/overview` - Overview report
- `GET /api/reports/performance` - Performance report
- `GET /api/reports/leads` - Lead analysis
- `GET /api/reports/revenue` - Revenue report

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
