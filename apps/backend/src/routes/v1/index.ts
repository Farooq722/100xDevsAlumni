import prisma from "@repo/db";
import dotnev from "dotenv";
dotnev.config();
import { Router } from "express";
import { bioSchema } from "../../validation";
import { eduRouter } from "./educationRoute";
import { alumniMiddleware } from "../../middleware/alumniMiddleware";
import { proffRouter } from "./professionalDataRoute";
import { projectRouter } from "./projectsRoute";
import { mediaRouter } from "./mediaRoute";
import { singleUpload } from "../../utils/multer";
import { imagekit } from "../../utils/imageKit";
import { authRouter } from "./authRoute";
import { roleMiddleware } from "../../middleware/roleMiddleware";

export const router = Router();

router.post("/avatar", alumniMiddleware, singleUpload, async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ msg: "No avatar file uploaded" });
    return;
  }
  try {
    const imageRes = await imagekit.upload({
      file: file.buffer,
      fileName: `avatar_${Date.now()}`,
      folder: "100xAlumni",
    });

    await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        avatar: imageRes.url,
        avatarId: imageRes.fileId,
      },
    });
    res.json({
      msg: "Avatar uploaded",
      avatar: imageRes.url,
      avatarId: imageRes.fileId,
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Internal server error", success: false, error: true });
    console.log(error);
    return;
  }
});

router.delete("/avatar/delete", alumniMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  if (user?.avatarId) {
    await imagekit.deleteFile(user.avatarId);
  }

  await prisma.user.update({
    where: {
      id: req.userId,
    },
    data: {
      avatar: null,
      avatarId: null,
    },
  });
  res.json({ msg: "avatar deleted from DB" });
});

router.put("/bio", alumniMiddleware, async (req, res) => {
  const parseData = bioSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({ msg: "Validation failed" });
    return;
  }
  try {
    await prisma.user.update({
      where: { id: req.userId },
      data: { bio: parseData.data.bio },
    });
    res.json({
      msg: "Bio updated",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Update bio error:", error);
    res.status(500).json({
      msg: "Could not update bio",
      success: false,
      error: true,
    });
  }
});

// router.get("/all-data", alumniMiddleware, async (req, res) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: req.userId,
//     },
//     include: {
//       socialMedia: true,
//     },
//   });

//   if (!user) {
//     res.status(404).json({ message: "User not found" });
//     return;
//   }

//   // Exclude password
//   const { password, ...safeUser } = user;
//   res.json(safeUser);
// });

router.get("/user-data", roleMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    include: {
      socialMedia: true,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const { password, ...safeUser } = user;
  res.json(safeUser);
});

router.get("/alumnus/data", async (req, res) => {
  try {
    const allAlumnus = await prisma.user.findMany({
      where: {
        role: "Alumni",
      },
      include: {
        education: true,
        professionalData: true,
        projects: true,
        skills: true,
        socialMedia: true,
      },
    });

    const safeAlumni = allAlumnus.map(({ password, ...rest }: any) => rest);

    const departmentCount: Record<string, number> = {};
    const degreeCount: Record<string, number> = {};
    const jobTitleCount: Record<string, number> = {};
    const locationCount: Record<string, number> = {};
    const yearsOfExperienceCount: Record<string, number> = {};

    const total = allAlumnus.length;

    for (const user of allAlumnus) {
      if (user.education) {
        departmentCount[user.education.department] =
          (departmentCount[user.education.department] || 0) + 1;
        degreeCount[user.education.degree] =
          (degreeCount[user.education.degree] || 0) + 1;
      }

      if (user.professionalData) {
        jobTitleCount[user.professionalData.jobTitle] =
          (jobTitleCount[user.professionalData.jobTitle] || 0) + 1;
        locationCount[user.professionalData.location] =
          (locationCount[user.professionalData.location] || 0) + 1;
        const exp = user.professionalData.yearsOfExperience.toString();
        yearsOfExperienceCount[exp] = (yearsOfExperienceCount[exp] || 0) + 1;
      }
    }

    // Convert counts to percentages
    const toPercent = (count: Record<string, number>) =>
      Object.fromEntries(
        Object.entries(count).map(([key, value]) => [
          key,
          ((value / total) * 100).toFixed(2) + "%",
        ]),
      );

    const analytics = {
      departmentPercentage: toPercent(departmentCount),
      degreePercentage: toPercent(degreeCount),
      jobTitlePercentage: toPercent(jobTitleCount),
      locationPercentage: toPercent(locationCount),
      experiencePercentage: toPercent(yearsOfExperienceCount),
    };

    res.json({
      allAlumnus: safeAlumni,
      analytics,
      msg: "all analtyics",
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Internal server error", success: false, error: true });
    return;
  }
});

router.use("/auth", authRouter);
router.use("/education", alumniMiddleware, eduRouter);
router.use("/professionalData", alumniMiddleware, proffRouter);
router.use("/projects", alumniMiddleware, projectRouter);
router.use("/accounts", alumniMiddleware, mediaRouter);
