const express = require('express');
const router = express.Router();
const {
    getAmbassadorStats,
    trackClick
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/ambassador', protect, authorize('ambassador'), getAmbassadorStats);
router.post('/track/:refCode', trackClick);

module.exports = router;
