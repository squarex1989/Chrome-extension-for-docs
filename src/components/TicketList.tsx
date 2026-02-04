import { Ticket } from './extensionData';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (ticket: Ticket) => void;
}

const TicketList = ({ tickets, selectedTicketId, onSelectTicket }: TicketListProps) => {
  const getStatusIndicator = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return <span className="w-2 h-2 rounded-full bg-green-500"></span>;
      case 'pending':
        return <span className="w-2 h-2 rounded-full bg-yellow-500"></span>;
      case 'solved':
        return <span className="w-2 h-2 rounded-full bg-gray-400"></span>;
    }
  };

  const getTimeAgo = (_createdAt: string) => {
    // Simulate relative time
    const times = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '19 minutes ago', '1 minute ago'];
    return times[Math.floor(Math.random() * times.length)];
  };

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
    <div className="flex-1 overflow-y-auto">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => onSelectTicket(ticket)}
          className={`px-3 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
            selectedTicketId === ticket.id
              ? 'bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Avatar with status */}
            <div className="relative flex-shrink-0">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(ticket.customerName)} flex items-center justify-center text-white text-sm font-medium`}>
                {ticket.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              {/* Online status dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                {getStatusIndicator(ticket.status)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Name and time */}
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-sm font-medium ${
                  selectedTicketId === ticket.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {ticket.customerName}
                </span>
                <span className="text-xs text-gray-400">{getTimeAgo(ticket.createdAt)}</span>
              </div>
              
              {/* Preview message */}
              <p className="text-sm text-gray-500 truncate">
                {ticket.query.length > 50 ? ticket.query.slice(0, 50) + '...' : ticket.query}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Viewing section - like Zendesk */}
      <div className="px-3 py-2 bg-gray-50 border-y border-gray-200">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">VIEWING</span>
      </div>

      {/* Additional visitors viewing */}
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
              JS
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-sm font-medium text-gray-900">Joan Soto</span>
              <span className="text-xs text-gray-400">9 minutes ago</span>
            </div>
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Typing...
            </p>
          </div>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-gray-100 opacity-60">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm font-medium">
              <span className="text-xs">zZ</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-sm font-medium text-gray-700">Xin Xin Ting</span>
              <span className="text-xs text-gray-400">1 minute ago</span>
            </div>
            <p className="text-sm text-gray-400">Visitor has gone offline</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
