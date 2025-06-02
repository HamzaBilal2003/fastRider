import React from 'react'
import { dummyImage, formatAmount, formatCreatedAt } from '../../../constants/help';
import { Earning } from '../../../queries/report/report';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface props {
    displayData: Earning;
}


const EarningRow: React.FC<props> = ({ displayData }) => {



    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-2 py-4 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    <img src={API_DOMAIN_Img + displayData.rider.profile_picture } alt="" className='w-10 h-10 rounded-full' />
                    {displayData.rider.name}
                </div>
            </td>
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    <img src={API_DOMAIN_Img +displayData.user.profile_picture || dummyImage()} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.user.name}
                </div>
            </td>
            <td className="p-2 py-4">OrderId- {displayData.id}</td>
            <td className="p-2 py-4 text-center">{formatCreatedAt(displayData.delivered_at)}</td>
            <td className="p-2 py-4">N {formatAmount(displayData.amount)}</td>
            {/* <td className="p-2 py-4">N{displayData.total_earn}</td>
            <td className="p-2 py-4">N{displayData.admin_earning}</td>
            <td className="p-2 py-4">N{displayData.rider_earning}</td> */}
        </tr>
    )
}

export default EarningRow;