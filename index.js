import express from "express";
import { db_connect } from "./db_connect.js";
import userRoutes from "./user/user.route.js";
import orgRoutes from "./org/org.route.js";

const app = express();
app.use(express.json());

//? Database conection

db_connect();

//? User Routes
app.use(userRoutes);

//? org routes

app.use(orgRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
