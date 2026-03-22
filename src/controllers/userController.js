const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
