import React from "react";
import StatCard from "../../components/StatCard";
import LatestBookings from "../../components/LatestBookings";
import SiteStatisticsChart from "./components/SiteStatisticsChart";
import RideStatisticsChart from "./components/RideStatisticsChart";
import images from "../../constants/images";
import HorizontalAlign from "../../components/HorizontalAlign";
import Dropdown from "../../components/Dropdown";
import { DateDropOptions } from "../../components/FilterData";
import { useQuery } from "@tanstack/react-query";
import { fetchdashboard } from "../../queries/dashboard";
import Loader from "../../components/Loader";
import { formatAmount } from "../../constants/help";
import BookingRow from "../transactions/component/BookingRow";
import TableCan from "../../components/TableCan";

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

  const { data: dashboardData, isLoading, isError } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchdashboard
  });

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Earnings',
        data: dashboardData?.monthlyEarnings,
        backgroundColor: '#22c55e',
        borderRadius: 6,
      },
      {
        label: 'Rides',
        data: dashboardData?.monthlySendParcel,
        backgroundColor: '#7e22ce',
        borderRadius: 6,
      },
    ],
  };
  const pieData = {
    labels: ['Completed Rides', 'Active Rides', 'Scheduled Rides'],
    datasets: [
      {
        data: dashboardData?.currentMonthStatusCounts,
        backgroundColor: [
          '#dc2626', // red for completed
          '#16a34a', // green for active
          '#818cf8', // blue for scheduled
        ],
        borderWidth: 0,
      },
    ],
  };
  const pielabels = [
    {
      labelColor: '#dc2626',
      label: 'Completed Rides'
    },
    {
      labelColor: '#16a34a',
      label: 'Active Rides'
    },
    {
      labelColor: '#818cf8',
      label: 'Scheduled Rides'
    },
  ]

  const siteStats = [
    {
      title: "Total Users",
      value: dashboardData?.site.totalUsers,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Total Riders",
      value: dashboardData?.site.totalRider,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#08385D]",
      bgCard: "bg-[#042A47]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Activated Riders",
      value: dashboardData?.site.totalActiveRider,
      description: "+5% increase from last month",
      icon: images.activate,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Total Revenue",
      value: "₦ " + formatAmount(dashboardData?.site.revenue),
      description: "-25% decrease from last month",
      icon: images.revenue,
      bgIcon: "bg-[#085E1B]",
      bgCard: "bg-[#044713]",
      textColor: "white",
      statChangeColor: "text-red-500",
    },
  ];
  const rideStats = [
    {
      title: "Total Deliveries",
      value: dashboardData?.rides.totaldelivered,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Scheduled Rides",
      value: dashboardData?.rides.totalscheduled,
      description: "+5% increase from last month",
      icon: images.schedule,
      bgIcon: "bg-[#08385D]",
      bgCard: "bg-[#042A47]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "active Rides",
      value: dashboardData?.rides.totalActive,
      description: "+5% increase from last month",
      icon: images.activate,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Completed Rides",
      value: dashboardData?.rides.totaldelivered,
      description: "-25% decrease from last month",
      icon: images.completed,
      bgIcon: "bg-[#085E1B]",
      bgCard: "bg-[#044713]",
      textColor: "white",
      statChangeColor: "text-red-500",
    },
  ];

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500 text-center">Error loading dashboard data</div>;
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
              {!isLoading && <SiteStatisticsChart data={barData} />}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md shadow-gray-400 lg:col-span-4 h-fit">
            <h2 className="text-2xl font-semibold  flex items-center gap-2 px-4 py-4 pb-2 rounded-t-md bg-gray-100">
              <img src={images.signal} alt="signal" className="w-6 h-6" />
              Ride Statistics
            </h2>
            <div className="p-4 pt-0 w-full mt-10 overflow-hidden">
              {!isLoading && <RideStatisticsChart data={pieData} labels={pielabels} />}
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <TableCan
          heading="Latest Bookings"
          showHeading={true}
          headerTr={[
            "Order id",
            "username",
            "rider name",
            "pick&drop Address",
            "amount",
            "pickup date&time",
            "drop date&time",
            "status",
            "other",
          ]}
          dataTr={dashboardData?.bookings}
          TrName={BookingRow}
        />
      </div>
    </>
  );
};

export default Dashboard;
