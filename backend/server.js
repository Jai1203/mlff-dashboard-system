const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/mlff-national/auth",
  authRoutes
);

app.use(
  "/api/mlff-national",
  statsRoutes
);

app.get("/", (req, res) => {
  res.send("MLFF Dashboard Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});