import { Router } from "express";
import prisma from "@repo/db/client";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import dotnev from "dotenv";
dotnev.config();
import {
  forgetPassSchema,
  signinSchema,
  signupSchema,
  updatePassSchema,
} from "../../validation";
import { compare, hash } from "../../script";
import { verifyToken } from "../../utils/hashToken";
import { sendEmail } from "../../utils/resend";
import { emailTemplate } from "../../utils/emailTemplate";
import { otpEmail } from "../../utils/otpTemplate";
import { userMiddleware } from "../../middleware/userMiddleware";
import {
  otpRateLimit,
  resetPasswordRateLimit,
  signupRateLimit,
} from "../../middleware/rateLimitMiddleware";

export const authRouter = Router();

authRouter.post("/signup", signupRateLimit, async (req, res) => {
  const parseData = signupSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed bro" });
    return;
  }

  const hashPassword = await hash(parseData.data.password);
  try {
    const newUser = await prisma.user.create({
      data: {
        name: parseData.data.name,
        username: parseData.data.username,
        password: hashPassword,
        role: parseData.data.type === "alumni" ? "Alumni" : "User",
        auth: {
          create: {
            verifyToken: verifyToken,
          },
        },
      },
      include: {
        auth: {
          select: {
            verifyToken: true,
          },
        },
      },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verifyToken}`;

    const data = await sendEmail({
      sendTo: newUser.username,
      subject: "Verify your email",
      html: emailTemplate(newUser.name, verificationLink),
    });

    res.json({
      userId: newUser.id,
      msg: "User created successfully",
      success: true,
      error: false,
    });
  } catch (e) {
    res.status(400).json({
      msg: "User already exits",
      success: false,
      error: true,
    });
  }
});

authRouter.post("/signin", signupRateLimit, async (req, res) => {
  const parseData = signinSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: parseData.data.username,
      },
    });
    if (!user) {
      res.status(403).json({ msg: "User not found" });
      return;
    }

    const isPasswordValid = await compare(
      parseData.data.password,
      user?.password,
    );
    if (!isPasswordValid) {
      res.status(403).json({ msg: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    ); // " ! " is to tell the ts compailer that it wont have null or undifined means definatly will give value

    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none" as const,
    };

    res.cookie("token", token, cookieOption);
    res.json({
      msg: "User loggin successfully",
      success: true,
      error: false,
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
    return;
  }
});

authRouter.post("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const userToken = await prisma.auth.findFirst({
      where: {
        verifyToken: token as string,
      },
    });

    if (!userToken) {
      res.status(403).json({ msg: "token Invalid" });
      return;
    }

    await prisma.auth.update({
      where: {
        verifyToken: userToken.verifyToken!,
      },
      data: {
        verifyEmail: true,
        verifyToken: null,
      },
    });
    res.json({ msg: "Email verified" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

authRouter.post(
  "/forget-password",
  resetPasswordRateLimit,
  async (req, res) => {
    const parseData = forgetPassSchema.safeParse(req.body);
    if (!parseData.success) {
      res.status(403).json({ msg: "Validation failed" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        username: parseData.data.username,
      },
      include: {
        auth: true,
      },
    });

    if (!user || !user.auth) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    try {
      await prisma.auth.update({
        where: {
          id: user.auth?.id,
        },
        data: {
          otp: otp,
          otpExpiresAt: expiresAt,
        },
      });

      const data = await sendEmail({
        sendTo: user.username,
        subject: "Your OTP Code - 100xDevsAlumni",
        html: otpEmail(otp, user.name),
      });

      res.json({ msg: "OTP sent to your mailID" });
    } catch (error) {
      res.status(400).json({ msg: "Internal server error" });
      return;
    }
  },
);

authRouter.post("/verify-forget-password", otpRateLimit, async (req, res) => {
  const parseData = updatePassSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  const otpCheck = await prisma.auth.findFirst({
    where: {
      otp: parseData.data.otp,
    },
    include: {
      user: true,
    },
  });

  if (!otpCheck) {
    res.status(404).json({ msg: "Invalid OTP" });
    return;
  }

  if (otpCheck.otpExpiresAt && new Date() > otpCheck.otpExpiresAt) {
    await prisma.auth.update({
      where: {
        id: otpCheck.id,
      },
      data: {
        otp: null,
        otpExpiresAt: null,
      },
    });
    res.status(403).json({ msg: "OTP expired" });
    return;
  }

  try {
    const hashPassword = await hash(parseData.data.password);
    await prisma.user.update({
      where: {
        id: otpCheck.user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    await prisma.auth.update({
      where: {
        id: otpCheck.id,
      },
      data: {
        otp: null,
        otpExpiresAt: null,
      },
    });
    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

authRouter.delete("/delete", userMiddleware, async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.userId,
      },
    });
    res.json({ msg: "Account deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});
