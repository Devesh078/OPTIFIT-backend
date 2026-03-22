const Readiness = require("../models/Readiness");
const Sleep = require("../models/Sleep");
const Recovery = require("../models/Recovery");
const Protein = require("../models/Protein");

const {
  calculateSleepScore,
  calculateDebtScore,
  calculateStrainScore,
  calculateProteinScore,
  calculateStatus
} = require("../services/readinessService");

const generateReadiness = async (req, res) =>
{
  try
  {
    const today = new Date();
    today.setHours(0,0,0,0);

    const sleep = await Sleep.findOne({ userId: req.user, date: today });
    const recovery = await Recovery.findOne({ userId: req.user, date: today });
    const protein = await Protein.findOne({ userId: req.user, date: today });

    const sleepHours = sleep?.sleepHours || 8;
    const sleepDebt = recovery?.sleepDebt || 0;
    const recoveryScore = recovery?.score || 80;

    const sleepScore = calculateSleepScore(sleepHours);
    const debtScore = calculateDebtScore(sleepDebt);
    const strainScore = await calculateStrainScore(req.user, today);
    const proteinScore = calculateProteinScore(
      protein?.baseProtein,
      protein?.adjustedProtein
    );

    const readinessScore =
      sleepScore * 0.25 +
      debtScore * 0.20 +
      recoveryScore * 0.25 +
      strainScore * 0.15 +
      proteinScore * 0.15;

    const status = calculateStatus(readinessScore);

    let readiness = await Readiness.findOne({
      userId: req.user,
      date: today
    });

    if (!readiness)
    {
      readiness = await Readiness.create({
        userId: req.user,
        date: today,
        score: Math.round(readinessScore),
        sleepScore,
        debtScore,
        recoveryScore,
        strainScore,
        proteinScore,
        status
      });
    }
    else
    {
      readiness.score = Math.round(readinessScore);
      readiness.sleepScore = sleepScore;
      readiness.debtScore = debtScore;
      readiness.recoveryScore = recoveryScore;
      readiness.strainScore = strainScore;
      readiness.proteinScore = proteinScore;
      readiness.status = status;

      await readiness.save();
    }

    res.json(readiness);

  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateReadiness };
