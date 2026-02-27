import { useState } from 'react';
import { mockRecentDocuments, AIAnswer, SearchResult, RecentDocument } from './extensionData';
import AIAnswerCard from './AIAnswerCard';
import DocumentPreviewModal from './DocumentPreviewModal';

interface ExtensionSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  aiAnswer: AIAnswer | null;
  searchResults: SearchResult[];
  onInsertToReply: (content: string) => void;
}

const ExtensionSidebar = ({
  isOpen,
  onToggle,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  isSearching,
  aiAnswer,
  searchResults,
  onInsertToReply,
}: ExtensionSidebarProps) => {
  const [selectedDocument, setSelectedDocument] = useState<RecentDocument | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'article':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const hasSearchResults = aiAnswer || searchResults.length > 0;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-[380px] bg-white border-l border-gray-200 shadow-xl flex flex-col transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Zoom Docs Extension</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search input */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question or search..."
              className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => onSearchQueryChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            /* Loading state */
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="text-sm text-gray-600">Searching and generating answer...</span>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
              </div>
            </div>
          ) : hasSearchResults ? (
            /* Search results */
            <div className="p-4 space-y-4">
              {/* AI Answer */}
              {aiAnswer && (
                <AIAnswerCard
                  answer={aiAnswer}
                  onInsertToReply={onInsertToReply}
                  onCitationClick={(sourceId) => {
                    const doc = mockRecentDocuments.find(d => d.id === sourceId);
                    if (doc) setSelectedDocument(doc);
                  }}
                />
              )}

              {/* Related documents */}
              {searchResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Related Documents
                  </h3>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          const doc = mockRecentDocuments.find(d => d.id === result.id);
                          if (doc) setSelectedDocument(doc);
                        }}
                        className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          {getDocumentIcon(result.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{result.excerpt}</p>
                          </div>
                          <span className="text-xs text-gray-400 flex-shrink-0">{result.relevance}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Default state - Recent documents */
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Recent Documents
              </h3>
              <div className="space-y-2">
                {mockRecentDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      {getDocumentIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{doc.lastViewed}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Powered by Zoom AI</span>
            <button className="hover:text-gray-700 transition-colors">Help</button>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <DocumentPreviewModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </>
  );
};

export default ExtensionSidebar;
