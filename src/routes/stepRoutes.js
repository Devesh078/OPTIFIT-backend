const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  logSteps,
  getStepSummary
}
=
require("../controllers/stepController");


router.post(
"/log",
authMiddleware,
logSteps
);

router.get(
"/summary",
authMiddleware,
getStepSummary
);

module.exports = router;
