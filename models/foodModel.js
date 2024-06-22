// import mongoose from 'mongoose';

// const foodSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String,
//     required:true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.model('Food', FoodSchema);

export default Food;
