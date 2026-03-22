const Protein = require("../models/Protein");
const User = require("../models/User");
const Sleep = require("../models/Sleep");

const { calculateSleepDebt } = require("../services/sleepService");
const {
  calculateBaseProtein,
  adjustProteinBySleepAndWorkout
} = require("../services/proteinService");


const generateAdaptiveProtein = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const baseProtein = calculateBaseProtein(user.weight, user.goal);

    const sleepDebt = await calculateSleepDebt(user._id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's sleep
    const todaySleepLog = await Sleep.findOne({
      userId: user._id,
      date: today
    });

    const todaySleep = todaySleepLog ? todaySleepLog.sleepHours : 8;

    // 🔥 THIS IS THE LINE YOU ASKED ABOUT
    const adjustedProtein = await adjustProteinBySleepAndWorkout(
    user._id,
    baseProtein,
    todaySleep,
    sleepDebt
  );


    let proteinEntry = await Protein.findOne({
      userId: user._id,
      date: today
    });

    if (!proteinEntry) {
  proteinEntry = await Protein.create({
    userId: user._id,
    date: today,
    baseProtein,
    adjustedProtein,
    sleepHours: todaySleep,
    sleepDebt
  });
} else {
  proteinEntry.baseProtein = baseProtein;
  proteinEntry.adjustedProtein = adjustedProtein;
  proteinEntry.sleepHours = todaySleep;
  proteinEntry.sleepDebt = sleepDebt;
  await proteinEntry.save();
}


    res.status(200).json(proteinEntry);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateAdaptiveProtein };
