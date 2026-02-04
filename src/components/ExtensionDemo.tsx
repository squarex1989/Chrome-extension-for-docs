import { useState, useEffect } from 'react';
import { mockTickets, Ticket, generateAIAnswer, generateSearchResults, AIAnswer, SearchResult } from './extensionData';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import ExtensionSidebar from './ExtensionSidebar';

const ExtensionDemo = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<AIAnswer | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [replySent, setReplySent] = useState(false);

  // Handle ticket selection - auto search with ticket query
  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyContent('');
    setSentMessage('');
    setReplySent(false);
    // Auto-fill search query with ticket's query
    setSearchQuery(ticket.query);
    // Auto-trigger search
    handleSearch(ticket.query);
  };

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setAiAnswer(null);
    setSearchResults([]);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const answer = generateAIAnswer(query);
    const results = generateSearchResults(query);
    
    setAiAnswer(answer);
    setSearchResults(results);
    setIsSearching(false);
  };

  // Handle insert to reply
  const handleInsertToReply = (content: string) => {
    setReplyContent(prev => prev ? `${prev}\n\n${content}` : content);
    setReplySent(false);
  };

  // Handle send reply
  const handleSendReply = () => {
    if (replyContent.trim()) {
      // Save the message before clearing
      setSentMessage(replyContent);
      setReplySent(true);
      // Clear the input after sending
      setReplyContent('');
      // In a real app, this would send the reply to the backend
    }
  };

  // Clear search results when query is cleared
  useEffect(() => {
    if (!searchQuery.trim()) {
      setAiAnswer(null);
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#1a1a2e]">
      {/* Zendesk-like Header */}
      <div className="h-12 bg-[#1a1a2e] border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-white font-medium text-sm">Chats</span>
          </div>
          {/* Status */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white text-xs rounded-full">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Online
            </button>
          </div>
        </div>
        
        {/* Center - Demo Label */}
        <div className="flex items-center gap-2 px-4 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-yellow-400 text-xs font-medium">Simulated Zendesk Page</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
            CS
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Visitor List */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50/50">
              Visitors
              <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">{mockTickets.length}</span>
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50">
              Team
              <span className="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">3</span>
            </button>
          </div>
          
          {/* Ticket/Visitor List */}
          <TicketList
            tickets={mockTickets}
            selectedTicketId={selectedTicket?.id || null}
            onSelectTicket={handleSelectTicket}
          />
        </div>

        {/* Center - Chat Area */}
        <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'mr-[380px]' : ''}`}>
          {selectedTicket ? (
            <TicketDetail
              ticket={selectedTicket}
              replyContent={replyContent}
              onReplyChange={setReplyContent}
              onSendReply={handleSendReply}
              replySent={replySent}
              sentMessage={sentMessage}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm font-medium">Select a conversation</p>
                <p className="text-xs text-gray-400 mt-1">Choose a visitor from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Extension Sidebar - Floating overlay */}
      <ExtensionSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={() => handleSearch(searchQuery)}
        isSearching={isSearching}
        aiAnswer={aiAnswer}
        searchResults={searchResults}
        onInsertToReply={handleInsertToReply}
      />

      {/* Toggle button when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-2 py-4 rounded-l-lg shadow-lg hover:bg-blue-700 transition-colors z-40"
          title="Open Extension"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ExtensionDemo;
