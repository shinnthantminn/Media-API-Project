const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  category: { type: Schema.Types.ObjectId, required: true, ref: "category" },
  tag: { type: Schema.Types.ObjectId, required: true, ref: "tag" },
  like: { type: Number, default: 0 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  created: { type: Date, default: Date.now() },
});

const post = mongoose.model("post", postSchema);

module.exports = post;
