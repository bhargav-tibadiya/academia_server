import { Request } from "express";

export interface CreateStudentRequest extends Request {
  body: {
    enrollmentNo?: number;
    userId: string;
    profileId: string;
    instituteId: string;
    departmentId: string;
    classId: string;
    attendanceId?: string;
    requests?: string[];
    results?: string[];
    notifications?: string[];
    fees?: string[];
    hallTickets?: string[];
  }
}

export interface UpdateStudentRequest extends Request {
  body: {
    enrollmentNo?: number;
    userId?: string;
    profileId?: string;
    instituteId?: string;
    departmentId?: string;
    classId?: string;
    attendanceId?: string;
    requests?: string[];
    results?: string[];
    notifications?: string[];
    fees?: string[];
    hallTickets?: string[];
  }
  params: {
    studentId: string;
  }
}

export interface DeleteStudentRequest extends Request {
  params: {
    studentId: string;
  }
}