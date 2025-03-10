// Packages
import mongoose, { Schema } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    // Batch refer to the admission year. Ex. 2021,2022
    batch: {
      type: String,
      required: true
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
      }
    ],
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", DepartmentSchema);
export default Department
