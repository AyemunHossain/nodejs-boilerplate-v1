const mongoose = require('../services/mongodb');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  }, { timestamps: true }
)

module.exports = mongoose.model('productCategory', schema);