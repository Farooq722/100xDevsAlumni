import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dbConnectionCheck = async () => {
  try {
    await prisma.$connect();
    console.log(`Database connected successfully! 🔥`);
  } catch (error) {
    console.error(`Database connection failed ❌ ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

dbConnectionCheck();

export default prisma;
