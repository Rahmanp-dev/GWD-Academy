const Analytics = require('../models/Analytics');

// @desc    Get Ambassador Stats
// @route   GET /api/v1/analytics/ambassador
// @access  Private (Ambassador)
const getAmbassadorStats = async (req, res) => {
    try {
        const stats = await Analytics.findOne({ ambassadorId: req.user._id });

        if (!stats) {
            // Return zero stats if none exist yet
            return res.json({
                clicks: 0,
                conversions: 0,
                totalEarnings: 0
            });
        }

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Track Link Click (Public)
// @route   POST /api/v1/analytics/track/:refCode
// @access  Public
const trackClick = async (req, res) => {
    const { refCode } = req.params;
    // Logic to find ambassador by refCode and increment clicks
    // In a real app, you'd lookup User by affiliateCode first
    try {
        // For now, we need to find the user with this code to get their ID
        const User = require('../models/User');
        const ambassador = await User.findOne({ affiliateCode: refCode });

        if (ambassador) {
            await Analytics.findOneAndUpdate(
                { ambassadorId: ambassador._id },
                { $inc: { clicks: 1 }, $setOnInsert: { ambassadorId: ambassador._id } },
                { upsert: true }
            );
        }

        res.status(200).json({ message: 'Tracked' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAmbassadorStats,
    trackClick
};
