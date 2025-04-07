const MBTIQuiz = require('../models/MBTIQuiz');

exports.getAllMBTIQuestions = async (req, res) => {
  try {
    const questions = await MBTIQuiz.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve MBTI quiz questions', error: err.message });
  }
};
