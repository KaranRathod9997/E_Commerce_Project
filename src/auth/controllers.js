const User = require("../Users/model");

// Register a new user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json({
      msg: "Account created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ msg: "Something went wrong while registering" });
  }
};

// Login user (basic, since no auth or bcrypt)
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Something went wrong while logging in" });
  }
};

// Logout user
const logout = (req, res) => {
  try {
    // In stateless APIs, logout is usually frontend-based (just destroy token/cookie)
    res.status(200).json({ msg: "You’ve been logged out" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ msg: "Something went wrong while logging out" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
