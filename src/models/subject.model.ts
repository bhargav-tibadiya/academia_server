import mongoose, { Schema } from "mongoose";

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subjectCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
  },
  {
    timestamps: true
  }
);

const Subject = mongoose.model("Subject", SubjectSchema);
export default Subject;
