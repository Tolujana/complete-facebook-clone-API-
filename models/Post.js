const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: { type: String, max: 500 },
    img: { type: String },
    files: { type: Array, default: [] },
    cssName: { type: String },
    likes: { type: Array, default: [] },
    comment: { type: Array, default: [] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
