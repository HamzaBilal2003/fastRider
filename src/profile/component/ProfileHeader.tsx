import React from 'react';
import HorizontalAlign from '../../components/HorizontalAlign';
import Filter from '../../components/Filter';
import { useNavigate } from 'react-router-dom';
import ItemGap from '../../components/ItemGap';

// list of props handlePeriodFunctionDropdown,url
interface props {
    handlePeriod?: (value: string) => void,
    url: string,
    userId: number | string | undefined;
}


const ProfileHeader: React.FC<props> = ({ url, userId }) => {
    const navigate = useNavigate();
    const tabs = [
        { value: `/user/management/${userId}/customer/detail`, name: 'activity' },
        { value: `/user/management/${userId}/customer/bookings`, name: 'bookings' },
        { value: `/user/management/${userId}/customer/transactions`, name: 'transaction' },
        { value: `/user/management/${userId}/customer/chat`, name: 'chat' },
    ];

    const handleNavigate = (e: string) => {
        navigate(e)
        // console.log(e)
    }
    return (
        <div className="bg-white">
            <HorizontalAlign havsShadow={true}>
                <h1 className="text-2xl font-semibold px-6 capitalize"><span className='text-gray-400'>User Management</span> / {url || 'Customer Detail'}</h1>
                <ItemGap className="px-6">
                    <Filter
                        tabs={tabs}
                        activeTab={url}
                        handleValue={(value: string) => handleNavigate(value)}
                    />
                    {/* <Dropdown
                        options={DateDropOptions}
                        onChange={handlePeriod}
                        placeholder="This Week"
                        position="right-0"
                    /> */}
                </ItemGap>
            </HorizontalAlign>
        </div>
    )
}

export default ProfileHeader