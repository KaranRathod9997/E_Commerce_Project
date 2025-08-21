// createAdmin.js
const User = require("../Users/model");
const { USERROLE } = require("../Users/const");


// Create Admin Controller
const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if an Admin already exists
    const adminExists = await User.findOne({ roles: USERROLE.ADMIN });

    // Case 1: No admin exists yet → allow first admin creation
    if (!adminExists) {
      const firstAdmin = await User.create({
        username,
        email,
        password,
        roles: USERROLE.ADMIN,
      });

      return res.status(201).json({
        msg: "First admin account created successfully",
        user: {
          id: firstAdmin._id,
          username: firstAdmin.username,
          email: firstAdmin.email,
          role: firstAdmin.roles,
        },
      });
    }

    // Case 2: Admin exists → only current logged-in admin can create another
    if (req.session.user?.roles !== USERROLE.ADMIN) {
      return res.status(403).json({
        msg: "Only an admin can create another admin",
      });
    }

    const newAdmin = await User.create({
      username,
      email,
      password,
      roles: USERROLE.ADMIN,
    });

    return res.status(201).json({
      msg: "New admin account created successfully",
      user: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.roles,
      },
    });
  } catch (err) {
    console.error("Admin Creation Error:", err);
    return res.status(500).json({ msg: "Something went wrong while creating admin" });
  }
};

module.exports = { createAdmin };
