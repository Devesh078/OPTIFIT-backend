const Readiness = require("../models/Readiness");
const Sleep = require("../models/Sleep");
const Protein = require("../models/Protein");
const Workout = require("../models/Workout");

const { generateCoachMessage } = require("../services/coachService");

const getTodayCoach = async (req, res) => {

  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const readiness = await Readiness.findOne({
      userId: req.user,
      date: today
    });

    const sleep = await Sleep.findOne({
      userId: req.user,
      date: today
    });

    const protein = await Protein.findOne({
      userId: req.user,
      date: today
    });

    const workout = await Workout.findOne({
      userId: req.user,
      date: today
    });

    const message = generateCoachMessage({

      readinessScore: readiness?.score || 70,
      readinessStatus: readiness?.status || "GOOD",

      sleepHours: sleep?.sleepHours || 8,
      sleepDebt: readiness?.debtScore || 0,

      recoveryScore: readiness?.recoveryScore || 80,

      adjustedProtein: protein?.adjustedProtein || 0,
      baseProtein: protein?.baseProtein || 0,

      workoutIntensity: workout?.intensity || "none"

    });

    res.json({
      readinessScore: readiness?.score,
      readinessStatus: readiness?.status,
      coachMessage: message
    });

  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }

};

module.exports = { getTodayCoach };
