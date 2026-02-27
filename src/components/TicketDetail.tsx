import { Ticket } from './extensionData';
import { useState } from 'react';

interface TicketDetailProps {
  ticket: Ticket;
  replyContent: string;
  onReplyChange: (content: string) => void;
  onSendReply: () => void;
  replySent: boolean;
  sentMessage: string;
}

const TicketDetail = ({ ticket, replyContent, onReplyChange, onSendReply, replySent, sentMessage }: TicketDetailProps) => {
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-teal-400 to-teal-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="h-full flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header - User info and tabs */}
        <div className="border-b border-gray-200 bg-white">
          {/* User info bar */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(ticket.customerName)} flex items-center justify-center text-white font-medium`}>
                {ticket.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{ticket.customerName}</h2>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-1">
                Actions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button className="px-4 py-1.5 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 transition-colors">
                End chat
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex px-4">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'current'
                  ? 'border-gray-800 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Current chat
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'past'
                  ? 'border-gray-800 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past chats ({Math.floor(Math.random() * 5) + 1})
            </button>
            <button className="ml-auto p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {/* Agent message */}
          <div className="flex justify-end">
            <div className="max-w-md">
              <div className="bg-[#2d4a3e] text-white px-4 py-2.5 rounded-lg rounded-br-sm">
                <p className="text-sm">Thanks for waiting. I've checked on your order, and it seems there is a delay due to customs issues.</p>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10:54
                </span>
              </div>
            </div>
          </div>

          {/* Customer reply button */}
          <div className="flex justify-end">
            <div className="max-w-md">
              <div className="bg-[#2d4a3e] text-white px-4 py-2.5 rounded-lg rounded-br-sm">
                <p className="text-sm">Give me a moment</p>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10:56
                </span>
              </div>
            </div>
          </div>

          {/* Customer message */}
          <div className="flex gap-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(ticket.customerName)} flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
              {ticket.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="max-w-md">
              <span className="text-xs text-gray-500 mb-1 block">{ticket.customerName.split(' ')[0]}</span>
              <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg rounded-tl-sm shadow-sm">
                <p className="text-sm text-gray-800">Appreciate it.</p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:58</span>
            </div>
          </div>

          {/* Customer main query */}
          <div className="flex gap-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(ticket.customerName)} flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
              {ticket.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="max-w-md">
              <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg rounded-tl-sm shadow-sm">
                <p className="text-sm text-gray-800">{ticket.query}</p>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">10:59</span>
            </div>
          </div>

          {/* Agent response if reply sent */}
          {replySent && sentMessage && (
            <div className="flex justify-end">
              <div className="max-w-md">
                <div className="bg-[#2d4a3e] text-white px-4 py-2.5 rounded-lg rounded-br-sm">
                  <p className="text-sm whitespace-pre-wrap">{sentMessage}</p>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Customer satisfaction - shown after reply */}
          {replySent && (
            <div className="flex flex-col items-center py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👍</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{ticket.customerName} has rated the chat Good</p>
              <p className="text-xs text-gray-400 text-center mt-1 max-w-sm">
                "Thanks for the quick response! That helps a lot."
              </p>
              <span className="text-xs text-gray-400 mt-2">11:02</span>
            </div>
          )}
        </div>

        {/* Reply Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => onReplyChange(e.target.value)}
                placeholder="Glad I could help!"
                rows={2}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors flex items-center gap-1 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Rating
                  </button>
                  <button className="hover:text-gray-600 transition-colors flex items-center gap-1 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Emoji
                  </button>
                  <button className="hover:text-gray-600 transition-colors flex items-center gap-1 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Attach
                  </button>
                </div>
                <button
                  onClick={onSendReply}
                  disabled={!replyContent.trim() || replySent}
                  className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {replySent ? 'Sent ✓' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - User Info Panel */}
      <div className="hidden xl:block xl:w-56 2xl:w-64 flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto">
        {/* User Card */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(ticket.customerName)} flex items-center justify-center text-white text-xl font-medium mb-3`}>
              {ticket.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{ticket.customerName}</h3>
            <p className="text-xs text-gray-500">{ticket.customerEmail}</p>
          </div>
          
          <div className="mt-4 space-y-2">
            <button className="w-full text-left text-xs text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Add phone number
            </button>
            <button className="w-full text-left text-xs text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Add notes
            </button>
            <button className="w-full text-left text-xs text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Add tags
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">24</p>
              <p className="text-xs text-gray-500">Past visits</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">5</p>
              <p className="text-xs text-gray-500">Past chats</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">1m 12s</p>
              <p className="text-xs text-gray-500">Time on site</p>
            </div>
          </div>
        </div>

        {/* Visitor path */}
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Visitor path</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-600">cameraobscura.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-600">Camera Obscura Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              <span className="text-gray-600">Account Page</span>
            </div>
          </div>
        </div>

        {/* Browser info */}
        <div className="p-4">
          <div className="space-y-3 text-xs">
            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-gray-900">Singapore</p>
            </div>
            <div>
              <p className="text-gray-500">Browser</p>
              <p className="text-gray-900">Chrome 66.0.3311.181</p>
            </div>
            <div>
              <p className="text-gray-500">Platform</p>
              <p className="text-gray-900">Mac OS 10.11.2</p>
            </div>
            <div>
              <p className="text-gray-500">IP Address</p>
              <p className="text-gray-900">101.239.931.109</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
