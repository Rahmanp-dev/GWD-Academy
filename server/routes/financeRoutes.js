const express = require('express');
const router = express.Router();
const {
    enrollStudent,
    getFinancialStats
} = require('../controllers/financeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/enroll', protect, enrollStudent);
router.get('/stats', protect, authorize('superadmin', 'partner'), getFinancialStats);

module.exports = router;
