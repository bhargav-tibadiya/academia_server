// Packages
import mongoose, { Schema } from "mongoose";


const AttendanceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    attendance: [
      {
        date: {
          type: Date,
          required: true
        },
        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true
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
