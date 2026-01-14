const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalide"]
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
