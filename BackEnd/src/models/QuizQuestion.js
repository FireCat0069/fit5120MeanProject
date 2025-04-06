const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  Section: String,
  QuizType: String,
  Question: String,
  Options: String, 
}, { collection: 'MBTI_Quiz' }); 

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
