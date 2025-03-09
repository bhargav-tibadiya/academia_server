import { Request, Response } from "express";

export interface ServerResponse extends Response {
  code?: number;
  message?: string;
  success?: boolean;
  data?: Record<string, any>;
}

// --> CONTROLLER.USER.LOGIN
interface LoginUserBody {
  email: string;
  password: string;
}
export interface LoginUserRequest extends Request {
  body: LoginUserBody
}

// --> CONTROLLER.USER.REGISTER
interface RegisterUserBody {
  email: string;
  password: string;
  role: string,
  otp: string
}
export interface RegisterUserRequest extends Request {
  body: RegisterUserBody
}

// --> CONTROLLER.USER.SEND_OTP
interface SendOTPBody {
  email: string
}
export interface SendOTPRequest extends Request {
  body: SendOTPBody
}

// --> CONTROLLER.ATTENDANCE.CREATE
interface CreateAttendanceBody {
  userId: string
}
export interface CreateAttendanceRequest extends Request {
  body: CreateAttendanceBody
}

// --> CONTROLLER.ATTENDANCE.ADD_RECORD
interface AddAttendanceRecordBody {
  userId: string
  date: string
  time: string,
  subjectId: string,
  status: string
}
export interface AddAttendanceRecordRequest extends Request {
  body: AddAttendanceRecordBody
}

// --> CONTROLLER.ATTENDANCE.UPDATE
export interface AttendanceRecord {
  date: string
  time: string
  subjectId: string
  status: string
}

interface UpdateAttendanceBody {
  attendanceRecords: AttendanceRecord[]
}
export interface UpdateAttendanceRequest extends Request {
  body: UpdateAttendanceBody
}

// --> CONTROLLER.INSTITUTE.CREATE
interface CreateInstituteBody {
  name: string
}
export interface CreateInstituteRequest extends Request {
  body: CreateInstituteBody
}

// --> CONTROLLER.PROFILE.CREATE
interface CreateProfileBody {
  userId: string
  firstName: string
  middleName: string
  lastName: string
  gender: string
  birthDate: string
  bloodGroup: string
  address: string
  contact: string
  fatherName: string
  fatherContact: string
  motherName: string
  motherContact: string
}
export interface CreateProfileRequest extends Request {
  body: CreateProfileBody
}

// --> CONTROLLER.PROFILE.UPDATE
interface UpdateProfileBody {
  userId: string
  firstName: string
  middleName: string
  lastName: string
  gender: string
  birthDate: string
  bloodGroup: string
  address: string
  contact: string
  fatherName: string
  fatherContact: string
  motherName: string
  motherContact: string
}
export interface UpdateProfileRequest extends Request {
  body: UpdateProfileBody
}

// --> CONTROLLER.SUBJECT.CREATE
interface CreateSubjectBody {
  name: string
  subjectCode: string
}
export interface CreateSubjectRequest extends Request {
  body: CreateSubjectBody
}

// --> CONTROLLER.SUBJECT.UPDATE
interface UpdateSubjectBody {
  name: string
  subjectCode: string
}
export interface UpdateSubjectRequest extends Request {
  body: UpdateSubjectBody
}

// --> CONTROLLER.UPDATE.CREATE
interface CreateUpdateBody {
  date: string
  title: string
  description: string
  sender: string
  lastUpdated: string
  tags: string
  class: string
}
export interface CreateUpdateRequest extends Request {
  body: CreateUpdateBody
}

// --> CONTROLLER.UPDATE.UPDATE
interface UpdateUpdateBody {
  date: string
  title: string
  description: string
  sender: string
  lastUpdated: string
  tags: string
  class: string
}
export interface UpdateUpdateRequest extends Request {
  body: UpdateUpdateBody
}

// --> CONTROLLER.USER.UPDATE
interface UpdateUserBody {
  email: string
  role: string
  status: string
}
export interface UpdateUserRequest extends Request {
  body: UpdateUserBody
}

// --> CONTROLLER.CLASS.CREATE
export interface CreateClassRequest extends Request {
  body: {
    name: string;
    departmentId: string;
    students?: string[];
    timeTableId?: string;
    exams?: string[];
    updates?: string[];
  }
}

export interface UpdateClassRequest extends Request {
  body: {
    name?: string;
    students?: string[];
    timeTableId?: string;
    exams?: string[];
    updates?: string[];
  },
  params: {
    classId: string;
  }
} 

export interface DeleteClassRequest extends Request {
  params: {
    classId: string;
  }
}