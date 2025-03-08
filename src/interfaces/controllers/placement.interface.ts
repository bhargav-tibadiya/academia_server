import { Request } from "express";

export interface CreatePlacementRequest extends Request {
  body: {
    companyName: string;
    companyImage: string;
    jobRole: string;
    agreement: string;
    package: string;
    description: string;
    requirement: string;
    deadline: Date;
    technologies: string;
    appliedStudents?: string[];
  }
}

export interface UpdatePlacementRequest extends Request {
  body: {
    companyName?: string;
    companyImage?: string;
    jobRole?: string;
    agreement?: string;
    package?: string;
    description?: string;
    requirement?: string;
    deadline?: Date;
    technologies?: string;
    appliedStudents?: string[];
  }
} 