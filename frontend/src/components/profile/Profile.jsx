// import React, { useState, useEffect } from "react";
// import { User, Mail, Edit2, X, Camera, Gamepad2, Bell, Plus } from "lucide-react";
// import Swal from "sweetalert2";
// import axios from "axios"; // استيراد axios للتواصل مع الخادوم

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newUsername, setNewUsername] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPhone, setNewPhone] = useState("");
//   const [newGamerTag, setNewGamerTag] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [profileImageUrl, setProfileImageUrl] = useState("");

//   // جلب بيانات المستخدم من الخادوم باستخدام JWT من الكوكيز
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users/profile", {
//           withCredentials: true, // إرسال الكوكيز مع الطلب
//         });
//         const user = response.data;
//         setNewUsername(user.username);
//         setNewEmail(user.email);
//         setNewPhone(user.phoneNumber || ""); // إذا كان لديك حقل phoneNumber في النموذج
//         setNewGamerTag(user.gamerTag || ""); // إذا كان لديك حقل gamerTag في النموذج
//         setProfileImageUrl(user.profileImage || ""); // إذا كان لديك حقل profileImage في النموذج
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // تحويل الصورة إلى base64
//   const convertImageToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // حفظ التغييرات
//   const handleSaveChanges = async () => {
//     try {
//       let imageBase64 = profileImageUrl;
//       if (newProfileImage) {
//         imageBase64 = await convertImageToBase64(newProfileImage);
//         setProfileImageUrl(imageBase64);
//       }

//       const updatedUser = {
//         username: newUsername,
//         email: newEmail,
//         gamerTag: newGamerTag,
//         profileImage: imageBase64,
//       };
      
//       console.log("Updated User Data:", updatedUser);
//       // تحديث البيانات في الخادوم
//       const response = await axios.put("http://localhost:5000/api/users/profile", updatedUser, {
//         withCredentials: true,
//       });

//       Swal.fire({
//         title: "Profile Updated",
//         text: "Your profile has been updated successfully.",
//         icon: "success",
//       });
//       setIsEditing(false);
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to update profile.",
//         icon: "error",
//       });
//       console.error("Update Error:", error);
//     }
//   };

//   if (!newUsername) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#EFF5F5]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EB6440] border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-20 mx-auto px-4 bg-[#EFF5F5]">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="w-full bg-gradient-to-r from-[#497174] via-[#5a868a] to-[#D6E4E5] rounded-2xl shadow-xl mb-10 overflow-hidden">
//           <div className="relative">
//             <div className="absolute inset-0 bg-[#497174] opacity-10" 
//                  style={{
//                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//                  }} 
//             />
//             <div className="relative py-8 px-6 md:px-12">
//               <div className="flex flex-col md:flex-row items-center justify-between">
//                 {/* Profile Image Section */}
//                 <div className="relative mb-6 md:mb-0">
//                   <div className="relative w-32 h-32 group">
//                     <img
//                       src={profileImageUrl || "/api/placeholder/128/128"}
//                       alt="Gamer Profile"
//                       className="w-32 h-32 rounded-full border-4 border-white shadow-xl transform group-hover:scale-105 transition-all duration-300"
//                     />
//                     <div
//                       className="absolute -right-2 -bottom-2 bg-[#EB6440] p-2 rounded-full shadow-lg cursor-pointer hover:bg-[#d55835] transition-all duration-200"
//                       onClick={() => setIsEditing(true)}
//                     >
//                       <Camera className="text-white" size={20} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* User Info Section */}
//                 <div className="flex-grow px-8 text-center md:text-left">
//                   <h2 className="text-3xl font-bold text-white mb-2">
//                     {newUsername}
//                   </h2>
//                   <p className="text-white opacity-90 text-lg mb-2">{newEmail}</p>
//                   <p className="text-white bg-[#EB6440] inline-block px-3 py-1 rounded-full font-medium">
//                     <Gamepad2 className="inline mr-1" size={16} /> 
//                     {newGamerTag || "GamerTag"}
//                   </p>
//                 </div>

