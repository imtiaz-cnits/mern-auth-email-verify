import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import Router from './routes/api.js';

const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

const port = process.env.PORT || 6000;

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express());
app.use(cookieParser());
app.use(cors({credentials: true}));

// API Endpoints
app.get('/', (req, res) => res.send('API is Working!'));
app.use('/api', Router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
