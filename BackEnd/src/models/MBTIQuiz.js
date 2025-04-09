const mongoose = require('mongoose');

const mbtiQuizSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, default: '' },
}, { collection: 'MBTIQuiz' });

module.exports = mongoose.model('MBTIQuiz', mbtiQuizSchema);