import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TableCan from '../../components/TableCan';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Filter from '../../components/Filter';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/buttons/Button';
import SearchFilter from '../../components/SearchFilter';
import LocalizationRow from './component/LocalizationRow';
import AddLocationModal from './component/AddLocationModal';
import { DateDropOptions } from '../../components/FilterData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createLocation, deleteLocation, fetchGetLocations, updateLocation } from '../../queries/location';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

interface Location {
    id: string;
    country: string;
    state: string;
    createdAt?: string; // Add this field if it exists in your data
}

const Localization: React.FC = () => {
    const navigate = useNavigate();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('9999'); // Default to 'All time'

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<Location | null>(null);

    const { data: rawLocation, isLoading, error, refetch } = useQuery({
        queryKey: ['location'],
        queryFn: fetchGetLocations,
    });
    const filteredLocations = useMemo(() => {
        if (!rawLocation) return [];

        return rawLocation.filter((location: any) => {
            // Search filter
            const searchMatch = 
                location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.state.toLowerCase().includes(searchTerm.toLowerCase());

            // Date filter
            const daysAgo = parseInt(selectedPeriod);
            if (!daysAgo) return searchMatch; // If no date filter selected, only apply search

            const locationDate = location.createdAt ? new Date(location.createdAt) : new Date();
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

            return searchMatch && locationDate >= cutoffDate;
        });
    }, [rawLocation, searchTerm, selectedPeriod]);

    const { mutate: createMutation, isPending: isCreating } = useMutation({
        mutationKey: ['createLocation'],
        mutationFn: createLocation,
        onSuccess: () => {
            refetch();
            setIsModalOpen(false);
            setEditData(null);
            toast.success('Location added Successfully');
        },
        onError: (error) => {
            toast.error(error);
            console.error('Error creating location:', error);
        },
    });

    const { mutate: updateMutation, isPending: isUpdating } = useMutation({
        mutationKey: ['updateLocation'],
        mutationFn: ({ id, location }: { id: string; location: { country: string; state: string } }) =>
            updateLocation(id, location),
        onSuccess: () => {
            refetch();
            setIsModalOpen(false);
            setEditData(null);
            toast.success('Location Updated Successfully');
        },
        onError: (error) => {
            toast.error(error);
            console.error('Error updating location:', error);
        },
    });

    const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
        mutationKey: ['deleteLocation'],
        mutationFn: deleteLocation,
        onSuccess: () => {
            refetch();
            toast.success('Location deleted Successfully');
        },
        onError: (error) => {
            console.error('Error deleting location:', error);
            toast.error(error);
        },
    });

    const handleAddLocation = (data: { country: string; state: string }) => {
        if (editData) {
            updateMutation({ id: editData.id!, location: data });
        } else {
            createMutation(data);
        }
    };

    const handleEditLocation = (location: Location) => {
        setEditData(location);
        setIsModalOpen(true);
    };

    const handleDeleteLocation = (id: string) => {
        deleteMutation(id);
    };

    if (isLoading) return <Loader />

    return (
        <>
            <div className="bg-white">
                <HorizontalAlign havsShadow={true}>
                    <h1 className="text-2xl font-semibold px-6">Tracking & Location</h1>
                    <ItemGap className="px-6">
                        <Filter
                            tabs={[
                                { value: "/tracking&location", name: "Live location" },
                                { value: "/tracking&location/localization", name: "Localization" },
                            ]}
                            activeTab="Localization"
                            handleValue={(path) => navigate(path)}
                        />
                    </ItemGap>
                </HorizontalAlign>
            </div>

            <div className="flex flex-col gap-6 p-6">
                <HorizontalAlign>
                    <Dropdown
                        options={DateDropOptions}
                        onChange={(date) => setSelectedPeriod(date)}
                        placeholder="Periods"
                        position="left-0"
                    />

                    <ItemGap>
                        <Button handleFunction={() => setIsModalOpen(true)}>
                            {editData ? "Edit Location" : "Add New"}
                        </Button>
                        <SearchFilter
                            handleFunction={(e: string) => setSearchTerm(e)}
                        
                        />
                    </ItemGap>
                </HorizontalAlign>

                <TableCan
                    dataTr={filteredLocations}
                    headerTr={['country', 'state', 'other']}
                    TrName={LocalizationRow}
                    TrPropsName={{
                        onEdit: handleEditLocation,
                        onDelete: handleDeleteLocation,
                    }}
                />
            </div>

            <AddLocationModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditData(null);
                }}
                onSave={handleAddLocation}
                editData={editData}
            />
        </>
    );
};

export default Localization;