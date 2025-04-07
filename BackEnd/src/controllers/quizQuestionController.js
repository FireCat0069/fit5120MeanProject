const QuizQuestion = require('../models/QuizBank');

exports.getAllQuizQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve quiz questions', error: err.message });
  }
};
