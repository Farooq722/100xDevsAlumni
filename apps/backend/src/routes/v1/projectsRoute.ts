import { Router } from "express";
import { projectSchema } from "../../validation";
import prisma from "@repo/db/client";

export const projectRouter = Router();

projectRouter.post("/", async (req, res) => {
  const parseData = projectSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).jsonp({ msg: "Validation failed" });
    return;
  }

  let projectCount = await prisma.project.count({
    where: {
      userId: req.userId,
    },
  });

  if (projectCount >= 4) {
    res.status(400).json({ msg: "You can only add up to 4 projects." });
    return;
  }

  try {
    await prisma.project.create({
      data: {
        title: parseData.data.title,
        description: parseData.data.description,
        githubUrl: parseData.data.githubUrl ?? "",
        liveUrl: parseData.data.liveUrl ?? "",
        user: {
          connect: { id: req.userId },
        },
      },
    });
    res.json({ msg: `Projects data created ${projectCount}` });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

projectRouter.put("/update/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const parseData = projectSchema.safeParse(req.body);

  if (!parseData.success || !projectId) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }

  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title: parseData.data.title,
        description: parseData.data.description,
        githubUrl: parseData.data.githubUrl,
        liveUrl: parseData.data.liveUrl,
      },
    });
    res.json({ msg: "Updation done" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

projectRouter.get("/get-pro", async (req, res) => {
  const allPro = await prisma.project.findMany();
  res.json({ allPro });
});

projectRouter.delete("/delete/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    res.json({ msg: "Project deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
    return;
  }
});

projectRouter.delete("/delete-all", async (req, res) => {
  await prisma.project.deleteMany();
  res.json({ msg: "all deleted" });
});
