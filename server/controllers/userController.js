import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const register = async (req, res, next) => {
  if (
    !req.body.firstname ||
    typeof req.body.firstname == "undefined" ||
    req.body.firstname == null
  )
    return res.status(400).json({
      success: false,
      key: "firstname",
      message: "Cannot process request because of the missing firstname",
    });
  if (
    !req.body.lastname ||
    typeof req.body.lastname == "undefined" ||
    req.body.lastname == null
  )
    return res.status(400).json({
      success: false,
      key: "lastname",
      message: "Cannot process request because of the missing lastname",
    });
  if (
    !req.body.email ||
    typeof req.body.email == "undefined" ||
    req.body.email == null
  )
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the missing email",
    });
  if (
    !req.body.password ||
    typeof req.body.password == "undefined" ||
    req.body.password == null
  )
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the missing password",
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
  if (
    !req.body.email ||
    typeof req.body.email == "undefined" ||
    req.body.email == null
  )
    return res.status(400).json({
      success: false,
      key: "email",
      message: "Cannot process request because of the missing email",
    });
  if (
    !req.body.password ||
    typeof req.body.password == "undefined" ||
    req.body.password == null
  )
    return res.status(400).json({
      success: false,
      key: "password",
      message: "Cannot process request because of the missing password",
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
      if (value.trim() !== isUserExist[key.trim()]) {
        if (key.trim() === "password") {
          toBeUpdatedList.push({
            [key.trim()]: await bcrypt.hash(value.trim(), 12),
          });
        }
        toBeUpdatedList.push({ [key.trim()]: value.trim() });
      }
    }
  }
  let mergeObjects = Object.assign({}, ...toBeUpdatedList);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      "password" in mergeObjects
        ? {
            ...mergeObjects,
            password: await bcrypt.hash(mergeObjects.password.trim(), 12),
          }
        : mergeObjects,
      {
        new: true,
      }
    );

    const token = jwt.sign(
      { email: isUserExist.email, id: isUserExist._id },
      "authToken",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ success: true, user: updatedUser, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
