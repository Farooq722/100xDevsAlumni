import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const alumniMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader
    ? authHeader.split(" ")[1] // Bearer token
    : req.cookies.token;

  if (!token) {
    res.status(404).json({ msg: "Invalid token" });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: string;
      userId: string;
    };
    if (decode.role !== "Alumni") {
      res.status(403).json({ msg: "Unauthorized request" });
      return;
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
};
