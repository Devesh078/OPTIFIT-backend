const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const calorieRoutes = require("./routes/calorieRoutes");
const sleepRoutes = require("./routes/sleepRoutes");
const proteinRoutes = require("./routes/proteinRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const readinessRoutes = require("./routes/readinessRoutes");
const coachRoutes = require("./routes/coachRoutes");
const foodRoutes = require("./routes/foodRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const waterRoutes = require("./routes/waterRoutes");
const workoutPlanRoutes =
require("./routes/workoutPlanRoutes");
const stepRoutes =
require("./routes/stepRoutes");

const wearableRoutes =
require("./routes/wearableRoutes");

const proteinQualityRoutes =
require("./routes/proteinQualityRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use(
  "/api/workout-plans",
  workoutPlanRoutes
);

app.use(
"/api/steps",
stepRoutes
);

app.use(
"/api/wearable",
wearableRoutes
);

app.use(
"/api/protein-quality",
proteinQualityRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/calories", calorieRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/protein", proteinRoutes);
app.use("/api/recovery", recoveryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/readiness", readinessRoutes);
app.use("/api/coach", coachRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/water", waterRoutes);

module.exports = app;
