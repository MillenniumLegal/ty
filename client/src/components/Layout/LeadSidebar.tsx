import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Phone, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  CreditCard,
  FileText,
  UserCheck,
  Target
} from 'lucide-react';

interface LeadStage {
  id: string;
  name: string;
  count: number;
  icon: React.ComponentType<any>;
  color: string;
  subStages?: LeadStage[];
}

interface LeadSidebarProps {
  onStageSelect: (stage: string) => void;
  selectedStage: string;
  userRole: 'Admin' | 'Manager' | 'Agent';
}

export const LeadSidebar: React.FC<LeadSidebarProps> = ({ 
  onStageSelect, 
  selectedStage, 
  userRole 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['new-leads']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getLeadStages = (): LeadStage[] => {
    if (userRole === 'Agent') {
      return [
        {
          id: 'my-assigned',
          name: 'My Assigned Leads',
          count: 19,
          icon: UserCheck,
          color: 'text-green-600',
          subStages: [
            { id: 'New', name: 'New - Not contacted', count: 3, icon: AlertCircle, color: 'text-red-600' },
            { id: 'Call-1', name: 'Call - 1', count: 2, icon: Phone, color: 'text-orange-600' },
            { id: 'Call-2', name: 'Call - 2', count: 2, icon: Phone, color: 'text-yellow-600' },
            { id: 'Call-3', name: 'Call - 3', count: 1, icon: Phone, color: 'text-amber-600' },
            { id: 'Call-4', name: 'Call - 4', count: 2, icon: Phone, color: 'text-orange-600' },
            { id: 'Call-5', name: 'Call - 5', count: 1, icon: Phone, color: 'text-red-600' },
            { id: 'Interested', name: 'Interested - Call back scheduled', count: 2, icon: CheckCircle, color: 'text-green-600' },
            { id: 'Ready to Instruct', name: 'Ready to instruct', count: 2, icon: Target, color: 'text-blue-600' },
            { id: 'Awaiting Payment', name: 'Awaiting payment', count: 2, icon: CreditCard, color: 'text-purple-600' },
            { id: 'Awaiting Client Info', name: 'Awaiting client information', count: 2, icon: FileText, color: 'text-indigo-600' }
          ]
        }
      ];
    } else {
      // Admin/Manager view
      return [
        {
          id: 'all-leads',
          name: 'Lead Stages',
          count: 25,
          icon: Users,
          color: 'text-blue-600',
          subStages: [
            { id: 'New', name: 'New - Not contacted', count: 3, icon: AlertCircle, color: 'text-red-600' },
            { id: 'Call-1', name: 'Call - 1', count: 2, icon: Phone, color: 'text-orange-600' },
            { id: 'Call-2', name: 'Call - 2', count: 2, icon: Phone, color: 'text-yellow-600' },
            { id: 'Call-3', name: 'Call - 3', count: 1, icon: Phone, color: 'text-amber-600' },
            { id: 'Call-4', name: 'Call - 4', count: 2, icon: Phone, color: 'text-orange-600' },
            { id: 'Call-5', name: 'Call - 5', count: 1, icon: Phone, color: 'text-red-600' },
            { id: 'Interested', name: 'Interested - Call back scheduled', count: 2, icon: CheckCircle, color: 'text-green-600' },
            { id: 'Ready to Instruct', name: 'Ready to instruct', count: 2, icon: Target, color: 'text-blue-600' },
            { id: 'Awaiting Payment', name: 'Awaiting payment', count: 2, icon: CreditCard, color: 'text-purple-600' },
            { id: 'Awaiting Client Info', name: 'Awaiting client information', count: 2, icon: FileText, color: 'text-indigo-600' }
          ]
        },
        {
          id: 'unassigned',
          name: 'Unassigned Leads',
          count: 3,
          icon: AlertCircle,
          color: 'text-red-600'
        }
      ];
    }
  };

  const stages = getLeadStages();

  const renderStage = (stage: LeadStage, level: number = 0) => {
    const isExpanded = expandedSections.includes(stage.id);
    const isSelected = selectedStage === stage.id;
    const hasSubStages = stage.subStages && stage.subStages.length > 0;
    const IconComponent = stage.icon;

    return (
      <div key={stage.id} className="mb-1">
        <div
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
            isSelected 
              ? 'bg-navy-100 text-navy-900' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (hasSubStages) {
              toggleSection(stage.id);
            } else {
              onStageSelect(stage.id);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <IconComponent className={`h-4 w-4 ${stage.color}`} />
            <span className="text-sm font-medium">{stage.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {stage.count}
            </span>
            {hasSubStages && (
              isExpanded ? 
                <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        
        {hasSubStages && isExpanded && (
          <div className="ml-4">
            {stage.subStages!.map(subStage => renderStage(subStage, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Lead Pipeline</h2>
        <p className="text-sm text-gray-600">
          {userRole === 'Agent' ? 'Your lead workflow' : 'All lead stages'}
        </p>
      </div>
      
      <div className="p-4 space-y-2">
        {/* Show All Leads Option - Only for Admin/Manager */}
        {userRole !== 'Agent' && (
          <div
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedStage === 'all' 
                ? 'bg-navy-100 text-navy-900' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => onStageSelect('all')}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Show All Leads</span>
            </div>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              28
            </span>
          </div>
        )}
        
        {stages.map(stage => renderStage(stage))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button 
            className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={() => onStageSelect('overdue')}
          >
            <Clock className="h-4 w-4 inline mr-2 text-red-500" />
            {userRole === 'Agent' ? 'My Overdue Leads' : 'Overdue Leads'}
          </button>
          <button 
            className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={() => onStageSelect('highPriority')}
          >
            <AlertCircle className="h-4 w-4 inline mr-2 text-orange-500" />
            {userRole === 'Agent' ? 'My High Priority' : 'High Priority'}
          </button>
          <button 
            className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={() => onStageSelect('completedToday')}
          >
            <CheckCircle className="h-4 w-4 inline mr-2 text-green-500" />
            {userRole === 'Agent' ? 'My Completed Today' : 'Completed Today'}
          </button>
        </div>
      </div>
    </div>
  );
};
