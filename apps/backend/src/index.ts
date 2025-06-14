import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routes/v1";
import { adminRouter } from "./routes/admin";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  //deployed frontend linke here,
  "https://100x-devs-alumni-frontend.vercel.app",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

app.use(cors(corsOptions));
const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.use("/api/v1", router);
app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`Port is listening on ${port}`);
});
