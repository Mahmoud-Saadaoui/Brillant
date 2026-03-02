import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { LoginUser, RegisterUser, UserInfo, ForgotPasswordData, ResetPasswordData } from "./auth.types";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "./auth.validation";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getVerificationEmailTemplate, getResetPasswordEmailTemplate } from "./templates";
import { sendEmail } from "./nodemailer";

const generateToken = (res: Response, userInfo: UserInfo): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error("Missing ACCESS_TOKEN_SECRET or EXPIRES_IN in environment");
  }
  const accessToken = jwt.sign({ userInfo }, secret, { expiresIn: Number(expiresIn) });

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return accessToken
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/register
 *  @desc    Create New User
 *  @access  public
*/
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, gender } = req.body as RegisterUser;
    // Validation with zod
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    // Check if user exist
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 15);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
        gender,
      },
      select: {
        name: true,
        id: true,
        email: true,
      },
    });
    
    // Generate an email verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const vtoken = await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: rawToken
      }
    })

    // Create the verification link
    const clientUrl = process.env.CLIENT_URL
    const link = `${clientUrl}/auth/${user.id}/verify/${vtoken.token}`
    // Prepare the email content and send it
    const htmlTemplate = getVerificationEmailTemplate(link);
    await sendEmail(user.email, "Verify Your Email Address", htmlTemplate);

    // Respond with success message
    res.status(201).json({
      message: "Registration successful! Please verify your email address.",
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/login
 *  @desc    Login User
 *  @access  public
*/
export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body as LoginUser;
    // Validation with zod
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      // Check if email is verified
      if (!user.isAccountVerified) {
        res.status(400).json({ message: "Please verify your email address before logging in." });
        return;
      }
      // Generate authentication token
      const token = generateToken(res, {
        id: user.id,
        email: user.email,
      });
      res.status(200).json({
          id: user.id,
          name: user.name,
          role: user.role,
          token,
      });
      return;
    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
      return;
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/:userId/verify/:token
 *  @desc    Create New User
 *  @access  public
*/
export const verifyAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, token } = req.params
    // Validate params
    if (!userId || !token || Array.isArray(token)) {
      res.status(400).json({ message: "Invalid verification link." });
      return;
    }

    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: numericUserId }
    });
    if (!user) {
      res.status(400).json({ message: "Invalid verification link." })
      return 
    }
    if (user?.isAccountVerified) {
      res.status(200).json({
        message: "Your account is already verified.",
        user,
      });
      return 
    }
    // Check if token exists for this user
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { 
        userId: user?.id, 
        token 
      },
    });
    if (!verificationToken) {
      res.status(400).json({ message: "Invalid or expired verification link." })
      return 
    }
    // Mark account as verified
    const updatedUser = await prisma.user.update({
      where: { id: numericUserId },
      data: { isAccountVerified: true },
      select: { 
        id: true, 
        name: true, 
        email: true,
        role: true,
      }
    });
    // Delete used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken?.id },
    });
    // Respond with success
    res
      .status(200)
      .json({
        message: "Your account has been successfully verified.",
        user: updatedUser,
      });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
}

/**
 *  @method  POST
 *  @route   /api/v1/auth/password/forgot-password
 *  @desc    Send password reset link to user's email
 *  @access  public
*/
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as ForgotPasswordData;

    // Validation with zod
    const result = forgotPasswordSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Still return success message to prevent email enumeration
      res.status(200).json({
        message: "If an account exists with this email, a password reset link has been sent.",
      });
      return;
    }

    // Generate a new reset token or update existing one
    const rawToken = crypto.randomBytes(32).toString("hex");
    const clientUrl = process.env.CLIENT_URL;
    const link = `${clientUrl}/auth/reset-password/${user.id}/${rawToken}`;

    // Create or update verification token
    await prisma.verificationToken.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        token: rawToken,
      },
      update: {
        token: rawToken,
      },
    });

    // Send email with reset link
    const htmlTemplate = getResetPasswordEmailTemplate(link);
    await sendEmail(user.email, "Reset Your Password", htmlTemplate);

    // Respond with success message
    res.status(200).json({
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};

/**
 *  @method  GET
 *  @route   /api/v1/auth/password/reset-password/:userId/:token
 *  @desc    Validate the reset password link
 *  @access  public
*/
export const validateResetToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, token } = req.params;

    // Validate params
    if (!userId || !token || Array.isArray(token)) {
      res.status(400).json({ message: "Invalid reset link." });
      return;
    }

    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: numericUserId },
    });
    if (!user) {
      res.status(400).json({ message: "Invalid reset link." });
      return;
    }

    // Check if token exists for this user
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        userId: user.id,
        token,
      },
    });
    if (!verificationToken) {
      res.status(400).json({ message: "Invalid or expired reset link." });
      return;
    }

    // Token is valid
    res.status(200).json({
      message: "Reset link is valid.",
      userId: user.id,
      email: user.email,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};

/**
 *  @method  POST
 *  @route   /api/v1/auth/password/reset-password/:userId/:token
 *  @desc    Reset the user's password
 *  @access  public
*/
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body as ResetPasswordData;

    // Validate request body
    const result = resetPasswordSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    // Validate params
    if (!userId || !token || Array.isArray(token)) {
      res.status(400).json({ message: "Invalid reset link." });
      return;
    }

    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: numericUserId },
    });
    if (!user) {
      res.status(400).json({ message: "Invalid reset link." });
      return;
    }

    // Check if token exists for this user
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        userId: user.id,
        token,
      },
    });
    if (!verificationToken) {
      res.status(400).json({ message: "Invalid or expired reset link." });
      return;
    }

    // Hash new password
    const hashPassword = await bcrypt.hash(password, 15);

    // Update user password and mark as verified
    await prisma.user.update({
      where: { id: numericUserId },
      data: {
        password: hashPassword,
        isAccountVerified: true,
      },
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Respond with success
    res.status(200).json({
      message: "Password has been successfully reset. You can now login with your new password.",
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
};
