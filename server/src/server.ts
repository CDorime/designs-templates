import express from "express";

import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.use(cors());

const initDatabaseConnection = async () => {
  try {
    return await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
    });
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
};

const connection = await initDatabaseConnection();

app.post("/client-registration", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [results] = await connection.execute(
      "SELECT client_email, client_phone FROM clients WHERE client_email = ? OR client_phone = ?",
      [email, phone]
    );
    if (Array.isArray(results) && results.length > 0) {
      res.status(400).json({ error: "Email or phone already exists" });
      return;
    }
    await connection.execute(
      "INSERT INTO clients (client_name, client_email, client_password, client_phone, client_address) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, address]
    );
    res.status(200).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ error: "Error creating account" });
  }
});

app.get("/", (req, res) => {
  res.send("Server backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
