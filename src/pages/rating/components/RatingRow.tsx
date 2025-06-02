import React from 'react'
import { dummyImage, formatCreatedAt } from '../../../constants/help';
import { ReviewData } from '../../../queries/report/report';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface props {
    displayData: ReviewData;
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
                    <img src={API_DOMAIN_Img + displayData.to_user.profile_picture} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.to_user.name}
                </div>
            </td>
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    <img src={API_DOMAIN_Img + displayData.from_user.profile_picture} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.from_user.name}
                </div>
            </td>
            <td className="p-2 py-4">OrderId-{displayData.id}</td>
            <td className="p-2 py-4 text-center">{formatCreatedAt(displayData.created_at)}</td>
            <td className="p-2 py-4">
                <div className='flex items-center gap-2'>
                    {ratingStar(displayData.rating)}
                </div>
            </td>
            <td className="p-2 py-4">{displayData.review || "-"}</td>
        </tr>
    )
}

export default RatingRow;