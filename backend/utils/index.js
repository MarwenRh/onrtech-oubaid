import jwt from "jsonwebtoken";
import crypto from "crypto";
// generate a token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// hash token
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};
