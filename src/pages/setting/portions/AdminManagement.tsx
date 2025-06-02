import React, { useState, useMemo } from "react";
import SettingHeader from "../component/SettingHeader";
import StatCard from "../../../components/StatCard";
import HorizontalAlign from "../../../components/HorizontalAlign";
import Dropdown from "../../../components/Dropdown";
import { onlineStatus } from "../../../components/FilterData";
import ItemGap from "../../../components/ItemGap";
import Button from "../../../components/buttons/Button";
import SearchFilter from "../../../components/SearchFilter";
import TableCan from "../../../components/TableCan";
import AdminRow from "../component/AdminRow";
import AdminModal from "../component/AdminModal";
import { useNavigate } from "react-router-dom";
import { fetchAdminsManagement, createAdmin, updateAdmin } from "../../../queries/admin/adminManagement";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import images from "../../../constants/images";

const AdminManagement: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const { data: queryData, isLoading, error } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: fetchAdminsManagement,
    });

    const { mutate: addAdminMutation, isPending: creating } = useMutation({
        mutationFn: (formData: FormData) => createAdmin(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            toast.success('Admin added successfully');
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to add admin');
        }
    });

    const { mutate: updateAdminMutation, isPending: updating } = useMutation({
        mutationFn: ({ id, formData }: { id: number; formData: FormData }) => updateAdmin(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            toast.success('Admin updated successfully');
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update admin');
        }
    });

    // Filter users based on status and search query
    const filteredUsers = useMemo(() => {
        if (!queryData) return [];
        return queryData.admins.filter(user => {
            const matchesStatus = selectedStatus === 'all' || user.is_active == Number(selectedStatus);
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [selectedStatus, searchQuery, queryData]);

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddAdmin = (formData: FormData) => {
        if (modalMode === 'add') {
            addAdminMutation(formData);
        } else if (modalMode === 'edit' && selectedAdmin) {
            updateAdminMutation({ id: selectedAdmin.id, formData });
        }
    };

    const handleEditAdmin = (admin: any) => {
        setSelectedAdmin(admin);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setSelectedAdmin(null);
        setModalMode('add');
        setIsModalOpen(true);
    };

    if (isLoading) return <Loader />;
    const adminStatics = [
        {
            title: "Total Admins",
            value: queryData?.total,
            icon: images.user,
            bgIcon: "bg-[#620748]",
            bgCard: "bg-[#470434]",
            textColor: "white",
            statChangeColor: "text-green-500",
        },
        {
            title: "Online Admins",
            value: queryData?.active,
            icon: images.user,
            bgIcon: "bg-[#620748]",
            bgCard: "bg-[#470434]",
            textColor: "white",
            statChangeColor: "text-green-500",
        },
        {
            title: "Offline Admins",
            value: queryData?.inactive,
            icon: images.user,
            bgIcon: "bg-[#620748]",
            bgCard: "bg-[#470434]",
            textColor: "white",
            statChangeColor: "text-green-500",
        },
    ];

    return (
        <>
            <SettingHeader url={'Admin Management'} />
            <div className="flex p-6 flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {adminStatics.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <HorizontalAlign>
                    <Dropdown
                        options={onlineStatus}
                        onChange={handleStatusChange}
                        placeholder="Status"
                        position="left-0"
                    />
                    <ItemGap>
                        <Button handleFunction={openAddModal}>
                            Add New
                        </Button>
                        <Button handleFunction={() => navigate('/settings/admin/management')}>
                            Role Management
                        </Button>
                        <SearchFilter handleFunction={handleSearch} />
                    </ItemGap>
                </HorizontalAlign>

                <TableCan
                    heading="Users"
                    showHeading={true}
                    headerTr={['Username', 'Role', 'Date Joined', 'Status', 'Actions']}
                    dataTr={filteredUsers}
                    TrName={AdminRow}
                    TrPropsName={{
                        onEdit: handleEditAdmin,
                    }}
                />

                <AdminModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddAdmin}
                    mode={modalMode}
                    isPending={creating || updating}
                    initialValues={selectedAdmin}
                />
            </div>
        </>
    );
};

export default AdminManagement;