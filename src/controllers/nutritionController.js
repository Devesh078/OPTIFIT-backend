const FoodLog = require("../models/FoodLog");
const Calorie = require("../models/Calorie");
const Protein = require("../models/Protein");
const Workout = require("../models/Workout");

const getNutritionSummary = async (req, res) => {
  try {

    const userId = req.user;

    const today = new Date();
    today.setHours(0,0,0,0);

    // Get calorie target
    const calorieEntry = await Calorie.findOne({
      userId,
      date: today
    });

    const calorieTarget = calorieEntry?.finalCalories || 0;


    // Get protein target
    const proteinEntry = await Protein.findOne({
      userId,
      date: today
    });

    const proteinTarget = proteinEntry?.adjustedProtein || 0;


    // Get food logs
    const foodLogs = await FoodLog.find({
      userId,
      date: today
    });

    let consumedCalories = 0;
    let consumedProtein = 0;
    let consumedCarbs = 0;
    let consumedFats = 0;
    let consumedFiber = 0;
    let consumedSugar = 0;

    foodLogs.forEach(log => {
      consumedCalories += log.calories || 0;
      consumedProtein += log.protein || 0;
      consumedCarbs += log.carbs || 0;
      consumedFats += log.fats || 0;
      consumedFiber += log.fiber || 0;
      consumedSugar += log.sugar || 0;
    });


    // Get exercise calories burned
    const workouts = await Workout.find({
      userId,
      date: today
    });

    let exerciseCalories = 0;

    workouts.forEach(workout => {
      exerciseCalories += workout.caloriesBurned || 0;
    });


    // Calculate remaining
    const remainingCalories =
      calorieTarget - consumedCalories + exerciseCalories;

    const remainingProtein =
      proteinTarget - consumedProtein;


    res.json({

      calories: {
        target: calorieTarget,
        consumed: consumedCalories,
        burned: exerciseCalories,
        remaining: remainingCalories
      },

      protein: {
        target: proteinTarget,
        consumed: consumedProtein,
        remaining: remainingProtein
      },

      carbs: {
        consumed: consumedCarbs
      },

      fats: {
        consumed: consumedFats
      },

      fiber: {
        consumed: consumedFiber
      },

      sugar: {
        consumed: consumedSugar
      }

    });

  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getNutritionSummary };
