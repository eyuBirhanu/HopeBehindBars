const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path'); // <-- Import the 'path' module
const AdminUser = require('../models/AdminUser');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in your .env file!');
  process.exit(1);
}

const adminUsers = [
  { email: 'eyubirhanu01@gmail.com', password: 'strongPassword1!' },
  { email: 'admin2@example.com', password: 'strongPassword2!' },
  { email: 'admin3@example.com', password: 'strongPassword3!' },
  { email: 'admin4@example.com', password: 'strongPassword4!' },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await AdminUser.deleteMany();

    const createdUsers = adminUsers.map(user => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    await AdminUser.insertMany(createdUsers);

    console.log('✅ Admins Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeder Error: ${error}`);
    process.exit(1);
  }
};

importData();