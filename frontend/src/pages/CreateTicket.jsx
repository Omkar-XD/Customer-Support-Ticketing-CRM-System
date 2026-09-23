import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Save, X } from 'lucide-react';

const CreateTicket = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    subject: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer Name is required.';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address.';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${BASE_URL}/api/tickets`, formData);
      const { ticket_id } = response.data;
      
      setSuccess(`Ticket ${ticket_id} created successfully! Redirecting...`);
      
      // Delay redirect slightly to show the success message
      setTimeout(() => {
        navigate(`/tickets/${ticket_id}`);
      }, 1500);

    } catch (err) {
      console.error('API Error:', err);
      setApiError(
        err.response?.data?.error || 'Failed to create ticket. Please check your connection and try again.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Ticket</h1>
        <p className="text-slate-500 mt-2 text-[15px]">Fill out the information below to open a new support request.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/75 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {apiError && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{apiError}</p>
            </div>
          )}

          {success && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all">
              <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-medium pointer-events-auto shadow-slate-900/20 ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-8 duration-300">
                <div className="bg-emerald-500/20 p-1 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                {success}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="customerName" className="block text-sm font-medium text-slate-700">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none transition-all text-sm ${
                  errors.customerName 
                    ? 'border-red-300 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 bg-red-50/50' 
                    : 'border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-slate-50 focus:bg-white'
                }`}
                placeholder="Jane Doe"
              />
              {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="customerEmail" className="block text-sm font-medium text-slate-700">
                Customer Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none transition-all text-sm ${
                  errors.customerEmail 
                    ? 'border-red-300 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 bg-red-50/50' 
                    : 'border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-slate-50 focus:bg-white'
                }`}
                placeholder="jane@example.com"
              />
              {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none transition-all text-sm ${
                errors.subject 
                  ? 'border-red-300 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 bg-red-50/50' 
                  : 'border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-slate-50 focus:bg-white'
              }`}
              placeholder="Brief summary of the issue"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all text-sm resize-y ${
                errors.description 
                  ? 'border-red-300 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 bg-red-50/50' 
                  : 'border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-slate-50 focus:bg-white'
              }`}
              placeholder="Detailed description of the customer's problem or request..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              <X className="w-4 h-4" />
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSubmitting ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
