const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { generateAdaptiveProtein } = require("../controllers/proteinController");

router.get("/generate", protect, generateAdaptiveProtein);

module.exports = router;
