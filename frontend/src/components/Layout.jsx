import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  Ticket, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  Bell,
  Search,
  Menu,
  LifeBuoy,
  MessageSquare,
  List,
  ChevronDown,
  User
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, exact }) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to && location.search === '' 
    : location.pathname + location.search === to;

  return (
    <NavLink 
      to={to} 
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all text-[15px] ${
        isActive 
          ? 'bg-white text-crm-brand shadow-sm' 
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-crm-brand' : 'text-white/70'}`} />
      {label}
    </NavLink>
  );
};

const Layout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchParam = searchParams.get('search') || '';
  const statusParam = searchParams.get('status') || 'All Status';

  const [localSearch, setLocalSearch] = useState(searchParam);
  const [localStatus, setLocalStatus] = useState(statusParam);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    setLocalSearch(searchParam);
    setLocalStatus(statusParam || 'All Status');
  }, [searchParam, statusParam]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${API_URL}/tickets/activities/recent`);
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchParam) {
        const currentParams = new URLSearchParams(searchParams);
        if (localSearch) {
          currentParams.set('search', localSearch);
        } else {
          currentParams.delete('search');
        }
        
        navigate(`/?${currentParams.toString()}`);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [localSearch, searchParam, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-crm-brand-dark flex flex-col md:flex-row font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-[260px] bg-crm-brand-dark h-screen sticky top-0 text-white">
        <div className="h-[72px] flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight">
            <LifeBuoy className="w-6 h-6" />
            <span>SupportCRM</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
              Overview
            </div>
            <nav className="space-y-1">
              <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" exact />
              <SidebarItem to="/tickets/new" icon={PlusCircle} label="Create Ticket" />
            </nav>
          </div>

          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
              Tickets
            </div>
            <nav className="space-y-1">
              <SidebarItem to="/tickets" icon={List} label="All Tickets" />
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen md:py-3 md:pr-3">
        <div className="flex-1 flex flex-col bg-crm-bg md:rounded-l-[2rem] md:rounded-r-2xl overflow-hidden shadow-2xl relative border-l border-white/10 md:border-none">
          {/* Top Header */}
          <header className="h-[72px] bg-white border-b border-crm-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center md:hidden">
            <button className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md">
              <Menu className="w-6 h-6" />
            </button>
            <div className="ml-2 flex items-center gap-2 text-blue-600 font-bold text-lg">
              <LifeBuoy className="w-5 h-5" />
              <span>SupportCRM</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tickets..." 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/75 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder-slate-400"
              />
            </div>
            <div className="w-44 relative">
              <select 
                value={localStatus}
                onChange={(e) => {
                  setLocalStatus(e.target.value);
                  const currentParams = new URLSearchParams(searchParams);
                  if (e.target.value && e.target.value !== 'All Status') {
                    currentParams.set('status', e.target.value);
                  } else {
                    currentParams.delete('status');
                  }
                  navigate(`/?${currentParams.toString()}`);
                }}
                className="w-full pl-4 pr-8 py-2.5 bg-slate-100/75 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-700 appearance-none cursor-pointer font-medium"
              >
                <option value="All Status">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/75 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <Link 
                          key={notif._id} 
                          to={`/tickets/${notif.ticketId}`}
                          onClick={() => setShowNotifications(false)}
                          className="block p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5">
                              {notif.isActivity ? (
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                  <Ticket className="w-4 h-4" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                  <MessageSquare className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {notif.isActivity ? notif.noteText : 'New Note Added'}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">{notif.ticketId}</p>
                              <p className="text-[11px] text-slate-400 mt-1">
                                {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-500 text-sm">
                        No recent activity.
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <Link 
                      to="/tickets"
                      onClick={() => setShowNotifications(false)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View all tickets
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${showProfile ? 'bg-blue-100 text-blue-700 ring-4 ring-blue-50' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <User className="w-4 h-4" />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/75 overflow-hidden z-50 py-1">
                  <div className="px-4 py-3 border-b border-slate-100 mb-1 bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-900">Admin</p>
                    <p className="text-xs text-slate-500 truncate">admin@support.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Account</button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-transparent p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
