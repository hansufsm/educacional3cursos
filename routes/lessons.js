const express = require('express');
const router = express.Router();

// Mock data for lessons
let lessons = [
    { id: 1, title: 'Lesson 1', progress: 0, completed: false },
    { id: 2, title: 'Lesson 2', progress: 0, completed: false },
    { id: 3, title: 'Lesson 3', progress: 0, completed: false }
];

// Get all lessons from a course
router.get('/lessons', (req, res) => {
    res.json(lessons);
});

// Get single lesson by ID
router.get('/lessons/:id', (req, res) => {
    const lesson = lessons.find(l => l.id === parseInt(req.params.id));
    if (!lesson) return res.status(404).send('Lesson not found.');
    res.json(lesson);
});

// Update lesson progress
router.put('/lessons/:id/progress', (req, res) => {
    const lesson = lessons.find(l => l.id === parseInt(req.params.id));
    if (!lesson) return res.status(404).send('Lesson not found.');
    lesson.progress = req.body.progress;
    res.json(lesson);
});

// Mark lesson as complete
router.put('/lessons/:id/complete', (req, res) => {
    const lesson = lessons.find(l => l.id === parseInt(req.params.id));
    if (!lesson) return res.status(404).send('Lesson not found.');
    lesson.completed = true;
    res.json(lesson);
});

module.exports = router;