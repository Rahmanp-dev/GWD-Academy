const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseBySlug,
    createCourse,
    updateCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, authorize('superadmin', 'instructor'), createCourse);

router.route('/:slug')
    .get(getCourseBySlug);

router.route('/:id')
    .put(protect, authorize('superadmin', 'instructor'), updateCourse);

module.exports = router;
