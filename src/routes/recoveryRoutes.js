const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { generateRecoveryScore } = require("../controllers/recoveryController");

router.get("/generate", protect, generateRecoveryScore);

module.exports = router;
