const express = require("express");
const router = express.Router();
const { logSleep, getTodaySleep } = require("../controllers/sleepController");

const protect = require("../middleware/authMiddleware");


router.post("/log", protect, logSleep);
router.post("/", protect, logSleep);
router.get("/today", protect, getTodaySleep);
module.exports = router;
