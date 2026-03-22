const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  logWater,
  getWaterSummary
} = require("../controllers/waterController");


router.post("/log", authMiddleware, logWater);

router.get("/summary", authMiddleware, getWaterSummary);

module.exports = router;
