import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  Inbox,
  Phone,
  Target,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Agent'] },
    { name: 'Lead Management', href: '/lead-management', icon: Users, roles: ['Admin', 'Manager', 'Agent'] },
    { name: 'Diary & Tasks', href: '/diary', icon: Calendar, roles: ['Admin', 'Manager', 'Agent'] },
    { name: 'Contact Attempts', href: '/contact-attempts', icon: Phone, roles: ['Admin', 'Manager', 'Agent'] },
    { name: 'Lead Time Tracking', href: '/lead-time-tracking', icon: Clock, roles: ['Admin', 'Manager'] },
    { name: 'Quotes', href: '/quotes', icon: FileText, roles: ['Admin', 'Manager', 'Agent'] },
    { name: 'Payments', href: '/payments', icon: CreditCard, roles: ['Admin', 'Manager', 'Agent'] },
    { name: 'Outcome Codes', href: '/outcome-codes', icon: Target, roles: ['Admin', 'Manager'] },
    { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['Admin', 'Manager'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['Admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 bg-white shadow-lg transform transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-0'}
        lg:relative lg:translate-x-0
      `}>
        <div className={`flex items-center h-16 border-b border-gray-200 ${isOpen ? 'justify-between px-6' : 'justify-center'}`}>
          {isOpen ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/millennium-legal-logo.svg" alt="Millennium Legal" className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold text-navy-950">Millennium Legal CRM</h1>
              </div>
              <button
                onClick={onToggle}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          ) : (
            <button
              onClick={onToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
              title="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-navy-950 bg-opacity-10 text-navy-950' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${!isOpen ? 'justify-center' : ''}
                  `}
                  title={!isOpen ? item.name : undefined}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isOpen ? 'mr-3' : ''}`} />
                  {isOpen && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className={`flex items-center ${!isOpen ? 'justify-center' : ''}`}>
            {isOpen ? (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.role}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                title={`Logout ${user?.name}`}
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
