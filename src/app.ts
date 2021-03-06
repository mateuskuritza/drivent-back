import "@/setup";

import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "@/database";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import router from "@/routers";

import path from "path";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  res.send("OK!");
});

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));

app.use(router);
app.use(errorHandlingMiddleware);

export async function init() {
  await connectDatabase();
}

export default app;
