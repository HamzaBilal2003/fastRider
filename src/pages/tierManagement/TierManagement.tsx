import React, { useState, useMemo } from 'react';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Button from '../../components/buttons/Button';
import Dropdown from '../../components/Dropdown';
import TableCan from '../../components/TableCan';
import TierRow from './component/TierRow';
import TierModal from './component/TierModal';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTiers, TierResponse, createTier, updateTier, deleteTier } from '../../queries/tier';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import SearchFilter from '../../components/SearchFilter';

const TierManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('9999'); // Default to "All time"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<TierResponse | null>(null);

    const { data: rawTier, isLoading, error, refetch } = useQuery({
        queryKey: ['tier'],
        queryFn: fetchTiers,
    });

    const { mutate: createMutation, isPending: isCreating } = useMutation({
        mutationKey: ['createTier'],
        mutationFn: createTier,
        onSuccess: () => {
            toast.success('Tier created successfully!');
            refetch();
            setIsModalOpen(false);
            setEditData(null);
        },
        onError: (error) => {
            toast.error(`Error creating tier: ${error.message}`);
        },
    });

    const { mutate: updateMutation, isPending: isUpdating } = useMutation({
        mutationKey: ['updateTier'],
        mutationFn: ({ id, data }: { id: number; data: Partial<TierResponse> }) => updateTier(id, data),
        onSuccess: () => {
            toast.success('Tier updated successfully!');
            refetch();
            setIsModalOpen(false);
            setEditData(null);
        },
        onError: (error) => {
            toast.error(`Error updating tier: ${error.message}`);
        },
    });

    const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
        mutationKey: ['deleteTier'],
        mutationFn: deleteTier,
        onSuccess: () => {
            toast.success('Tier deleted successfully!');
            refetch();
        },
        onError: (error) => {
            toast.error(`Error deleting tier: ${error.message}`);
        },
    });

    const filteredTiers = useMemo(() => {
        if (!rawTier) return [];

        return rawTier.filter((tier) => {
            const matchesSearch =
                tier.tier.toString().includes(searchTerm) ||
                tier.commission.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tier.status.toLowerCase().includes(searchTerm.toLowerCase());

            const tierDate = new Date(tier.created_at).getTime();
            const now = Date.now();
            const daysAgo = (now - tierDate) / (1000 * 60 * 60 * 24);
            const matchesDate = selectedPeriod === '9999' || daysAgo <= parseInt(selectedPeriod);

            return matchesSearch && matchesDate;
        });
    }, [rawTier, searchTerm, selectedPeriod]);

    const handleAddOrEditTier = (data: Partial<TierResponse>) => {
        if (editData) {
            updateMutation({ id: editData.id, data });
        } else {
            createMutation(data);
        }
    };

    const handleEditTier = (tier: TierResponse) => {
        setEditData(tier);
        setIsModalOpen(true);
    };

    const handleDeleteTier = (id: number) => {
        deleteMutation(id);
    };

    if (isLoading) return <Loader />;
    if (error) return <div>Error loading tiers</div>;

    return (
        <>
            <div className="bg-white">
                <HorizontalAlign havsShadow={true}>
                    <h1 className="text-2xl font-semibold px-6">
                        <span className="text-black/50">Rider Management</span> / Tier Management
                    </h1>
                </HorizontalAlign>
            </div>
            <div className="p-6 flex flex-col gap-6">
                <HorizontalAlign>
                        <Dropdown
                            options={[
                                { name: 'Today', value: '1' },
                                { name: 'This week', value: '7' },
                                { name: 'Last month', value: '30' },
                                { name: 'Last 6 months', value: '180' },
                                { name: 'Last year', value: '365' },
                                { name: 'All time', value: '9999' },
                            ]}
                            onChange={(value) => setSelectedPeriod(value)}
                            placeholder="Period"
                            position="left-0"
                        />
                    <ItemGap>
                        <Button handleFunction={() => setIsModalOpen(true)}>Add New</Button>
                        <SearchFilter handleFunction={setSearchTerm} />
                    </ItemGap>
                </HorizontalAlign>
                <TableCan
                    heading="Tiers"
                    showHeading={true}
                    headerTr={[
                        'Tier Number',
                        'No of Riders',
                        'Commission',
                        'Tier Amount',
                        'Date Created',
                        'Status',
                        'Action',
                    ]}
                    dataTr={filteredTiers}
                    TrName={TierRow}
                    TrPropsName={{
                        onEdit: handleEditTier,
                        onDelete: handleDeleteTier,
                    }}
                />
            </div>
            <TierModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditData(null);
                }}
                onSubmit={handleAddOrEditTier}
                initialValues={editData}
                isPending={isCreating || isUpdating}
            />
        </>
    );
};

export default TierManagement;