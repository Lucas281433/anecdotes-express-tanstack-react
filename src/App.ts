import express from "express";
import anecdotesRouter from "./controllers/anecdotes";
import cors from "cors";
import middleware from "./utils/middleware";

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(middleware.requestLogger);
app.use(express.json());
app.use("/api/anecdotes", anecdotesRouter);
app.use(middleware.unknownEndpoint);

export default app;