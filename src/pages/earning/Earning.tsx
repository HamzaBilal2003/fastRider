import React, { useState } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import { earningStatics, getRating } from "../../constants/statisticsData";
import StatCard from "../../components/StatCard";
import ItemGap from "../../components/ItemGap";
import Dropdown from "../../components/Dropdown";
import SearchFilter from "../../components/SearchFilter";
import { bulkOptions, DateDropOptions } from "../../components/FilterData";
import TableCan from "../../components/TableCan";
import EarningRow from "./component/EarningRow";

const Earning  : React.FC = () => {
  const [filteredData, setFilteredData] = useState(getRating);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [searchQuery, setSearchQuery] = useState<string>("");

  // 🔹 Date Filter
  const handleDateFilter = (selectedOption: string) => {
    // setSelectedDate(selectedOption);
    
    const daysAgo = DateDropOptions.find(option => option.value === selectedOption)?.value;

    if (daysAgo) {
      const today = new Date();
      const filterDate = new Date();
      filterDate.setDate(today.getDate() - parseInt(daysAgo));

      setFilteredData(getRating.filter(item => new Date(item.created_at) >= filterDate));
    } else {
      setFilteredData(getRating); // Reset if "All time" is selected
    }
  };

  // 🔹 Search Filter
  const handleSearch = (query: string) => {
    // setSearchQuery(query);
    setFilteredData(
      getRating.filter(
        item =>
          item.rider.username.toLowerCase().includes(query.toLowerCase()) ||
          item.user.username.toLowerCase().includes(query.toLowerCase()) ||
          item.orderId.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

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
            <Dropdown options={DateDropOptions} onChange={handleDateFilter} placeholder="Today" position="left-0" />
            <Dropdown options={bulkOptions} onChange={() => { }} placeholder="Bulk Actions" position="left-0" />
          </ItemGap>
          <ItemGap>
            <SearchFilter handleFunction={handleSearch} />
          </ItemGap>
        </HorizontalAlign>
        <TableCan
          heading="Earning Report"
          showHeading={true}
          headerTr={['rider name', 'user name', 'order id', 'date', 'Total earned', 'Admin Earning', 'Driver earning']}
          dataTr={filteredData}
          TrName={EarningRow}
        />
      </div>
    </>
  );
};

export default Earning;
