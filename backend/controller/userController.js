import { JWT_SECRETE } from "../config/config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const isUserExists = await User.findOne({
      // mid kamid ah haddii laga helo Userka, wuu jiraa.
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (isUserExists) {
      return res.status(400).send("email or username already exists");
    }

    const userInfo = new User({
      username: username,
      password: password,
      email: email,
    });

    await userInfo.save();

    userInfo.password = undefined;

    return res.status(201).send(userInfo);
  } catch (error) {
    console.log("error at registerUser", error.message);
    res.send("something went wrong" + error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!isUserExists) {
      return res.status(400).send("Invalid email please provide a valid email");
    }

    // password checking
    const isPasswordCorrect = await isUserExists.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect password");
    }

    // token generation

    const expiresIn = 7 * 24 * 60 * 60; // 7 days

    const token = jwt.sign({ _id: isUserExists._id }, JWT_SECRETE, {
      expiresIn,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    });

    isUserExists.password = undefined;

    res.status(200).send({ ...isUserExists.toJSON(), expiresIn });
  } catch (err) {
    console.log("Error at login user", err);
    res.status(400).send(err.message);
  }
};
