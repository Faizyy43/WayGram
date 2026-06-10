import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Server as SocketIO } from "socket.io";
import SocketServer from "./socketServer.js";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import adminRouter from "./routes/adminRouter.js";
import notifyRouter from "./routes/notifyRouter.js";
import messageRouter from "./routes/messageRouter.js";

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.options("*", cors(corsOptions));

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", adminRouter);
app.use("/api", notifyRouter);
app.use("/api", messageRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const io = new SocketIO(server, { cors: corsOptions });
io.on("connection", SocketServer);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});