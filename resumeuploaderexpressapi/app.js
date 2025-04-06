import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import candidateRoutes from './routes/candidateRoutes.js'
import upload from './middlewares/upload-middleware.js'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}))

// Connect Database
mongoose.connect(DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Static Files
app.use(express.static('public/uploads/pimage'))
// app.use(express.static('public/uploads/rdoc'))

// For Parsing application/json
app.use(express.json())

// Application Level Middleware - For Parsing multipart/form-data
// app.use(upload.fields([{ name: 'pimage', maxCount: 1 }, { name: 'rdoc', maxCount: 1 }]))

// Load Routes
app.use('/api', candidateRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})