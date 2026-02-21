import bcrypt from "bcryptjs";
import * as userModel from "../models/userModel.js";

export const getUsers = async (_req, res) => {
    const users = await userModel.findAll();
    res.json(users);
};

export const getUser = async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GBC_DOMAIN  = "@georgebrown.ca";

export const createUser = async (req, res) => {
    const { email, password, first_name, last_name, role = "user" } = req.body;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: "email, password, first_name, and last_name are required" });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(409).json({ error: "Email already in use" });

    const is_verified_member = email.toLowerCase().endsWith(GBC_DOMAIN);
    const password_hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password_hash, first_name, last_name, role, is_verified_member });
    res.status(201).json(user);
};

export const updateUser = async (req, res) => {
    const existing = await userModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "User not found" });

    const { first_name, last_name, is_verified_member } = req.body;
    const updated = await userModel.update(req.params.id, {
        first_name:        first_name        ?? existing.first_name,
        last_name:         last_name         ?? existing.last_name,
        is_verified_member: is_verified_member ?? existing.is_verified_member,
    });
    res.json(updated);
};
