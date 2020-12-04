const mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: String, required: true },
  dokanName: { type: String, required: false },
  location: { type: String, required: false },
  image: { type: String, required: false },
  type: { type: String, required: false },
  addedAt: { type: Date, required: true, default: Date.now },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("product", productSchema);
