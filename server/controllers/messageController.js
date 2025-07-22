const Message = require('../models/Message');

// CREATE a new message (Public)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Thank you! Your message has been sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not send message.' });
  }
};

// GET all messages (Protected)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// UPDATE a message's read status (Protected)
exports.updateMessageStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    message.isRead = req.body.isRead;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a message (Protected)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};