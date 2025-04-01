// filepath: d:\FIT5120\my-backend\src\services\aiService.js
const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to process user input and get AI feedback
const getAIResponse = async (userInput) => {
  try {
    const response = await openai.createCompletion({
      model: 'gpt-4o-mini', // Use a suitable model
      prompt: `User input: ${userInput}\nProvide feedback:`,
      max_tokens: 100, // Limit the response length
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error.message);
    throw new Error('Failed to get AI response');
  }
};

module.exports = { getAIResponse };