const Workout = require("../models/Workout");

const calculateBaseProtein = (weight, goal) => {

  switch (goal) {

    case "muscle_build":
      return weight * 2.2;

    case "weight_loss":
      return weight * 1.8;

    default:
      return weight * 1.6;
  }

};

const adjustProteinBySleepAndWorkout = async (
  userId,
  baseProtein,
  sleepHours,
  sleepDebt
) => {

  let multiplier = 1;

  // Sleep adjustment
  if (sleepHours < 6) multiplier += 0.05;

  if (sleepDebt >= 5) multiplier += 0.10;

  // Workout adjustment
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const workout = await Workout.findOne({
    userId,
    date: { $gte: start, $lte: end }
  });

  if (workout) {

    if (workout.intensity === "moderate")
      multiplier += 0.05;

    if (workout.intensity === "high")
      multiplier += 0.10;

  }

  return Math.round(baseProtein * multiplier);

};

module.exports = {
  calculateBaseProtein,
  adjustProteinBySleepAndWorkout
};
