import { Request } from "express";

export interface CreateTimeTableRequest extends Request {
  body: {
    classId: string;
    timetable: Record<string, any>;
  }
}

export interface UpdateTimeTableRequest extends Request {
  body: {
    classId?: string;
    timetable?: Record<string, any>;
  }
} 