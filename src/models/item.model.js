const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    detail: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
