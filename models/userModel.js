import pool from "../db.js";

const SAFE_COLUMNS = "id, email, first_name, last_name, role, is_verified_member, created_at";

const mapUser = (row) => row ? { ...row, is_verified_member: !!row.is_verified_member } : null;

export const findAll = async () => {
    const [rows] = await pool.query(
        `SELECT ${SAFE_COLUMNS} FROM users ORDER BY created_at DESC`
    );
    return rows.map(mapUser);
};

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT ${SAFE_COLUMNS} FROM users WHERE id = ?`,
        [id]
    );
    return mapUser(rows[0] ?? null);
};

export const findByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0] ?? null;
};

export const create = async ({ email, password_hash, first_name, last_name, role = "user", is_verified_member = false }) => {
    const [result] = await pool.query(
        "INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified_member) VALUES (?, ?, ?, ?, ?, ?)",
        [email, password_hash, first_name, last_name, role, is_verified_member]
    );
    return findById(result.insertId);
};

export const update = async (id, { first_name, last_name, is_verified_member }) => {
    await pool.query(
        "UPDATE users SET first_name = ?, last_name = ?, is_verified_member = ? WHERE id = ?",
        [first_name, last_name, is_verified_member, id]
    );
    return findById(id);
};
