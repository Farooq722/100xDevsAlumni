import { Router } from "express";
import { educationSchema } from "../../validation";
import prisma from "@repo/db";

export const eduRouter = Router();

eduRouter.post("/", async (req, res) => {
  const parseData = educationSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  try {
    await prisma.education.upsert({
      where: {
        userId: req.userId,
      },
      update: {
        college: parseData.data.college,
        department: parseData.data.department,
        passingYear: parseData.data.passingYear,
        degree: parseData.data.degree,
      },
      create: {
        college: parseData.data.college,
        department: parseData.data.department,
        passingYear: parseData.data.passingYear,
        degree: parseData.data.degree,
        user: {
          connect: { id: req.userId },
        },
      },
    });

    res.json({
      msg: "Education feilds created/updated",
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Internal server error", success: false, error: true });
  }
});

eduRouter.get("/get-edu", async (req, res) => {
  try {
    const eduData = await prisma.education.findMany();

    res.json({
      Education: eduData.map((e) => ({
        college: e.college,
        department: e.department,
        passingYear: e.passingYear,
        degree: e.degree,
      })),
    });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

eduRouter.delete("/delete", async (req, res) => {
  try {
    await prisma.education.delete({
      where: {
        userId: req.userId,
      },
    });

    res.json({ msg: "Education data deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});
