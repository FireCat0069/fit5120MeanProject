const MBTIQuiz = require('../models/MBTIQuiz');
const ScreenUsage = require('../models/ScreenUsage');

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
exports.validateAnswers = async (req, res) => {
  try {
    const answers = req.body;
    const results = [];

    for (const answer of answers) {
      const { option, order } = answer;

      const question = await MBTIQuiz.findOne({ order });

      if (!question) {
        results.push({ order, message: 'Question not found' });
        continue;
      }

      if (!question.correctAnswer) {
        results.push({
          order,
          isCorrect: null,
          explanation: "This question is for data collection purposes only.",
          correctAnswer: null
        });
        continue;
      }

      const isCorrect = question.correctAnswer === option;

      results.push({
        order,
        isCorrect,
        explanation: question.explanation,
        correctAnswer: question.correctAnswer
      });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to validate answers', error: err.message });
  }
};