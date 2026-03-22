const User = require("../models/User");
const FoodLog = require("../models/FoodLog");
const WaterLog = require("../models/WaterLog");
const StepLog = require("../models/StepLog");
const Sleep = require("../models/Sleep");
const Recovery = require("../models/Recovery");
const ProteinQuality = require("../models/ProteinQuality");
const Workout = require("../models/Workout");

const {
  calculateDailyCalories,
  calculateProteinTarget
} = require("../services/calorieService");

const { calculateWaterGoal } =
require("../services/waterService");

const {
  DEFAULT_STEP_GOAL,
  calculateStepCalories
} = require("../services/stepService");


const getDashboard = async (req, res) => {
  try {

    const userId = req.user;

    const today = new Date();
    today.setHours(0,0,0,0);

    // USER
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 AUTO CALCULATED TARGETS
    const calorieData = calculateDailyCalories(user);
    const sleepData = await Sleep.findOne({
  userId,
  date: today
});

const sleepHours = sleepData?.sleepHours || 8;

const proteinTarget =
  calculateProteinTarget(user, sleepHours);

    // FOOD TOTALS
    const foods = await FoodLog.find({ userId, date: today });

    let consumedCalories = 0;
    let consumedProtein = 0;

    foods.forEach(f => {
      consumedCalories += f.calories || 0;
      consumedProtein += f.protein || 0;
    });

    // WORKOUT
    const workouts = await Workout.find({ userId, date: today });

    let burnedCalories = 0;

    workouts.forEach(w => {
      burnedCalories += w.caloriesBurned || 0;
    });

    // STEPS
    const stepLog = await StepLog.findOne({ userId, date: today });

    const steps = stepLog?.steps || 0;
    const stepCalories = calculateStepCalories(steps);

    // WATER
    const waterLogs = await WaterLog.find({ userId, date: today });

    let waterConsumed = 0;

    waterLogs.forEach(w => {
      waterConsumed += w.amount;
    });

    const waterGoal = calculateWaterGoal(user.weight);

    // SLEEP
    const sleep = await Sleep.findOne({ userId, date: today });

    // RECOVERY
    const recovery = await Recovery.findOne({ userId, date: today });

    // PROTEIN QUALITY
    const proteinQuality = await ProteinQuality.findOne({ userId, date: today });

    res.json({

      user,

      calories: {
        target: calorieData.finalCalories,
        consumed: consumedCalories,
        burned: burnedCalories + stepCalories,
        remaining:
          calorieData.finalCalories
          - consumedCalories
          + burnedCalories
          + stepCalories
      },

      protein: {
        target: proteinTarget,
        consumed: consumedProtein,
        remaining:
          proteinTarget - consumedProtein
      },

      water: {
        goal: waterGoal,
        consumed: waterConsumed,
        remaining:
          waterGoal - waterConsumed
      },

      steps: {
        goal: DEFAULT_STEP_GOAL,
        steps,
        caloriesBurned: stepCalories,
        remaining:
          DEFAULT_STEP_GOAL - steps
      },

      sleep,
      recovery,
      proteinQuality,

      workout: {
        caloriesBurned: burnedCalories
      }

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { getDashboard };