// Packages
import mongoose, { Schema } from "mongoose";


const InstituteSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
      }
    ],
  },
  {
    timestamps: true
  }
);

const Institute = mongoose.model("Institute", InstituteSchema);
export default Institute
