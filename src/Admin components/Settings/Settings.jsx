import React, { useState } from 'react';
import ManagesRoles from '../ManagesRoles/ManagesRoles';
import ProcessingProducts from '../Processing Products/ProcessingProducts';
import Delevered from '../Delevered Products/Delevered';
import AddProduct from '../AddProduct/AddProduct';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('ManageRoles'); // State to track active tab

    // Tab content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'ManageRoles':
                return <ManagesRoles />;
            case 'Processing':
                return <ProcessingProducts />;
            case 'ShippingSettings':
                return <Delevered />;
            case 'PaymentOptions':
                return <div>Payment options content goes here...</div>;
            case 'SiteSettings':
                return <AddProduct/>;
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
                    className={`px-4 py-2 m-2 font-semibold border-b-2 ${activeTab === 'Processing' ? 'border-violet-500 text-violet-500' : 'border-transparent'
                        } hover:text-violet-500 transition-colors`}
                    onClick={() => setActiveTab('Processing')}
                >
                    Processing Products
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
                    Add Products
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
