const mongoose = require("mongoose");

const readinessSchema = new mongoose.Schema(
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

  score: Number,

  sleepScore: Number,
  debtScore: Number,
  recoveryScore: Number,
  strainScore: Number,
  proteinScore: Number,

  status: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Readiness", readinessSchema);
