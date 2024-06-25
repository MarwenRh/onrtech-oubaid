import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
    photo: {
      type: String,
      required: [true, "please add a photo"],
    },
    phone: {
      type: String,
      default: "+216",
    },
    bio: {
      type: String,
      default: "bio",
    },
    role: {
      type: String,
      required: true,
      default: "User",
      // User , Admin , Web editor
    },
    userAgent: {
      type: Array,
      required: true,
      default: [],
    },

    jobTitle: {
      type: String,
      required: true,
      default: "Onrtech Member",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);
// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
export const User = mongoose.model("User", userSchema);
