import React, { useState } from 'react';
import ManagesRoles from '../ManagesRoles/ManagesRoles';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('ManageRoles'); // State to track active tab

    // Tab content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'ManageRoles':
                return <ManagesRoles />;
            case 'ManageUsers':
                return <div>Manage users content goes here...</div>;
            case 'ShippingSettings':
                return <div>Shipping settings content goes here...</div>;
            case 'PaymentOptions':
                return <div>Payment options content goes here...</div>;
            case 'SiteSettings':
                return <div>Site settings content goes here...</div>;
            default:
                return <div>Manage roles content goes here...</div>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Tabs navigation */}
            <div className="flex flex-wrap justify-center">
                <button
                    className={`px-4 py-2 m-2 font-semibold border-b-2 ${activeTab === 'ManageRoles' ? 'border-violet-500 text-violet-500' : 'border-transparent'
                        } hover:text-violet-500 transition-colors`}
                    onClick={() => setActiveTab('ManageRoles')}
                >
                    Manage Roles
                </button>
                <button
                    className={`px-4 py-2 m-2 font-semibold border-b-2 ${activeTab === 'ManageUsers' ? 'border-violet-500 text-violet-500' : 'border-transparent'
                        } hover:text-violet-500 transition-colors`}
                    onClick={() => setActiveTab('ManageUsers')}
                >
                    Manage Users
                </button>
                <button
                    className={`px-4 py-2 m-2 font-semibold border-b-2 ${activeTab === 'ShippingSettings' ? 'border-violet-500 text-violet-500' : 'border-transparent'
                        } hover:text-violet-500 transition-colors`}
                    onClick={() => setActiveTab('ShippingSettings')}
                >
                    Shipping Settings
                </button>
                <button
                    className={`px-4 py-2 m-2 font-semibold border-b-2 ${activeTab === 'PaymentOptions' ? 'border-violet-500 text-violet-500' : 'border-transparent'
                        } hover:text-violet-500 transition-colors`}
                    onClick={() => setActiveTab('PaymentOptions')}
                >
                    Payment Options
                </button>
                <button
                    className={`px-4 py-2 m-2 font-semibold border-b-2 ${activeTab === 'SiteSettings' ? 'border-violet-500 text-violet-500' : 'border-transparent'
                        } hover:text-violet-500 transition-colors`}
                    onClick={() => setActiveTab('SiteSettings')}
                >
                    Site Settings
                </button>
            </div>

            {/* Tab content */}
            <div className="mt-8">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Settings;
