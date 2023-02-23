const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/database");

const authRouter = require("./routes/authRoutes");

dotenv.config({ path: "backend/config/config.env" });

app.use("/api/messenger", authRouter);
const PORT = process.env.PORT || 5000;

connectDb();

app.get("/", (req, res) => {
  res.send("This is from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
