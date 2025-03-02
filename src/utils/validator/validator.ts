// Package
import Joi from "joi";

const Validators = {
  // --> AUTH <--
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters",
      "any.required": "Password is required",
    }),
  }),

  signup: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .min(8)
      .max(25)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,25}$"))
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 25 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
        "any.required": "Password is required",
      }),
    role: Joi.string()
      .valid("student", "teacher", "admin")
      .default("student")
      .messages({
        "any.only": "Role must be either 'student', 'teacher', or 'status'",
      }),
    otp: Joi.string()
      .length(8)
      .pattern(/^[a-zA-Z0-9]{8}$/)
      .required()
      .messages({
        "string.length": "OTP must be exactly 8 characters long",
        "string.pattern.base": "OTP must contain only numbers and letters",
        "any.required": "OTP is required",
      }),
  }),

  sendOtp: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
  }),

  // --> USER <--
  updateUser: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    })
  }),

  // --> UPDATE <--
  createUpdate: Joi.object({
    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),

    title: Joi.string().required().messages({
      "string.base": "Title must be a string",
      "any.required": "Title is required",
    }),

    description: Joi.string().required().messages({
      "string.base": "Description must be a string",
      "any.required": "Description is required",
    }),

    sender: Joi.string().hex().length(24).required().messages({
      "string.base": "Sender must be a valid ObjectId",
      "string.hex": "Sender must be a valid ObjectId",
      "any.required": "Sender is required",
    }),

    class: Joi.string().hex().length(24).required().messages({
      "string.base": "Class must be a valid ObjectId",
      "string.hex": "Class must be a valid ObjectId",
      "any.required": "Class is required",
    }),

    lastUpdated: Joi.date().required().messages({
      "date.base": "Last updated date must be a valid date",
      "any.required": "Last updated date is required",
    }),

    tags: Joi.string().optional().messages({
      "string.base": "Tags must be a string",
    }),
  }),

  updateUpdate: Joi.object({
    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),

    title: Joi.string().required().messages({
      "string.base": "Title must be a string",
      "any.required": "Title is required",
    }),

    description: Joi.string().required().messages({
      "string.base": "Description must be a string",
      "any.required": "Description is required",
    }),

    sender: Joi.string().hex().length(24).required().messages({
      "string.base": "Sender must be a valid ObjectId",
      "string.hex": "Sender must be a valid ObjectId",
      "any.required": "Sender is required",
    }),

    class: Joi.string().hex().length(24).required().messages({
      "string.base": "Class must be a valid ObjectId",
      "string.hex": "Class must be a valid ObjectId",
      "any.required": "Class is required",
    }),

    lastUpdated: Joi.date().required().messages({
      "date.base": "Last updated date must be a valid date",
      "any.required": "Last updated date is required",
    }),

    tags: Joi.string().optional().messages({
      "string.base": "Tags must be a string",
    }),
  }),

  // --> INSTITUTE <--
  createInstitute: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
    }),
  }),

  updateInstitute: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
    }),
  }),

  // --> SUBJECT <--
  createSubject: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
    }),
    subjectCode: Joi.string().required().messages({
      "string.base": "Subject Code must be a string",
      "any.required": "Subject Code is required",
    }),
  }),

  updateSubject: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
    }),
    subjectCode: Joi.string().required().messages({
      "string.base": "Subject Code must be a string",
      "any.required": "Subject Code is required",
    }),
  }),

  // --> ATTENDANCE <--
  createAttendance: Joi.object({
    userId: Joi.string().required().messages({
      "string.base": "User ID must be a string",
      "any.required": "User ID is required",
    })
  }),

  updateAttendance: Joi.object({
    attendanceRecords: Joi.array().items(
      Joi.object({
        date: Joi.date().required().messages({
          "date.base": "Date must be a valid date",
          "any.required": "Date is required",
        }),
        time: Joi.string().required().messages({
          "string.base": "Time must be a string",
          "any.required": "Time is required",
        }),
        subjectId: Joi.string().required().messages({
          "string.base": "Subject ID must be a string",
          "any.required": "Subject ID is required",
        }),
        status: Joi.string().valid("Present", "Absent").required().messages({
          "string.base": "Status must be a string",
          "any.required": "Status is required",
          "any.only": "Status must be either 'Present' or 'Absent'",
        }),
      })
    ).required().messages({
      "array.base": "Attendance records must be an array",
      "any.required": "Attendance records are required",
    }),
  }),

  addAttendanceRecord: Joi.object({
    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),
    time: Joi.string().required().messages({
      "string.base": "Time must be a string",
      "any.required": "Time is required",
    }),
    subjectId: Joi.string().required().messages({
      "string.base": "Subject ID must be a string",
      "any.required": "Subject ID is required",
    }),
    status: Joi.string().valid("Present", "Absent").required().messages({
      "string.base": "Status must be a string",
      "any.required": "Status is required",
      "any.only": "Status must be either 'Present' or 'Absent'",
    }),
  }),
}

export default Validators