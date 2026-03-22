const mongoose = require("mongoose");

const recoverySchema = new mongoose.Schema(
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
    sleepHours: Number,
    sleepDebt: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recovery", recoverySchema);
