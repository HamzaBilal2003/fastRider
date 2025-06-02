import React from 'react'
import SettingHeader from '../component/SettingHeader'
import UserProfile from '../../../profile/component/UserProfile';
import ItemGap from '../../../components/ItemGap';
import Dropdown from '../../../components/Dropdown';
import TableCan from '../../../components/TableCan';
import ActivityRow from '../../../profile/component/ActivityRow';
import { userActivities } from '../../../constants/statisticsData';
import { bulkOptions, DateDropOptions } from '../../../components/FilterData';
import { useQuery } from '@tanstack/react-query';
import { fetchUsersDetail } from '../../../queries/user/UserDetail';
import { useParams } from 'react-router-dom';
import { formatCreatedAt } from '../../../constants/help';
import { API_DOMAIN_Img } from '../../../apiConfig';

const AdminDetail: React.FC = () => {
    const {username} = useParams();
    const { data: rawUserDetail, isLoading, error, refetch } = useQuery({
        queryKey: ["userdetail"],
        queryFn: () => fetchUsersDetail(parseInt(username)),
    });
    console.log(rawUserDetail);
    const userData = {
        userId: rawUserDetail?.data.id,
        name: rawUserDetail?.data.name ? rawUserDetail?.data.name : '',
        email: rawUserDetail?.data.email ? rawUserDetail?.data.email : '',
        phoneNumber: rawUserDetail?.data.phone ? rawUserDetail?.data.phone : '',
        accountCreation: formatCreatedAt(rawUserDetail?.data.created_at),
        profilePicture : rawUserDetail?.data.profile_picture ? API_DOMAIN_Img+ rawUserDetail?.data.profile_picture  : '',
        status: rawUserDetail?.data.is_active,
    };
    const handleDetailsClick = (e: any) => {
        console.log(e);
    }

    return (
        <>

            <SettingHeader url='Admin Management' />
            <div className='flex flex-col gap-6 p-6'>
                <UserProfile handlerefetch={refetch} disabledLeft={true} userData={userData} />
                <ItemGap>
                    <Dropdown
                        options={DateDropOptions}
                        onChange={handleDetailsClick}
                        placeholder="Period"
                        position="left-0"
                    />
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
            </div>
        </>
    )
}

export default AdminDetail