const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminUser.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' }),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};