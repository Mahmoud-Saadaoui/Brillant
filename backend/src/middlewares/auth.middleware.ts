import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../modules/auth/auth.types";

/**
 * Middleware to verify JWT token from cookies or Authorization header
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies?.jwt || req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authentication required. Please login." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Attach user info to request
    req.user = {
      id: decoded.userInfo.id,
      email: decoded.userInfo.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired. Please login again." });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token. Please login again." });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Extend Express Request type to include user property
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}
