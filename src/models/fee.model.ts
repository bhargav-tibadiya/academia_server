import mongoose, { Schema } from "mongoose";

const FeeSchema = new Schema(
  {
    semester: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    fine: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      required: true,
    },
    paidDate: {
      type: Date,
      required: false,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const Fee = mongoose.model("Fee", FeeSchema);
export default Fee;
