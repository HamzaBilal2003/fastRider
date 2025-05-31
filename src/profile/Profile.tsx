import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ProfileHeader from './component/ProfileHeader';
import UserProfile from './component/UserProfile';
import Dropdown from '../components/Dropdown';
import { bulkOptions } from '../components/FilterData';
import ItemGap from '../components/ItemGap';
import TableCan from '../components/TableCan';
import { userActivities } from '../constants/statisticsData';
import ActivityRow from './component/ActivityRow';
import { EditUserQuery, fetchUsersDetail } from '../queries/user/UserDetail';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_DOMAIN_Img } from '../apiConfig';
import Loader from '../components/Loader';
import AddUserModal from '../pages/userManagement/components/AddUserModal';
import { toast } from 'react-toastify';
import { formatAmount } from '../constants/help';

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = useLocation();
  console.log(url);
  const { username } = useParams();
  const { data: rawUserDetail, isLoading, error, refetch } = useQuery({
    queryKey: ["userdetail"],
    queryFn: () => fetchUsersDetail(parseInt(username)),
  });
  console.log('Fetch data : ', rawUserDetail)
  const handleDetailsClick = (e: any) => {
    console.log(e.target.value);
  }
  const userData = {
    name: rawUserDetail?.data.name,
    email: rawUserDetail?.data.email,
    phoneNumber: rawUserDetail?.data.phone,
    // location: rawUserDetail?.data.loca,
    // lastLogin: '23/02/25 - 11:22 AM',
    profilePicture: API_DOMAIN_Img + rawUserDetail?.data.profile_picture,
    accountCreation: rawUserDetail?.data.created_at,
    walletBalance: formatAmount(rawUserDetail?.data.wallet.balance),
    status: 'online' as const,
  };
  const handleEdit = () => {
    console.log('handle edit');
    setIsModalOpen(true);
  }
  const { mutate: EditQuery, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: any; id: number }) => EditUserQuery(data, id), // API call function
    onSuccess: (data) => {
      toast.success("Edit Profile successfully!");
      refetch();
      setIsModalOpen(false)
    },
    onError: (error: any) => {
      console.error("Edit Profile Error:", error);
      toast.error(error?.response?.data?.message || error.message || "Edit Profile failed.");
    },
  });
  const handleEditProfile = async (values: any) => {
    try {
      console.log('Updating user profile with values: ', values);

      // Create FormData object
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('is_active', values.is_active.toString());

      // Append profile_picture only if it's a file
      if (values.profile_picture && values.profile_picture instanceof File) {
        formData.append('profile_picture', values.profile_picture);
      }
      EditQuery({ data: formData, id: rawUserDetail?.data.id })
    } catch (error: any) {
      console.error('Error updating user profile: ', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };


  if (isLoading) return <Loader />;
  return (
    <>
      {/* handlePeriod={handleDetailsClick} */}
      <ProfileHeader url='activity' userId={username} />
      <div className='flex flex-col gap-6 p-6'>
        <UserProfile userData={userData} handleEdit={handleEdit} />
        <ItemGap>
          {/* <Dropdown
            options={onlineStatus}
            onChange={handleDetailsClick}
            placeholder="Status"
            position="left-0"
          /> */}
          <Dropdown
            options={bulkOptions}
            onChange={handleDetailsClick}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemGap>
        <TableCan
          heading='User Activity'
          showHeading={true}
          headerTr={['activity', 'date']}
          dataTr={userActivities}
          TrName={ActivityRow}
        />
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEditProfile}
          isPending={isPending}
          userData={{
            name: rawUserDetail?.data.name,
            email: rawUserDetail?.data.email,
            phone: rawUserDetail?.data.phone,
            profile_picture: API_DOMAIN_Img + rawUserDetail?.data.profile_picture,
            is_active: rawUserDetail?.data.is_active
          }}
        />
      </div>
    </>
  )
}

export default Profile