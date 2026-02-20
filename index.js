import express from "express";
import mysql from "mysql";

const app = express();

app.get("/", (req, res) => {
    res.json("Hello Team!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});