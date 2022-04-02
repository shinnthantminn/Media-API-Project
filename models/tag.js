const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  created: { type: Date, default: Date.now() },
});

const tag = mongoose.model("tag", tagSchema);

module.exports = tag;
