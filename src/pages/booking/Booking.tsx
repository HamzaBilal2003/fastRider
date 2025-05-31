import React, { useMemo, useState } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import ItemGap from "../../components/ItemGap";
import StatCard from "../../components/StatCard";
import SearchFilter from "../../components/SearchFilter";
import Dropdown from "../../components/Dropdown";
import { bookingStatus, bulkOptions, DateDropOptions } from "../../components/FilterData";
import Filter from "../../components/Filter";
import TableCan from "../../components/TableCan";
import BookingRow from "../transactions/component/BookingRow";
import { fetchbookingsManagement } from "../../queries/booking/booking";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import images from "../../constants/images";

const Booking: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("9999"); // Default to "All time"
  const [searchQuery, setSearchQuery] = useState("");

  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ["bookingmanagement"],
    queryFn: fetchbookingsManagement,
  });

  const bookingsData = queryData?.data?.bookings || []; // Ensure bookingsData is always an array

  const filteredBookings = useMemo(() => {
    return bookingsData.filter((booking) => {
      // Status filter
      const matchesStatus =
        activeStatus === "all" || booking.status.toLowerCase() === activeStatus;

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        booking.sender_name?.toLowerCase().includes(searchLower) ||
        booking.receiver_name?.toLowerCase().includes(searchLower) ||
        booking.parcel_name?.toLowerCase().includes(searchLower) ||
        booking.status.toLowerCase().includes(searchLower);

      // Date range filter
      const bookingDate = new Date(booking.scheduled_date).getTime();
      const now = Date.now();
      const daysAgo = (now - bookingDate) / (1000 * 60 * 60 * 24);
      const matchesDate =
        selectedDateRange === "9999" || daysAgo <= parseInt(selectedDateRange);

      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [bookingsData, activeStatus, searchQuery, selectedDateRange]);

  const BookingsStats = [
    {
      title: "Total Bookings",
      value: queryData?.data.totalBookings,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Active Bookings",
      value: queryData?.data.activeBookings,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Completed Bookings",
      value: queryData?.data.completedBookings,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
  ];

  const handleFilter = (selectedStatus: string) => {
    setActiveStatus(selectedStatus.toLowerCase());
  };

  const handleDateFilter = (selectedRange: string) => {
    setSelectedDateRange(selectedRange);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error("Error fetching bookings data:", error);
    return <div>Error loading bookings data</div>;
  }

  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Bookings</h1>
        </HorizontalAlign>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BookingsStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <HorizontalAlign>
          <ItemGap>
            <Filter
              tabs={bookingStatus}
              activeTab={activeStatus}
              handleValue={handleFilter}
            />
            <Dropdown
              options={DateDropOptions}
              onChange={handleDateFilter}
              placeholder="Period"
              position="right-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={(value: string) => console.log("Bulk action:", value)}
              placeholder="Bulk Actions"
              position="right-0"
            />
          </ItemGap>
          <SearchFilter handleFunction={handleSearch} />
        </HorizontalAlign>

        <TableCan
          heading="All Transactions"
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
          dataTr={filteredBookings}
          TrName={BookingRow}
        />
      </div>
    </>
  );
};

export default Booking;