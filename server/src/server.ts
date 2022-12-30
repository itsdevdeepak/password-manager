import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user";
import passwordRouter from "./routes/password";
import { errorHandler } from "./modules/middlewares";
import { NotFoundError } from "./errors/NotFoundError";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send({ message: "hello world!" });
});

app.use("/", userRouter);
app.use("/api", passwordRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
