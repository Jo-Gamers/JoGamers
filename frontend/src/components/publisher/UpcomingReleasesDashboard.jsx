import React, { useState } from "react";

function UpcomingReleasesDashboard() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-green-500 pb-2 inline-block">
                        Upcoming Releases
                    </h2>
                    <p className="text-gray-500 mt-2">Plan and manage your product launch schedule</p>
                </div>
                <button
                    className={`bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium flex items-center gap-2 transition-all duration-300 ${isHovered ? "translate-y-1 shadow-md" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Schedule Release
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Release Calendar</h3>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                            </svg>
                        </button>
                    </div>
                </div>

                <p className="text-gray-600 text-lg mb-8">
                    Manage upcoming releases here. Add, edit, and schedule releases for future publication.
                </p>

                <div className="mt-8 border-t border-gray-100 pt-8">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src="/api/placeholder/300/200"
                                alt="Calendar illustration"
                                className="max-w-xs rounded-lg opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/80 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-gray-500 mt-6 font-medium">No upcoming releases scheduled</p>
                        <button className="mt-4 text-green-600 font-medium hover:text-green-800 transition-colors">
                            Create your first release
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="text-sm text-gray-500">Last updated: Today at 10:24 AM</div>
                </div>
            </div>
        </div>
    );
}

export default UpcomingReleasesDashboard;