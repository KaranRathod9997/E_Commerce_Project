const { model } = require("mongoose");

const authUser = (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    req.user = req.session.user; // store session user in req.user
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({ msg: "Internal Server Error", error: error });
  }
};

module.exports = { authUser };
