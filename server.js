import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";

dotenv.config();

const PORT = process.env.DEV_PORT;

// sequelize.sync({ force: true })  // This will drop and re-create the table
//   .then(() => {
//     console.log('Database & tables created!');
//   });

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));
  
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
