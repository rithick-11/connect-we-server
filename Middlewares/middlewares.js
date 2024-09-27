import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const authoziation = async (req, res, next) => {
  const token = req.headers.authoriaztion.split(" ")[1];
  try {
    const { username } = await jwt.verify(token, "rithick");
    if (username === req.body.username) {
      const isAlive = await User.findOne({ username });
    } else {
      res.status(401);
    }

    next();
  } catch (err) {
    res.status(404).json({ msg: "invalid token" });
  }
};
