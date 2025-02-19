// Packages
import mongoose, { Schema } from "mongoose";


const PlacementSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    companyImage: {
      type: String,
      required: true
    },
    jobRole: {
      type: String,
      required: true
    },
    agreement: {
      type: String,
      required: true
    },
    package: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    requirement: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    // list of tech separated by '-'
    technologies: {
      type: String,
      required: true
    },
    appliedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  {
    timestamps: true
  }
);

const Placement = mongoose.model("Placement", PlacementSchema);
export default Placement;