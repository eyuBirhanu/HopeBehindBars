// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const app = express();

// app.use(cors({
//     origin: process.env.CLIENT_URL
// }));
// app.use(express.json());

// connectDB();

// // API Routes
// app.get('/', (req, res) => {
//   res.send('API for Hope Behind Bars is running...');
// });
// app.use('/api/gallery', require('./routes/galleryRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));
// app.use('/api/videos', require('./routes/videoRoutes'));


// app.use('/api/blogs', require('./routes/blogRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/volunteer', require('./routes/volunteerRoutes'));
// app.use('/api/subscribe', require('./routes/subscriberRoutes'));
// app.use('/api/videos', require('./routes/videoRoutes'));

// app.use('/api/publications', require('./routes/publicationRoutes'));

// app.use('/api/messages', require('./routes/messageRoutes'));

// app.use('/api/setup', require('./routes/setupRoutes'));

// module.exports = app;

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API for Hope Behind Bars is running...');
});

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/publications', require('./routes/publicationRoutes'));
app.use('/api/setup', require('./routes/setupRoutes'));
app.use('/api/subscribe', require('./routes/subscriberRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// # MONGO_URI=mongodb://127.0.0.1:27017/HopeBehindBarsDB