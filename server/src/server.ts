import express, { Application, Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("Ошибка при подключении к MySQL:", err);
    return;
  }
  console.log("Подключение к серверу MySQL успешно установлено");
});

app.post("/clients", (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  connection.query(
    "SELECT client_email, client_phone FROM clients WHERE client_email = ? OR client_phone = ?",
    [email, phone],
    (err, results: any[]) => {
      if (err) {
        console.error("Error checking account:", err);
        return res.status(500).json({ error: "Error checking account" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email or phone already exists" });
      }

      connection.query(
        "INSERT INTO clients (client_name, client_email, client_password, client_phone, client_address) VALUES (?, ?, ?, ?, ?);",
        [name, email, password, phone, address],
        (err) => {
          if (err) {
            console.error("Error creating account:", err);
            return res.status(500).json({ error: "Error creating account" });
          }
          console.log("Account created successfully");
          res.status(200).json({ message: "Account created successfully" });
        }
      );
    }
  );
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
