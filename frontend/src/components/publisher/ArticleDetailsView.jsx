import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaFileImage } from "react-icons/fa";
import { Clock, CheckCircle, Eye } from "lucide-react";
import Cookies from "js-cookie";

const ArticleDetailsView = () => {
  const { id } = useParams(); // Get the news ID from URL
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State for the news item and editing fields
  const [newsItem, setNewsItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedExcerpt, setUpdatedExcerpt] = useState("");
  const [updatedPlatform, setUpdatedPlatform] = useState("PC");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedReadTime, setUpdatedReadTime] = useState("");
  const [updatedFeatured, setUpdatedFeatured] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Fetch the news item when the component mounts or the id changes
  useEffect(() => {
    const fetchNewsItem = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/news/dash/${id}`, {
          withCredentials: true,
        });
        setNewsItem(response.data.news);
      } catch (error) {
        console.error("Error fetching news item:", error);
        navigate("/404");
      }
    };
    fetchNewsItem();
  }, [id, navigate]);

  // Initialize the editing fields once newsItem is loaded
  useEffect(() => {
    if (newsItem) {
      setUpdatedTitle(newsItem.title || "");
      setUpdatedExcerpt(newsItem.excerpt || "");
      setUpdatedPlatform(newsItem.platform || "PC");
      setUpdatedCategory(newsItem.category || "");
      setUpdatedReadTime(newsItem.readTime || "");
      setUpdatedFeatured(newsItem.featured || false);
      setUpdatedContent(newsItem.content || "");
    }
  }, [newsItem]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // Remove a preview image
  const removeImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async () => {
    if (!newsItem?._id) {
      console.error("News ID is missing or invalid.");
      return;
    }

    const updatedNews = {
      title: updatedTitle,
      excerpt: updatedExcerpt,
      platform: updatedPlatform,
      category: updatedCategory,
      readTime: updatedReadTime,
      featured: updatedFeatured,
      content: updatedContent,
    };

    const formData = new FormData();
    formData.append("title", updatedNews.title);
    formData.append("excerpt", updatedNews.excerpt);
    formData.append("platform", updatedNews.platform);
    formData.append("category", updatedNews.category);
    formData.append("readTime", updatedNews.readTime);
    formData.append("featured", updatedNews.featured);
    formData.append("content", updatedNews.content);

    if (fileInputRef.current?.files) {
      Array.from(fileInputRef.current.files).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      await axios.put(`http://localhost:5000/api/news/dash/${newsItem._id}`, formData, {
        withCredentials: true,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  const getStatusBadge = (approved) => {
    return approved ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
        Approved
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <span className="w-2 h-2 mr-1 rounded-full bg-yellow-500"></span>
        Pending
      </span>
    );
  };

  // Render loading state
  if (!newsItem) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-10 bg-[#EFF5F5]">
      <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-[#497174]">{isEditing ? "Edit News" : newsItem.title}</h2>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-6 py-3 bg-[#EB6440] text-white hover:bg-[#D6E4E5] rounded-lg transition duration-200"
          >
            {isEditing ? "Cancel Edit" : "Edit"}
          </button>
        </div>

        <div className="mt-4">{getStatusBadge(newsItem.approve)}</div>

        {/* Content */}
        <div className="mt-8">
          {isEditing ? (
            <div className="space-y-6">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-4 border border-[#D6E4E5] rounded-lg shadow-sm focus:ring-2 focus:ring-[#497174]"
                placeholder="Title"
              />
              <textarea
                value={updatedExcerpt}
                onChange={(e) => setUpdatedExcerpt(e.target.value)}
                className="w-full p-4 border border-[#D6E4E5] rounded-lg shadow-sm focus:ring-2 focus:ring-[#497174]"
                rows="4"
                placeholder="Excerpt"
              />
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-4 border border-[#D6E4E5] rounded-lg shadow-sm focus:ring-2 focus:ring-[#497174]"
                rows="8"
                placeholder="Content"
              />
              <div className="grid grid-cols-2 gap-6">
                <select
                  value={updatedPlatform}
                  onChange={(e) => setUpdatedPlatform(e.target.value)}
                  className="w-full p-4 border border-[#D6E4E5] rounded-lg shadow-sm focus:ring-2 focus:ring-[#497174]"
                >
                  <option value="PC">PC</option>
                  <option value="PS4">PS4</option>
                  <option value="PS5">PS5</option>
                  <option value="Xbox">Xbox</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="other">Other</option>
                </select>
                <select
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  className="w-full p-4 border border-[#D6E4E5] rounded-lg shadow-sm focus:ring-2 focus:ring-[#497174]"
                >
                  <option value="FPS">FPS</option>
                  <option value="RPG">RPG</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Sports">Sports</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Indie">Indie</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[#497174] font-medium mb-2">Upload New Images</label>
                <div className="border-2 border-dashed border-[#D6E4E5] rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <FaFileImage className="h-12 w-12 text-[#497174]" />
                      <p className="mt-2 text-sm font-medium text-[#EB6440]">Click to upload images</p>
                    </div>
                  </label>
                </div>
                {previewImages.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-6">
                    {previewImages.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-36 object-cover rounded-lg shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 bg-[#EB6440] text-white rounded-full p-2"
                        >
                          <FaTrashAlt className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {newsItem.images && newsItem.images.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-6">
                  {newsItem.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img} // Directly use the image URL
                        alt={`Image ${idx + 1}`}
                        className="w-full h-36 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <p>{newsItem.content}</p>
              </div>
              <div className="mt-4">
                <p>
                  <strong>Excerpt:</strong> {newsItem.excerpt}
                </p>
                <p>
                  <strong>Category:</strong> {newsItem.category}
                </p>
                <p>
                  <strong>Platform:</strong> {newsItem.platform}
                </p>
                <p>
                  <strong>Read Time:</strong> {newsItem.readTime} minutes
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end space-x-4">
          {isEditing && (
            <button
              onClick={handleUpdate}
              disabled={!isEditing}
              className="px-6 py-3 bg-[#497174] text-white rounded-lg disabled:bg-[#D6E4E5] transition duration-200"
            >
              Save Changes
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#FFFFFF] text-[#497174] border border-[#D6E4E5] rounded-lg transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsView;
