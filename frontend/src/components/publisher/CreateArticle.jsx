import React, { useState } from "react";
import { FaBold, FaItalic, FaFileImage, FaTrashAlt, FaRegPaperPlane } from "react-icons/fa";
import axios from "axios";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [category, setCategory] = useState("FPS");
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState("");
  const [featuredImages, setFeaturedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFeaturedImages([...featuredImages, ...files]);
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviewImages([...previewImages, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedImages = [...featuredImages];
    updatedImages.splice(index, 1);
    setFeaturedImages(updatedImages);
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const handleBold = () => {
    setContent(content + "<b></b>");
  };

  const handleItalic = () => {
    setContent(content + "<i></i>");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("platform", platform);
    formData.append("category", category);
    formData.append("readTime", readTime);
    formData.append("featured", featured);
    formData.append("content", content);
    featuredImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/news/dash/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Send the cookie for authentication
      });
      alert(response.data.message);
      setLoading(false);
      setTitle("");
      setExcerpt("");
      setPlatform("PC");
      setCategory("FPS");
      setReadTime("");
      setFeatured(false);
      setContent("");
      setFeaturedImages([]);
      setPreviewImages([]);
    } catch (error) {
      setLoading(false);
      alert("Error creating news.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-20">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-2 rounded-lg mr-4">
          <FaRegPaperPlane className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold">Create News</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="News title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Short excerpt"
            required
          />
        </div>
        {/* Platform and category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="PC">PC</option>
              <option value="PS4">PS4</option>
              <option value="PS5">PS5</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
        </div>
        {/* Other form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Read Time (minutes)</label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Read time"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured?</label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </div>
        {/* Content editor */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="6"
            placeholder="Content"
            required
          />
        </div>
        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input type="file" onChange={handleImageChange} multiple className="hidden" id="image-upload" />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <FaFileImage className="h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm font-medium text-green-600">Click to upload images</p>
              </div>
            </label>
          </div>
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {previewImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                    <FaTrashAlt className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Submit button */}
        <button type="submit" disabled={loading} className={`w-full py-3 mt-4 rounded-lg text-white font-semibold ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
          {loading ? "Creating..." : "Create News"}
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
