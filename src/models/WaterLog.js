const mongoose = require("mongoose");

const waterLogSchema = new mongoose.Schema(
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

  amount:
  {
    type: Number, // in milliliters
    required: true
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("WaterLog", waterLogSchema);
