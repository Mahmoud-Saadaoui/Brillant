import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { Role } from "@prisma/client";

/**
 * Middleware to check if user has required role(s)
 * @param roles - Array of allowed roles
 */
export const authorize = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Check if user is authenticated (user should be attached by authenticate middleware)
      if (!req.user?.id) {
        res.status(401).json({ message: "Authentication required." });
        return;
      }

      // Get user with role from database
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { role: true },
      });

      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      // Check if user's role is in the allowed roles
      if (!roles.includes(user.role)) {
        res.status(403).json({
          message: `Access denied. Required role(s): ${roles.join(", ")}`,
        });
        return;
      }

      // Attach user role to request
      req.userRole = user.role;
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

/**
 * Middleware to check if user is a candidate
 */
export const isCandidate = authorize(Role.CANDIDATE);

/**
 * Middleware to check if user is a recruiter
 */
export const isRecruiter = authorize(Role.RECRUITER);

/**
 * Middleware to check if user is an admin
 */
export const isAdmin = authorize(Role.ADMIN);

/**
 * Middleware to check if user is either candidate or recruiter
 */
export const isCandidateOrRecruiter = authorize(Role.CANDIDATE, Role.RECRUITER);

/**
 * Extend Express Request type to include userRole property
 */
declare global {
  namespace Express {
    interface Request {
      userRole?: Role;
    }
  }
}
