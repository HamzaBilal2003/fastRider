import React, { useState } from 'react';
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

interface Location {
    id: string;
    country: string;
    state: string;
    other: string;
}

const Localization: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<Location | null>(null);
    const [locations, setLocations] = useState<Location[]>([
        { id: '1', country: 'Nigeria', state: 'Lagos', other: 'Active' },
        { id: '2', country: 'Ghana', state: 'Accra', other: 'Active' },
    ]);

    const tabs = [
        { value: "/tracking&location", name: "Live location" },
        { value: "/tracking&location/localization", name: "Localization" },
    ];

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleRegionFilter = (region: string) => {
        console.log("Region selected:", region);
    };

    const handleAddLocation = (data: { country: string; state: string }) => {
        if (editData) {
            // Update existing record
            setLocations(locations.map(loc =>
                loc.id === editData.id ? { ...loc, country: data.country, state: data.state } : loc
            ));
            setEditData(null);
        } else {
            // Add new record
            const newLocation: Location = {
                id: Date.now().toString(),
                country: data.country,
                state: data.state,
                other: 'Active'
            };
            setLocations([...locations, newLocation]);
        }
        setIsModalOpen(false);
    };

    const handleEditLocation = (location: Location) => {
        setEditData(location);
        setIsModalOpen(true);
    };

    const handleDeleteLocation = (id: string) => {
        setLocations(locations.filter(location => location.id !== id));
    };

    return (
        <>
            <div className="bg-white">
                <HorizontalAlign havsShadow={true}>
                    <h1 className="text-2xl font-semibold px-6">Settings</h1>
                    <ItemGap className="px-6">
                        <Filter
                            tabs={tabs}
                            activeTab="Localization"
                            handleValue={handleNavigate}
                        />
                    </ItemGap>
                </HorizontalAlign>
            </div>

            <div className="flex flex-col gap-6 p-6">
                <HorizontalAlign>
                    <Dropdown
                        options={DateDropOptions}
                        onChange={handleRegionFilter}
                        placeholder="Region"
                        position="left-0"
                    />
                    <ItemGap>
                        <Button handleFunction={() => setIsModalOpen(true)}>
                            {editData ? "Edit Location" : "Add New"}
                        </Button>
                        <SearchFilter />
                    </ItemGap>
                </HorizontalAlign>

                <TableCan
                    dataTr={locations}
                    headerTr={['country', 'state', 'other']}
                    TrName={LocalizationRow}
                    TrPropsName={{
                        onEdit:  handleEditLocation ,
                        onDelete: handleDeleteLocation 
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
