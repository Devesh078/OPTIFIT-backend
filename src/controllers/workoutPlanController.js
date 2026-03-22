const WorkoutPlan =
require("../models/WorkoutPlan");


const createWorkoutPlan = async (req, res) =>
{
  try
  {
    const plan =
    await WorkoutPlan.create(req.body);

    res.status(201).json(plan);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


const getAllPlans = async (req, res) =>
{
  try
  {
    const plans =
    await WorkoutPlan.find();

    res.json(plans);
  }
  catch(error)
  {
    res.status(500).json({
      message: "Server error"
    });
  }
};


const getPlansByGoal = async (req, res) =>
{
  try
  {
    const { goal } = req.params;

    const plans =
    await WorkoutPlan.find({ goal });

    res.json(plans);
  }
  catch(error)
  {
    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports =
{
  createWorkoutPlan,
  getAllPlans,
  getPlansByGoal
};
