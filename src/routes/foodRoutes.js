/*const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  logFood,
  getDailyNutrition,
  getTodayFoods,
  searchFood
} = require("../controllers/foodController");


// Log food
router.post("/log", authMiddleware, logFood);

// Get today's nutrition summary
router.get("/today", authMiddleware, getDailyNutrition);

// Search food using Spoonacular API
router.get("/search", authMiddleware, searchFood);
router.get("/list", authMiddleware, getTodayFoods);
module.exports = router;*/

const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  logFood,
  getDailyNutrition,
  getTodayFoods,
  searchFood,
  getFoodNutrition,
  deleteFood
} = require("../controllers/foodController");

router.post("/log", protect, logFood);
router.get("/today", protect, getDailyNutrition);
router.get("/list", protect, getTodayFoods);
router.get("/search", protect, searchFood);
router.get("/nutrition", protect, getFoodNutrition);
router.delete("/delete/:id", protect, deleteFood);
module.exports = router;