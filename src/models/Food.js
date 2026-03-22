const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  category: String,

  nutritionPer100g: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number,
    sugar: Number
  },

  units: {
    gram: { type: Number, default: 1 },
    piece: Number,
    tbsp: Number,
    tsp: Number,
    cup: Number
  }

}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);