import { Router } from "express";
import { getUser, createUser, updateUser, getUsers } from "../controllers/userController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/api/admin", adminAuth, (req, res) => {
    res.status(200).json({ message: "Welcome to the admin screen" });
});

export default router;
