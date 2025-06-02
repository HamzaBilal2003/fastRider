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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import images from "../../constants/images";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { createAdmin } from "../../queries/admin/adminManagement";

const UserManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: rawUserManagement, isLoading,refetch } = useQuery({
    queryKey: ["usermanagementqueries"],
    queryFn: fetchUsersManagement,
  });

  const { mutate: createUserMutation, isPending: creating } = useMutation({
    mutationFn: (formData: FormData) => createAdmin(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usermanagementqueries"] });
      toast.success("User added successfully");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add user");
    },
  });

  // const { mutate: updateUserMutation, isPending: updating } = useMutation({
  //   mutationFn: ({ id, formData }: { id: number; formData: FormData }) => updateUser(id, formData),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["usermanagementqueries"] });
  //     toast.success("User updated successfully");
  //     setIsModalOpen(false);
  //   },
  //   onError: (error: any) => {
  //     toast.error(error.message || "Failed to update user");
  //   },
  // });

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

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddUser = (formData: FormData) => {
    if (modalMode === "add") {
      createUserMutation(formData);
    }
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setModalMode("add");
    setIsModalOpen(true);
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
              onChange={(value) => console.log("Selected date range: ", value)}
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
              onChange={(action) => console.log("Bulk action selected: ", action)}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <Button handleFunction={openAddModal}>
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
          ]}
          dataTr={filteredUsers}
          TrName={UsersRow}
          TrPropsName={{
            handlerefetch : refetch,
          }}
        />

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
          mode={modalMode}
          isPending={creating}
          initialValues={selectedUser}
        />
      </div>
    </div>
  );
};

export default UserManagement;