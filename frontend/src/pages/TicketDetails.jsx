import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  User, 
  Mail, 
  Calendar,
  MessageSquare,
  Save,
  Ticket,
  Trash2
} from 'lucide-react';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for updates
  const [status, setStatus] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_URL}/tickets/${ticketId}`);
      setTicketData(response.data);
      setStatus(response.data.ticket.status);
      setError(null);
    } catch (err) {
      console.error('Error fetching ticket:', err);
      if (err.response && err.response.status === 404) {
        setError('Ticket not found.');
      } else {
        setError('Failed to load ticket. Ensure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const payload = { status };
      if (noteText.trim()) {
        payload.notes = noteText;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.put(`${API_URL}/tickets/${ticketId}`, payload);
      
      // Update local state with new data
      setTicketData(response.data);
      setNoteText(''); // clear note input
      setUpdateSuccess(true);
      
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating ticket:', err);
      setUpdateError(err.response?.data?.error || 'Failed to update ticket.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${API_URL}/tickets/${ticketId}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting ticket:', err);
      alert('Failed to delete ticket.');
      setIsDeleting(false);
    }
  };

  const getStatusStyle = (s) => {
    switch (s) {
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

  const getStatusIcon = (s) => {
    switch (s) {
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
        <p className="text-sm font-medium">Loading ticket details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl flex flex-col items-center justify-center text-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <div>
            <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
            <p>{error}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button 
              onClick={fetchTicket} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Try again
            </button>
            <Link to="/" className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors font-medium text-sm">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { ticket, notes } = ticketData;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <Link 
            to="/" 
            className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3.5">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{ticket.ticketId}</h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium ${getStatusStyle(ticket.status)}`}>
                {getStatusIcon(ticket.status)}
                {ticket.status}
              </span>
            </div>
            <p className="text-slate-500 mt-1 text-sm">{ticket.subject}</p>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {isDeleting ? 'Deleting...' : 'Delete Ticket'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/75 bg-slate-50/30">
              <h2 className="text-lg font-semibold text-slate-900">Description</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>
          </div>
          
          {/* Notes Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/75 bg-slate-50/30 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Notes & Activity</h2>
              <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-semibold">
                {notes.length} Notes
              </span>
            </div>
            <div className="p-6">
              {notes.length > 0 ? (
                <div className="space-y-6 relative border-l-2 border-slate-100 ml-3">
                  {notes.map((note) => (
                    <div key={note._id} className="relative pl-6">
                      <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white ${note.isActivity ? 'bg-slate-300' : 'bg-blue-500'}`}></div>
                      
                      {note.isActivity ? (
                        <div>
                          <p className="text-sm font-medium text-slate-900">{note.noteText}</p>
                          <span className="text-xs text-slate-500 block mt-1">
                            {new Date(note.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-2">
                            <p className="text-sm font-medium text-slate-900">Note added</p>
                            <span className="text-xs text-slate-500 block mt-1">
                              {new Date(note.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="bg-slate-50 rounded-xl rounded-tl-none border border-slate-200/60 p-4 mt-2 inline-block min-w-[200px] max-w-full shadow-sm">
                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{note.noteText}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-8">No notes have been added to this ticket yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Action Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/75 bg-slate-50/30">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Update Ticket</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdate} className="space-y-4">
                
                {updateError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {updateError}
                  </div>
                )}
                
                {updateSuccess && (
                  <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none transition-all">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-medium pointer-events-auto shadow-slate-900/20 ring-1 ring-white/10 animate-in fade-in zoom-in duration-300">
                      <div className="bg-emerald-500/20 p-1 rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      Ticket updated successfully!
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select 
                    id="status" 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-sm transition-all"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="noteText" className="block text-sm font-medium text-slate-700">Add Note (Optional)</label>
                  <textarea 
                    id="noteText" 
                    rows="4" 
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-sm resize-y transition-all"
                    placeholder="Type an internal note..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow active:scale-[0.98] font-medium text-sm disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isUpdating ? 'Saving...' : 'Update Ticket'}
                </button>
              </form>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/75 bg-slate-50/30">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Customer Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Name</p>
                  <p className="text-sm text-slate-900 font-medium">{ticket.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Email</p>
                  <a href={`mailto:${ticket.customerEmail}`} className="text-sm text-blue-600 hover:underline">{ticket.customerEmail}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200/75 bg-slate-50/30">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Ticket Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Created On</p>
                  <p className="text-sm text-slate-900">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Last Updated</p>
                  <p className="text-sm text-slate-900">{new Date(ticket.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
