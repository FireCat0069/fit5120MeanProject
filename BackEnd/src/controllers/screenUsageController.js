const ScreenUsage = require('../models/ScreenUsage'); 

// Controller function to handle screen usage data submission
exports.submitScreenUsage = async (req, res) => {
  try {
    const data = req.body;

    // Validate if the request body is empty
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'Request body is empty or invalid' });
    }

    // Create and save a new screen usage record
    const newUsage = new ScreenUsage(data);
    const saved = await newUsage.save();

    // Return a success response with the saved data
    res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    // Log the error and return a 500 Internal Server Error response
    console.error('Error saving screen usage:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};