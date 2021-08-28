import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const register = async (req, res, next) => {
  if (!req.body.firstname)
    return res.status(400).json({
      success: false,
      key: "firstname",
      message: "Cannot process request because of the missing firstname",
    });
  if (typeof req.body.firstname == "undefined")
    return res.status(400).json({
      success: false,
      key: "firstname",
      message: "Cannot process request because of the undefined firstname",
    });
  if (req.body.firstname == null)
    return res.status(400).json({
      success: false,
      key: "firstname",
      message: "Cannot process request because of the null firstname",
    });
  if (!req.body.lastname)
    return res.status(400).json({
      success: false,
      key: "lastname",
      message: "Cannot process request because of the missing lastname",
    });
  if (typeof req.body.lastname == "undefined")
    return res.status(400).json({
      success: false,
      key: "lastname",
      message: "Cannot process request because of the undefined lastname",
    });
  if (req.body.lastname == null)
    return res.status(400).json({
      success: false,
      key: "lastname",
      message: "Cannot process request because of the null lastname",
    });
  if (!req.body.email)
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the missing email",
    });
  if (typeof req.body.email == "undefined")
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the undefined email",
    });
  if (req.body.email == null)
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the null email",
    });
  if (!req.body.password)
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the missing password",
    });
  if (typeof req.body.password == "undefined")
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the undefined password",
    });
  if (req.body.password == null)
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the null password",
    });
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const picture = req.body?.picture || {
    url: String,
    cloudinaryId: String,
    createdAt: Date,
  };

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      picture,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      "authToken",
      { expiresIn: "1h" }
    );

    return res.status(201).json({ success: true, user: newUser, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const login = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the missing email",
    });
  if (typeof req.body.email == "undefined")
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the undefined email",
    });
  if (req.body.email == null)
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the null email",
    });
  if (!req.body.password)
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the missing password",
    });
  if (typeof req.body.password == "undefined")
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the undefined password",
    });
  if (req.body.password == null)
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the null password",
    });

  const email = req.body.email;

  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist)
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      isUserExist.password
    );

    if (!isPasswordCorrect)
      return res
        .status(403)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { email: isUserExist.email, id: isUserExist._id },
      "authToken",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ success: true, user: isUserExist, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateUserInfo = async (req, res, next) => {
  const _id = req.userId;
  if (!_id)
    return res
      .status(401)
      .json({ success: false, message: "You need an access to proceed" });
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ success: false, message: "No user exist with this type of ID" });

  const isUserExist = await User.findById(_id);

  if (!isUserExist)
    return res
      .status(404)
      .json({ success: false, message: "User does not exist" });

  const toBeUpdatedList = [];

  for (const [key, value] of Object.entries(req.body)) {
    if (value.trim()) {
      value.trim() !== isUserExist[key.trim()] &&
        toBeUpdatedList.push({ [key.trim()]: value.trim() });
    }
  }
  let mergeObjects = Object.assign({}, ...toBeUpdatedList);

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, mergeObjects, {
      new: true,
    });
    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
