const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const connectDB = require("./config/db");

require("./config/passport");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Database
connectDB();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use(passport.initialize());

// Home Route
app.get("/", (req, res) => {

  res.json({

    message:
      "Welcome to the Prodly Backend API!"

  });

});

// Routes

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

// Error Middleware
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({

    message:
      "Internal Server Error"

  });

});

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});