const mongoose = require('mongoose');

// User Schema Definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
      match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please enter a valid email address (example@example.com)',
      ],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      // select: false, //  Commented out if you want password to be visible in queries (optional)
    },
  },
  {
    timestamps: true, // createdAt and updatedAt will be added automatically
  }
);

// Export Model
const User = mongoose.model('User', userSchema);
module.exports = User;
