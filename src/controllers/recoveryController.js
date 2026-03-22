const Recovery = require("../models/Recovery");
const Sleep = require("../models/Sleep");
const { calculateSleepDebt } = require("../services/sleepService");
const { calculateRecoveryScore } = require("../services/recoveryService");

const generateRecoveryScore = async (req, res) => {
  try {

    // Create date range instead of exact date
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Find today's sleep using range
    const sleepLog = await Sleep.findOne({
      userId: req.user,
      date: { $gte: start, $lte: end }
    });

    const sleepHours = sleepLog ? sleepLog.sleepHours : 8;

    // Calculate weekly sleep debt
    const sleepDebt = await calculateSleepDebt(req.user);

    // Calculate recovery score
    const score = calculateRecoveryScore(sleepHours, sleepDebt);

    // Find today's recovery entry
    let recoveryEntry = await Recovery.findOne({
      userId: req.user,
      date: { $gte: start, $lte: end }
    });

    if (!recoveryEntry) {

      recoveryEntry = await Recovery.create({
        userId: req.user,
        date: start,
        score,
        sleepHours,
        sleepDebt
      });

    } else {

      recoveryEntry.score = score;
      recoveryEntry.sleepHours = sleepHours;
      recoveryEntry.sleepDebt = sleepDebt;

      await recoveryEntry.save();
    }

    res.status(200).json(recoveryEntry);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }
};

module.exports = { generateRecoveryScore };
