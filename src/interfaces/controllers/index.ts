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
  name: string;
  email: string;
  password: string;
  mobile: string;
  gender: "male" | "female" | "other";
  age: number;
}
export interface RegisterUserRequest extends Request {
  body: RegisterUserBody
}