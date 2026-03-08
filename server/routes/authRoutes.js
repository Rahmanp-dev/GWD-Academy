const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    registerPrivilegedUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validate, registerSchema, privilegedRegisterSchema, loginSchema } = require('../middleware/validators');

router.post('/register', validate(registerSchema), registerUser);
router.post('/admin/register', protect, authorize('superadmin'), validate(privilegedRegisterSchema), registerPrivilegedUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);

module.exports = router;
