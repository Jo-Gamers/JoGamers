import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Clock, CheckCircle, Eye, Search, Filter, XCircle, ArrowUp } from "lucide-react";
import Cookies from 'js-cookie';  // Ensure js-cookie is imported
import * as jwt_decode from 'jwt-decode'; // Use named import with `*`

const ArticlesDashboard = () => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    // Check if the token exists in the cookies and decode it
    const token = Cookies.get('token');
    console.log("Token:", token); // Log token to check if it's retrieved correctly
    if (!token) {
      // Redirect to login if no token is found
      navigate('/login');
      return;
    }

    // Decode the token using the `default` export
    const decodedToken = jwt_decode.default(token); // Use `.default` to access the default export
    console.log("Decoded Token:", decodedToken); // Log decoded token to check its contents

    if (decodedToken.role !== 'publisher') {
      // Redirect if the user is not a publisher
      navigate('/login');
      return;
    }

    // Fetch news if the user is a publisher
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/news/dash");
        setNewsList(response.data.news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();

    // Scroll event to show/hide the scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  const filteredNews = newsList.filter((news) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "approved"
        ? news.approve
        : !news.approve;
    const matchesSearch =
      searchTerm === ""
        ? true
        : news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-24 bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Latest News</h1>
          <p className="text-center text-blue-100">Stay updated with the top gaming news</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search news by title, excerpt or category..." 
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "all" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "approved" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                Approved
              </button>
              <button 
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "pending" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-xl font-medium text-gray-900">No news found</p>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
            <button 
              onClick={() => { setFilter("all"); setSearchTerm(""); }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filteredNews.length} news item{filteredNews.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <Link key={news._id} to={`/news/${news._id}`} className="group">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col transform group-hover:-translate-y-1">
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={news.images[0]}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${news.approve ? "bg-green-100 text-green-800 border border-green-300" : "bg-yellow-100 text-yellow-800 border border-yellow-300"}`}>
                          {news.approve ? (
                            <>
                              <CheckCircle size={12} /> Approved
                            </>
                          ) : (
                            <>Pending</>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {news.excerpt.substring(0, 120)}...
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">
                          {news.platform}
                        </span>
                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-100">
                          {news.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(news.createdAt)}
                        </span>
                        <span className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                          <Eye size={16} />
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ArticlesDashboard;
