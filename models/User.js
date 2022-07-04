const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    desc: {
      type: String,
      max: 150,
    },

    city: {
      type: String,
      max: 50,
    },
    hobbies: {
      type: String,
      max: 10,
    },

    relationship: { type: Number, default: 1 },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    friendRequest: {
      type: Array,
      default: [],
    },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);
