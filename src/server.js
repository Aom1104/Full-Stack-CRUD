const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/item.route");
const { errorHandler } = require("./middlewares/error.handler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve frontend (index.html, app.js) from /public

// API routes
app.use("/api/items", itemRoutes);

// health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handler (after routes)
app.use(errorHandler);

// Connect DB & start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
