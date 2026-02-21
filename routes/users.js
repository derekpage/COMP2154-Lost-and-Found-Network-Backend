import { Router } from "express";
import { getUser, createUser, updateUser, getUsers } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
