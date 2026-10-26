import cors from "cors";
import express from "express";

import blogsRouter from "./routes/blogs.js";
import messagesRouter from "./routes/messages.js";
import path from "path";
import songsRouter from "./routes/songs.js";
import type { Request, Response } from "express";
import { fileURLToPath } from "url";
import { requestLogger } from "./middlewares/requestLogger.js";
import { unknownEndpoint } from "./middlewares/unknownEndpoint.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/songs", songsRouter);

app.use("/api/*splat", unknownEndpoint);

app.get("/*splat", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export default app;
