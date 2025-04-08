import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(403).json({ msg: "No token provided" });
    return;
  }
  const token = header?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Unauthorized",
    });
    return;
  }
};
