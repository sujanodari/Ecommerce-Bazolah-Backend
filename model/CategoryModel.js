const mongoose = require("mongoose");
var categorySchema = mongoose.Schema({
  category: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

module.exports = mongoose.model("category", categorySchema);
