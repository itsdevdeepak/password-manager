import { Router } from "express";
import { body, oneOf } from "express-validator";
import {
  createPassword,
  deletePassword,
  getAllPassword,
  getPassword,
  updatePassword,
} from "../controllers/password";
import { protect } from "../modules/auth";
import { validationErrorHandler } from "../modules/middlewares";

const router = Router();

router.use(protect);

router.get("/passwords", getAllPassword);
router.post(
  "/password",
  body("name").isString(),
  oneOf(
    [body("email").isEmail(), body("username").isString()],
    "password should contain either email or username"
  ),
  body("password").isString(),
  body("website").isString(),
  validationErrorHandler,
  createPassword
);
router.put(
  "/password:id",
  body("name").optional(),
  body("email").optional(),
  body("username").optional(),
  body("password").optional(),
  body("website").optional(),
  validationErrorHandler,
  updatePassword
);
router.get("/password:id", getPassword);
router.delete("/password:id", deletePassword);

export default router;
