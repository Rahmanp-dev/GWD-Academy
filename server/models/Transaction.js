const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    splits: {
        instructorFee: { type: Number, default: 0 },
        affiliateCommission: { type: Number, default: 0 },
        platformFee: { type: Number, default: 0 }, // Added based on profitCalculator
        // overhead: { type: Number }, // Optional if platformFee covers it
        netProfit: { type: Number, default: 0 },
        gwdShare: { type: Number, default: 0 },
        partnerShare: { type: Number, default: 0 }
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
