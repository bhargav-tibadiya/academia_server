import mongoose, { Schema } from "mongoose";

const CounterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  },
});

const Counter = mongoose.model("Counter", CounterSchema);
export default Counter;
