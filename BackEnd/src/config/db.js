const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Check if the MONGO_URI environment variable is defined
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Attempt to connect to MongoDB using the provided URI
    await mongoose.connect(process.env.MONGO_URI);

    // Log a success message if the connection is established
    console.log('✅ MongoDB Connected');
  } catch (error) {
    // Log the error message and stack trace if the connection fails
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.error(error.stack);

    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;