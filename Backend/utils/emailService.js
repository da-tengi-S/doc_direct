import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// Function to send email with a verification code
export const sendVerificationEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Doc-Direct - Verify Your Email",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #007bff; text-align: center;">Welcome to Doc Direct!</h2>
                <p>Thank you for signing up for <strong>Doc Direct</strong>, your trusted Doctor Appointment Booking App.</p>
                <p>To complete your registration, please use the verification code below:</p>
                <div style="text-align: center; font-size: 20px; font-weight: bold; color: #333; padding: 10px; border: 1px dashed #007bff; display: inline-block; margin: 10px 0;">
                    ${verificationCode}
                </div>
                <p>If you didn't request this code, please ignore this email.</p>
                <p>Need help? Contact our support team at <a href="mailto:support@docdirect.com">support@docdirect.com</a>.</p>
                <p style="margin-top: 20px; font-size: 12px; color: #555;">Best Regards,<br><strong>Doc Direct Team</strong></p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
