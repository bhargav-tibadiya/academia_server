// Packages
import mongoose, { Schema } from "mongoose";

// Question Schema
const QuestionSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true
    }, // Unique ID for each question
    question: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["MCQ", "Input"],
      required: true,
    },
    options: [
      {
        key: {
          type: String,
          required: function (this: any) {
            return (this.parent() as any).type === "MCQ";
          }
        },
        value: {
          type: String,
          required: function (this: any) {
            return (this.parent() as any).type === "MCQ";
          }
        },
      },
    ],
    answerKey: {
      type: String,
      required: function (this: any) {
        return this.type === "MCQ";
      },
    },
    correctAnswer: {
      type: String,
      required: function (this: any) {
        return this.type === "Input";
      },
    },
  },
  {
    _id: false
  }
);

// Response Schema
const ResponseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        answer: {
          type: String,
          required: true
        },
      },
    ],
  },
  { timestamps: true }
);

// Exam Schema
const ExamSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    questions: [
      QuestionSchema
    ],
    responses: [
      ResponseSchema
    ],
    results: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        score: {
          type: Number,
          required: true
        },
        total: {
          type: Number,
          required: true
        },
      },
    ],
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true
  }
);

// Middleware to ensure endTime is after startTime
ExamSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    return next(new Error("End time must be after start time"));
  }
  next();
});

// Instance method to check if exam is active
ExamSchema.methods.isActive = function () {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

// Exam Model
const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
