const Sleep = require("../models/Sleep");

const calculateSleepDebt = async (userId) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const sleepLogs = await Sleep.find({
    userId,
    date: { $gte: oneWeekAgo }
  });

  let totalDebt = 0;

  sleepLogs.forEach(log => {
    const debt = 8 - log.sleepHours;
    if (debt > 0) totalDebt += debt;
  });

  return totalDebt;
};

module.exports = { calculateSleepDebt };
