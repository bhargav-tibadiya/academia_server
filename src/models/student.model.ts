// Packages
import mongoose, { Schema } from "mongoose";


const StudentSchema = new Schema(
  {
    enrollmentNo: {
      type: Number,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    },
    attendanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance"
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
      }
    ],
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result"
      }
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
      }
    ],
    fees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fee"
      }
    ],
    hallTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HallTicket"
      }
    ],
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student
