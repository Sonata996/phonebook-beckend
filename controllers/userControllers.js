const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require('fs/promises');
const path = require("path");


const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "user is exists",
      });
      return;
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({ name, email, password, avatarURL });
    await newUser.hashPassword();

    await newUser.save();
    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      token,
      user: {
        name,
        email,
        avatarURL,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "password or email not correct",
      });
    }
    const compareResult = await user.comparepassword(password);
    if (!compareResult) {
      res.status(401).json({
        message: "password or email not correct",
      });
    }
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await User.findOneAndUpdate(user._id, { token });
    const { name, avatarURL } = user;
    res.status(201).json({
      token,
      user: {
        name,
        email,
        avatarURL,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.sendStatus(204);
};

const currentUser = (req, res, next) => {
  const { email, name, avatarURL } = req.user;

  res.json({ name, email, avatarURL });
};

const addAvatar = async (req, res, next)=>{
  try {
    if(!req.file){
      res.status(400).json({
        message: "avatar was not found"
      })
      return ;
    }
    const {_id} = req.user;
    const {path: oldPath, originalname} = req.file;
    const avatarPath = path.join(__dirname, "../public", "avatars");
    const newName = `${_id}_${originalname}`
    const newPath = path.join(avatarPath, newName);
    await fs.rename(oldPath, newPath);
    
    const avatarURL = path.join("avatars", newName);
    
    await User.findByIdAndUpdate(_id, {avatarURL})

    res.json({avatarURL});
  } catch (error) {
    next(error)
  }
  
  }


module.exports = {
  signup,
  login,
  logOut,
  currentUser,
  addAvatar
};
