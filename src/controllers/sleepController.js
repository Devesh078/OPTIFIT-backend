const Sleep = require("../models/Sleep");

// 🔹 LOG SLEEP (Already Good)
const logSleep = async (req, res) => {
  try {
    const { sleepHours } = req.body;

    if (!sleepHours) {
      return res.status(400).json({ message: "Sleep hours required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let sleepEntry = await Sleep.findOne({
      userId: req.user,
      date: today
    });

    if (!sleepEntry) {
      sleepEntry = await Sleep.create({
        userId: req.user,
        date: today,
        sleepHours
      });
    } else {
      sleepEntry.sleepHours = sleepHours;
      await sleepEntry.save();
    }

    res.status(200).json(sleepEntry);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 GET TODAY SLEEP (NEW)
const getTodaySleep = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sleepEntry = await Sleep.findOne({
      userId: req.user,
      date: today
    });

    res.status(200).json(sleepEntry || null);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { logSleep, getTodaySleep };