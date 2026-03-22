const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createWorkoutPlan,
  getAllPlans,
  getPlansByGoal
}
=
require("../controllers/workoutPlanController");


router.post(
  "/create",
  authMiddleware,
  createWorkoutPlan
);

router.get(
  "/all",
  authMiddleware,
  getAllPlans
);

router.get(
  "/goal/:goal",
  authMiddleware,
  getPlansByGoal
);

module.exports = router;
