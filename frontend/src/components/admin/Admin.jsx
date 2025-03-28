import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';
import UsersAdmin from './UsersAdmin';
import StatisticsAdmin from './StatisticsAdmin';
import ArticalsAdmin from './ArticalsAdmin';
import ReportsComment from './reportsComment';

export default function Admin() {
    const [selectedTab, setSelectedTab] = useState('Reported'); // Default tab

    // Function to render the selected tab's content
    const renderContent = () => {
        switch (selectedTab) {
            case 'Statistics':
                return <StatisticsAdmin />;
            case 'Users':
                return <UsersAdmin />;
            case 'News':
                return <ArticalsAdmin />;
            case 'Reported':
                return <ReportsComment />;
            default:
                return <StatisticsAdmin />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SidebarAdmin setSelectedTab={setSelectedTab} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                {renderContent()}
            </div>
        </div>
        
    );
}
