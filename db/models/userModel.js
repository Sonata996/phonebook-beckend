const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false }
);

const User = model("user", userSchema);

module.exports = User;
