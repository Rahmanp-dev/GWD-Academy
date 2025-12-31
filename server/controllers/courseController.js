const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: { $ne: 'archived' } })
            .populate('instructor', 'name avatar')
            .select('-curriculum'); // Exclude curriculum for list view
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single course
// @route   GET /api/v1/courses/:slug
// @access  Public (some parts might be private later)
const getCourseBySlug = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug })
            .populate('instructor', 'name avatar');

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a course
// @route   POST /api/v1/courses
// @access  Private (Admin/Instructor)
const createCourse = async (req, res) => {
    try {
        const { title, slug, price, category, status } = req.body;

        const course = new Course({
            title,
            slug, // In prod, generate from title if not provided
            price,
            category,
            status,
            instructor: req.user._id,
            curriculum: []
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(400).json({ message: 'Invalid course data', error: error.message });
    }
};

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private (Admin/Instructor)
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check ownership or superadmin
            if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
                return res.status(403).json({ message: 'Not authorized' });
            }

            course.title = req.body.title || course.title;
            course.price = req.body.price || course.price;
            course.category = req.body.category || course.category;
            course.status = req.body.status || course.status;
            course.curriculum = req.body.curriculum || course.curriculum; // Full replace for simplicity

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getCourses,
    getCourseBySlug,
    createCourse,
    updateCourse
};
