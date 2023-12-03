const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSaveCookie");

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({ msg: "Please fill all fields" });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ msg: "User already exists!" });
      } else {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let newUser = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });

        await newUser.save();

        if (newUser) {
          generateTokenAndSetCookie(newUser._id, res);
          res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ msg: "Please fill all fields" });
    } else {
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(404)
          .json({ msg: "No account found with that username." });
      }

      const userCompare = bcrypt.compare(password, user?.password);
      if (userCompare) {
        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        return res
          .status(403)
          .json({ msg: "Invalid credentials. Please try again." });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const Logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(201).json({ msg: "Logout successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { Login, Signup, Logout };
