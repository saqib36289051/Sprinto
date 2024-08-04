import dotenv from "dotenv";
import app from "./app.js"; // Use the correct path and file extension

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
