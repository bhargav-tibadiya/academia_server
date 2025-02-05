import { Document } from "mongoose";


// --> MODEL.USER <--
export type ExpiresInType = `${number}min`

export interface MTUser extends Document {
  // Constants
  name: string;
  email: string;
  password: string;
  mobile: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  isActive: boolean;
  role: "User" | "Admin";
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedToken(): string;
}