import jwt from "jsonwebtoken";
import prisma from "@repo/db/client";
import dotnev from "dotenv"
dotnev.config();
import { Router } from "express";
import { bioSchema, signinSchema, signupSchema } from "../../validation";
import { compare, hash } from "../../script";
import { eduRouter } from "./educationRoute";
import { alumniMiddleware } from "../../middleware/alumniMiddleware";
import { proffRouter } from "./professionalDataRoute";
import { projectRouter } from "./projectsRoute";
import { mediaRouter } from "./mediaRoute";
import { singleUpload } from "../../utils/multer";
import { imagekit } from "../../utils/imageKit";
import { sendEmail } from "../../utils/resend";
import { verifyToken } from "../../utils/hashToken";
import { emailTemplate } from "../../utils/emailTemplate";


export const router = Router();

router.post("/signup", async (req, res) => {
    const parseData = signupSchema.safeParse(req.body);
    if(!parseData.success) {
        res.status(403).json({msg: "Validation failed"});
        return
    }

    const hashPassword = await hash(parseData.data.password);
    try {
        const newUser = await prisma.user.create({
            data: {
                name: parseData.data.name,
                username: parseData.data.username,
                password: hashPassword,
                role: parseData.data.type === "alumni" ? "Alumni" : "User",
                verifyToken: verifyToken
            }
        })

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;
        
        const data = await sendEmail({
            sendTo: newUser.username,
            subject: "Verify your email",
           html: emailTemplate(newUser.name, verificationLink),
        });

        res.json({userId: newUser.id});
    } catch (e) {
        res.status(400).json({msg: "User already exits"})
    }

})

router.post("/signin", async (req, res) => {
    const parseData = signinSchema.safeParse(req.body);
    if(!parseData.success) {
        res.status(403).json({msg: "Validation failed"})
        return 
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: parseData.data.username
            }
        })
        if(!user) {
            res.status(403).json({msg: "User not found"})
            return
        }

        const isPasswordValid = await compare(parseData.data.password, user?.password);
        if(!isPasswordValid) {
            res.status(403).json({msg: "Invalid password"})
            return
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, process.env.JWT_SECRET!); // " ! " is to tell the ts compailer that it wont have null or undifined means definatly will give value

        res.json({
            token: token
        })
    } catch (e) {
        res.status(400).json({msg: "Internal server error"})
        return
    }
})

router.post("/verify-email", async (req, res) => {
    
    const { token } = req.query;

    try {
        const userToken = await prisma.user.findFirst({
            where: {
                verifyToken: token as string
            }
        })
    
        if(!userToken) {
            res.status(403).json({msg: "token Invalid"})
            return
        }
    
        await prisma.user.update({
            where: {
                verifyToken: userToken.verifyToken!
            },
            data: {
                verifyEmail: true,
                verifyToken: null
            }
        })
        res.json({msg: "Email verified"})
    } catch (error) {
        res.status(400).json({msg: "Internal server error"})
        return
    }
})

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

router.use("/education", alumniMiddleware, eduRouter)
router.use("/professionalData", alumniMiddleware, proffRouter)
router.use("/projects", alumniMiddleware, projectRouter)
router.use("/accouts", alumniMiddleware, mediaRouter)
