const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
const authRoutes = require('./routes/Authroutes');
app.use('/api/auth', authRoutes);


const userRoutes = require('./routes/Userroutes');
app.use('/api/users', userRoutes);

const categoryRoutes = require('./routes/Categoryroutes');
app.use('/api/categories', categoryRoutes);

const blogRoutes = require('./routes/Blogroutes');
app.use('/api/blogs', blogRoutes);



// Root test route
app.get('/', (req, res) => {
  res.send('🚀 Blog API is running...');
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