//                 {/* Edit Button Section */}
//                 <div className="mt-6 md:mt-0">
//                   <button
//                     className="bg-[#EB6440] text-white hover:bg-[#d55835] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center cursor-pointer"
//                     onClick={() => setIsEditing(true)}
//                   >
//                     <Edit2 className="mr-2" size={20} />
//                     Edit Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-fadeIn">
//             <div className="bg-[#497174] rounded-t-2xl p-6 relative">
//               <h5 className="text-white text-2xl font-bold text-center">Edit Gamer Profile</h5>
//               <button 
//                 onClick={() => setIsEditing(false)}
//                 className="absolute right-4 top-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="p-6 space-y-4">
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//                   value={newUsername}
//                   onChange={(e) => setNewUsername(e.target.value)}
//                   placeholder="Enter your username"
//                 />
//               </div>
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//                   value={newEmail}
//                   onChange={(e) => setNewEmail(e.target.value)}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Gamer Tag</label>
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//                   value={newGamerTag}
//                   onChange={(e) => setNewGamerTag(e.target.value)}
//                   placeholder="Enter your gamer tag"
//                 />
//               </div>
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
//                 <input
//                   type="file"
//                   className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//                   onChange={(e) => setNewProfileImage(e.target.files[0])}
//                 />
//               </div>
//             </div>

