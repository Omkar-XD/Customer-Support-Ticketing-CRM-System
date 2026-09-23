const express = require('express');
const Ticket = require('../models/Ticket');
const Note = require('../models/Note');
const router = express.Router();

// 7. POST /api/tickets
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, subject, description } = req.body;
    
    if (!customerName || !customerEmail || !subject || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate Ticket ID
    const lastTicket = await Ticket.findOne().sort({ createdAt: -1 });
    let nextIdNumber = 1;
    if (lastTicket && lastTicket.ticketId && lastTicket.ticketId.startsWith('TKT-')) {
      const lastIdStr = lastTicket.ticketId.split('-')[1];
      nextIdNumber = parseInt(lastIdStr, 10) + 1;
    }
    const ticketId = `TKT-${nextIdNumber.toString().padStart(3, '0')}`;

    const newTicket = new Ticket({
      ticketId,
      customerName,
      customerEmail,
      subject,
      description,
      status: 'Open' // Default status
    });

    await newTicket.save();

    await new Note({
      ticketId,
      noteText: 'Ticket created',
      isActivity: true
    }).save();

    res.status(201).json({ ticket_id: newTicket.ticketId, created_at: newTicket.createdAt });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ error: 'Server error while creating ticket' });
  }
});

// 6. GET /api/tickets
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ticketId: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: 'Server error while fetching tickets' });
  }
});

// GET /api/tickets/activities/recent
router.get('/activities/recent', async (req, res) => {
  try {
    const recentNotes = await Note.find().sort({ createdAt: -1 }).limit(10);
    res.json(recentNotes);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ error: 'Server error while fetching activities' });
  }
});

// 8. GET /api/tickets/:ticketId
router.get('/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    const notes = await Note.find({ ticketId }).sort({ createdAt: 1 });

    res.json({ ticket, notes });
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(500).json({ error: 'Server error while fetching ticket' });
  }
});

// 9. PUT /api/tickets/:ticketId
router.put('/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, noteText, notes: incomingNotes } = req.body;
    
    const finalNoteText = incomingNotes || noteText;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    let statusChanged = false;
    let oldStatus = ticket.status;

    if (status && status !== ticket.status) {
      statusChanged = true;
      ticket.status = status;
      await ticket.save(); // updatedAt will be automatically updated
    }

    if (statusChanged) {
      await new Note({
        ticketId,
        noteText: `Status changed from ${oldStatus} to ${status}`,
        isActivity: true
      }).save();
    }

    if (finalNoteText) {
      const newNote = new Note({
        ticketId,
        noteText: finalNoteText,
        isActivity: false
      });
      await newNote.save();
    }

    const updatedTicket = await Ticket.findOne({ ticketId });
    const notes = await Note.find({ ticketId }).sort({ createdAt: 1 });

    res.json({ ticket: updatedTicket, notes });
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: 'Server error while updating ticket' });
  }
});

// DELETE /api/tickets/:ticketId
router.delete('/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    await Ticket.deleteOne({ ticketId });
    await Note.deleteMany({ ticketId });

    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ error: 'Server error while deleting ticket' });
  }
});

module.exports = router;
