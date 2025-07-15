import type { RequestHandler } from "express";

export const adminMiddleware: RequestHandler = (req, res, next) => {
  const account = (req as any).account;

  if (!account || !account.is_admin) {
    return res.status(403).json({
      error: {
        message: "No permission to access this resource",
        code: "FORBIDDEN",
      },
    });
  }

  next();
};