const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const verifyToken = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('lessons').populate('enrollments', '-password -lgpdConsent');
        res.json({
            success: true,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving courses',
            error: error.message
        });
    }
});

// Get course by ID
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId)
            .populate('lessons')
            .populate('enrollments', '-password -lgpdConsent');
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving course',
            error: error.message
        });
    }
});

// Enroll user in course (requires authentication)
router.post('/:courseId/enroll', verifyToken, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if already enrolled
        if (course.enrollments.includes(req.userId)) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course'
            });
        }

        course.enrollments.push(req.userId);
        await course.save();

        res.json({
            success: true,
            message: 'Successfully enrolled in course',
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error enrolling in course',
            error: error.message
        });
    }
});

module.exports = router;