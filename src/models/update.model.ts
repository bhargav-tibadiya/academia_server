// Packages
import mongoose, { Schema } from "mongoose";

// Update Schema
const UpdateSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
    tags: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Update = mongoose.model("Update", UpdateSchema);
export default Update;
