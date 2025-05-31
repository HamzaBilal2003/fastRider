import React, { useState, useMemo } from "react";
import Dropdown from "../../components/Dropdown";
import HorizontalAlign from "../../components/HorizontalAlign";
import { bulkOptions, DateDropOptions, onlineStatus, riderStatus, tierStatus } from "../../components/FilterData";
import { riderTableStatic } from '../../constants/statisticsData'
import StatCard from "../../components/StatCard";
import Button from "../../components/buttons/Button";
import ItemGap from "../../components/ItemGap";
import SearchFilter from "../../components/SearchFilter";
import TableCan from "../../components/TableCan";
import AddUserModal from "../userManagement/components/AddUserModal";
import RiderRow from "./component/RiderRow";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { fetchRidersManagement } from "../../queries/rider/riderManagement";
import { useQuery } from "@tanstack/react-query";
import images from "../../constants/images";

const RiderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: riders, isLoading, error } = useQuery({
    queryKey: ['riders'],
    queryFn: fetchRidersManagement,
    refetchOnWindowFocus: false,
    retry: 1,
  })


  // const [selectedDate, setSelectedDate] = useState('7'); // Default to "This week"
  const [selectedRiderStatus, setSelectedRiderStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedOnlineStatus, setSelectedOnlineStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter riders based on all criteria
  const filteredRiders = useMemo(() => {
    if (!riders) return [];

    return riders.data.users.filter(rider => {
      const matchesRiderStatus = selectedRiderStatus === 'all' || rider.is_active === Number(selectedRiderStatus);
      // const matchesTier = selectedTier === 'all' || rider.tier.toLowerCase() === selectedTier.toLowerCase();
      const matchesOnlineStatus = selectedOnlineStatus === 'all' || rider.is_active === Number(selectedOnlineStatus);
      const matchesSearch = rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rider.phone.toLowerCase().includes(searchQuery.toLowerCase());
// && matchesTier
      return matchesRiderStatus  && matchesOnlineStatus && matchesSearch;
    });
  }, [selectedRiderStatus, selectedTier, selectedOnlineStatus, searchQuery,riders]);

  const handleDateChange = (value: string) => {
    // setSelectedDate(value);
    console.log(value)
    // Here you would typically fetch data for the selected date range
  };

  const handleRiderStatusChange = (status: string) => {
    setSelectedRiderStatus(status);
  };

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
  };

  const handleOnlineStatusChange = (status: string) => {
    setSelectedOnlineStatus(status);
  };

  const handleBulkAction = (action: string) => {
    console.log("Bulk action selected:", action);
    // Implement bulk actions here
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddUser = (values: any) => {
    console.log("New user data:", values);
    setIsModalOpen(false);
  };
  const riderStats = [
    {
      title: "Total Rider",
      value: riders?.data.total_users,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Active Rider",
      value: riders?.data.active_users,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Inactive Rider",
      value: riders?.data.inactive_users,
      description: "+5% increase from last month",
      icon: images.rider,
      bgIcon: "bg-[#601A08]",
      bgCard: "bg-[#471204]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
  ]
  if (isLoading) return <Loader />;
  if (error) return <div className="p-8 text-center">Error loading riders</div>;
  return (
    <div className="">
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">Rider Management</h1>
          <div className="px-6">
            <ItemGap>
              <Button handleFunction={() => navigate('/rider/management/tiers')}>
                Manage Tiers
              </Button>
              <Dropdown
                options={DateDropOptions}
                onChange={handleDateChange}
                placeholder="This Week"
                position="right-0"
              />
            </ItemGap>
          </div>
        </HorizontalAlign>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {riderStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <HorizontalAlign>
          <ItemGap>
            <Dropdown
              options={riderStatus}
              onChange={handleRiderStatusChange}
              placeholder="All"
              position="left-0"
            />
            <Dropdown
              options={tierStatus}
              onChange={handleTierChange}
              placeholder="Tiers"
              position="left-0"
            />
            <Dropdown
              options={onlineStatus}
              onChange={handleOnlineStatusChange}
              placeholder="Status"
              position="left-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={handleBulkAction}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <Button handleFunction={() => setIsModalOpen(true)}>
              Add New User
            </Button>
            <SearchFilter handleFunction={handleSearch} />
          </ItemGap>
        </HorizontalAlign>

        <TableCan
          heading="All Riders"
          showHeading={true}
          headerTr={['Rider Name', 'Email', 'Phone No', 'Wallet Balance', 'Status', 'tier', 'Actions', 'Other']}
          dataTr={filteredRiders}
          TrName={RiderRow}
        />

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
        />
      </div>
    </div>
  );
};

export default RiderManagement;