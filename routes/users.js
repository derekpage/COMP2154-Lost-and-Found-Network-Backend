import { Router } from "express";
import { getUser, createUser, updateUser, getUsers, login, logout } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

/* PUBLIC */
router.post("/auth/login", login);
// router.post("/", createUser); // (register) keep public ONLY if your project wants it

/* PROTECTED */
router.post("/auth/logout", authenticateToken, logout);
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUser);
router.put("/:id", authenticateToken, updateUser);
router.post("/", authenticateToken, createUser); // use this ONLY if register must be protected
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
