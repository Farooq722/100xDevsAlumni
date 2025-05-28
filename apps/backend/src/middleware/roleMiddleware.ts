// import jwt from "jsonwebtoken";
// import { NextFunction, Request, Response } from "express";

// export const userMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader ? authHeader.split(" ")[1]  Bearer token
//     : req.cookies.token;

//   if (!token) {
//     res.status(404).json({ msg: "Invalid token" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       role: string;
//       userId: string;
//     };
//     if (decoded.role !== "User") {
//       res.status(403).json({ msg: "Unauthorized request" });
//       return;
//     }
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       msg: "Unauthorized",
//     });
//     return;
//   }
// };

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const roleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token;

  if (!token) {
    res.status(401).json({ msg: "Token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };

    req.userId = decoded.userId;
    req.role = decoded.role as "Admin" | "User";
    next();
  } catch (error) {
    res.status(403).json({ msg: "Invalid token" });
    return;
  }
};
