const express = require('express');
const router = express.Router();
const { getAllQuizQuestions } = require('../controllers/quizQuestionController');

router.get('/', getAllQuizQuestions);

module.exports = router;
