const Subscriber = require('../models/Subscriber');

exports.addSubscriber = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed.' });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    res.status(500).json({ message: 'Subscription failed. Please try again.' });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// NEW: Delete subscribers (Protected)
exports.deleteSubscribers = async (req, res) => {
  try {
    const { ids } = req.body;
    await Subscriber.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Subscribers deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};