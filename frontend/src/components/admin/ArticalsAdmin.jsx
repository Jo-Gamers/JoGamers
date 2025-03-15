import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ArticalsAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch Articles from Backend
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles");
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Open Modal to View Full Article
  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  // Approve Article using the new API
  const approveArticle = async (articleId) => {
    Swal.fire({
      title: "Approve this article?",
      text: "This will make it publicly visible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:5000/api/articles/${articleId}/approve`);
          Swal.fire("Approved!", "The article has been approved.", "success");
          fetchArticles(); // Refresh list
        } catch (error) {
          Swal.fire("Error", "Failed to approve the article", "error");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Articles Management</h1>

      {/* Grid Layout for Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article._id} className="bg-white shadow-lg p-4 rounded-lg">
            {/* Article Image */}
            {article.images && article.images.length > 0 ? (
              <img
                src={article.images[0]} // Display the first image
                alt="Article"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg">
                No Image
              </div>
            )}

            {/* Article Title */}
            <h2 className="text-xl font-semibold">{article.title}</h2>

            {/* Published By */}
            <p className="text-gray-600">By: {article.publishedBy?.name || "Unknown"}</p>

            {/* Approval Status */}
            <p className={`text-sm mt-1 ${article.approved ? "text-green-600" : "text-red-600"}`}>
              {article.approved ? "Approved" : "Pending Approval"}
            </p>

            {/* View & Approve Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openArticleModal(article)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                View
              </button>

              {!article.approved && (
                <button
                  onClick={() => approveArticle(article._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Article Modal */}
      {modalOpen && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            {/* Article Title */}
            <h2 className="text-xl font-bold">{selectedArticle.title}</h2>
            <p className="text-gray-600 mt-2">By: {selectedArticle.publishedBy?.name || "Unknown"}</p>

            {/* Article Image(s) */}
            {selectedArticle.images && selectedArticle.images.length > 0 ? (
              <img
                src={selectedArticle.images[0]} // Display first image in modal
                alt="Article"
                className="w-full h-56 object-cover rounded-lg my-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg my-4">
                No Image Available
              </div>
            )}

            {/* Article Content */}
            <p className="mt-4">{selectedArticle.content}</p>

            {/* Close Modal Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticalsAdmin;
