import { randomBytes } from "crypto";

export const adminSecretKey = randomBytes(32).toString("hex");
