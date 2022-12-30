import { User } from "@prisma/client";
import { Router } from "express";
import { protect } from "../modules/auth";

const router = Router();

router.use(protect);

router.get("/passwords", () => {});
router.post("/password", () => {});
router.put("/password", () => {});
router.get("/password", () => {});
router.delete("/password", () => {});

export default router;
