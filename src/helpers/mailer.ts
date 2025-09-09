import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    console.log("UserId before hashing:", userId);
    const plainToken = userId.toString() + Date.now(); // Plain token for email
    const hashedToken = await bcrypt.hash(plainToken, 10); // Hashed for DB

    // Update DB with hashed token
    const updateFields =
      emailType === "VERIFY"
        ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };

    await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST!,
      port: Number(process.env.MAIL_PORT!),
      secure: false,
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.MAIL_USER!,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${plainToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.<br>
      Or copy this link: ${process.env.DOMAIN}/verify-email?token=${plainToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Email sending error:", error);
    throw new Error(error.message);
  }
};
