const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  created: { type: Date, default: Date.now() },
});

const category = mongoose.model("category", categorySchema);

module.exports = category;
