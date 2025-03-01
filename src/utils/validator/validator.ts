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

    lastUpdated: Joi.date().required().messages({
      "date.base": "Last updated date must be a valid date",
      "any.required": "Last updated date is required",
    }),

    tags: Joi.string().optional().messages({
      "string.base": "Tags must be a string",
    }),
  })
}

export default Validators