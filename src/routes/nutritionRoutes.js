const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getNutritionSummary }
= require("../controllers/nutritionController");

router.get("/summary", authMiddleware, getNutritionSummary);

module.exports = router;
