const mongoose = require("mongoose");

const wearableDataSchema = new mongoose.Schema(
{
  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date:
  {
    type: Date,
    required: true
  },

  steps: Number,

  sleepHours: Number,

  caloriesBurned: Number,

  source:
  {
    type: String,
    enum: [
      "google_fit",
      "apple_health",
      "fitbit",
      "garmin"
    ]
  }

},
{ timestamps: true }
);

module.exports =
mongoose.model(
"WearableData",
wearableDataSchema
);
