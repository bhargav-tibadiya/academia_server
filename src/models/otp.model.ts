// Packages
import mongoose, { Schema, Document } from "mongoose";


// Utils
import mailSender from "@services/mailsender";
import verificationMail from "@utils/mail/verification";


// Interface for OTP Model
import { MTOTP } from "@interfaces/models";


// Schema Definition
const OTPSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 5 * 60, // OTP expires in 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

// Function to Send Verification Email
const sendVerificationEmail = async (email: string, otp: string): Promise<void> => {
  try {
    await mailSender(email, "Verification Email from Academia", verificationMail(otp));
    console.log("Verification Email Sent Successfully");
  } catch (error) {
    console.error("Error While Sending Verification Mail. \nCheck OTP.ts File #BE003", error);
    throw error;
  }
};

// Pre-save Hook: Send OTP Email before saving to DB
OTPSchema.pre<MTOTP>("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

// Export Model
const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;
