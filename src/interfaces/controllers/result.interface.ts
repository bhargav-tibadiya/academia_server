import { Request } from "express";

interface Subject {
  code: string;
  name: string;
  type: "theory" | "practical";
  credit: number;
  grade: string;
}

interface ResultData {
  overallGrade: string;
  SGPA: number;
  CGPA: number;
  subjects: Subject[];
}

export interface CreateResultRequest extends Request {
  body: {
    semester: number;
    time: string;
    regular: boolean;
    result: ResultData;
  }
}

export interface UpdateResultRequest extends Request {
  body: {
    semester?: number;
    time?: string;
    regular?: boolean;
    result?: Partial<ResultData>;
  }
} 