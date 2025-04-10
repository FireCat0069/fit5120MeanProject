const QuizQuestion = require('../models/QuizBank');

exports.getAllQuizQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve quiz questions', error: err.message });
  }
};

exports.validateQuizAnswers = async (req, res) => {
  try {
    const answers = req.body; 
    const results = [];

    for (const answer of answers) {
      const { _id, selectedOption } = answer;

      const question = await QuizQuestion.findById(_id);

      if (!question) {
        results.push({ 
          _id, 
          selectedOption, 
          correctAnswer: null, 
          isCorrect: false, 
          message: 'Question not found' 
        });
        continue;
      }

      const isCorrect = question.CorrectAnswer === selectedOption;

      results.push({
        _id,
        selectedOption, 
        correctAnswer: question.CorrectAnswer, 
        isCorrect 
      });
    }

    console.log(results); 
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate quiz answers', error: err.message });
  }
};