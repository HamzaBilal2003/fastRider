import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProfileHeader from './component/ProfileHeader';
import UserProfile from './component/UserProfile';
import Dropdown from '../components/Dropdown';
import { bulkOptions } from '../components/FilterData';
import ItemGap from '../components/ItemGap';
import TableCan from '../components/TableCan';
import { userActivities } from '../constants/statisticsData';
import ActivityRow from './component/ActivityRow';
import { fetchUsersDetail } from '../queries/user/UserDetail';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_DOMAIN_Img } from '../apiConfig';
import Loader from '../components/Loader';
import AddUserModal from '../pages/userManagement/components/AddUserModal';
import { toast } from 'react-toastify';
import { formatAmount } from '../constants/help';
import { updateAdmin } from '../queries/admin/adminManagement';

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'edit'>('edit');
  const { username } = useParams();
  const { data: rawUserDetail, isLoading, error, refetch } = useQuery({
    queryKey: ['userdetail'],
    queryFn: () => fetchUsersDetail(parseInt(username)),
  });

  const { mutate: EditQuery, isPending: updating } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => updateAdmin(id, formData),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      refetch();
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error.message || 'Failed to update profile.');
    },
  });

  const handleEditProfile = (formData: FormData) => {
    try {
      console.log('Submitting profile update with FormData:', formData); // Debugging
      EditQuery({ id: rawUserDetail?.data.id, formData });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const userData = {
    userId: rawUserDetail?.data.id,
    name: rawUserDetail?.data.name,
    email: rawUserDetail?.data.email,
    phoneNumber: rawUserDetail?.data.phone,
    profilePicture: API_DOMAIN_Img + rawUserDetail?.data.profile_picture,
    accountCreation: rawUserDetail?.data.created_at,
    walletBalance: formatAmount(rawUserDetail?.data.wallet ? rawUserDetail?.data.wallet.balance : 0),
    status: rawUserDetail?.data.is_active ,
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading profile</div>;

  return (
    <>
      <ProfileHeader url="activity" userId={username} />
      <div className="flex flex-col gap-6 p-6">
        {!isLoading && <UserProfile handlerefetch={refetch} userData={userData} handleEdit={handleEdit} />}
        <ItemGap>
          <Dropdown
            options={bulkOptions}
            onChange={(action) => console.log('Bulk action selected:', action)}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemGap>
        <TableCan
          heading="User Activity"
          showHeading={true}
          headerTr={['activity', 'date']}
          dataTr={userActivities}
          TrName={ActivityRow}
        />
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEditProfile}
          mode={modalMode}
          isCreating={updating}
          initialValues={{
            name: rawUserDetail?.data.name,
            email: rawUserDetail?.data.email,
            phone: rawUserDetail?.data.phone,
            role: 'user',
            profile_picture: rawUserDetail?.data.profile_picture,
            is_active: rawUserDetail?.data.is_active,
          }}
        />
      </div>
    </>
  );
};

export default Profile;