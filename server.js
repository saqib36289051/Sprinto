import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";

dotenv.config();

const PORT = process.env.DEV_PORT;
await sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

// await sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
