import React from "react";

const ArticleDetailsView = ({ isOpen, onClose, article }) => {
    if (!isOpen || !article) return null;

    const getStatusBadge = (approved) => {
        return approved ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                Approved
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <span className="w-2 h-2 mr-1 rounded-full bg-yellow-500"></span>
                Pending
            </span>
        );
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col text-left transform transition-all overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-2xl">
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white focus:outline-none transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <h3 className="text-2xl font-bold text-white">Article Details</h3>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center text-blue-100 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{article.author}</span>
                        </div>
                        <div className="mx-2 text-blue-200">•</div>
                        <div className="text-blue-100 text-sm">
                            {getStatusBadge(article.approved)}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-6 overflow-y-auto flex-1 space-y-6">
                    {/* Title */}
                    <h4 className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4">{article.title}</h4>

                    {/* Featured Image */}
                    {article.featuredImage && (
                        <div className="w-full">
                            <img
                                src={article.featuredImage}
                                alt="Featured"
                                className="w-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            />
                            <p className="text-xs text-gray-500 mt-2 italic">Featured image</p>
                        </div>
                    )}

                    {/* Content */}
                    <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <p>{article.content}</p>
                    </div>

                    {/* Categories and Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Categories:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {article.categories && article.categories.length > 0 ? (
                                    article.categories.map((category, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {category}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">No categories</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                                Tags:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {article.tags && article.tags.length > 0 ? (
                                    article.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">No tags</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Created:
                            </p>
                            <p className="text-gray-600 mt-1">{new Date(article.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Updated:
                            </p>
                            <p className="text-gray-600 mt-1">{new Date(article.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-2xl">
                    <div className="text-xs text-gray-500">
                        Article ID: {article.id || "N/A"}
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium rounded-lg transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailsView;