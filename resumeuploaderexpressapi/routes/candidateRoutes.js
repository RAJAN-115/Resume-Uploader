import express from 'express';
const router = express.Router();
import CandidateProfileController from '../controllers/candidateProfileController.js';
import upload from '../middlewares/upload-middleware.js'

// Route Level Middleware - For Parsing multipart/form-data
router.use('/resume', upload.fields([{ name: 'pimage', maxCount: 1 }, { name: 'rdoc', maxCount: 1 }]))

// Public Routes
router.post('/resume', CandidateProfileController.saveProfile)
router.get('/list', CandidateProfileController.profileList)

export default router;