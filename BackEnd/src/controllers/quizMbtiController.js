const MBTIQuiz = require('../models/MBTIQuiz');

// 获取所有问题
exports.getAllMBTIQuestions = async (req, res) => {
  try {
    const questions = await MBTIQuiz.find().select('order question options type').sort({ order: 1 });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve MBTI quiz questions', error: err.message });
  }
};

// 校验答案
exports.validateAnswer = async (req, res) => {
  try {
    const { option, order } = req.body;
    const question = await MBTIQuiz.findOne({ order });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (!question.correctAnswer) {
      return res.status(200).json({
        isCorrect: null,
        explanation: "This question is for data collection purposes only.",
        correctAnswer: null
      });
    }

    const isCorrect = question.correctAnswer === option;

    res.status(200).json({
      isCorrect,
      explanation: question.explanation,
      correctAnswer: question.correctAnswer
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate answer', error: err.message });
  }
};