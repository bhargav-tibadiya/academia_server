// Packages
import crypto from 'crypto';

// --> SERVER <--
// Response Creator for frequent use
export const responseCreator = (code: number, message: string, success: boolean, data: Record<string, any> = {}) => {
  return {
    code: code,
    message: message,
    success: success,
    data: data
  }
}

// --> AUTH <--
// Generate OTP
export const generateOtp = (length: number = 6): string => {
  const otp = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
  return otp;
}