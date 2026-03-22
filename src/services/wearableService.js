const StepLog =
require("../models/StepLog");

const Sleep =
require("../models/Sleep");

const Workout =
require("../models/Workout");


const syncSteps =
async (userId, date, steps) =>
{
  await StepLog.findOneAndUpdate(
    { userId, date },
    { steps },
    { upsert: true }
  );
};


const syncSleep =
async (userId, date, sleepHours) =>
{
  await Sleep.findOneAndUpdate(
    { userId, date },
    { sleepHours },
    { upsert: true }
  );
};


const syncCalories =
async (userId, date, caloriesBurned) =>
{
  await Workout.create({
    userId,
    date,
    type: "cardio",
    duration: 0,
    intensity: "low",
    caloriesBurned
  });
};


module.exports =
{
  syncSteps,
  syncSleep,
  syncCalories
};
