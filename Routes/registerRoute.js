import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../Models/userModel.js";

const router = Router();

const handelErr = (err) => {
  let errors = { email: "", username: "" };

  if (err.code === 11000) {
    if (err.message.includes("username")) {
      return "username already exist";
    }
    return "E-mail already exist";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (errors.email === "") {
    return errors.username;
  } else {
    return errors.email;
  }
};

router.get("/check", async (req, res) => {
  const { username } = req.query;
  const userData = await User.findOne({ username: username });
  res.json({ status: userData === null });
});

router.post("/add-user", async (req, res) => {
  const { password } = req.body;
  const newPassword = await bcrypt.hash(password, 2);
  const createdAt = new Date();
  const newUserData = { ...req.body, password: newPassword, createdAt };
  try {
    await User.create(newUserData);
    const token = await jwt.sign({ username: req.body.username }, "rithick");
    res.status(202).json({ token: token, msg: "ok" });
  } catch (err) {
    const errmsg = handelErr(err);
    res.status(400).json({msg:errmsg})
  }
});

export default router;
