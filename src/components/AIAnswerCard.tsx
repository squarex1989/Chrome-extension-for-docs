import { AIAnswer } from './extensionData';

interface AIAnswerCardProps {
  answer: AIAnswer;
  onInsertToReply: (content: string) => void;
  onCitationClick?: (sourceId: string) => void;
}

const AIAnswerCard = ({ answer, onInsertToReply, onCitationClick }: AIAnswerCardProps) => {
  // Replace citation markers in content with styled spans
  const renderContentWithCitations = () => {
    return (
      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {answer.content}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-white/50 border-b border-blue-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-900">AI Answer</span>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {renderContentWithCitations()}

        {/* Citations */}
        {answer.citations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-blue-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Sources:</p>
            <div className="flex flex-wrap gap-2">
              {answer.citations.map((citation, index) => (
                <button
                  key={citation.id}
                  onClick={() => onCitationClick?.(citation.sourceId)}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <span className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-medium">
                    {index + 1}
                  </span>
                  <span className="truncate max-w-[120px]">{citation.source}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="px-4 py-3 bg-white/30 border-t border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => onInsertToReply(answer.content)}
          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Insert to reply
        </button>
      </div>
    </div>
  );
};

export default AIAnswerCard;
