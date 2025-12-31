require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Performance Middleware
app.use(helmet());
app.use(compression()); // Gzip compression for ultra-efficiency

// Rate Limiting: 100 requests per 15 minutes to prevent DDoS/Brute-force
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite default port
    credentials: true
}));

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/courses', require('./routes/courseRoutes'));
app.use('/api/v1/finance', require('./routes/financeRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));

app.get('/', (req, res) => {
    res.send('GWD Academy API is running...');
});

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
