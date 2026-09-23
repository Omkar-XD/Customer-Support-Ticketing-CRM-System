import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AllTickets from './pages/AllTickets';
import CreateTicket from './pages/CreateTicket';
import TicketDetails from './pages/TicketDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tickets" element={<AllTickets />} />
        <Route path="tickets/new" element={<CreateTicket />} />
        <Route path="tickets/:ticketId" element={<TicketDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
