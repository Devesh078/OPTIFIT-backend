const mongoose = require("mongoose");

const proteinSchema = new mongoose.Schema(
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

    baseProtein: Number,
    adjustedProtein: Number,
    sleepHours: Number,
    sleepDebt: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Protein", proteinSchema);
