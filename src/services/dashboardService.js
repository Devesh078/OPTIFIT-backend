const getRecoveryStatus = (score) => {

  if (score >= 90) return "EXCELLENT";
  if (score >= 75) return "GOOD";
  if (score >= 60) return "MODERATE";
  return "LOW";

};

const getSleepStatus = (sleepHours) => {

  if (sleepHours >= 8) return "OPTIMAL";
  if (sleepHours >= 7) return "ADEQUATE";
  if (sleepHours >= 6) return "INSUFFICIENT";
  return "POOR";

};

const getProteinStatus = (baseProtein, adjustedProtein) => {

  if (adjustedProtein > baseProtein) return "INCREASED_NEED";
  return "ON_TRACK";

};

const getCalorieStatus = (calories) => {

  if (!calories) return "UNKNOWN";

  if (calories.finalCalories >= 2500) return "HIGH_ENERGY";
  if (calories.finalCalories >= 2000) return "OPTIMAL";

  return "LOW_ENERGY";

};

const getSuggestion = (recoveryScore, sleepHours) => {

  if (recoveryScore < 60)
    return "Your recovery is low. Prioritize sleep and reduce workout intensity.";

  if (sleepHours < 7)
    return "Increase sleep duration to improve recovery and protein utilization.";

  return "You are in good condition. Maintain your current routine.";

};

const buildDashboardIntelligence = (dashboardData) => {

  const recoveryScore = dashboardData.recovery?.score || 0;
  const sleepHours = dashboardData.sleep?.sleepHours || 0;
  const baseProtein = dashboardData.protein?.baseProtein || 0;
  const adjustedProtein = dashboardData.protein?.adjustedProtein || 0;

  return {

    recoveryStatus: getRecoveryStatus(recoveryScore),

    sleepStatus: getSleepStatus(sleepHours),

    proteinStatus: getProteinStatus(baseProtein, adjustedProtein),

    calorieStatus: getCalorieStatus(dashboardData.calories),

    suggestion: getSuggestion(recoveryScore, sleepHours)

  };

};

module.exports = { buildDashboardIntelligence };
