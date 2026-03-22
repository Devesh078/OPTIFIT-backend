const FoodLog =
require("../models/FoodLog");

const ProteinQuality =
require("../models/ProteinQuality");

const {
calculateProteinQualityScore
}
=
require(
"../services/proteinQualityService"
);


const generateProteinQuality =
async (req, res) =>
{
  try
  {
    const today =
    new Date();

    today.setHours(0,0,0,0);

    const foods =
    await FoodLog.find({
      userId: req.user,
      date: today
    });

    const score =
    calculateProteinQualityScore(
      foods
    );

    let totalProtein = 0;

    foods.forEach(f =>
    totalProtein += f.protein || 0
    );

    let entry =
    await ProteinQuality.findOne({
      userId: req.user,
      date: today
    });

    if(!entry)
    {
      entry =
      await ProteinQuality.create({

        userId: req.user,

        date: today,

        score,

        totalProtein

      });
    }
    else
    {
      entry.score = score;
      entry.totalProtein =
      totalProtein;

      await entry.save();
    }

    res.json(entry);
  }

  catch(error)
  {
    console.log(error);

    res.status(500)
    .json({
      message: "Server error"
    });
  }
};

module.exports =
{
generateProteinQuality
};
