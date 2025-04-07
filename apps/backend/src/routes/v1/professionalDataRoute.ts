import { Router } from "express";
import prisma from "@repo/db/client";
import { professionalDataSchema } from "../../validation";

export const proffRouter = Router();

proffRouter.post("/", async (req, res) => {
    const parseData = professionalDataSchema.safeParse(req.body);
    if(!parseData.success) {
        res.status(403).json({msg: "Validation failed"})
        return
    }

    try {
        await prisma.professionalData.upsert({
            where: {
                userId: req.userId
            },
            update: {
                currentCompany: parseData.data.currentCompany,
                jobTitle: parseData.data.jobTitle,
                location: parseData.data.location,
                yearsOfExperience: parseData.data.yearsOfExperience
            },
            create: {
                currentCompany: parseData.data.currentCompany,
                jobTitle: parseData.data.jobTitle,
                location: parseData.data.location,
                yearsOfExperience: parseData.data.yearsOfExperience,
                user: {
                    connect: { id: req.userId } 
                }
            },
        })

        res.json({msg: "Professional data feilds created/updated"})
    } catch (error) {
        res.status(400).json({msg: "Internal server error"})
        return
    }

})

proffRouter.get("/get-proff", async (req, res) => {

    try {
        const profRes = await prisma.professionalData.findFirst({
            where: {
                userId: req.userId
            }
        })
        res.json({
            profRes: profRes?.currentCompany,
            jobTitle: profRes?.jobTitle,
            location: profRes?.location,
            yearsOfExperience: profRes?.yearsOfExperience
        })
    } catch (error) {
        res.status(400).json({msg: "Internal server error"})
        return
    }
})

proffRouter.delete("/delete-proff", async (req, res) => {
    try {
        await prisma.professionalData.delete({
            where: {
                userId: req.userId
            }
        })

        res.json({msg: "Professional data deleted"})
    } catch (error) {
        res.status(400).json({msg: "Internal server error"})
        return
    }
})

/* rewrite delete route as same as profes delete for edu also and go on */