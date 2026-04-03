const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    questions: [{
        questionText: { type: String, required: true },
        options: [{
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }],
        points: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);