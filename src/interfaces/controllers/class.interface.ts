import { Request } from "express";

export interface CreateClassRequest extends Request {
  body: {
    name: string;
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
  }
} 