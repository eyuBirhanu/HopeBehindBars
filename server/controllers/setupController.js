const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');

// --- Your admin data ---
const adminUsers = [
  { email: 'eyubirhanu01@gmail.com', password: 'T9w#qL83@zRu!Fd7' },
  { email: 'hadebacho@gmail.com', password: 'Xm4$Gn28!eKp@Vt1' },
];

exports.seedAdminUsers = async (req, res) => {
  try {
    // --- Security Check ---
    // Check for a secret key passed in the query parameters.
    // This prevents anyone from just visiting the URL and running the seeder.
    if (req.query.key !== process.env.SEEDER_SECRET_KEY) {
      return res.status(401).send('Unauthorized: Invalid secret key.');
    }

    // 1. Remove all existing admin users to prevent duplicates
    await AdminUser.deleteMany();

    // 2. Hash passwords for the new users
    const createdUsers = adminUsers.map(user => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    // 3. Insert the new admin users into the database
    await AdminUser.insertMany(createdUsers);

    console.log('✅ Admins seeded successfully via API.');
    res.status(200).send('Admin users have been successfully seeded!');

  } catch (error) {
    console.error(`❌ Seeder API Error: ${error}`);
    res.status(500).send('An error occurred during the seeding process.');
  }
};