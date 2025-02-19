// Packages
import mongoose, { Schema } from "mongoose";


const ProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
    birthDate: {
      type: Date,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid contact number"]
    },
    fatherName: {
      type: String,
      required: true
    },
    fatherContact: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid contact number"]
    },
    motherName: {
      type: String,
      required: true,
    },
    motherContact: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid contact number"]
    },
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile
