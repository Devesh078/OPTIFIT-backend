const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },
    age: {
      type: Number,
      required: true
    },

    height: {
      type: Number, // in cm
      required: true
    },

    weight: {
      type: Number, // in kg
      required: true
    },

    goal: {
      type: String,
      enum: ["muscle_build", "weight_loss", "maintenance"],
      default: "maintenance"
    },

    activityLevel: {
      type: String,
      enum: ["sedentary", "moderate", "active"],
      default: "moderate"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
