const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getTodayCoach } = require("../controllers/coachController");

router.get("/today", authMiddleware, getTodayCoach);

module.exports = router;
