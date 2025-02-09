import { Document } from "mongoose";


// --> MODEL.USER <--
export type ExpiresInType = `${number}min`

export interface MTUser extends Document {
  // Constants
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";
  status: "none" | "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedToken(): string;
}


// --> MODEL.OTP <--
export interface MTOTP extends Document {
  name?: string;
  email: string;
  otp: string;
  createdAt: Date;
}