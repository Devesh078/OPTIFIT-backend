const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, height, weight, goal, activityLevel,gender } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      height,
      weight,
      goal,
      activityLevel,
      gender
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("REGISTER ERROR FULL:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });

  } catch (error) {
  console.log("REGISTER ERROR FULL:", error);
  res.status(500).json({ message: error.message });
}
};
// GET PROFILE
const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {

    const user = req.user;   // use user from middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, weight, height, goal, gender } = req.body;

    if (name !== undefined) user.name = name;
    if (weight !== undefined) user.weight = weight;
    if (height !== undefined) user.height = height;
    if (goal !== undefined) user.goal = goal;
    if (gender !== undefined) user.gender = gender;

    // ✅ Fix: Only update gender if valid
    if (gender && ["male", "female"].includes(gender)) {
      user.gender = gender;
    }
    await user.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
};
