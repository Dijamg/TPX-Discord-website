import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import { JwtToken } from "../types";
import { AccountService } from "../services";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Missing authorization token");
        }

        const decodedToken = jwt.verify(token, JWT_SECRET) as JwtToken;

        const accountDecoded = await AccountService.getById(decodedToken.accountId);
        (req as any).account = accountDecoded;

        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({
            error: {
              message: error instanceof Error ? error.message : 'Invalid token',
              code: 'AUTH_FAILED',
            }
          });
    }
}       