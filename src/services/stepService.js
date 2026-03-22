const StepLog =
require("../models/StepLog");

const DEFAULT_STEP_GOAL = 10000;

// 1 step ≈ 0.04 calories
const calculateStepCalories =
(steps) =>
{
  return Math.round(steps * 0.04);
};

const getDailySteps =
async (userId, date) =>
{
  const log =
  await StepLog.findOne({
    userId,
    date
  });

  return log?.steps || 0;
};

module.exports =
{
  DEFAULT_STEP_GOAL,
  calculateStepCalories,
  getDailySteps
};
