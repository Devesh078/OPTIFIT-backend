const express = require("express");
const router = express.Router();

const { generateReadiness } = require("../controllers/readinessController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/generate", authMiddleware, generateReadiness);

module.exports = router;
