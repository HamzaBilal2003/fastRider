import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from './component/ProfileHeader';
import UserProfile from './component/UserProfile';
import ActivityRow from './component/ActivityRow';
import TableCan from '../../components/TableCan';
import { userActivities } from '../../constants/statisticsData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchRidersDetail } from '../../queries/rider/riderDetail';
import { formatAmount, formatCreatedAt } from '../../constants/help';
import AddUserModal from '../userManagement/components/AddUserModal';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { updateAdmin } from '../../queries/admin/adminManagement';

const RiderProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const { data: riderdata, isLoading, error, refetch } = useQuery({
    queryKey: ['rider'],
    queryFn: () => fetchRidersDetail(Number(username)),
  });

  const { mutate: EditQuery, isPending:isUpdating } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => updateAdmin(id, formData),
    onSuccess: () => {
      toast.success('Rider profile updated successfully!');
      refetch();
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      console.error('Error updating rider profile:', error);
      toast.error(error?.response?.data?.message || error.message || 'Failed to update rider profile.');
    },
  });

  const handleEditProfile = (formData: any) => {
    try {
      console.log('Submitting profile update with FormData:', formData); // Debugging
      EditQuery({ id: riderdata?.data.id, formData });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const riderData = {
    userId : riderdata?.data.id,
    name: riderdata?.data.name,
    email: riderdata?.data.email,
    phoneNumber: riderdata?.data.phone,
    profilePicture: riderdata?.data.profile_picture,
    accountCreation: formatCreatedAt(riderdata?.data.created_at),
    walletBalance: formatAmount(riderdata?.data.wallet ? riderdata?.data.wallet.balance : 0),
    status: riderdata?.data.is_active,
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching rider details</div>;

  return (
    <>
      <ProfileHeader url="activity" username={username} />
      <div className="flex flex-col gap-6 p-6">
        <UserProfile handlerefetch={refetch} isRider={true} userData={riderData} handleEdit={handleEdit} />
        <TableCan
          heading="User Activity"
          showHeading={true}
          headerTr={['activity', 'date']}
          dataTr={userActivities}
          TrName={ActivityRow}
        />
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEditProfile}
        mode="edit"
        isCreating={isUpdating}
        initialValues={{
          name: riderdata?.data.name,
          email: riderdata?.data.email,
          phone: riderdata?.data.phone,
          profile_picture: riderdata?.data.profile_picture,
          is_active: riderdata?.data.is_active,
          role: 'rider',
        }}
      />
    </>
  );
};

export default RiderProfile;