import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './reportsComment.css';

function ReportsComment() {
  const [reportedComments, setReportedComments] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchReportedComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments/admin/reported', {
        withCredentials: true // This enables sending cookies with the request
      });
      setReportedComments(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching reported comments:', error);
      setError(error.response?.data?.message || 'Failed to load reported comments. Please try again later.');
    }
  };

  useEffect(() => {
    fetchReportedComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/admin/delete/${commentId}`, {
        withCredentials: true // This enables sending cookies with the request
      });
      setSuccessMessage('Comment deleted successfully');
      fetchReportedComments();
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError(error.response?.data?.message || 'Failed to delete comment. Please try again.');
      
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>
          <span className="report-icon">⚠️</span>
          Reported Comments
        </h1>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="alert success">
          {successMessage}
        </div>
      )}

      <div className="comments-grid">
        {reportedComments.length > 0 ? (
          reportedComments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-content">
                <div>
                  <p>{comment.content}</p>
                  <small className="article-reference">
                    From article: {comment.article?.title || 'Unknown Article'}
                  </small>
                </div>
                <button 
                  onClick={() => handleDeleteComment(comment._id)}
                  className="delete-button"
                  title="Delete comment"
                >
                  🗑️
                </button>
              </div>
              
              <div className="comment-info">
                <span className="author-info">
                  By: {comment.createdBy?.username || 'Unknown User'}
                </span>
                <span className="report-count">
                  Reports: {comment.reports.length}
                </span>
                <span className="comment-date">
                  Posted: {comment.createdAt && formatDate(comment.createdAt)}
                </span>
              </div>

              <div className="report-reasons">
                <h4>Report Reasons:</h4>
                {comment.reports.map((report, index) => (
                  <div key={index} className="reason">
                    <p>
                      • {report.reason}
                      <span className="reporter-info">
                        - Reported by {report.userId?.username || 'Unknown User'} 
                        ({formatDate(report.reportedAt)})
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">
            <p>No reported comments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsComment;
