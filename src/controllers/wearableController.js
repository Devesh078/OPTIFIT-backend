const WearableData =
require("../models/WearableData");

const {
  syncSteps,
  syncSleep,
  syncCalories
}
=
require("../services/wearableService");


const syncWearableData =
async (req, res) =>
{
  try
  {
    const {
      steps,
      sleepHours,
      caloriesBurned,
      source
    } = req.body;

    const today =
    new Date();

    today.setHours(0,0,0,0);

    const wearable =
    await WearableData.create({

      userId: req.user,

      date: today,

      steps,

      sleepHours,

      caloriesBurned,

      source

    });

    if(steps)
    await syncSteps(
      req.user,
      today,
      steps
    );

    if(sleepHours)
    await syncSleep(
      req.user,
      today,
      sleepHours
    );

    if(caloriesBurned)
    await syncCalories(
      req.user,
      today,
      caloriesBurned
    );

    res.json(wearable);
  }

  catch(error)
  {
    console.log(error);

    res.status(500)
    .json({
      message:
      "Sync failed"
    });
  }
};

module.exports =
{
  syncWearableData
};
