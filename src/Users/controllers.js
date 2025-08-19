const Product = require('../Products/model');
const User = require('./model');

// @desc   Get all users with products + count
// @route  GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate("product", "name price"); // only product name & price 

    const result = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
      totalProducts: user.product.length,
      products: user.product
    }));

    res.status(200).json({ 
      total: result.length,
      data: result,
      msg: 'Users fetched successfully' 
    });
  } catch (error) {
    console.error('[GetAllUsers]', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// @desc   Get single user by ID with products + count
// @route  GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate("product", "name price");

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ 
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        totalProducts: user.product.length,
        products: user.product
      },
      msg: 'User found' 
    });
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
