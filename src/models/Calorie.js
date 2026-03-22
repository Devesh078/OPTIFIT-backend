const mongoose = require("mongoose");

const calorieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    bmr: Number,
    tdee: Number,
    finalCalories: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calorie", calorieSchema);
