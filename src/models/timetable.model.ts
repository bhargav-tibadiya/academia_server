// Packages
import mongoose, { Schema } from "mongoose";


const TimeTableSchema = new Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    },
    timetable: {
      type: Object,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);
export default TimeTable
