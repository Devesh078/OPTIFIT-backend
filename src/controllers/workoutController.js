const Workout = require("../models/Workout");
const { calculateCaloriesBurned } = require("../services/workoutService");

const logWorkout = async (req, res) => {

  try {

    const { type, duration, intensity } = req.body;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const caloriesBurned = calculateCaloriesBurned(
      type,
      intensity,
      duration
    );

    const workout = await Workout.create({

      userId: req.user,
      date: start,
      type,
      duration,
      intensity,
      caloriesBurned

    });

    res.status(201).json(workout);

  }
  catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};

module.exports = { logWorkout };
