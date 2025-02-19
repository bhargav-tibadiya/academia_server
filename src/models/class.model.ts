// Packages
import mongoose, { Schema } from "mongoose";


const ClassSchema = new Schema(
  {
    //  Follow this naming convention : DIV-A, DIV-B
    name: {
      type: String,
      required: true
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ],
    timeTableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable"
    },
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
      }
    ],
    updates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Update"
      }
    ],
  },
  {
    timestamps: true
  }
);

const Class = mongoose.model("Class", ClassSchema);
export default Class
