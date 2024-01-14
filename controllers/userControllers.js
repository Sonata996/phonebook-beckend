const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, name, password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "user is exists",
      });
      return;
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({name, email, password, avatarURL})    ;
    await newUser.hashPassword();
  } catch (error) {
    console.log(error);
  }
};
