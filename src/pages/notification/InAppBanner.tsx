import React, { useState, useEffect } from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import ItemGap from "../../components/ItemGap";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import SearchFilter from "../../components/SearchFilter";
import { bulkOptions, DateDropOptions } from "../../components/FilterData";
import TableCan from "../../components/TableCan";
import BannerRow from "./component/BannerRow";
import { BannerStatics } from "../../constants/statisticsData";
import BannerModal from "./component/BannerModal";
import DeleteConfirmationModal from "./component/DeleteConfirmationModal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { bannerResponse, fetchBanner, createBanner, updateBanner, deleteBanner } from "../../queries/banner/banner";

const InAppBanner: React.FC = () => {
  const navigate = useNavigate();
  const [isBannerModalOpen, setBannerModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('9999');
  const { data: queryData, isLoading, error, refetch } = useQuery({
    queryKey: ['notification'],
    queryFn: fetchBanner,
  });
  console.log(queryData, "queryData");

  const filterBanners = React.useMemo(() => {
    if (!queryData) return [];
    return queryData.filter((banner: bannerResponse) => {
      const matchesSearch =
        banner.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.location.toLowerCase().includes(searchTerm.toLowerCase());

      const bookingDate = new Date(banner.created_at).getTime();
      const now = Date.now();
      const daysAgo = (now - bookingDate) / (1000 * 60 * 60 * 24);
      const matchesDate = selectedPeriod === "9999" || daysAgo <= parseInt(selectedPeriod, 10);

      return matchesSearch && matchesDate;
    });
  }, [queryData, searchTerm, selectedPeriod]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePeriodChange = (period: any) => {
    setSelectedPeriod(period);
  };

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationKey: ['createBanner'],
    mutationFn: (data: FormData) => createBanner(data),
    onSuccess: () => {
      refetch();
      setBannerModalOpen(false);
      setSelectedBanner(null);
    },
    onError: (error) => {
      console.error('Error creating banner:', error);
    },
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationKey: ['updateBanner'],
    mutationFn: ({ data, id }: { data: FormData; id: number }) => updateBanner(data, id),
    onSuccess: () => {
      refetch();
      setBannerModalOpen(false);
      setSelectedBanner(null);
    },
    onError: (error) => {
      console.error('Error updating banner:', error);
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ['deleteBanner'],
    mutationFn: (id: number) => deleteBanner(id),
    onSuccess: () => {
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedBanner(null);
    },
    onError: (error) => {
      console.error('Error deleting banner:', error);
    },
  });

  const handleBannerSubmit = (values: bannerResponse) => {
    const formData = new FormData();
    formData.append('location', values.location);
    formData.append('subject', values.subject);
    if (values.image instanceof File || typeof values.image === 'string') {
      formData.append('image', values.image);
    }
    if (modalMode === 'create') {
      createMutation(formData);
    } else if (modalMode === 'edit' && selectedBanner) {
      updateMutation({ data: formData, id: selectedBanner.id });
    }
  };

  const handleEdit = (banner: bannerResponse) => {
    setSelectedBanner(banner);
    setModalMode('edit');
    setBannerModalOpen(true);
  };

  const handleDelete = (banner: bannerResponse) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBanner) {
      deleteMutation(selectedBanner.id);
    }
  };

  return (
    <>
      <div className='bg-white'>
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">
            <span className='text-gray-400'>Admin Management</span> / Role Management
          </h1>
          <div className="px-6">
            <ItemGap>
              <Button handleFunction={() => navigate('/notifications')}>
                In App Notifications
              </Button>
              <Button handleFunction={() => navigate('/notifications/banners')}>
                In App Banners
              </Button>
            </ItemGap>
          </div>
        </HorizontalAlign>
      </div>

      <div className="flex flex-col gap-6 p-6">
        <HorizontalAlign>
          <ItemGap>
            <Dropdown
              options={DateDropOptions}
              onChange={(e) => handlePeriodChange(e)}
              placeholder="Period"
              position="left-0"
            />
            <Dropdown
              options={bulkOptions}
              onChange={() => { }}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemGap>
          <ItemGap>
            <Button
              handleFunction={() => {
                setModalMode('create');
                setSelectedBanner(null);
                setBannerModalOpen(true);
              }}
            >
              Add New In App Banner
            </Button>
            <SearchFilter handleFunction={handleSearch} />
          </ItemGap>
        </HorizontalAlign>
        <TableCan
          heading="Latest Banners"
          showHeading={true}
          headerTr={['Banner image', 'Location', 'Date', 'Actions']}
          dataTr={filterBanners}
          TrName={BannerRow}
          TrPropsName={{
            onEdit: handleEdit,
            onDelete: handleDelete
          }}
        //   <BannerRow 
        //     {...props} 
        //     onEdit={handleEdit} 
        //     onDelete={handleDelete}
        //   />
        // )}
        />
      </div>

      <BannerModal
        isOpen={isBannerModalOpen}
        onClose={() => {
          setBannerModalOpen(false);
          setSelectedBanner(null);
        }}
        onSubmit={handleBannerSubmit}
        initialValues={selectedBanner}
        isPending={isCreating || isUpdating}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBanner(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default InAppBanner;