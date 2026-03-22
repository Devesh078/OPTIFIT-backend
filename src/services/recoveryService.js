const calculateRecoveryScore = (sleepHours, sleepDebt) => {
  let score = 100;

  // Penalize short sleep
  if (sleepHours < 6) {
    score -= 15;
  } else if (sleepHours < 7) {
    score -= 8;
  }

  // Penalize accumulated sleep debt
  score -= sleepDebt * 3;

  // Clamp between 0 and 100
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return Math.round(score);
};

module.exports = { calculateRecoveryScore };
