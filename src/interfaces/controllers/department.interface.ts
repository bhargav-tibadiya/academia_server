import { Request } from "express";

export interface CreateDepartmentRequest extends Request {
  body: {
    name: string;
    batch: string;
    instituteId: string;
    classes?: string[];
  }
}

export interface UpdateDepartmentRequest extends Request {
  body: {
    name?: string;
    batch?: string;
    classes?: string[];
  }
} 

export interface DeleteDepartmentRequest extends Request {
  params: {
    departmentId: string;
  }
}
