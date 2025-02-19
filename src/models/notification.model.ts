// models/Notification.js
import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
