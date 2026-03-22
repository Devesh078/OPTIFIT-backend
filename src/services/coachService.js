const generateCoachMessage = ({
  readinessScore,
  readinessStatus,
  sleepHours,
  sleepDebt,
  recoveryScore,
  adjustedProtein,
  baseProtein,
  workoutIntensity
}) => {

  let messages = [];

  // Readiness based advice
  if (readinessScore >= 80)
    messages.push("Your body is fully recovered. Today is ideal for intense training.");

  else if (readinessScore >= 60)
    messages.push("You are ready for moderate to heavy training.");

  else if (readinessScore >= 40)
    messages.push("Your recovery is moderate. Consider lighter workouts.");

  else
    messages.push("Your recovery is low. Focus on rest and sleep.");


  // Sleep advice
  if (sleepHours < 7)
    messages.push("Increase your sleep duration to improve recovery.");

  if (sleepDebt >= 5)
    messages.push("You have accumulated sleep debt. Prioritize sleep tonight.");


  // Protein advice
  if (adjustedProtein > baseProtein)
    messages.push("Your protein requirement is elevated. Ensure adequate protein intake.");


  // Recovery advice
  if (recoveryScore < 70)
    messages.push("Your recovery score is low. Avoid intense workouts.");


  // Workout advice
  if (workoutIntensity === "high")
    messages.push("You performed a high intensity workout. Proper nutrition and rest are important.");


  return messages.join(" ");

};

module.exports = { generateCoachMessage };
