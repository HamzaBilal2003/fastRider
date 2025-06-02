import React, { useState, useEffect } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import { earningStatics } from "../../constants/statisticsData";
import StatCard from "../../components/StatCard";
import ItemGap from "../../components/ItemGap";
import Dropdown from "../../components/Dropdown";
import SearchFilter from "../../components/SearchFilter";
import { bulkOptions, DateDropOptions } from "../../components/FilterData";
import TableCan from "../../components/TableCan";
import EarningRow from "./component/EarningRow";
import { useQuery } from "@tanstack/react-query";
import { fetchEarnings } from "../../queries/report/report";
import Loader from "../../components/Loader";
import { Earning as EarningType } from "../../queries/report/report";
import images from "../../constants/images";

const Earning: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('30');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEarnings, setFilteredEarnings] = useState<EarningType[]>([]);

  const { data: earningsData, isLoading, error } = useQuery({
    queryKey: ['earningReport'],
    queryFn: fetchEarnings,
  });

  // Update filtered data when raw data changes or filters change
  useEffect(() => {
    if (!earningsData?.data.earnings) return;

    let filtered = [...earningsData.data.earnings];

    // Apply date filter
    if (selectedDate !== '9999') { // If not "All time"
      const today = new Date();
      const filterDate = new Date();
      filterDate.setDate(today.getDate() - parseInt(selectedDate));
      filtered = filtered.filter(earning =>
        new Date(earning.delivered_at) >= filterDate
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(earning =>
        earning.rider.name.toLowerCase().includes(query) ||
        earning.user.name.toLowerCase().includes(query) ||
        earning.id.toString().includes(query)
      );
    }

    setFilteredEarnings(filtered);
  }, [earningsData, selectedDate, searchQuery]);

  // Handle date filter change
  const handleDateFilter = (value: string) => {
    setSelectedDate(value);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-600 my-10">Error loading earnings data</div>;
  const earningStatics = [
    {
      title: "Total Ride Cost",
      value: `N ${earningsData?.data.totalRideCost || '0'}`,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Total Admin Earnings",
      value: `N ${earningsData?.data.tolalAdminCommission || '0'}`,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Total Riders Earnings",
      value: `N ${earningsData?.data.totalRiderEarnings || '0'}`,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
  ];
  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Earning Report</h1>
        </HorizontalAlign>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {earningStatics.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <HorizontalAlign>
          <ItemGap>
            <Dropdown
              options={DateDropOptions}
              onChange={handleDateFilter}
              placeholder="Today"
              position="left-0"
              value={selectedDate}
            />
            <Dropdown
              options={bulkOptions}
              onChange={() => { }}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <SearchFilter
              handleFunction={handleSearch}
              value={searchQuery}
            />
          </ItemGap>
        </HorizontalAlign>
        <TableCan
          heading="Earning Report"
          showHeading={true}
          headerTr={['rider name', 'user name', 'order id', 'date', 'total amount']}
          dataTr={filteredEarnings}
          TrName={EarningRow}
        />
      </div>
    </>
  );
};

export default Earning;