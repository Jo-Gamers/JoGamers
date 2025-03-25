const Article = require("../Models/Article");
const Comment = require("../Models/Comment");
const News = require("../Models/news");

const addComment = async (req, res) => {
  const { articleId, content } = req.body;
  const userId = req.userId;
  try {
    const article = await News.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article.comments) {
      article.comments = [];
    }

    const newComment = new Comment({
      content,
      createdBy: userId,
      article: articleId,
    });

    await newComment.save();
    article.comments.push(newComment._id);
    await article.save();
    console.log(req.body);
    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error occurred while adding comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const user = req.user; // Assuming user object is attached by auth middleware

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Allow deletion if user is admin or the comment creator
    if (user.role !== 'admin' && comment.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "You don't have permission to delete this comment" });
    }

    // Perform soft delete
    comment.isDeleted = true;
    await comment.save();

    // If it's a reported comment and admin is deleting it, remove it from reported comments
    if (comment.reports.length > 0 && user.role === 'admin') {
      comment.reports = [];
      await comment.save();
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ 
      message: "Error occurred while deleting comment", 
      error: error.message 
    });
  }
};

const getComments = async (req, res) => {
    const { articleId } = req.params;
    console.log('Article ID being queried: ', articleId);

    try {
        const article = await News.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        const comments = await Comment.find({ article: articleId, isDeleted: false })
            .populate("createdBy", "username") 
            .exec();

        return res.status(200).json({ comments });
    } catch (error) {
        console.error('Error in getComments:', error);
        return res.status(500).json({ message: "Error occurred while fetching comments", error: error.message });
    }
};

const reportComment = async (req, res) => {
  const { commentId } = req.params;
  const { reason } = req.body;

  if (!req.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to report a comment" });
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  console.log("User ID:", req.userId);
  console.log("Comment ID:", commentId);
  console.log("Comment Reports:", comment.reports);

  const hasReported = comment.reports.some(
    (report) => report.userId.toString() === req.userId
  );
  if (hasReported) {
    return res
      .status(400)
      .json({ message: "You have already reported this comment" });
  }

  comment.reports.push({ userId: req.userId, reason });

  try {
    await comment.save();
    return res.status(200).json({ message: "Comment reported successfully" });
  } catch (error) {
    console.error("Error saving comment:", error);
    return res
      .status(500)
      .json({ message: "Error occurred while reporting comment", error });
  }
};

const getReportedComments = async (req, res) => {
  try {
    // Get reported comments with populated fields
    const reportedComments = await Comment.find({
      'reports.0': { $exists: true } // Find comments that have at least one report
    })
    .populate('createdBy', 'username') // Get the username of comment creator
    .populate('article', 'title') // Get the article title
    .populate('reports.userId', 'username') // Get the username of reporters
    .sort({ 'reports.length': -1 }) // Sort by number of reports (most reported first)
    .lean(); // Convert to plain JavaScript objects for better performance

    // Format the response data
    const formattedComments = reportedComments.map(comment => ({
      _id: comment._id,
      content: comment.content,
      createdBy: comment.createdBy,
      article: comment.article,
      createdAt: comment.createdAt,
      reports: comment.reports.map(report => ({
        userId: report.userId,
        reason: report.reason,
        reportedAt: report._id.getTimestamp() // Get timestamp from ObjectId
      }))
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error('Error fetching reported comments:', error);
    res.status(500).json({ message: "Error fetching reported comments", error: error.message });
  }
};

module.exports = { addComment, deleteComment,  getComments,  reportComment, getReportedComments };