//             <div className="p-6 bg-[#EFF5F5] rounded-b-2xl flex justify-end space-x-4">
//               <button
//                 className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all duration-300 flex items-center cursor-pointer"
//                 onClick={() => setIsEditing(false)}
//               >
//                 <X className="mr-2" size={18} />
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 rounded-lg bg-[#EB6440] hover:bg-[#d55835] text-white font-medium transition-all duration-300 flex items-center cursor-pointer"
//                 onClick={handleSaveChanges}
//               >
//                 <Edit2 className="mr-2" size={18} />
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from "react";
// import { User, Mail, Edit2, X, Camera } from "lucide-react";
// import Swal from "sweetalert2";
// import axios from "axios";

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState(null);

//   // جلب بيانات المستخدم من الخادوم
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users/profile", {
//           withCredentials: true,
//         });
//         const user = response.data;
//         setUsername(user.username);
//         setEmail(user.email);
//         setProfileImage(user.profileImage || "");
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//         Swal.fire({
//           title: "Error",
//           text: "Failed to fetch user data.",
//           icon: "error",
//         });
//       }
//     };

//     fetchUserData();
//   }, []);

//   // تحويل الصورة إلى base64
//   const convertImageToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // حفظ التغييرات
//   const handleSaveChanges = async () => {
//     try {
//       let imageBase64 = profileImage;
//       if (newProfileImage) {
//         imageBase64 = await convertImageToBase64(newProfileImage);
//       }
  
//       const updatedUser = {
//         username,
//         email,
//         profileImage: imageBase64,
//       };
  
//       console.log("Updated User Data:", updatedUser); // تحقق من البيانات المرسلة
  
//       axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser, { withCredentials: true });

//       Swal.fire({
//         title: "Profile Updated",
//         text: "Your profile has been updated successfully.",
//         icon: "success",
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Update Error:", error.response?.data || error.message);
//       Swal.fire({
//         title: "Error",
//         text: error.response?.data?.message || "Failed to update profile.",
//         icon: "error",
//       });
//     }
//   };
//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       {/* Header Section */}
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           {/* Profile Image Section */}
//           <div className="relative mb-6 md:mb-0">
//             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
//               <img
//                 src={profileImage || "https://via.placeholder.com/128"}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <button
//               className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full shadow-md hover:bg-orange-600 transition-all"
//               onClick={() => setIsEditing(true)}
//             >
//               <Camera className="text-white" size={20} />
//             </button>
//           </div>

//           {/* User Info Section */}
//           <div className="flex-grow px-8 text-center md:text-left">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">{username}</h2>
//             <p className="text-gray-600 text-lg mb-2">{email}</p>
//           </div>

//           {/* Edit Button Section */}
//           <div className="mt-6 md:mt-0">
//             <button
//               className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all flex items-center"
//               onClick={() => setIsEditing(true)}
//             >
//               <Edit2 className="mr-2" size={20} />
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             <div className="bg-orange-500 rounded-t-lg p-6 relative">
//               <h5 className="text-white text-2xl font-bold text-center">Edit Profile</h5>
//               <button
//                 className="absolute right-4 top-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
//                 onClick={() => setIsEditing(false)}
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your username"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
//                 <input
//                   type="file"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   onChange={(e) => setNewProfileImage(e.target.files[0])}
//                 />
//               </div>
//             </div>

//             <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end space-x-4">
//               <button
//                 className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all"
//                 onClick={() => setIsEditing(false)}
//               >
//                 <X className="mr-2" size={18} />
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all"
//                 onClick={handleSaveChanges}
//               >
//                 <Edit2 className="mr-2" size={18} />
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;




// import React, { useState, useEffect } from "react";
// import { User, Mail, Edit2, X, Camera, Bookmark, MessageSquare, Clock, Gamepad } from "lucide-react";
// import Swal from "sweetalert2";
// import axios from "axios";

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [favoriteGame, setFavoriteGame] = useState("");
//   const [gamerTag, setGamerTag] = useState("");

//   // بيانات إضافية للمستخدم
//   const [savedArticles, setSavedArticles] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [readingHistory, setReadingHistory] = useState([]);

//   // Fetch user data from the server
// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users/profile", {
//         withCredentials: true,
//       });
//       const user = response.data;
//       setUserId(user._id);
//       setUsername(user.username);
//       setEmail(user.email);
//       setProfileImage(user.profileImage || "");
//       setFavoriteGame(user.favoriteGame || "");
//       setGamerTag(user.gamerTag || "");

//       // Fetch saved articles, comments, and reading history
//       fetchSavedArticles(user._id);
//       fetchComments(user._id);
//       fetchReadingHistory(user._id);
//     } catch (error) {
//       console.error("Failed to fetch user data:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch user data.",
//         icon: "error",
//         background: "#EFF5F5",
//         color: "#497174",
//       });
//     }
//   };

//   fetchUserData();
// }, []);

// // Fetch saved articles
// const fetchSavedArticles = async (userId) => {
//   try {
//     // This is just an example, it will be replaced with a real API call
//     // const response = await axios.get(`http://localhost:5000/api/users/${userId}/saved-articles`);
//     // setSavedArticles(response.data);

//     // Mock data
//     setSavedArticles([
//       { id: 1, title: "New leaks about GTA 6", image: "https://via.placeholder.com/150", date: "2025-03-10", category: "News" },
//       { id: 2, title: "Elden Ring 2 Review", image: "https://via.placeholder.com/150", date: "2025-03-05", category: "Reviews" },
//       { id: 3, title: "Complete Guide to The Elder Scrolls 6", image: "https://via.placeholder.com/150", date: "2025-02-28", category: "Guides" },
//     ]);
//   } catch (error) {
//     console.error("Failed to fetch saved articles:", error);
//   }
// };

// // Fetch comments
// const fetchComments = async (userId) => {
//   try {
//     // This is just an example, it will be replaced with a real API call
//     // const response = await axios.get(`http://localhost:5000/api/users/${userId}/comments`);
//     // setComments(response.data);

//     // Mock data
//     setComments([
//       { id: 1, articleTitle: "New leaks about GTA 6", text: "I hope these leaks are true!", date: "2025-03-12", likes: 15 },
//       { id: 2, articleTitle: "Elden Ring 2 Review", text: "The game is amazing, deserves a 10/10 rating", date: "2025-03-07", likes: 8 },
//       { id: 3, articleTitle: "Most Anticipated Games of 2026", text: "Where is the new God of War game?", date: "2025-03-01", likes: 4 },
//     ]);
//   } catch (error) {
//     console.error("Failed to fetch comments:", error);
//   }
// };

// // Fetch reading history
// const fetchReadingHistory = async (userId) => {
//   try {
//     // This is just an example, it will be replaced with a real API call
//     // const response = await axios.get(`http://localhost:5000/api/users/${userId}/reading-history`);
//     // setReadingHistory(response.data);

//     // Mock data
//     setReadingHistory([
//       { id: 1, title: "Official Announcement of PlayStation 6", date: "2025-03-15", category: "News" },
//       { id: 2, title: "Secrets You Haven't Discovered in Starfield", date: "2025-03-14", category: "Tips" },
//       { id: 3, title: "Top 10 Games of 2024", date: "2025-03-13", category: "Lists" },
//       { id: 4, title: "Exclusive Interview with Cyberpunk 2077: Phantom Liberty Developer", date: "2025-03-12", category: "Interviews" },
//     ]);
//   } catch (error) {
//     console.error("Failed to fetch reading history:", error);
//   }
// };

// // Convert image to base64
// const convertImageToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

// // Save changes
// const handleSaveChanges = async () => {
//   try {
//     if (!userId) {
//       console.error("Update Error: userId is not available");
//       Swal.fire({
//         title: "Error",
//         text: "User ID is not available. Please try again.",
//         icon: "error",
//         background: "#EFF5F5",
//         color: "#497174",
//       });
//       return;
//     }

//     let imageBase64 = profileImage;
//     if (newProfileImage) {
//       console.log("New Profile Image:", newProfileImage); // تحقق من الملف
//       imageBase64 = await convertImageToBase64(newProfileImage);
//     }
//     const updatedUser = {
//       username,
//       email,
//       profileImage: imageBase64,
//       favoriteGame,
//       gamerTag,
//     };

//     console.log("Updated User Data:", updatedUser);

//     await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser, { withCredentials: true });

//     Swal.fire({
//       title: "Updated Successfully",
//       text: "Profile updated successfully.",
//       icon: "success",
//       background: "#EFF5F5",
//       color: "#497174",
//     });

//     setIsEditing(false);
//   } catch (error) {
//     console.error("Update Error:", error.response?.data || error.message);
//     Swal.fire({
//       title: "Error",
//       text: error.response?.data?.message || "Failed to update profile.",
//       icon: "error",
//       background: "#EFF5F5",
//       color: "#497174",
//     });
//   }
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
// };

// return (
//   <div className="container mx-auto p-4 bg-[#EFF5F5] min-h-screen">
//     {/* Header Section */}
//     <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
//       <div className="flex flex-col md:flex-row items-center justify-between">
//         {/* Profile Image Section */}
//         <div className="relative mb-6 md:mb-0">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#497174] shadow-md">
//             <img
//               src={profileImage || "https://via.placeholder.com/128"}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <button
//             className="absolute bottom-0 right-0 bg-[#EB6440] p-2 rounded-full shadow-md hover:bg-[#d85a3a] transition-all"
//             onClick={() => setIsEditing(true)}
//           >
//             <Camera className="text-white" size={20} />
//           </button>
//         </div>

//         {/* User Info Section */}
//         <div className="flex-grow px-8 text-center md:text-left">
//           <h2 className="text-3xl font-bold text-[#497174] mb-2">{username}</h2>
//           <p className="text-gray-600 mb-2">{email}</p>
//           <div className="flex flex-wrap gap-4 mt-4">
//             <div className="flex items-center">
//               <Gamepad className="mr-2 text-[#EB6440]" size={20} />
//               <span className="text-gray-700">
//                 Favorite Game: <span className="text-[#497174] font-semibold">{favoriteGame || "Not specified"}</span>
//               </span>
//             </div>
//             <div className="flex items-center">
//               <User className="mr-2 text-[#EB6440]" size={20} />
//               <span className="text-gray-700">
//                 Gamer Tag: <span className="text-[#497174] font-semibold">{gamerTag || "Not specified"}</span>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Edit Button Section */}
//         <div className="mt-6 md:mt-0">
//           <button
//             className="bg-[#EB6440] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#d85a3a] transition-all flex items-center"
//             onClick={() => setIsEditing(true)}
//           >
//             <Edit2 className="mr-2" size={20} />
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>

//     {/* Tabs Section */}
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="flex border-b border-[#D6E4E5]">
//           <button
//             className={`flex items-center px-6 py-4 font-medium ${
//               activeTab === "profile" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
//             } transition-all`}
//             onClick={() => setActiveTab("profile")}
//           >
//             <User className="mr-2" size={18} />
//             Profile
//           </button>
//           <button
//             className={`flex items-center px-6 py-4 font-medium ${
//               activeTab === "saved" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
//             } transition-all`}
//             onClick={() => setActiveTab("saved")}
//           >
//             <Bookmark className="mr-2" size={18} />
//             Saved Articles
//           </button>
//           <button
//             className={`flex items-center px-6 py-4 font-medium ${
//               activeTab === "comments" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
//             } transition-all`}
//             onClick={() => setActiveTab("comments")}
//           >
//             <MessageSquare className="mr-2" size={18} />
//             Comments
//           </button>
//           <button
//             className={`flex items-center px-6 py-4 font-medium ${
//               activeTab === "history" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
//             } transition-all`}
//             onClick={() => setActiveTab("history")}
//           >
//             <Clock className="mr-2" size={18} />
//             Reading History
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="p-6">
//           {/* Profile Tab */}
//           {activeTab === "profile" && (
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-[#497174]">Profile Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-[#EFF5F5] p-4 rounded-lg">
//                   <h4 className="text-[#EB6440] font-semibold mb-2">Username</h4>
//                   <p className="text-[#497174]">{username}</p>
//                 </div>
//                 <div className="bg-[#EFF5F5] p-4 rounded-lg">
//                   <h4 className="text-[#EB6440] font-semibold mb-2">Email</h4>
//                   <p className="text-[#497174]">{email}</p>
//                 </div>
//                 <div className="bg-[#EFF5F5] p-4 rounded-lg">
//                   <h4 className="text-[#EB6440] font-semibold mb-2">Favorite Game</h4>
//                   <p className="text-[#497174]">{favoriteGame || "Not specified"}</p>
//                 </div>
//                 <div className="bg-[#EFF5F5] p-4 rounded-lg">
//                   <h4 className="text-[#EB6440] font-semibold mb-2">Gamer Tag</h4>
//                   <p className="text-[#497174]">{gamerTag || "Not specified"}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Saved Articles Tab */}
//           {activeTab === "saved" && (
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-[#497174]">Saved Articles</h3>
//               {savedArticles.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {savedArticles.map((article) => (
//                     <div key={article.id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                       <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-4" />
//                       <h4 className="text-[#EB6440] font-semibold mb-2">{article.title}</h4>
//                       <p className="text-[#497174] text-sm mb-2">Date: {formatDate(article.date)}</p>
//                       <p className="text-[#497174] text-sm">Category: {article.category}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-[#497174] text-center">No saved articles.</p>
//               )}
//             </div>
//           )}

//           {/* Comments Tab */}
//           {activeTab === "comments" && (
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-[#497174]">Comments</h3>
//               {comments.length > 0 ? (
//                 <div className="space-y-4">
//                   {comments.map((comment) => (
//                     <div key={comment.id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                       <h4 className="text-[#EB6440] font-semibold mb-2">{comment.articleTitle}</h4>
//                       <p className="text-[#497174] mb-2">{comment.text}</p>
//                       <div className="flex justify-between items-center">
//                         <p className="text-[#497174] text-sm">Date: {formatDate(comment.date)}</p>
//                         <p className="text-[#497174] text-sm">Likes: {comment.likes}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-[#497174] text-center">No comments.</p>
//               )}
//             </div>
//           )}

//           {/* Reading History Tab */}
//           {activeTab === "history" && (
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-[#497174]">Reading History</h3>
//               {readingHistory.length > 0 ? (
//                 <div className="space-y-4">
//                   {readingHistory.map((history) => (
//                     <div key={history.id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                       <h4 className="text-[#EB6440] font-semibold mb-2">{history.title}</h4>
//                       <div className="flex justify-between items-center">
//                         <p className="text-[#497174] text-sm">Date: {formatDate(history.date)}</p>
//                         <p className="text-[#497174] text-sm">Category: {history.category}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-[#497174] text-center">No articles in reading history.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//       {/* Edit Modal */}
// {isEditing && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//     <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//       <div className="bg-[#497174] rounded-t-lg p-6 relative">
//         <h5 className="text-white text-2xl font-bold text-center">Edit Profile</h5>
//         <button
//           className="absolute right-4 top-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
//           onClick={() => setIsEditing(false)}
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <div className="p-6 space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Game</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//             value={favoriteGame}
//             onChange={(e) => setFavoriteGame(e.target.value)}
//             placeholder="Enter your favorite game"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Gamer Tag</label>
//           <input
//             type="text"
//             className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//             value={gamerTag}
//             onChange={(e) => setGamerTag(e.target.value)}
//             placeholder="Enter your gamer tag"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
//           <input
//             type="file"
//             className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
//             onChange={(e) => setNewProfileImage(e.target.files[0])}
//           />
//         </div>
//       </div>

//       <div className="p-6 bg-[#EFF5F5] rounded-b-lg flex justify-end space-x-4">
//         <button
//           className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all"
//           onClick={() => setIsEditing(false)}
//         >
//           <X className="mr-2" size={18} />
//           Cancel
//         </button>
//         <button
//           className="px-6 py-2 rounded-lg bg-[#EB6440] hover:bg-[#d55835] text-white font-medium transition-all"
//           onClick={handleSaveChanges}
//         >
//           <Edit2 className="mr-2" size={18} />
//           Save Changes
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default Profile;



// import React, { useState, useEffect } from "react";
// import { User, Mail, Edit2, X, Camera, Bookmark, MessageSquare, Clock, Gamepad } from "lucide-react";
// import Swal from "sweetalert2";
// import axios from "axios";

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [favoriteGame, setFavoriteGame] = useState("");
//   const [gamerTag, setGamerTag] = useState("");

//   // بيانات إضافية للمستخدم
//   // const [savedArticles, setSavedArticles] = useState([]);
//   // const [comments, setComments] = useState([]);
//   // const [readingHistory, setReadingHistory] = useState([]);

//   // Fetch user data from the server
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users/profile", {
//           withCredentials: true,
//         });
//         const user = response.data;
//         setUserId(user._id);
//         setUsername(user.username);
//         setEmail(user.email);
//         setProfileImage(user.profileImage || "");
//         setFavoriteGame(user.favoriteGame || "");
//         setGamerTag(user.gamerTag || "");

//         // Fetch saved articles, comments, and reading history
//         // fetchSavedArticles(user._id);
//         // fetchComments(user._id);
//         // fetchReadingHistory(user._id);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//         Swal.fire({
//           title: "Error",
//           text: "Failed to fetch user data.",
//           icon: "error",
//           background: "#EFF5F5",
//           color: "#497174",
//         });
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Save changes
//   const handleSaveChanges = async () => {
//     try {
//       if (!userId) {
//         console.error("Update Error: userId is not available");
//         Swal.fire({
//           title: "Error",
//           text: "User ID is not available. Please try again.",
//           icon: "error",
//           background: "#EFF5F5",
//           color: "#497174",
//         });
//         return;
//       }

//       const formData = new FormData();
//       formData.append("username", username);
//       formData.append("email", email);
//       formData.append("favoriteGame", favoriteGame);
//       formData.append("gamerTag", gamerTag);
//       if (newProfileImage) {
//         formData.append("profileImage", newProfileImage); // أضف الصورة كملف
//       }

//       const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" }, // تحديد نوع المحتوى
//         withCredentials: true,
//       });

//       Swal.fire({
//         title: "Updated Successfully",
//         text: "Profile updated successfully.",
//         icon: "success",
//         background: "#EFF5F5",
//         color: "#497174",
//       });

//       setIsEditing(false);
//     } catch (error) {
//       console.error("Update Error:", error.response?.data || error.message);
//       Swal.fire({
//         title: "Error",
//         text: error.response?.data?.message || "Failed to update profile.",
//         icon: "error",
//         background: "#EFF5F5",
//         color: "#497174",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-[#EFF5F5] min-h-screen">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           {/* Profile Image Section */}
//           <div className="relative mb-6 md:mb-0">
//             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#497174] shadow-md">
//               <img
//                 src={profileImage ? `http://localhost:5000/${profileImage}` : "https://via.placeholder.com/128"}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <button
//               className="absolute bottom-0 right-0 bg-[#EB6440] p-2 rounded-full shadow-md hover:bg-[#d85a3a] transition-all"
//               onClick={() => setIsEditing(true)}
//             >
//               <Camera className="text-white" size={20} />
//             </button>
//           </div>

//           {/* User Info Section */}
//           <div className="flex-grow px-8 text-center md:text-left">
//             <h2 className="text-3xl font-bold text-[#497174] mb-2">{username}</h2>
//             <p className="text-gray-600 mb-2">{email}</p>
//             <div className="flex flex-wrap gap-4 mt-4">
//               <div className="flex items-center">
//                 <Gamepad className="mr-2 text-[#EB6440]" size={20} />
//                 <span className="text-gray-700">
//                   Favorite Game: <span className="text-[#497174] font-semibold">{favoriteGame || "Not specified"}</span>
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <User className="mr-2 text-[#EB6440]" size={20} />
//                 <span className="text-gray-700">
//                   Gamer Tag: <span className="text-[#497174] font-semibold">{gamerTag || "Not specified"}</span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Edit Button Section */}
//           <div className="mt-6 md:mt-0">
//             <button
//               className="bg-[#EB6440] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#d85a3a] transition-all flex items-center"
//               onClick={() => setIsEditing(true)}
//             >
//               <Edit2 className="mr-2" size={20} />
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from "react";
import { User, Mail, Edit2, X, Camera, Bookmark, MessageSquare, Clock, Gamepad, Heart } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [favoriteGame, setFavoriteGame] = useState("");
  const [gamerTag, setGamerTag] = useState("");

  // بيانات إضافية للمستخدم
  const [savedArticles, setSavedArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]); 
  const [comments, setComments] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        const user = response.data;
        setUserId(user._id);
        setUsername(user.username);
        setEmail(user.email);
        setProfileImage(user.profileImage || "");
        setFavoriteGame(user.favoriteGame || "");
        setGamerTag(user.gamerTag || "");

        // Fetch saved articles, comments, and reading history
        fetchSavedArticles(user._id);
        fetchLikedArticles(user._id);
        fetchComments(user._id);
        fetchReadingHistory(user._id);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch user data.",
          icon: "error",
          background: "#EFF5F5",
          color: "#497174",
        });
      }
    };

    fetchUserData();
  }, []);

  // Fetch saved articles
  const fetchSavedArticles = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/saved-articles`, {
        withCredentials: true,
      });
      setSavedArticles(response.data); // تعيين المقالات المحفوظة
    } catch (error) {
      console.error("Failed to fetch saved articles:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch saved articles.",
        icon: "error",
        background: "#EFF5F5",
        color: "#497174",
      });
    }
  };
  
  // Fetch liked articles
const fetchLikedArticles = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${userId}/liked-articles`, {
      withCredentials: true,
    });
    setLikedArticles(response.data); // تعيين المقالات التي أعجب بها المستخدم
  } catch (error) {
    console.error("Failed to fetch liked articles:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to fetch liked articles.",
      icon: "error",
      background: "#EFF5F5",
      color: "#497174",
    });
  }
};

  // Fetch comments
  const fetchComments = async (userId) => {
    try {
      // This is just an example, it will be replaced with a real API call
      // const response = await axios.get(`http://localhost:5000/api/users/${userId}/comments`);
      // setComments(response.data);

      // Mock data
      setComments([
        { id: 1, articleTitle: "New leaks about GTA 6", text: "I hope these leaks are true!", date: "2025-03-12", likes: 15 },
        { id: 2, articleTitle: "Elden Ring 2 Review", text: "The game is amazing, deserves a 10/10 rating", date: "2025-03-07", likes: 8 },
        { id: 3, articleTitle: "Most Anticipated Games of 2026", text: "Where is the new God of War game?", date: "2025-03-01", likes: 4 },
      ]);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  // Fetch reading history
  const fetchReadingHistory = async (userId) => {
    try {
      // This is just an example, it will be replaced with a real API call
      // const response = await axios.get(`http://localhost:5000/api/users/${userId}/reading-history`);
      // setReadingHistory(response.data);

      // Mock data
      setReadingHistory([
        { id: 1, title: "Official Announcement of PlayStation 6", date: "2025-03-15", category: "News" },
        { id: 2, title: "Secrets You Haven't Discovered in Starfield", date: "2025-03-14", category: "Tips" },
        { id: 3, title: "Top 10 Games of 2024", date: "2025-03-13", category: "Lists" },
        { id: 4, title: "Exclusive Interview with Cyberpunk 2077: Phantom Liberty Developer", date: "2025-03-12", category: "Interviews" },
      ]);
    } catch (error) {
      console.error("Failed to fetch reading history:", error);
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    try {
      if (!userId) {
        console.error("Update Error: userId is not available");
        Swal.fire({
          title: "Error",
          text: "User ID is not available. Please try again.",
          icon: "error",
          background: "#EFF5F5",
          color: "#497174",
        });
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("favoriteGame", favoriteGame);
      formData.append("gamerTag", gamerTag);
      if (newProfileImage) {
        formData.append("profileImage", newProfileImage);
      } else {
        console.log("No file selected.");
      }
      console.log("Form Data Content:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // تحديد نوع المحتوى
        withCredentials: true,
      });

      Swal.fire({
        title: "Updated Successfully",
        text: "Profile updated successfully.",
        icon: "success",
        background: "#EFF5F5",
        color: "#497174",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to update profile.",
        icon: "error",
        background: "#EFF5F5",
        color: "#497174",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="container mx-auto p-4 bg-[#EFF5F5] min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Profile Image Section */}
          <div className="relative mb-6 md:mb-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#497174] shadow-md">
              <img
                src={profileImage ? `http://localhost:5000/${profileImage}` : "https://via.placeholder.com/128"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 bg-[#EB6440] p-2 rounded-full shadow-md hover:bg-[#d85a3a] transition-all"
              onClick={() => setIsEditing(true)}
            >
              <Camera className="text-white" size={20} />
            </button>
          </div>

          {/* User Info Section */}
          <div className="flex-grow px-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#497174] mb-2">{username}</h2>
            <p className="text-gray-600 mb-2">{email}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center">
                <Gamepad className="mr-2 text-[#EB6440]" size={20} />
                <span className="text-gray-700">
                  Favorite Game: <span className="text-[#497174] font-semibold">{favoriteGame || "Not specified"}</span>
                </span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 text-[#EB6440]" size={20} />
                <span className="text-gray-700">
                  Gamer Tag: <span className="text-[#497174] font-semibold">{gamerTag || "Not specified"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button Section */}
          <div className="mt-6 md:mt-0">
            <button
              className="bg-[#EB6440] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#d85a3a] transition-all flex items-center"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="mr-2" size={20} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
<div className="flex border-b border-[#D6E4E5]">
  <button
    className={`flex items-center px-6 py-4 font-medium ${
      activeTab === "profile" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
    } transition-all`}
    onClick={() => setActiveTab("profile")}
  >
    <User className="mr-2" size={18} />
    Profile
  </button>
  <button
    className={`flex items-center px-6 py-4 font-medium ${
      activeTab === "saved" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
    } transition-all`}
    onClick={() => setActiveTab("saved")}
  >
    <Bookmark className="mr-2" size={18} />
    Saved Articles
  </button>
  <button
    className={`flex items-center px-6 py-4 font-medium ${
      activeTab === "liked" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
    } transition-all`}
    onClick={() => setActiveTab("liked")}
  >
    <Heart className="mr-2" size={18} /> {/* أيقونة القلب */}
    Liked Articles
  </button>
  <button
    className={`flex items-center px-6 py-4 font-medium ${
      activeTab === "comments" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
    } transition-all`}
    onClick={() => setActiveTab("comments")}
  >
    <MessageSquare className="mr-2" size={18} />
    Comments
  </button>
  <button
    className={`flex items-center px-6 py-4 font-medium ${
      activeTab === "history" ? "bg-[#497174] text-white" : "text-[#497174] hover:bg-[#D6E4E5]"
    } transition-all`}
    onClick={() => setActiveTab("history")}
  >
    <Clock className="mr-2" size={18} />
    Reading History
  </button>
</div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#497174]">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#EFF5F5] p-4 rounded-lg">
                    <h4 className="text-[#EB6440] font-semibold mb-2">Username</h4>
                    <p className="text-[#497174]">{username}</p>
                  </div>
                  <div className="bg-[#EFF5F5] p-4 rounded-lg">
                    <h4 className="text-[#EB6440] font-semibold mb-2">Email</h4>
                    <p className="text-[#497174]">{email}</p>
                  </div>
                  <div className="bg-[#EFF5F5] p-4 rounded-lg">
                    <h4 className="text-[#EB6440] font-semibold mb-2">Favorite Game</h4>
                    <p className="text-[#497174]">{favoriteGame || "Not specified"}</p>
                  </div>
                  <div className="bg-[#EFF5F5] p-4 rounded-lg">
                    <h4 className="text-[#EB6440] font-semibold mb-2">Gamer Tag</h4>
                    <p className="text-[#497174]">{gamerTag || "Not specified"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Articles Tab */}
            {activeTab === "saved" && (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-[#497174]">Saved Articles</h3>
    {savedArticles.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedArticles.map((article) => (
          <div key={article._id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <img
              src={article.images[0] || "https://via.placeholder.com/150"} // استخدام الصورة الأولى من المقال
              alt={article.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h4 className="text-[#EB6440] font-semibold mb-2">{article.title}</h4>
            <p className="text-[#497174] text-sm mb-2">Date: {formatDate(article.createdAt)}</p>
            <p className="text-[#497174] text-sm">Category: {article.category}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-[#497174] text-center">No saved articles.</p>
    )}
  </div>
)}

{activeTab === "liked" && (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-[#497174]">Liked Articles</h3>
    {likedArticles.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedArticles.map((article) => (
          <div key={article._id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <img
              src={article.images[0] || "https://via.placeholder.com/150"} // استخدام الصورة الأولى من المقال
              alt={article.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h4 className="text-[#EB6440] font-semibold mb-2">{article.title}</h4>
            <p className="text-[#497174] text-sm mb-2">Date: {formatDate(article.createdAt)}</p>
            <p className="text-[#497174] text-sm">Category: {article.category}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-[#497174] text-center">No liked articles.</p>
    )}
  </div>
)}
            {/* Comments Tab */}
            {activeTab === "comments" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#497174]">Comments</h3>
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-[#EB6440] font-semibold mb-2">{comment.articleTitle}</h4>
                        <p className="text-[#497174] mb-2">{comment.text}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-[#497174] text-sm">Date: {formatDate(comment.date)}</p>
                          <p className="text-[#497174] text-sm">Likes: {comment.likes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#497174] text-center">No comments.</p>
                )}
              </div>
            )}

            {/* Reading History Tab */}
            {activeTab === "history" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#497174]">Reading History</h3>
                {readingHistory.length > 0 ? (
                  <div className="space-y-4">
                    {readingHistory.map((history) => (
                      <div key={history.id} className="bg-[#EFF5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-[#EB6440] font-semibold mb-2">{history.title}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-[#497174] text-sm">Date: {formatDate(history.date)}</p>
                          <p className="text-[#497174] text-sm">Category: {history.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#497174] text-center">No articles in reading history.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-[#497174] rounded-t-lg p-6 relative">
              <h5 className="text-white text-2xl font-bold text-center">Edit Profile</h5>
              <button
                className="absolute right-4 top-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                onClick={() => setIsEditing(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Game</label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={favoriteGame}
                  onChange={(e) => setFavoriteGame(e.target.value)}
                  placeholder="Enter your favorite game"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gamer Tag</label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  value={gamerTag}
                  onChange={(e) => setGamerTag(e.target.value)}
                  placeholder="Enter your gamer tag"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                <input
                  type="file"
                  className="w-full p-3 border border-[#D6E4E5] rounded-lg bg-[#EFF5F5] focus:ring-2 focus:ring-[#EB6440] focus:border-transparent"
                  onChange={(e) => setNewProfileImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="p-6 bg-[#EFF5F5] rounded-b-lg flex justify-end space-x-4">
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all"
                onClick={() => setIsEditing(false)}
              >
                <X className="mr-2" size={18} />
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-[#EB6440] hover:bg-[#d55835] text-white font-medium transition-all"
                onClick={handleSaveChanges}
              >
                <Edit2 className="mr-2" size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;