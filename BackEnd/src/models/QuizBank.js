const mongoose = require('mongoose');

const quizBankSchema = new mongoose.Schema({
  Section: { type: String },
  Question: { type: String },
  Options: [{ type: String }], 
  CorrectAnswer: { type: String },
  quizType: { type: String }
}, { collection: 'QuizBank' });

module.exports = mongoose.model('QuizBank', quizBankSchema);
