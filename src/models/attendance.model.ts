// Packages
import mongoose, { Schema } from "mongoose";


const AttendanceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true,
    },
    attendanceRecords: [
      {
        date: {
          type: Date,
          required: true,
          index: true,
        },
        time: {
          type: String,
          required: true,
        },
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true
  }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance