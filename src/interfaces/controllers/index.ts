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