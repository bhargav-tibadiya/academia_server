// Package
import Joi from "joi";
import mongoose from "mongoose";

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

  // --> PROFILE <--
  createProfile: Joi.object({
    userId: Joi.string().required().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }).messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required',
      'any.invalid': 'User ID must be a valid ObjectId',
    }),

    firstName: Joi.string().min(1).max(100).required().messages({
      "string.base": "First Name must be a string",
      "any.required": "First Name is required",
      "string.min": "First Name must be at least 1 character long",
      "string.max": "First Name must be at most 100 characters long",
    }),

    middleName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Middle Name must be a string",
      "any.required": "Middle Name is required",
      "string.min": "Middle Name must be at least 1 character long",
      "string.max": "Middle Name must be at most 100 characters long",
    }),

    lastName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Last Name must be a string",
      "any.required": "Last Name is required",
      "string.min": "Last Name must be at least 1 character long",
      "string.max": "Last Name must be at most 100 characters long",
    }),

    gender: Joi.string().valid("Male", "Female", "Other").required().messages({
      "string.base": "Gender must be a string",
      "any.required": "Gender is required",
      "any.only": "Gender must be either 'Male', 'Female' or 'Other'",
    }),

    birthDate: Joi.date().required().messages({
      "date.base": "Birth Date must be a valid date",
      "any.required": "Birth Date is required",
    }),

    bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-").required().messages({
      "string.base": "Blood Group must be a string",
      "any.required": "Blood Group is required",
      "any.only": "Blood Group must be one of the valid types (A+, A-, B+, B-, O+, O-, AB+, AB-)",
    }),

    address: Joi.string().min(1).required().messages({
      "string.base": "Address must be a string",
      "any.required": "Address is required",
      "string.min": "Address must be at least 1 character long",
    }),

    contact: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.base": "Contact must be a string",
      "any.required": "Contact number is required",
      "string.pattern.base": "Contact number must be a valid 10-digit number",
    }),

    fatherName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Father's Name must be a string",
      "any.required": "Father's Name is required",
      "string.min": "Father's Name must be at least 1 character long",
      "string.max": "Father's Name must be at most 100 characters long",
    }),

    fatherContact: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.base": "Father's Contact must be a string",
      "any.required": "Father's Contact is required",
      "string.pattern.base": "Father's Contact must be a valid 10-digit number",
    }),

    motherName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Mother's Name must be a string",
      "any.required": "Mother's Name is required",
      "string.min": "Mother's Name must be at least 1 character long",
      "string.max": "Mother's Name must be at most 100 characters long",
    }),

    motherContact: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.base": "Mother's Contact must be a string",
      "any.required": "Mother's Contact is required",
      "string.pattern.base": "Mother's Contact must be a valid 10-digit number",
    }),
  }),

  updateProfile: Joi.object({

    userId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message({ "any.invalid": "User ID must be a valid ObjectId" });
      }
      return value;
    }).required().messages({
      "string.base": "User ID must be a string",
      "any.required": "User ID is required",
    }),

    firstName: Joi.string().min(1).max(100).required().messages({
      "string.base": "First Name must be a string",
      "any.required": "First Name is required",
      "string.min": "First Name must be at least 1 character long",
      "string.max": "First Name must be at most 100 characters long",
    }),

    middleName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Middle Name must be a string",
      "any.required": "Middle Name is required",
      "string.min": "Middle Name must be at least 1 character long",
      "string.max": "Middle Name must be at most 100 characters long",
    }),

    lastName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Last Name must be a string",
      "any.required": "Last Name is required",
      "string.min": "Last Name must be at least 1 character long",
      "string.max": "Last Name must be at most 100 characters long",
    }),

    gender: Joi.string().valid("Male", "Female", "Other").required().messages({
      "string.base": "Gender must be a string",
      "any.required": "Gender is required",
      "any.only": "Gender must be either 'Male', 'Female' or 'Other'",
    }),

    birthDate: Joi.date().required().messages({
      "date.base": "Birth Date must be a valid date",
      "any.required": "Birth Date is required",
    }),

    bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-").required().messages({
      "string.base": "Blood Group must be a string",
      "any.required": "Blood Group is required",
      "any.only": "Blood Group must be one of the valid types (A+, A-, B+, B-, O+, O-, AB+, AB-)",
    }),

    address: Joi.string().min(1).required().messages({
      "string.base": "Address must be a string",
      "any.required": "Address is required",
      "string.min": "Address must be at least 1 character long",
    }),

    contact: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.base": "Contact must be a string",
      "any.required": "Contact number is required",
      "string.pattern.base": "Contact number must be a valid 10-digit number",
    }),

    fatherName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Father's Name must be a string",
      "any.required": "Father's Name is required",
      "string.min": "Father's Name must be at least 1 character long",
      "string.max": "Father's Name must be at most 100 characters long",
    }),

    fatherContact: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.base": "Father's Contact must be a string",
      "any.required": "Father's Contact is required",
      "string.pattern.base": "Father's Contact must be a valid 10-digit number",
    }),

    motherName: Joi.string().min(1).max(100).required().messages({
      "string.base": "Mother's Name must be a string",
      "any.required": "Mother's Name is required",
      "string.min": "Mother's Name must be at least 1 character long",
      "string.max": "Mother's Name must be at most 100 characters long",
    }),

    motherContact: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.base": "Mother's Contact must be a string",
      "any.required": "Mother's Contact is required",
      "string.pattern.base": "Mother's Contact must be a valid 10-digit number",
    }),
  }),

  // --> FEES <--
  createFees: Joi.object({
    semester: Joi.number().required().messages({
      "number.base": "Semester must be a number",
      "any.required": "Semester is required",
    }),

    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),

    amount: Joi.number().required().messages({
      "number.base": "Amount must be a number",
      "any.required": "Amount is required",
    }),

    fine: Joi.number().required().messages({
      "number.base": "Fine must be a number",
      "any.required": "Fine is required",
    }),

    status: Joi.string().valid("paid", "unpaid").required().messages({
      "string.base": "Status must be a string",
      "any.required": "Status is required",
      "any.only": "Status must be either 'paid' or 'unpaid'",
    }),

    paidDate: Joi.date().optional().messages({
      "date.base": "Paid Date must be a valid date",
    }),

    mode: Joi.string().required().messages({
      "string.base": "Mode must be a string",
      "any.required": "Mode is required",
    }),
  }),

  updateFees: Joi.object({
    semester: Joi.number().required().messages({
      "number.base": "Semester must be a number",
      "any.required": "Semester is required",
    }),

    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),

    amount: Joi.number().required().messages({
      "number.base": "Amount must be a number",
      "any.required": "Amount is required",
    }),

    fine: Joi.number().required().messages({
      "number.base": "Fine must be a number",
      "any.required": "Fine is required",
    }),

    status: Joi.string().valid("paid", "unpaid").required().messages({
      "string.base": "Status must be a string",
      "any.required": "Status is required",
      "any.only": "Status must be either 'paid' or 'unpaid'",
    }),

    paidDate: Joi.date().optional().messages({
      "date.base": "Paid Date must be a valid date",
    }),

    mode: Joi.string().required().messages({
      "string.base": "Mode must be a string",
      "any.required": "Mode is required",
    }),
  }),

  // --> HALL TICKET <--
  createHallTicket: Joi.object({
    seatNo: Joi.number().required().messages({
      "number.base": "Seat Number must be a number",
      "any.required": "Seat Number is required",
    }),

    name: Joi.string().min(1).max(100).required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
      "string.min": "Name must be at least 1 character long",
      "string.max": "Name must be at most 100 characters long",
    }),

    institute: Joi.string().min(1).max(100).required().messages({
      "string.base": "Institute must be a string",
      "any.required": "Institute is required",
      "string.min": "Institute must be at least 1 character long",
      "string.max": "Institute must be at most 100 characters long",
    }),

    department: Joi.string().min(1).max(100).required().messages({
      "string.base": "Department must be a string",
      "any.required": "Department is required",
      "string.min": "Department must be at least 1 character long",
      "string.max": "Department must be at most 100 characters long",
    }),

    schedule: Joi.array().items(
      Joi.object({
        subject: Joi.string().min(1).max(100).required().messages({
          "string.base": "Subject must be a string",
          "any.required": "Subject is required",
          "string.min": "Subject must be at least 1 character long",
          "string.max": "Subject must be at most 100 characters long",
        }),

        date: Joi.date().required().messages({
          "date.base": "Date must be a valid date",
          "any.required": "Date is required",
        }),

        startTime: Joi.date().required().messages({
          "date.base": "Start Time must be a valid date",
          "any.required": "Start Time is required",
        }),

        endTime: Joi.date().required().messages({
          "date.base": "End Time must be a valid date",
          "any.required": "End Time is required",
        }),

        center: Joi.string().min(1).max(100).required().messages({
          "string.base": "Center must be a string",
          "any.required": "Center is required",
          "string.min": "Center must be at least 1 character long",
          "string.max": "Center must be at most 100 characters long",
        }),

        roomNo: Joi.string().min(1).max(10).required().messages({
          "string.base": "Room Number must be a string",
          "any.required": "Room Number is required",
          "string.min": "Room Number must be at least 1 character long",
          "string.max": "Room Number must be at most 10 characters long",
        }),

        block: Joi.number().required().messages({
          "number.base": "Block must be a number",
          "any.required": "Block is required",
        }),
      })
    ).required().messages({
      "array.base": "Schedule must be an array",
      "any.required": "Schedule is required",
    }),

  }).messages({
    "object.base": "Hall Ticket data must be an object",
  }),

  updateHallTicket: Joi.object({
    seatNo: Joi.number().required().messages({
      "number.base": "Seat Number must be a number",
      "any.required": "Seat Number is required",
    }),

    name: Joi.string().min(1).max(100).required().messages({
      "string.base": "Name must be a string",
      "any.required": "Name is required",
      "string.min": "Name must be at least 1 character long",
      "string.max": "Name must be at most 100 characters long",
    }),

    institute: Joi.string().min(1).max(100).required().messages({
      "string.base": "Institute must be a string",
      "any.required": "Institute is required",
      "string.min": "Institute must be at least 1 character long",
      "string.max": "Institute must be at most 100 characters long",
    }),

    department: Joi.string().min(1).max(100).required().messages({
      "string.base": "Department must be a string",
      "any.required": "Department is required",
      "string.min": "Department must be at least 1 character long",
      "string.max": "Department must be at most 100 characters long",
    }),

    schedule: Joi.array().items(
      Joi.object({
        subject: Joi.string().min(1).max(100).required().messages({
          "string.base": "Subject must be a string",
          "any.required": "Subject is required",
          "string.min": "Subject must be at least 1 character long",
          "string.max": "Subject must be at most 100 characters long",
        }),

        date: Joi.date().required().messages({
          "date.base": "Date must be a valid date",
          "any.required": "Date is required",
        }),

        startTime: Joi.date().required().messages({
          "date.base": "Start Time must be a valid date",
          "any.required": "Start Time is required",
        }),

        endTime: Joi.date().required().messages({
          "date.base": "End Time must be a valid date",
          "any.required": "End Time is required",
        }),

        center: Joi.string().min(1).max(100).required().messages({
          "string.base": "Center must be a string",
          "any.required": "Center is required",
          "string.min": "Center must be at least 1 character long",
          "string.max": "Center must be at most 100 characters long",
        }),

        roomNo: Joi.string().min(1).max(10).required().messages({
          "string.base": "Room Number must be a string",
          "any.required": "Room Number is required",
          "string.min": "Room Number must be at least 1 character long",
          "string.max": "Room Number must be at most 10 characters long",
        }),

        block: Joi.number().required().messages({
          "number.base": "Block must be a number",
          "any.required": "Block is required",
        }),
      })
    ).required().messages({
      "array.base": "Schedule must be an array",
      "any.required": "Schedule is required",
    }),

  }).messages({
    "object.base": "Hall Ticket data must be an object",
  }),

  // --> NOTIFICATION <--
  createNotification: Joi.object({
    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date",
      "any.required": "Date is required",
    }),

    content: Joi.string().min(1).max(1000).required().messages({
      "string.base": "Content must be a string",
      "any.required": "Content is required",
      "string.min": "Content must be at least 1 character long",
      "string.max": "Content must be at most 1000 characters long",
    }),

    link: Joi.string().uri().required().messages({
      "string.base": "Link must be a string",
      "string.uri": "Link must be a valid URL",
      "any.required": "Link is required",
    }),

  }).messages({
    "object.base": "Notification data must be an object",
  }),

  updateNotification: Joi.object({
    date: Joi.date().optional().messages({
      "date.base": "Date must be a valid date",
    }),

    content: Joi.string().min(1).max(1000).optional().messages({
      "string.base": "Content must be a string",
      "string.min": "Content must be at least 1 character long",
      "string.max": "Content must be at most 1000 characters long",
    }),

    link: Joi.string().uri().optional().messages({
      "string.base": "Link must be a string",
      "string.uri": "Link must be a valid URL",
    }),

  }).min(1).messages({
    "object.base": "Notification data must be an object",
    "object.min": "At least one field must be provided for update"
  }),

}

export default Validators