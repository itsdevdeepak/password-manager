import { Router } from "express";
import { body } from "express-validator";
import { createUser, signIn } from "../controllers/user";
import { errorHandler, validationErrorHandler } from "../modules/middlewares";

const router = Router();

router.post(
  "/signup",
  body("name").isString(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  validationErrorHandler,
  createUser
);

router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isString(),
  validationErrorHandler,
  signIn
);

export default router;
