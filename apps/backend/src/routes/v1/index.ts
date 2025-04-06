import { Router } from "express";
import prisma from "@repo/db/client";
import { signinSchema, signupSchema } from "../../validation";
import { compare, hash } from "../../script";
import jwt from "jsonwebtoken";
import { eduRouter } from "./educationRoute";
import { alumniMiddleware } from "../../middleware/alumniMiddleware";
import { proffRouter } from "./professionalDataRoute";

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
                role: parseData.data.type === "alumni" ? "Alumni" : "User"
            }
        })
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
    }
})

router.use("/education", alumniMiddleware, eduRouter)
router.use("/professionalData", alumniMiddleware, proffRouter)