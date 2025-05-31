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
        comment?: string;
        rating: number;
    };
}


const RatingRow: React.FC<props> = ({ displayData }) => {

    function ratingStar(rating: number) {
        return Array.from({ length: 5 }, (_, i) => (
            <i
                key={`star-${i}`}
                className={`bi  bi-star-fill ${i < rating ? " text-purple-800" : " text-gray-400"}`}
                aria-label={i < rating ? "Filled star" : "Empty star"}
            ></i>
        ));
    }


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
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    {ratingStar(displayData.rating)}
                </div>
            </td>
            <td className="p-2 py-4">{displayData.comment || "-"}</td>
        </tr>
    )
}

export default RatingRow;