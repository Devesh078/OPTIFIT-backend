const mongoose = require("mongoose");

const proteinQualitySchema =
new mongoose.Schema(
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

  score:
  {
    type: Number,
    required: true
  },

  totalProtein:
  {
    type: Number,
    required: true
  }

},
{ timestamps: true }
);

module.exports =
mongoose.model(
"ProteinQuality",
proteinQualitySchema
);
