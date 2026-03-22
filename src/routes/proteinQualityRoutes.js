const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
generateProteinQuality
}
=
require(
"../controllers/proteinQualityController"
);


router.get(
"/generate",
authMiddleware,
generateProteinQuality
);

module.exports = router;
