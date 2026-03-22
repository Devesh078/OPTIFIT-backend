const FoodLog = require("../models/FoodLog");

/* ===============================
   🔥 1️⃣ BMR Calculation
================================ */

const calculateBMR = (user) => {
  const { weight, height, age, gender } = user;

  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

/* ===============================
   🔥 2️⃣ Activity Multiplier
================================ */

const getActivityMultiplier = (level) => {
  switch (level) {
    case "sedentary":
      return 1.2;
    case "moderate":
      return 1.55;
    case "active":
      return 1.725;
    default:
      return 1.55;
  }
};

/* ===============================
   🔥 3️⃣ Calorie Goal Based On Goal Type
================================ */

const calculateCalorieGoal = (user) => {
  const bmr = calculateBMR(user);
  const tdee = bmr * getActivityMultiplier(user.activityLevel);

  switch (user.goal) {
    case "muscle_build":
      return Math.round(tdee + 300);
    case "weight_loss":
      return Math.round(tdee - 400);
    case "maintenance":
    default:
      return Math.round(tdee);
  }
};

/* ===============================
   🔥 4️⃣ Base Protein Goal
================================ */

const calculateProteinGoal = (user) => {
  const weight = user.weight;

  switch (user.goal) {
    case "muscle_build":
      return Math.round(weight * 2.2);
    case "weight_loss":
      return Math.round(weight * 1.8);
    case "maintenance":
    default:
      return Math.round(weight * 1.6);
  }
};

/* ===============================
   🔥 5️⃣ Daily Nutrition Totals
================================ */

const calculateDailyTotals = async (userId, date) => {
  const logs = await FoodLog.find({ userId, date });

  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    potassium: 0
  };

  logs.forEach(log => {
    totals.calories += log.calories || 0;
    totals.protein += log.protein || 0;
    totals.carbs += log.carbs || 0;
    totals.fats += log.fats || 0;
    totals.fiber += log.fiber || 0;
    totals.sugar += log.sugar || 0;
    totals.sodium += log.sodium || 0;
    totals.potassium += log.potassium || 0;
  });

  return totals;
};

module.exports = {
  calculateCalorieGoal,
  calculateProteinGoal,
  calculateDailyTotals
};