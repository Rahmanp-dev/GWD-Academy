const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate, registerSchema, loginSchema } = require('../middleware/validators');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);

module.exports = router;
