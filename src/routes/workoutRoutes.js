const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { logWorkout } = require("../controllers/workoutController");

router.post("/log", protect, logWorkout);

module.exports = router;
