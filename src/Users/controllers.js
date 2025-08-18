const User = require('./model');

// @desc   Get all users
// @route  GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Exclude password .select('-password')
    res.status(200).json({ data: users, msg: 'Users fetched successfully' });
  } catch (error) {
    console.error('[GetAllUsers]', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc   Get single user by ID
// @route  GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ data: user, msg: 'User found' });
  } catch (error) {
    console.error('[GetUserById]', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc   Update user
// @route  PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.params.id).select('+password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    if (password && password !== user.password) {
      // Only hash if password is changed
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    res.status(200).json({ msg: 'User updated successfully' });
  } catch (error) {
    console.error('[UpdateUser]', error);
    res.status(500).json({ msg: 'Failed to update user' });
  }
};

// @desc   Delete user
// @route  DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({
      msg: 'User deleted successfully',
      deleted: {
        id: deletedUser._id,
        username: deletedUser.username,
        email: deletedUser.email,
      },
    });
  } catch (error) {
    console.error('[DeleteUser]', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
