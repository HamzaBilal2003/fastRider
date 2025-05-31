import React, { useEffect, useState } from "react";
import HeaderWrapper from "./component/HeaderWrapper";
import UserMetrics from "./portions/UserMetrics";
import OrderMetrics from "./portions/OrderMetrics";
import RiderMetrics from "./portions/RiderMetrics";
import RevenueMetrics from "./portions/RevenueMetrics";
import OperationalMetrics from "./portions/OperationalMetrics";
import SatisfactionMetrics from "./portions/SatisfactionMetrics";
import GeographicMetrics from "./portions/GeographicMetrics";
import MarketingMetrics from "./portions/MarketingMetrics";
import TechnicalMetrics from "./portions/TechnicalMetrics";


const Analytics : React.FC = () => {
  const [activeTab, setActiveTab] = useState('user-metrics');

  useEffect(() => {
    console.log('Active Tab:', activeTab);
  }, [activeTab]);

  // Function to render the correct component based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'user-metrics': return <UserMetrics />;
      case 'order-metrics': return <OrderMetrics />;
      case 'rider-metrics': return <RiderMetrics />;
      case 'revenue-metrics': return <RevenueMetrics />;
      case 'operational-metrics': return <OperationalMetrics />;
      case 'satisfaction-metrics': return <SatisfactionMetrics />;
      case 'geographic-metrics': return <GeographicMetrics />;
      case 'marketing-metrics': return <MarketingMetrics />;
      case 'technical-metrics': return <TechnicalMetrics />;
      default: return <div>Select a tab to view content</div>;
    }
  };

  return (
    <HeaderWrapper activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </HeaderWrapper>
  );
};

export default Analytics;
