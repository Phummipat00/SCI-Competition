import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const PORT = process.env.PORT || 5000;
import authRouter from "./routers/auth.router.js";
import db from "./models/index.js";
const FRONTEND_URL = process.env.FRONTEND_URL;
import ActivityRouter from "./routers/activity.router.js";
const NODE_ENV = process.env.NODE_ENV;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully!");
    // if (NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("database synced in development mode");
    // }
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};
initDatabase();

const Role = db.Role;
// Function to initialize roles
// const initRole = async () => {
//   try {
//     await Role.findOrCreate({
//       where: { id: 1 },
//       defaults: { roleName: "admin" },
//     });
//     await Role.findOrCreate({
//       where: { id: 2 },
//       defaults: { roleName: "manager" },
//     });
//     await Role.findOrCreate({
//       where: { id: 3 },
//       defaults: { roleName: "teacher" },
//     });
//     await Role.findOrCreate({
//       where: { id: 4 },
//       defaults: { roleName: "judge" },
//     });
//     console.log("Initial roles created");
//   } catch (err) {
//     console.error("Error initializing roles:", err);
//   }
// };
// initRole();

// Sync database
db.sequelize.sync({ force: false }).then(() => {
  console.log("create table user_roles");
});

// Homepage
app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

// Routers

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", ActivityRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
