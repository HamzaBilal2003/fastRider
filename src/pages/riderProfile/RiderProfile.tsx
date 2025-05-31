import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
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
import { API_DOMAIN_Img } from '../../apiConfig';
import { EditUserQuery } from '../../queries/user/UserDetail';
import { toast } from 'react-toastify';

const RiderProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = useLocation();
  console.log(url);
  const { username } = useParams();
  const { data: riderdata, isLoading, error,refetch } = useQuery({
    queryKey: ['rider'],
    queryFn: () => fetchRidersDetail(Number(username))
  })
  const handleDetailsClick = (e: any) => {
    console.log(e.target.value);
  }
  const userData = {
    name: riderdata?.data.name,
    email: riderdata?.data.email,
    phoneNumber: riderdata?.data.phone,
    profilePicture: riderdata?.data.profile_picture,
    // location: riderdata?.data.,
    // lastLogin: '23/02/25 - 11:22 AM',
    accountCreation: formatCreatedAt(riderdata?.data.created_at),
    walletBalance: formatAmount(riderdata?.data.wallet.balance),
    status: riderdata?.data.is_active == 1 ? 'online' : 'offline',
  };
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
      EditQuery({ data: formData, id: riderdata?.data.id })
    } catch (error: any) {
      console.error('Error updating user profile: ', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };
  const handleEdit = () => {
    console.log('handle edit');
    setIsModalOpen(true);
  }
  if (isLoading) return <Loader />;
  if (error) {
    console.error('Error fetching rider details: ', error);
    return <div>Error fetching rider details</div>;
  }

  return (
    <>
      <ProfileHeader url='activity' username={username} handlePeriod={handleDetailsClick} />
      <div className='flex flex-col gap-6 p-6'>
        <UserProfile isRider={true} userData={userData} handleEdit={handleEdit} />
        {/* <ItemGap>
          <Dropdown
            options={onlineStatus}
            onChange={handleDetailsClick}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkOptions}
            onChange={handleDetailsClick}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemGap> */}
        <TableCan
          heading='User Activity'
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
        isPending={isPending}
        userData={{
          name: riderdata?.data.name,
          email: riderdata?.data.email,
          phone: riderdata?.data.phone,
          profile_picture: API_DOMAIN_Img + riderdata?.data.profile_picture,
          is_active: riderdata?.data.is_active
        }}
      />
    </>
  )
}

export default RiderProfile