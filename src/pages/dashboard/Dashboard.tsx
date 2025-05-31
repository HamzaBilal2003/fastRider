import React from "react";
import StatCard from "../../components/StatCard";
import LatestBookings from "../../components/LatestBookings";
import SiteStatisticsChart from "./components/SiteStatisticsChart";
import RideStatisticsChart from "./components/RideStatisticsChart";
import { siteStats, rideStats } from "../../constants/statisticsData";
import images from "../../constants/images";
import HorizontalAlign from "../../components/HorizontalAlign";
import Dropdown from "../../components/Dropdown";
import { DateDropOptions } from "../../components/FilterData";

const bookingsData = [
  {
    user: "Qamarudeen Malik",
    rider: "Alex Adewale",
    customer: "Chris Richard",
    address: "No. 1, abcdefghijkl street, Lagos",
    payOnDelivery: "Yes",
    pickupTime: "21-02-2025 | 07:22 AM",
    dropTime: "21-02-2025 | 07:22 AM",
    status: "Active",
  },
  {
    user: "Sarah Johnson",
    rider: "Michael Smith",
    customer: "John Doe",
    address: "15, XYZ Street, Ikeja, Lagos",
    payOnDelivery: "No",
    pickupTime: "23-02-2025 | 06:15 AM",
    dropTime: "23-02-2025 | 06:45 AM",
    status: "Completed",
  },
];

const handleDetailsClick = (booking: any) => {
  console.log("View details for:", booking);
};

const Dashboard: React.FC = () => {
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
      <div className="px-6 my-4">


        {/* Site & Ride Statistics (First Row - Two from Each) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/** Site Statistics (First 2) **/}
          <div className="bg-white rounded-lg shadow-md shadow-gray-400">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 rounded-lg px-6 py-4 bg-gray-50">
              <img src={images.signal} alt="signal" className="w-6 h-6" />Site Statistics
            </h2>
            <div className="p-6 pt-1">
              <div className="grid grid-cols-2 gap-4">
                {siteStats.slice(0, 2).map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
                {siteStats.slice(2, 4).map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>
            </div>
          </div>

          {/** Ride Statistics (First 2) **/}
          <div className="bg-white rounded-lg shadow-md shadow-gray-400">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gray-50 py-4 rounded-t-md px-6">
              <img src={images.signal} alt="signal" className="w-6 h-6" />Ride Statistics
            </h2>
            <div className="p-6 pt-1">
              <div className="grid grid-cols-2 gap-4">
                {rideStats.slice(0, 2).map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
                {rideStats.slice(2, 4).map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Site & Ride Statistics (Second Row - Remaining Two from Each) */}
        {/* <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">
              
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">
              
            </div>
          </div>
        </div> */}

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-8 h-fit">
            <h2 className="text-2xl font-semibold  flex items-center gap-2 px-6 py-4 pb-2 rounded-t-md bg-gray-100">
              <img src={images.signal} alt="signal" className="w-6 h-6" />
              Site Statistics
            </h2>
            <div className="p-4 pt-0 w-full h-[400px] overflow-hidden">
              <SiteStatisticsChart />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-4 h-fit">
            <h2 className="text-2xl font-semibold  flex items-center gap-2 px-4 py-4 pb-2 rounded-t-md bg-gray-100">
              <img src={images.signal} alt="signal" className="w-6 h-6" />
              Ride Statistics
            </h2>
            <div className="p-4 pt-0 w-full mt-10 overflow-hidden">
              <RideStatisticsChart />
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <LatestBookings
          bookings={bookingsData}
          actionButton={{ text: "Details", onClick: handleDetailsClick }}
          title="Latest Bookings"
        />
      </div>
    </>
  );
};

export default Dashboard;
