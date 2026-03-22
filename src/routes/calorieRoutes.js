const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { generateDailyCalories } = require("../controllers/calorieController");

router.get("/generate", protect, generateDailyCalories);

module.exports = router;
