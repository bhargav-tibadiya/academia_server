// Packages
import mongoose, { Schema } from "mongoose";

// Result Schema
const ResultSchema = new Schema(
  {
    semester: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    regular: {
      type: Boolean,
      required: true,
    },
    result: {
      overallGrade: {
        type: String,
        required: true,
      },
      SGPA: {
        type: Number,
        required: true,
      },
      CGPA: {
        type: Number,
        required: true,
      },
      subjects: [
        {
          code: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            enum: ["theory", "practical"],
            required: true,
          },
          credit: {
            type: Number,
            required: true,
          },
          grade: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true
  }
);

const Result = mongoose.model("Result", ResultSchema);
export default Result;
