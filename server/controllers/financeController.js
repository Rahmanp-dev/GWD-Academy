const Transaction = require('../models/Transaction');
const Course = require('../models/Course');
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const { calculateProfitSplits } = require('../utils/profitCalculator');

// @desc    Process a new transaction (Enrollment)
// @route   POST /api/v1/finance/enroll
// @access  Private (Student)
const enrollStudent = async (req, res) => {
    const { courseId, paymentMethod } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // 1. Get Instructor details for fees
        // In a real app, instructor might have a specific rate in their profile. 
        // We'll use a fixed example fee or 0 for now unless specified.
        const instructorFixedFee = 0;

        // 2. Check for Ambassador Referral
        let affiliateCommission = 0;
        let ambassadorId = null;

        // If user has a 'referredBy' field populated from registration
        // We need to fetch the user to see who referred them
        const student = await User.findById(req.user._id);
        if (student.referredBy) {
            const ambassador = await User.findById(student.referredBy);
            // Logic: e.g., 10% commission or fixed amount. Lets say 10% of price
            if (ambassador && ambassador.role === 'ambassador') {
                affiliateCommission = course.price * 0.10;
                ambassadorId = ambassador._id;
            }
        }

        // 3. Calculate Splits
        const financials = calculateProfitSplits(course.price, instructorFixedFee, affiliateCommission);

        // 4. Create Transaction Record
        const transaction = await Transaction.create({
            studentId: req.user._id,
            courseId: course._id,
            amountPaid: course.price,
            splits: {
                instructorFee: financials.deductions.instructorFee,
                affiliateCommission: financials.deductions.affiliateCommission,
                platformFee: financials.deductions.platformFee,
                netProfit: financials.netProfit,
                gwdShare: financials.splits.gwdShare,
                partnerShare: financials.splits.partnerShare
            }
        });

        // 5. Update Analytics for Ambassador (if any)
        if (ambassadorId) {
            await Analytics.findOneAndUpdate(
                { ambassadorId: ambassadorId },
                {
                    $inc: { conversions: 1, totalEarnings: affiliateCommission },
                    $setOnInsert: { ambassadorId: ambassadorId }
                },
                { upsert: true }
            );
        }

        res.status(201).json(transaction);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
};

// @desc    Get Financial Stats (Super Admin)
// @route   GET /api/v1/finance/stats
// @access  Private (Super Admin)
const getFinancialStats = async (req, res) => {
    try {
        const stats = await Transaction.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$amountPaid' },
                    totalNetProfit: { $sum: '$splits.netProfit' },
                    gwdTotalShare: { $sum: '$splits.gwdShare' },
                    partnerTotalShare: { $sum: '$splits.partnerShare' },
                    totalAffiliatePayout: { $sum: '$splits.affiliateCommission' }
                }
            }
        ]);

        res.json(stats[0] || {});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    enrollStudent,
    getFinancialStats
};
