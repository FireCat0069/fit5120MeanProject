const mongoose = require('mongoose');

const screenUsageSchema = new mongoose.Schema({
  Device_Type: { type: String, required: false },
  Screen_Time_Period: { type: String, required: false },
  Screen_Activity: { type: String, required: false },
  Average_Screen_Time: { type: Number, required: false },
  App_Category: { type: String, required: false }
}, { collection: 'ScreenUsage' });

module.exports = mongoose.model('ScreenUsage', screenUsageSchema);