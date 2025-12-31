const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    ambassadorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One record per ambassador to aggregate stats
    },
    clicks: {
        type: Number,
        default: 0
    },
    conversions: {
        type: Number,
        default: 0
    },
    totalEarnings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
