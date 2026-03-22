const WaterLog = require("../models/WaterLog");
const User = require("../models/User");

const {
  calculateWaterGoal,
  getDailyWaterTotal
} = require("../services/waterService");


const logWater = async (req, res) =>
{
  try
  {
    const { amount } = req.body;

    const today = new Date();
    today.setHours(0,0,0,0);

    const water = await WaterLog.create({
      userId: req.user,
      date: today,
      amount
    });

    res.status(201).json(water);

  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getWaterSummary = async (req, res) =>
{
  try
  {
    const today = new Date();
    today.setHours(0,0,0,0);

    const user = await User.findById(req.user);

    const goal = calculateWaterGoal(user.weight);

    const consumed =
      await getDailyWaterTotal(req.user, today);

    const remaining = goal - consumed;

    res.json({
      goal,
      consumed,
      remaining
    });

  }
  catch(error)
  {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports =
{
  logWater,
  getWaterSummary
};
