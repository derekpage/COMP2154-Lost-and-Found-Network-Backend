const jwt = require("jsonwebtoken");

export const adminAuth = async (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ error: "Unauthorized. No token provided" });

    jwt.verify(authHeader, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token. Access Denied.' });
        }

        if (decoded.role.length && decoded.role !== "admin") {
            return res.status(403).json({ error: "Invalid role. Access Denied." });
        }

        req.user = decoded;

        next()
    });
}