import mongoose from '../services/mongodb.js';

const productCategorySchema = new mongoose.Schema(
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
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
);

const productCategory = mongoose.model('productCategory', productCategorySchema);
export default productCategory;
