const MBTIQuiz = require('../models/MBTIQuiz');

exports.getAllMBTIQuestions = async (req, res) => {
  try {
    // Select specific fields and sort by _id
    const questions = await MBTIQuiz.find()
      .select('order question options type')
      .sort({ order: 1 }); 
      
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve MBTI quiz questions', error: err.message });
  }
};