const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  platform: {
    type: String,
    required: true,
    enum: ["PC", "PS4", "PS5", "Xbox", "Nintendo Switch", "other"], // Enum definition
  },
  category: {
    type: String,
    required: true,
    enum: ["FPS", "RPG", "Adventure", "Strategy", "Sports", "Hardware", "Indie", "Mobile", "Other"]
  },
  images: { type: [String], required: true },
  readTime: { type: String, required: true },
  featured: { type: Boolean, default: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    required: true,
  },
  content: { type: String, required: true },
  approve: { type: Boolean, default: false },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], // Bookmarks field added here
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
}, { timestamps: true });

// ADD - Like
newsSchema.methods.addLike = function (userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    return this.save();
  }
  throw new Error("User has already liked this article.");
};

// REMOVE - Like
newsSchema.methods.removeLike = function (userId) {
  this.likes = this.likes.filter(like => like.toString() !== userId.toString());
  return this.save();
};

// ADD - Bookmark
newsSchema.methods.addBookmark = function (userId) {
  if (!this.bookmarks.includes(userId)) {
    this.bookmarks.push(userId);
    return this.save();
  }
  throw new Error("User has already bookmarked this article.");
};

// REMOVE - Bookmark
newsSchema.methods.removeBookmark = function (userId) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.toString() !== userId.toString());
  return this.save();
};

module.exports = mongoose.model('News', newsSchema);
