const express = require('express');
const cookieParser = require('cookie-parser'); 
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); 
const authRoutes = require('./src/routes/authRoutes');

const app = express();

//  Middleware
app.use(express.json());
app.use(cookieParser()); 

//  CORS setup
const corsOptions = {
  origin: process.env.CLIENT_ENDPOINT, 
  credentials: true, // needed to send cookies
};
app.use(cors(corsOptions));

//  Routes
app.use('/auth', authRoutes);

//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Database Connected'))
  .catch((error) => console.error('❌ MongoDB Error:', error));

// Start server
app.listen(process.env.PORT, (error) => {
  if (error) {
    return console.error('❌ Server not started:', error);
  }
  console.log(`✅ Server is running at port ${process.env.PORT}`);
});
