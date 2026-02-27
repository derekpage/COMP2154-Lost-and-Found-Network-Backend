import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "./tokenBlacklist.js";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Missing token" });

    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ error: "Token has been logged out" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // store payload for next handlers
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}