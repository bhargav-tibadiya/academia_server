// Packages
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


// Utils & Configs
dotenv.config();


// Types & Constants
import { ExpiresInType } from "../types/models";
import Counter from "./counter.model"; // Import Counter model


const UserSchema: Schema = new Schema(
  {
    userId: { // Auto-incremented user ID
      type: Number,
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// --> Auto-increment userId before saving a new user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Assign userId using Counter model
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    this.userId = counter.seq;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

// --> Match password without exposing
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --> To get signed authentication token
UserSchema.methods.getSignedToken = function () {
  const payload = {
    userId: this.userId,
    email: this.email,
  };
  const secret = process.env.JWT_SECRET;
  const config: jwt.SignOptions = { expiresIn: process.env.JWT_EXPIRE as ExpiresInType };
  return jwt.sign(payload, secret as jwt.Secret, config);
};

const User = mongoose.model("User", UserSchema);
export default User;
