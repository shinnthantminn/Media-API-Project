const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  post: { type: Schema.Types.ObjectId, required: true, ref: "post" },
  comment: { type: String, required: true },
  created: { type: Date, Default: Date.now() },
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
