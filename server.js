// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Utils (weather + time handled in route files)
const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blogs');

// Routes
app.use('/', indexRoutes);
app.use('/blogs', blogRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).render('404', { title: '404 – Page Not Found' });
});

// MongoDB connection + server start
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techspring';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
