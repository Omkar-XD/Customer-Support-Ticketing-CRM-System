import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Ticket, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  User
} from 'lucide-react';

const AllTickets = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status') || '';
  const searchParam = searchParams.get('search') || '';

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        let url = `${API_URL}/tickets?`;
        if (searchParam) url += `search=${encodeURIComponent(searchParam)}&`;
        if (statusParam && statusParam !== 'All') url += `status=${encodeURIComponent(statusParam)}&`;
        
        const response = await axios.get(url);
        setTickets(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Failed to load tickets. Ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [searchParam, statusParam]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case 'Closed':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20';
      default:
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <AlertCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Closed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Ticket className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3 text-slate-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-sm font-medium">Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-6 rounded-xl flex flex-col items-center justify-center text-center gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <div>
          <h2 className="text-lg font-bold mb-1">Unable to load tickets</h2>
          <p className="text-sm">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors text-sm font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Support Tickets</h1>
          <p className="text-slate-500 mt-1">View and manage all customer support requests.</p>
        </div>
        <Link 
          to="/tickets/new" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:shadow active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Ticket
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/75 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-lg font-semibold text-slate-900">
            {searchParam || statusParam ? 'Search Results' : 'Support Tickets'}
          </h2>
          <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-semibold">
            {tickets.length} Tickets
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.length > 0 ? (
                tickets.map(ticket => (
                  <tr key={ticket.ticketId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {ticket.ticketId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-slate-700">{ticket.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-900 truncate max-w-xs block">
                        {ticket.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 sm:py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 sm:py-5 whitespace-nowrap text-sm text-slate-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <Link 
                        to={`/tickets/${ticket.ticketId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                      <Ticket className="w-12 h-12 text-slate-300 mb-2" />
                      <p className="text-base font-medium text-slate-900">No support tickets found</p>
                      <p className="text-sm text-slate-500 mb-4">You don't have any tickets matching the current criteria.</p>
                      <Link 
                        to="/tickets/new" 
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Create your first ticket
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
