const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
    week: { type: Number, required: true },
    title: { type: String, required: true },
    modules: [{
        title: { type: String, required: true },
        videoUrl: { type: String }, // Optional: link to video content
        duration: { type: String }  // Optional: e.g. "10:00"
    }]
}, { _id: false });

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    thumbnail: {
        type: String,
        default: 'default-course.jpg'
    },
    category: {
        type: String,
        enum: ['Tech', 'Creative', 'Business'],
        required: true
    },
    curriculum: [curriculumSchema],
    status: {
        type: String,
        enum: ['draft', 'active', 'archived'],
        default: 'draft'
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
