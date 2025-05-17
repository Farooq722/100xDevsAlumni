// import { useStore } from "@repo/zustand";
import { Navbar } from "../body/Navbar/Navbar";
import AlumniCard from "./card/AlumniCard";
import { motion } from "motion/react";

export default function Dashboard() {
  // const { loader, user, token } = useStore();

  const users = [
    {
      name: "farooq",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq1",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq2",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq3",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq1",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq2",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq3",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq1",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq2",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq3",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq1",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq2",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
    {
      name: "farooq3",
      bio: "aklsjhgsghsa",
      company: "google",
      role: "alumni",
    },
  ];

  return (
    <div className="bg-slate-200 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:gap-8 xl:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.2, y: 40 }}
              transition={{ duration: 1.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AlumniCard user={user} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
