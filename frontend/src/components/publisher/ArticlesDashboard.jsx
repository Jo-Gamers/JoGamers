import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleDetailsView from "./ArticleDetailsView";

function ArticlesDashboard() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/articles");
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchArticles();
    }, []);
    
    

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-[#497174] pb-2">My Articles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <div key={article._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="h-48 bg-gray-200 relative">
                            <img
                                src={article.images[0]}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${article.approved
                                        ? "bg-green-100 text-green-800 border border-green-300"
                                        : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                    }`}
                                >
                                    {article.approved ? "Approved" : "Pending"}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-xl text-gray-800 mb-3 hover:text-green-600 transition-colors">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {article.content.substring(0, 100)}...
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {article.categories.map((category, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    {new Date(article.updatedAt).toLocaleDateString()}
                                </span>
                                <button
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                    onClick={() => {
                                        setSelectedArticle(article);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Article Details Modal */}
            <ArticleDetailsView
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                article={selectedArticle}
            />
        </div>
    );
}

export default ArticlesDashboard;