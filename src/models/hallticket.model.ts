import mongoose, { Schema } from "mongoose";

const HallTicketSchema = new Schema(
  {
    seatNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    schedule: [
      {
        subject: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
        center: {
          type: String,
          required: true,
        },
        roomNo: {
          type: String,
          required: true,
        },
        block: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true
  }
);

const HallTicket = mongoose.model("HallTicket", HallTicketSchema);
export default HallTicket;
