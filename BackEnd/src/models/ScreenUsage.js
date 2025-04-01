const mongoose = require('mongoose');

// Define the schema for screen usage data
const screenUsageSchema = new mongoose.Schema({
  primaryDevice: {
    type: String,
    enum: ['Mobile Phone', 'Laptop', 'Other'], // Allowed values for the primary device
    required: [true, 'Primary device is required'] // Custom error message if the field is missing
  },
  usagePeriod: {
    type: String,
    enum: ['Morning','Evening', 'Afternoon', 'Late Night'], // Allowed values for the usage period
    required: [true, 'Usage period is required'] // Custom error message if the field is missing
  },
  mainPurpose: {
    type: String,
    enum: ['Work and Study', 'Entertainment'], // Allowed values for the main purpose
    required: [true, 'Main purpose is required'] // Custom error message if the field is missing
  },
  dailyScreenTime: {
    type: Number,
    required: [true, 'Daily screen time is required'], // Custom error message if the field is missing
    min: [1, 'Daily screen time must be at least 1 hour'], // Minimum value with a custom error message
    max: [15, 'Daily screen time cannot exceed 15 hours'] // Maximum value with a custom error message
  },
  appCategories: {
    type: [String], // Array of strings for app categories
    enum: {
      values: ['Social Media', 'Productivity', 'Streaming', 'Messaging', 'Gaming'], // Allowed values for each category
      message: 'App category must be one of: Social Media, Productivity, Streaming, Messaging, Gaming' // Custom error message for invalid values
    },
    required: [true, 'App categories are required'] // Custom error message if the field is missing
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the ScreenUsage model for use in other parts of the application
module.exports = mongoose.model('ScreenUsage', screenUsageSchema);