const Workout = require("../models/Workout");

const calculateSleepScore = (sleepHours) =>
{
  return Math.min(100, (sleepHours / 8) * 100);
};

const calculateDebtScore = (sleepDebt) =>
{
  return Math.max(0, 100 - (sleepDebt * 10));
};

const calculateStrainScore = async (userId, date) =>
{
  const workout = await Workout.findOne({ userId, date });

  if (!workout) return 100;

  if (workout.intensity === "high") return 60;
  if (workout.intensity === "moderate") return 75;
  return 90;
};

const calculateProteinScore = (baseProtein, adjustedProtein) =>
{
  if (!adjustedProtein) return 50;

  return Math.min(100, (baseProtein / adjustedProtein) * 100);
};

const calculateStatus = (score) =>
{
  if (score >= 80) return "OPTIMAL";
  if (score >= 60) return "GOOD";
  if (score >= 40) return "MODERATE";
  return "POOR";
};

module.exports =
{
  calculateSleepScore,
  calculateDebtScore,
  calculateStrainScore,
  calculateProteinScore,
  calculateStatus
};
