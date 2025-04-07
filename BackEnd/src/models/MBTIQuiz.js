const mongoose = require('mongoose');

const mbtiQuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, default: "" },
  explanation: { type: String, default: "" }
}, { collection: 'MBTIQuiz' }); 

module.exports = mongoose.model('MBTIQuiz', mbtiQuizSchema);
