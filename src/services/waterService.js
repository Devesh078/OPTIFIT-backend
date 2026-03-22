const WaterLog = require("../models/WaterLog");

const calculateWaterGoal = (weight) =>
{
  // 35 ml per kg body weight
  return Math.round(weight * 35);
};

const getDailyWaterTotal = async (userId, date) =>
{
  const logs = await WaterLog.find({ userId, date });

  let total = 0;

  logs.forEach(log =>
  {
    total += log.amount;
  });

  return total;
};

module.exports =
{
  calculateWaterGoal,
  getDailyWaterTotal
};
