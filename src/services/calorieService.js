const calculateBMR = (weight, height, age, gender) => {
  // Mifflin-St Jeor Formula
  if (gender === "female") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  // default male
  return 10 * weight + 6.25 * height - 5 * age + 5;
};

const getActivityMultiplier = (activityLevel) => {
  switch (activityLevel) {
    case "sedentary":
      return 1.2;
    case "moderate":
      return 1.55;
    case "active":
      return 1.75;
    default:
      return 1.55;
  }
};

const getGoalAdjustment = (goal) => {
  switch (goal) {
    case "muscle_build":
      return 300;
    case "weight_loss":
      return -400;
    default:
      return 0;
  }
};

const calculateDailyCalories = (user) => {
  const bmr = calculateBMR(
    user.weight,
    user.height,
    user.age,
    user.gender
  );

  const tdee = bmr * getActivityMultiplier(user.activityLevel);

  const finalCalories = Math.round(
    tdee + getGoalAdjustment(user.goal)
  );

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    finalCalories
  };
};

const calculateProteinTarget = (user, sleepHours = 8) => {
  let basePerKg = 1.6;

  if (user.goal === "muscle_build") basePerKg = 2.2;
  if (user.goal === "weight_loss") basePerKg = 2.0;

  const baseProtein = user.weight * basePerKg;

  // 💤 Sleep multiplier logic
  let multiplier = 1;

  if (sleepHours >= 8) multiplier = 1;
  else if (sleepHours >= 7) multiplier = 1.05;
  else if (sleepHours >= 6) multiplier = 1.1;
  else multiplier = 1.15;

  return Math.round(baseProtein * multiplier);
};

module.exports = {
  calculateDailyCalories,
  calculateProteinTarget
};