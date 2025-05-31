import React from 'react'
import {formatCreatedAt } from '../../../constants/help';
import images from '../../../constants/images';

interface props {
    displayData: {
        id: number;
        tier: string | number;
        noOfRider: number | string;
        commissionRate:string|number;
        amount:number | string; 
        created_at:string;
        status: string;
    };
}


const TierRow: React.FC<props> = ({ displayData }) => {
    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-2 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2">{displayData.tier}</td>
            <td className="p-2">{displayData.noOfRider}</td>
            <td className="p-2">{displayData.commissionRate}%</td>
            <td className="p-2">{displayData.amount}</td>
            <td className="p-2 text-center">{formatCreatedAt(displayData.created_at)}</td>
            <td className="p-2">
                <div className='flex justify-center items-center'>
                    <div className={` ${displayData.status == 'active' ? 'bg-green-500' : 'bg-red-500'} rounded-full w-6 h-6`}></div>
                </div>
            </td>
            <td className='p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <button className='p-2 border border-gray-200 rounded-md'>
                        <img src={images.editBlack} alt="edit admin" className='size-[20px]' />
                    </button>
                    <button className='p-2 border border-gray-200 rounded-md'>
                        <img src={images.delBlack} alt="edit admin" className='size-[20px]' />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TierRow