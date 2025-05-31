import React from 'react'
import { useNavigate } from 'react-router-dom';
import HorizontalAlign from '../../../components/HorizontalAlign';
import ItemGap from '../../../components/ItemGap';
import Dropdown from '../../../components/Dropdown';
import { DateDropOptions } from '../../../components/FilterData';
import Filter from '../../../components/Filter';

// list of props handlePeriodFunctionDropdown,url
interface props {
    handlePeriod?: (value: string) => void,
    url: string,
    isRider?:boolean;
    username?:string;
}


const ProfileHeader: React.FC<props> = ({ handlePeriod, url,username }) => {
    const navigate = useNavigate();
    const tabs = [
        { value: `/rider/management/${username}/customer/detail`, name: 'activity' },
        { value: `/rider/management/${username}/customer/bookings`, name: 'bookings' },
        { value: `/rider/management/${username}/customer/transactions`, name: 'transaction' },
        { value: `/rider/management/${username}/customer/verification`, name: 'verification' },
        { value: `/rider/management/${username}/customer/chat`, name: 'chat' },
    ];
    
    const handleNavigate = (e: string) => {
        navigate(e)
        // console.log(e)
    }
    return (
        <div className="bg-white">
            <HorizontalAlign havsShadow={true}>
                <h1 className="text-2xl font-semibold px-6 capitalize"><span className='text-gray-400'>Rider Management</span> / {url || 'Customer Detail'}</h1>
                <ItemGap className="px-6">
                    <Filter
                        tabs={tabs}
                        activeTab={url}
                        handleValue={(value: string) => handleNavigate(value)}
                    />
                    {/* <Dropdown
                        options={DateDropOptions}
                        onChange={handlePeriod || (() => {})}
                        placeholder="This Week"
                        position="right-0"
                    /> */}
                </ItemGap>
            </HorizontalAlign>
        </div>
    )
}

export default ProfileHeader