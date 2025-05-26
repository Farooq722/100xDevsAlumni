import prisma from "@repo/db/client";
import { Router } from "express";
import { socialMediaSchema } from "../../validation";

export const mediaRouter = Router();

mediaRouter.post("/", async (req, res) => {
  const parseData = socialMediaSchema.safeParse(req.body);

  if (!parseData.success) {
    res.status(403).json({ msg: "Validations failed" });
    return;
  }

  try {
    const mediaRes = await prisma.socialMedia.create({
      data: {
        linkedin: parseData.data.linkedin!,
        twitter: parseData.data.twitter!,
        github: parseData.data.github!,
        instagram: parseData.data.instagram ?? "",
        youtube: parseData.data.youtube ?? "",
        portfolio: parseData.data.portfolio ?? "",
        user: {
          connect: { id: req.userId },
        },
      },
    });
    res.json({ mediaRes });
  } catch (error) {
    res.status(400).json({ msg: "Internal server errorrrr" });
    return;
  }
});

mediaRouter.put("/update", async (req, res) => {
  const accounts = [
    "linkedin",
    "twitter",
    "github",
    "instagram",
    "youtube",
    "portfolio",
  ];
  const updateData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => accounts.includes(key)),
  );
  try {
    await prisma.socialMedia.update({
      where: {
        userId: req.userId,
      },
      data: updateData,
    });
    res.json({ msg: `account updated`, success: true, error: false });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Internal server error", success: false, error: true });
    return;
  }
});

// mediaRouter.delete("/", async (req, res) => {
//     const accounts = ["linkedin", "twitter", "github", "instagram", "youtube", "portfolio"];
//     const updateData = Object.fromEntries(Object.entries(req.body).filter(([key]) => accounts.includes(key)));

//     try {
//         await prisma.socialMedia.delete({
//             where: {
//                 userId: req.userId

//             }

//         })
//     } catch (error) {
//         res.status(400).json({msg: "Internal server error"})
//         return
//     }

// })

mediaRouter.delete("/delete-all", async (req, res) => {
  await prisma.socialMedia.deleteMany();
  res.json({ msg: "All accounts deleted" });
});
