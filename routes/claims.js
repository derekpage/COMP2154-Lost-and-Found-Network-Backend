import { Router } from "express";

import { authenticateToken } from "../middleware/auth.js";
import { createClaim, updateClaimStatus, getClaim, withdrawClaim, assignClaim } from "../controllers/claimsController.js";

const router = Router();

router.post("/", authenticateToken, createClaim);
router.put("/:id", authenticateToken, updateClaimStatus);
router.put("/:id/assign", authenticateToken, assignClaim);
router.get("/", authenticateToken, getClaim);
router.delete("/:id/withdraw", authenticateToken, withdrawClaim);


export default router;