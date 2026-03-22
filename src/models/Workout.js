const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["strength", "cardio"],
      required: true
    },

    duration: {
      type: Number, // in minutes
      required: true
    },

    intensity: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true
    },

    caloriesBurned: {
      type: Number,
      required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
