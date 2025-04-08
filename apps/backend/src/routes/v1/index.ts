import prisma from "@repo/db/client";
import dotnev from "dotenv"
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

export const router = Router();

router.post("/avatar", alumniMiddleware, singleUpload, async (req, res) => {
    const file = req.file;
    if(!file) {
        res.status(400).json({ msg: "No avatar file uploaded" });
        return
    }
    try {
        const imageRes = await imagekit.upload({
            file: file.buffer,
            fileName: `avatar_${Date.now()}`,
            folder: "100xAlumni"
        });

        await prisma.user.update({
            where: {
                id: req.userId
            },
            data:{
                avatar: imageRes.url,
                avatarId: imageRes.fileId
            }
        })
        res.json({msg: "Avatar uploaded"})
    } catch (error) {
        res.status(400).json({msg: "Internal server error"})
        return
    }
})

router.delete("/avatar/delete", alumniMiddleware, async (req, res) =>{
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        }
    });
    
    if(user?.avatarId) {
        await imagekit.deleteFile(user.avatarId);
    }

    await prisma.user.update({
        where: {
            id: req.userId
        },
        data: {
            avatar: null,
            avatarId: null
        }
    })
    res.json({msg: "avatar deleted from DB"});
})

router.post("/bio", alumniMiddleware, async (req, res) => {
    const parseData = bioSchema.safeParse(req.body)
    if(!parseData.success) {
        res.status(403).json({msg: "Validation failed"})
        return
    }
    await prisma.user.update({
        where: {
            id: req.userId
        },
        data: {
            bio: parseData.data.bio
        }
    })

    res.json({msg: "Bio updated"});
})

router.get("/all-users", alumniMiddleware, async (req, res) => {
    const allUsers = await prisma.user.findMany({
        include: {
            professionalData: true,
            socialMedia: true,
            education: true
        }
    });
    const safeUsers = allUsers.map(({ password, ...rest }) => rest);
    res.json({ users: safeUsers })
})

router.use("/auth", authRouter)
router.use("/education", alumniMiddleware, eduRouter)
router.use("/professionalData", alumniMiddleware, proffRouter)
router.use("/projects", alumniMiddleware, projectRouter)
router.use("/accouts", alumniMiddleware, mediaRouter)
