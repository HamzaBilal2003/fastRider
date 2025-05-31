import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Button from '../../components/buttons/Button';
import Dropdown from '../../components/Dropdown';
import SearchFilter from '../../components/SearchFilter';
import { bulkOptions, DateDropOptions } from '../../components/FilterData';
import TableCan from '../../components/TableCan';
import NotificationRow from './component/NotificationRow';
import NotificationModal, { NotificationFormValues } from './component/NotificationModal';
import DeleteConfirmationModal from './component/DeleteConfirmationModal';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchNotification, NotificationData, createNotification, updateNotification, deleteNotification } from '../../queries/notification/notification';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('9999'); 

  const { data: queryData, isLoading, error, refetch } = useQuery({
    queryKey: ['notification'],
    queryFn: () => fetchNotification(),
  });

  const { mutate: createMutation, isPending: isCreating, error: creatingError } = useMutation({
    mutationKey: ['createNotification'],
    mutationFn: (data: FormData) => createNotification(data),
    onSuccess: () => {
      toast.success('Created Successfully!')
      refetch();
      setIsNotificationModalOpen(false);
      setSelectedNotification(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const { mutate: updateMutation, isPending: isUpdating, error: updatingError } = useMutation({
    mutationKey: ['updateNotification'],
    mutationFn: ({ data, id }: { data: FormData; id: number }) => updateNotification(data, id),
    onSuccess: () => {
      toast.success('Updated Successfully!')
      refetch();
      setIsNotificationModalOpen(false);
      setSelectedNotification(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const { mutate: deleteMutation, isPending: isdeleting, error: DeletingError } = useMutation({
    mutationKey: ['deleteNotification'],
    mutationFn: (id: number) => deleteNotification(id),
    onSuccess: () => {
      refetch();
      setIsDeleteModalOpen(false);
      toast.success('Deleted Successfully!')
      setSelectedNotification(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const confirmDelete = () => {
    if (selectedNotification) {
      deleteMutation(selectedNotification.id);
    }
  };

  const handleNotificationSubmit = async (values: NotificationFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('location', values.location);
    if (values.image instanceof File || typeof values.image === 'string') {
      formData.append('image', values.image);
    }

    if (modalMode === 'create') {
      createMutation(formData);
    } else if (modalMode === 'edit' && selectedNotification) {
      updateMutation({ data: formData, id: selectedNotification.id });
    }
  };

  const handleEdit = (notification: NotificationData) => {
    setSelectedNotification(notification);
    setModalMode('edit');
    setIsNotificationModalOpen(true);
  };

  const handleDelete = (notification: NotificationData) => {
    setSelectedNotification(notification);
    setIsDeleteModalOpen(true);
  };

  const filteredNotifications = React.useMemo(() => {
    if (!queryData) return [];
    return queryData.notifications.filter((notification: NotificationData) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.location.toLowerCase().includes(searchTerm.toLowerCase());

      const bookingDate = new Date(notification.created_at).getTime();
      const now = Date.now();
      const daysAgo = (now - bookingDate) / (1000 * 60 * 60 * 24);
      const matchesDate = selectedPeriod === "9999" || daysAgo <= parseInt(selectedPeriod);

      return matchesSearch  && matchesDate;
    });
  }, [queryData, searchTerm, selectedPeriod]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error loading notifications</div>;
  }

  return (
    <>
      <div className='bg-white'>
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6">
            Notification
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
              onChange={(e) => setSelectedPeriod(e)}
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
            <Button handleFunction={() => {
              setModalMode('create');
              setSelectedNotification(null);
              setIsNotificationModalOpen(true);
            }}>
              Send Notification
            </Button>
            <SearchFilter handleFunction={setSearchTerm} />
          </ItemGap>
        </HorizontalAlign>

        <TableCan
          heading="Latest Notifications"
          showHeading={true}
          headerTr={['Notification', 'Image', 'Location', 'Date', 'Actions']}
          dataTr={filteredNotifications}
          TrName={NotificationRow}
          TrPropsName={{
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
        />
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => {
          setIsNotificationModalOpen(false);
          setSelectedNotification(null);
        }}
        onSubmit={handleNotificationSubmit}
        isPending={isCreating || isUpdating}
        initialValues={selectedNotification ? {
          id: selectedNotification.id.toString(),
          title: selectedNotification.title,
          content: selectedNotification.content,
          location: selectedNotification.location,
          image: selectedNotification.image,
          imageUrl: selectedNotification.image,
        } : undefined}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedNotification(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Notification;