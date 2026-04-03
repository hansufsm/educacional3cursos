const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Lesson',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    submissionFile: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
    grade: {
        type: Number,
        default: null,
    },
    feedback: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['submitted', 'graded', 'pending'],
        default: 'submitted',
    }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);