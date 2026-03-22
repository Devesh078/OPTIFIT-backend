const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
syncWearableData
}
=
require("../controllers/wearableController");


router.post(
"/sync",
authMiddleware,
syncWearableData
);

module.exports = router;
