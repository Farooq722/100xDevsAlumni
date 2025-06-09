import { Router } from "express";
import jwt from "jsonwebtoken";
import { adminSecretKey } from "../../utils/adminString";
import {
  adminSigninSchema,
  adminSignupSchema,
  forgetPassSchema,
  updatePassSchema,
} from "../../validation";
import { compare, hash } from "../../script";
import prisma from "@repo/db";
import { verifyToken } from "../../utils/hashToken";
import { sendEmail } from "../../utils/resend";
import { adminEmailTemplate } from "../../utils/adminEmailTemplate";
import { otpEmail } from "../../utils/otpTemplate";
import {
  otpRateLimit,
  resetPasswordRateLimit,
  signupRateLimit,
} from "../../middleware/rateLimitMiddleware";
import { adminMiddleware } from "../../middleware/adminMiddleware";

export const adminAuth = Router();

adminAuth.post("/signup", signupRateLimit, async (req, res) => {
  const parseData = adminSignupSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  const hashPassword = await hash(parseData.data.password);
  try {
    const adminRes = await prisma.admin.create({
      data: {
        username: parseData.data.username,
        password: hashPassword,
        name: parseData.data.name,
        number: parseData.data?.number,
        secretKey: adminSecretKey,
        adminAuth: {
          create: {
            verifyToken: verifyToken,
          },
        },
      },
      include: {
        adminAuth: {
          select: {
            verifyToken: true,
          },
        },
      },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verifyToken}`;
    const data = await sendEmail({
      sendTo: adminRes.username,
      subject: "Verify your email",
      html: adminEmailTemplate(adminRes.name, verificationLink, adminSecretKey),
    });

    res.json({ msg: "Admin created" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

adminAuth.post("/signin", signupRateLimit, async (req, res) => {
  const parseData = adminSigninSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  try {
    const user = await prisma.admin.findUnique({
      where: {
        username: parseData.data.username,
        secretKey: parseData.data.secretKey,
      },
    });
    if (!user) {
      res.status(403).json({ msg: "User not found/secrer key missing" });
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
      },
      process.env.JWT_ADMIN_SECRE!,
      { expiresIn: "7d" },
    ); // " ! " is to tell the ts compailer that it wont have null or undifined means definatly will give value

    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none" as const,
    };

    res.cookie("token", token, cookieOption);
    res.json({
      token: token,
    });
  } catch (e) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

adminAuth.post("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const userToken = await prisma.adminAuth.findFirst({
      where: {
        verifyToken: token as string,
      },
    });

    if (!userToken) {
      res.status(403).json({ msg: "token Invalid" });
      return;
    }

    await prisma.adminAuth.update({
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

adminAuth.post("/forget-password", resetPasswordRateLimit, async (req, res) => {
  const parseData = forgetPassSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  const user = await prisma.admin.findFirst({
    where: {
      username: parseData.data.username,
    },
    include: {
      adminAuth: true,
    },
  });

  if (!user || !user.adminAuth) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await prisma.adminAuth.update({
      where: {
        id: user.adminAuth?.id,
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
});

adminAuth.post("/verify-forget-password", otpRateLimit, async (req, res) => {
  const parseData = updatePassSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  const otpCheck = await prisma.adminAuth.findFirst({
    where: {
      otp: parseData.data.otp,
    },
    include: {
      admin: true,
    },
  });

  if (!otpCheck) {
    res.status(404).json({ msg: "Invalid OTP" });
    return;
  }

  if (otpCheck.otpExpiresAt && new Date() > otpCheck.otpExpiresAt) {
    await prisma.adminAuth.update({
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
    await prisma.admin.update({
      where: {
        id: otpCheck.adminId,
      },
      data: {
        password: hashPassword,
      },
    });

    await prisma.adminAuth.update({
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
