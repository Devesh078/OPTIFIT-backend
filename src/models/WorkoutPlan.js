const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number,
  duration: Number, // in minutes (optional)
});

const daySchema = new mongoose.Schema({
  day: String, // Monday, Tuesday, etc.
  exercises: [exerciseSchema]
});

const workoutPlanSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  goal: {
    type: String,
    enum: ["muscle_build", "weight_loss", "maintenance"],
    required: true
  },

  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true
  },

  durationWeeks: {
    type: Number,
    default: 1
  },

  days: [daySchema]

},
{ timestamps: true });

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
