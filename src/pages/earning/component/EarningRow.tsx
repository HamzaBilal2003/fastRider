import React from 'react'
import { dummyImage, formatCreatedAt } from '../../../constants/help';

interface props {
    displayData: {
        id?: number;
        rider: {
            id?: number;
            username: string;
            profile_image: string | null;
        };
        user: {
            id?: number;
            username: string;
            profile_image: string | null;
        };
        orderId: string;
        created_at: string;
        admin_earning?:number | string;
        rider_earning?:number | string;
        total_earn?:number | string;
    };
}


const EarningRow: React.FC<props> = ({ displayData }) => {



    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-2 py-4 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    <img src={displayData.rider.profile_image || dummyImage()} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.rider.username}
                </div>
            </td>
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    <img src={displayData.user.profile_image || dummyImage()} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.user.username}
                </div>
            </td>
            <td className="p-2 py-4">{displayData.orderId}</td>
            <td className="p-2 py-4 text-center">{formatCreatedAt(displayData.created_at)}</td>
            <td className="p-2 py-4">N{displayData.total_earn}</td>
            <td className="p-2 py-4">N{displayData.admin_earning}</td>
            <td className="p-2 py-4">N{displayData.rider_earning}</td>
        </tr>
    )
}

export default EarningRow;