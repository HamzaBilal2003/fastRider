import React from 'react'
import SettingHeader from '../component/SettingHeader'
import UserProfile from '../../../profile/component/UserProfile';
import ItemGap from '../../../components/ItemGap';
import Dropdown from '../../../components/Dropdown';
import TableCan from '../../../components/TableCan';
import ActivityRow from '../../../profile/component/ActivityRow';
import { userActivities } from '../../../constants/statisticsData';
import { bulkOptions, DateDropOptions } from '../../../components/FilterData';

const AdminDetail : React.FC = () => {
    const userData = {
        name: 'Qamardeen AbdulMalik',
        email: 'qamardeenola@gmail.com',
        phoneNumber: '07012345678',
        location: 'Lagos, Nigeria',
        lastLogin: '23/02/25 - 11:22 AM',
        accountCreation: '10/02/25 - 07:21 AM',
        walletBalance: 25000,
        status: 'online' as const,
    };
    const handleDetailsClick = (e : any) => {
        console.log(e);
    }

    return (
        <>

            <SettingHeader url='Admin Management' />
            <div className='flex flex-col gap-6 p-6'>
                <UserProfile disabledLeft={true} userData={userData} />
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