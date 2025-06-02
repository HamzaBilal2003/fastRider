import React, { useEffect, useState } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import Dropdown from "../../components/Dropdown";
import ItemGap from "../../components/ItemGap";
import { bulkOptions, DateDropOptions } from "../../components/FilterData";
import SearchFilter from "../../components/SearchFilter";
import TableCan from "../../components/TableCan";
import RatingRow from "./components/RatingRow";
import { useQuery } from "@tanstack/react-query";
import { fetchReview } from "../../queries/report/report";

const Rating: React.FC = () => {
  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ['ratings'],
    queryFn: fetchReview,
  });

  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState<number>(30); // days
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!queryData?.data) return;

    const now = new Date();
    const filtered = queryData.data.filter((item: any) => {
      // Filter by date
      const createdAt = new Date(item.created_at);
      const daysOld = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const withinDateRange = daysOld <= dateRange;

      // Filter by search query
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        item.to_user?.name?.toLowerCase().includes(lowerQuery) ||
        item.from_user?.name?.toLowerCase().includes(lowerQuery);
      return withinDateRange && (!searchQuery || matchesSearch);
    });

    setFilteredData(filtered);
  }, [queryData, dateRange, searchQuery]);

  const handleDateFilter = (value: string) => {
    setDateRange(Number(value));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
            <Dropdown
              options={DateDropOptions}
              onChange={(val: string) => handleDateFilter(val)}
              placeholder="Today"
              position="left-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={() => {}}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <SearchFilter handleFunction={handleSearch} />
          </ItemGap>
        </HorizontalAlign>

        <TableCan
          heading="Reviews & Ratings"
          showHeading={true}
          headerTr={['rider name', 'user name', 'order id', 'date', 'rating', 'comment']}
          dataTr={filteredData}
          TrName={RatingRow}
        />
      </div>
    </>
  );
};

export default Rating;
