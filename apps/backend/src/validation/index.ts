import z from "zod";

export const signupSchema = z.object({
  name: z.string(),
  username: z.string().email(),
  password: z.string().min(6),
  type: z.enum(["user", "alumni"]),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export const bioSchema = z.object({
  bio: z.string().optional(),
});

export const educationSchema = z.object({
  college: z.string(),
  department: z.string(),
  passingYear: z.number().int().min(1900).max(new Date().getFullYear()),
  degree: z.string(),
});

export const professionalDataSchema = z.object({
  currentCompany: z.string(),
  jobTitle: z.string(),
  location: z.string(),
  yearsOfExperience: z.number(),
});

export const projectSchema = z.object({
  title: z.string(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  description: z.string(),
});

export const socialMediaSchema = z.object({
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  github: z.string().url().optional(),
  instagram: z.string().url().optional(),
  youtube: z.string().url().optional(),
  portfolio: z.string().url().optional(),
});

export const forgetPassSchema = z.object({
  username: z.string().email(),
});

export const updatePassSchema = z.object({
  otp: z.number().min(6),
  password: z.string().min(6),
});

export const skillSchema = z.object({
  skills: z.array(z.string().min(1)),
});

declare global {
  namespace Express {
    export interface Request {
      role?: "Admin" | "User";
      userId?: string;
    }
  }
}
