import "dotenv/config";
import express from "express";
import pool from "./db.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello Team!");
});

app.use("/api/users", usersRouter);

pool.getConnection()
    .then((conn) => {
        console.log("Database connected successfully");
        conn.release();
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
