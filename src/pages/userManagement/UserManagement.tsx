import React, { useState, useMemo } from "react";
import Dropdown from "../../components/Dropdown";
import HorizontalAlign from "../../components/HorizontalAlign";
import { bulkOptions, DateDropOptions, onlineStatus } from "../../components/FilterData";
import StatCard from "../../components/StatCard";
import Button from "../../components/buttons/Button";
import ItemGap from "../../components/ItemGap";
import SearchFilter from "../../components/SearchFilter";
import TableCan from "../../components/TableCan";
import UsersRow from "./components/UsersRow";
import AddUserModal from "./components/AddUserModal";
import { fetchUsersManagement } from "../../queries/user/UserManagement";
import { useQuery } from "@tanstack/react-query";
import images from "../../constants/images";
import Loader from "../../components/Loader";

const UserManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: rawUserManagement, isLoading } = useQuery({
    queryKey: ["usermanagementqueries"],
    queryFn: fetchUsersManagement,
  });

  console.log("Fetch data: ", rawUserManagement);

  // Filter users based on status and search query
  const filteredUsers = useMemo(() => {
    if (!rawUserManagement?.data?.users) return [];
    return rawUserManagement.data.users.filter((user) => {
      const matchesStatus =
        selectedStatus === "all" || user.is_active.toString() === selectedStatus;
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [rawUserManagement, selectedStatus, searchQuery]);

  const handleDateChange = (value: string) => {
    console.log("Selected date range: ", value);
    // Here you would typically fetch data for the selected date range
  };

  const handleStatusChange = (status: string) => {
    console.log("Selected status: ", status);
    setSelectedStatus(status);
  };

  const handleBulkAction = (action: string) => {
    console.log("Bulk action selected: ", action);
    // Implement bulk actions here
  };

  const handleSearch = (query: string) => {
    console.log("Search query: ", query);
    setSearchQuery(query);
  };

  const handleAddUser = (values: any) => {
    console.log("New user data: ", values);
    setIsModalOpen(false);
  };

  const userStatic = [
    {
      title: "Total Users",
      value: rawUserManagement?.data.total_users,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Online Users",
      value: rawUserManagement?.data.active_users,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
    {
      title: "Offline Users",
      value: rawUserManagement?.data.inactive_users,
      description: "+5% increase from last month",
      icon: images.user,
      bgIcon: "bg-[#620748]",
      bgCard: "bg-[#470434]",
      textColor: "white",
      statChangeColor: "text-green-500",
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">User Management</h1>
          <div className="px-6">
            <Dropdown
              options={DateDropOptions}
              onChange={handleDateChange}
              placeholder="This Week"
              position="right-0"
            />
          </div>
        </HorizontalAlign>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {userStatic.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <HorizontalAlign>
          <ItemGap>
            <Dropdown
              options={onlineStatus}
              onChange={handleStatusChange}
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
          heading="Users"
          showHeading={true}
          headerTr={[
            "Username",
            "Email",
            "Phone No",
            "Wallet Balance",
            "Status",
            "Actions",
            "Other",
          ]}
          dataTr={filteredUsers}
          TrName={UsersRow}
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


export default UserManagement;