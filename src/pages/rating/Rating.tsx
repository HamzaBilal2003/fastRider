import React, { useState } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import Dropdown from "../../components/Dropdown";
import ItemGap from "../../components/ItemGap";
import { bulkOptions, DateDropOptions } from "../../components/FilterData";
import SearchFilter from "../../components/SearchFilter";
import TableCan from "../../components/TableCan";
import { getRating } from "../../constants/statisticsData";
import RatingRow from "./components/RatingRow";

const Rating  : React.FC= () => {
  const [filteredData, setFilteredData] = useState(getRating);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle Date Dropdown Filter
  const handleDateFilter = (selectedOption: string) => {
    // setSelectedDate(selectedOption);

    if (selectedOption === "Today") {
      const today = new Date().toISOString().split("T")[0];
      setFilteredData(getRating.filter(item => item.created_at.startsWith(today)));
    } else if (selectedOption === "Last 7 Days") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      setFilteredData(getRating.filter(item => new Date(item.created_at) >= lastWeek));
    } else {
      setFilteredData(getRating); // Reset filter
    }
  };

  // Handle Search Input
  const handleSearch = (query: string) => {
    // setSearchQuery(query);

    setFilteredData(
      getRating.filter(
        item =>
          item.rider.username.toLowerCase().includes(query.toLowerCase()) ||
          item.user.username.toLowerCase().includes(query.toLowerCase()) ||
          item.orderId.toLowerCase().includes(query.toLowerCase()) ||
          item.comment?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Reviews & Ratings</h1>
        </HorizontalAlign>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <HorizontalAlign>
          <ItemGap>
            <Dropdown options={DateDropOptions} onChange={handleDateFilter} placeholder="Today" position="left-0" />
            <Dropdown options={bulkOptions} onChange={() => {}} placeholder="Bulk Actions" position="left-0" />
          </ItemGap>
          <ItemGap>
            <SearchFilter handleFunction={(e:string) =>  handleSearch(e)} />
          </ItemGap>
        </HorizontalAlign>
        <TableCan 
          heading="Reviews & Ratings"
          showHeading={true}
          headerTr={['rider name','user name','order id','date','rating','comment']}
          dataTr={filteredData}
          TrName={RatingRow}
        />
      </div>
    </>
  );
};

export default Rating;
