const mongoose = require("mongoose");

const stepLogSchema = new mongoose.Schema(
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

  steps:
  {
    type: Number,
    required: true
  }

},
{ timestamps: true }
);

module.exports =
mongoose.model("StepLog", stepLogSchema);
