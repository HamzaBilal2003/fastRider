import React from 'react'
import HorizontalAlign from '../../../components/HorizontalAlign';
import Dropdown from '../../../components/Dropdown';
import { DateDropOptions } from '../../../components/FilterData';
import TabNavigation from './TabNavigation';

interface props {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (string:string) => void;
}

const HeaderWrapper: React.FC<props> = ({ children,activeTab,setActiveTab }) => {
    
    const handleDetailsClick = (value: string) => {
        console.log(value);
    }
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // You can add additional logic here based on the selected tab
        console.log('Selected tab:', tabId);
      };
    const tabs = [
        { id: 'user-metrics', label: 'User Metrics' },
        { id: 'order-metrics', label: 'Order Metrics' },
        { id: 'rider-metrics', label: 'Rider Metrics' },
        { id: 'revenue-metrics', label: 'Revenue Metrics' },
        { id: 'operational-metrics', label: 'Operational Metrics' },
        { id: 'satisfaction-metrics', label: 'Customer Satisfaction Metrics' },
        { id: 'geographic-metrics', label: 'Geographic Metrics' },
        { id: 'marketing-metrics', label: 'Marketing Metrics' },
        { id: 'technical-metrics', label: 'Technical Metrics' },
      ];
    return (
        <>
            <div className="bg-white">
                <HorizontalAlign havsShadow={true}>
                    <h1 className="text-3xl font-bold px-6">Dashboard</h1>
                    <div className="px-6">
                        <Dropdown
                            options={DateDropOptions}
                            onChange={handleDetailsClick}
                            placeholder="This Week"
                            position="right-0"
                        />
                    </div>
                </HorizontalAlign>
            </div>
            <TabNavigation tabs={tabs} onTabChange={handleTabChange} activeTab={activeTab} />

            <div className='flex flex-col gap-6'>
                {children}
            </div>
        </>
    )
}

export default HeaderWrapper