const StepLog =
require("../models/StepLog");

const {
  DEFAULT_STEP_GOAL,
  calculateStepCalories,
  getDailySteps
}
=
require("../services/stepService");


const logSteps =
async (req, res) =>
{
  try
  {
    const { steps } =
    req.body;

    const today =
    new Date();

    today.setHours(0,0,0,0);

    let log =
    await StepLog.findOne({
      userId: req.user,
      date: today
    });

    if(!log)
    {
      log =
      await StepLog.create({
        userId: req.user,
        date: today,
        steps
      });
    }
    else
    {
      log.steps = steps;
      await log.save();
    }

    res.json(log);
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


const getStepSummary =
async (req, res) =>
{
  try
  {
    const today =
    new Date();

    today.setHours(0,0,0,0);

    const steps =
    await getDailySteps(
      req.user,
      today
    );

    const calories =
    calculateStepCalories(
      steps
    );

    const remaining =
    DEFAULT_STEP_GOAL - steps;

    res.json({
      goal: DEFAULT_STEP_GOAL,
      steps,
      remaining,
      caloriesBurned: calories
    });
  }

  catch(error)
  {
    res.status(500)
    .json({
      message: "Server error"
    });
  }
};

module.exports =
{
  logSteps,
  getStepSummary
};
