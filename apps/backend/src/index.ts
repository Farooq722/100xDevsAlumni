import express  from "express";
import dotenv from "dotenv";

import { router } from "./routes/v1";

dotenv.config()

const app = express();
app.use(express.json())

const port = process.env.PORT || 3002

app.get("/", (req, res) => {
    res.send("Backend is working")
})

app.use("/api/v1", router);


app.listen(port, () => {
    console.log(`Port is listening on ${port}`);
})
