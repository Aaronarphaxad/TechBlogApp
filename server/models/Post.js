const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: "",
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  href: {
    type: String,
    unique: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.href = slugify(this.title, { lower: true });
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
