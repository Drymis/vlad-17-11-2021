const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      unique: false,
      required: false,
    },
    path: {
      type: String,
      unique: false,
      required: false,
    },
    checksum: {
      type: String,
      unique: false,
      required: false,
    }
  },
);
 
module.exports = Image = mongoose.model('Image', imageSchema);
 