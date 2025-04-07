const express = require('express');
const router = express.Router();
const { getAllMBTIQuestions } = require('../controllers/quizMbtiController'); 

router.get('/', getAllMBTIQuestions);

module.exports = router;
