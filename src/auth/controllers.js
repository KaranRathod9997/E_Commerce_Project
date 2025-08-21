const User = require("../Users/model");
const { USERROLE } = require("../Users/const");
// const { validate } = require("../Users/validations");

// Register a new user
const register = async (req, res) => {
  const { username, email, password, roles } = req.body;

  if (roles === USERROLE.ADMIN && req.session.user?.role !== USERROLE.ADMIN) {
    return res.status(403).json({ msg: "Only admins can create another admin" });
  }

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newUser = await User.create({ username, email, password });
    return res.status(201).json({
      msg: "Account created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ msg: "Something went wrong while registering" });
  }
};

// Login using session
const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "Missing request body" });
    }
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    console.log(user);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ msg: "Password incorrect" });

    // Set session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles, // ✅ important for createAdmin
    };


    return res.status(200).json({
      msg: "Login successful",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Login failed", error });
  }
};

// Logout
const logout = (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.json({ msg: "Logout successful" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ msg: "Logout failed", error });
  }
};

module.exports = {
  register,
  login,
  logout,
};
