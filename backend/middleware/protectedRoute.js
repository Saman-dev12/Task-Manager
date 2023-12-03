const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) res.status(400).json({ msg: "Unauthorized" });
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = protectedRoute;
