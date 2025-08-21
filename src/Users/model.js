// user.js
const mongoose = require('mongoose');
const { USERROLE } = require('./const');

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
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    roles: {
      type: Number,
      enum: [USERROLE.ADMIN, USERROLE.BUYER, USERROLE.SELLER],
      default: USERROLE.BUYER
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
