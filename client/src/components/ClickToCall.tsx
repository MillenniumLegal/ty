import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Clock, User, PhoneCall } from 'lucide-react';

interface CallSession {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  agentId: string;
  agentName: string;
  status: 'Connecting' | 'Ringing' | 'Connected' | 'On Hold' | 'Ended' | 'Failed';
  startTime: string;
  endTime?: string;
  duration?: number; // seconds
  callType: 'Inbound' | 'Outbound';
  outcome?: string;
  notes?: string;
  recordingUrl?: string;
}

interface ClickToCallProps {
  leadId: string;
  leadName: string;
  leadPhone: string;
  agentId: string;
  agentName: string;
  onCallStart?: (callSession: CallSession) => void;
  onCallEnd?: (callSession: CallSession) => void;
  onCallOutcome?: (callSession: CallSession, outcome: string) => void;
}

export const ClickToCall: React.FC<ClickToCallProps> = ({
  leadId,
  leadName,
  leadPhone,
  agentId,
  agentName,
  onCallStart,
  onCallEnd,
  onCallOutcome
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callSession, setCallSession] = useState<CallSession | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState('');

  const outcomeOptions = [
    { value: 'answered', label: 'Answered - Interested', color: 'bg-green-100 text-green-800' },
    { value: 'answered_not_interested', label: 'Answered - Not Interested', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'no_answer', label: 'No Answer', color: 'bg-orange-100 text-orange-800' },
    { value: 'busy', label: 'Busy', color: 'bg-red-100 text-red-800' },
    { value: 'voicemail', label: 'Voicemail', color: 'bg-blue-100 text-blue-800' },
    { value: 'wrong_number', label: 'Wrong Number', color: 'bg-gray-100 text-gray-800' },
    { value: 'callback_requested', label: 'Callback Requested', color: 'bg-purple-100 text-purple-800' }
  ];

  const handleStartCall = async () => {
    try {
      // Initialize call session
      const newCallSession: CallSession = {
        id: `call-${Date.now()}`,
        leadId,
        leadName,
        leadPhone,
        agentId,
        agentName,
        status: 'Connecting',
        startTime: new Date().toISOString(),
        callType: 'Outbound'
      };

      setCallSession(newCallSession);
      setIsCallActive(true);
      
      // Simulate call connection (replace with actual 3CX integration)
      setTimeout(() => {
        setCallSession(prev => prev ? { ...prev, status: 'Ringing' } : null);
        
        // Simulate call answered
        setTimeout(() => {
          setCallSession(prev => prev ? { ...prev, status: 'Connected' } : null);
          startCallTimer();
        }, 2000);
      }, 1000);

      onCallStart?.(newCallSession);
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallSession(prev => prev ? { ...prev, status: 'Failed' } : null);
    }
  };

  const handleEndCall = () => {
    if (callSession) {
      const endTime = new Date().toISOString();
      const duration = Math.floor((new Date(endTime).getTime() - new Date(callSession.startTime).getTime()) / 1000);
      
      const updatedSession = {
        ...callSession,
        status: 'Ended' as const,
        endTime,
        duration
      };

      setCallSession(updatedSession);
      setIsCallActive(false);
      setCallDuration(0);
      setShowOutcomeModal(true);
      
      onCallEnd?.(updatedSession);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Implement mute functionality with 3CX
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // Implement speaker functionality with 3CX
  };

  const startCallTimer = () => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Store timer reference for cleanup
    (window as any).callTimer = timer;
  };

  const stopCallTimer = () => {
    if ((window as any).callTimer) {
      clearInterval((window as any).callTimer);
      (window as any).callTimer = null;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOutcomeSubmit = () => {
    if (callSession && selectedOutcome) {
      const updatedSession = {
        ...callSession,
        outcome: selectedOutcome
      };
      
      setCallSession(updatedSession);
      setShowOutcomeModal(false);
      setSelectedOutcome('');
      
      onCallOutcome?.(updatedSession, selectedOutcome);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connecting': return 'bg-yellow-100 text-yellow-800';
      case 'Ringing': return 'bg-blue-100 text-blue-800';
      case 'Connected': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-orange-100 text-orange-800';
      case 'Ended': return 'bg-gray-100 text-gray-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Call Status */}
      {isCallActive && callSession && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <PhoneCall className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Calling {leadName}</div>
                <div className="text-sm text-gray-600">{leadPhone}</div>
                <div className="text-xs text-gray-500">
                  Status: <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(callSession.status)}`}>
                    {callSession.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-gray-900">
                {formatDuration(callDuration)}
              </div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
          </div>
        </div>
      )}

      {/* Call Controls */}
      {isCallActive && callSession && (
        <div className="card">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleMuteToggle}
              className={`p-3 rounded-full transition-colors ${
                isMuted 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>
            
            <button
              onClick={handleSpeakerToggle}
              className={`p-3 rounded-full transition-colors ${
                isSpeakerOn 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isSpeakerOn ? 'Speaker Off' : 'Speaker On'}
            >
              {isSpeakerOn ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
            
            <button
              onClick={handleEndCall}
              className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-colors"
              title="End Call"
            >
              <PhoneOff className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Call Button */}
      {!isCallActive && (
        <div className="flex justify-center">
          <button
            onClick={handleStartCall}
            className="btn-primary flex items-center space-x-2 px-6 py-3"
          >
            <Phone className="h-5 w-5" />
            <span>Call {leadName}</span>
          </button>
        </div>
      )}

      {/* Call History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{leadName}</div>
                <div className="text-sm text-gray-500">{leadPhone}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">2:34</div>
              <div className="text-xs text-gray-500">Yesterday</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <PhoneOff className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{leadName}</div>
                <div className="text-sm text-gray-500">{leadPhone}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">No Answer</div>
              <div className="text-xs text-gray-500">2 days ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Outcome Modal */}
      {showOutcomeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Call Outcome - {leadName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call Result
                </label>
                <div className="space-y-2">
                  {outcomeOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="outcome"
                        value={option.value}
                        checked={selectedOutcome === option.value}
                        onChange={(e) => setSelectedOutcome(e.target.value)}
                        className="text-navy-600 focus:ring-navy-500"
                      />
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${option.color}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call Notes
                </label>
                <textarea 
                  className="input-field"
                  rows={3}
                  placeholder="Add notes about the call..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="btn-secondary"
                onClick={() => setShowOutcomeModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleOutcomeSubmit}
                disabled={!selectedOutcome}
              >
                Save Outcome
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
