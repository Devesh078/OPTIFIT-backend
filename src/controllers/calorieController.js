const Calorie = require("../models/Calorie");
const User = require("../models/User");
const { calculateDailyCalories } = require("../services/calorieService");

const generateDailyCalories = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const calorieData = calculateDailyCalories(user);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if today's calories already exist
    let calorieEntry = await Calorie.findOne({
      userId: user._id,
      date: today
    });

    if (!calorieEntry) {
      calorieEntry = await Calorie.create({
        userId: user._id,
        date: today,
        ...calorieData
      });
    }

    res.status(200).json(calorieEntry);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateDailyCalories };
