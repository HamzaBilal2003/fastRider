import React from 'react'
import { formatCreatedAt } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import images from '../../../constants/images';
import { Admin } from '../../../queries/admin/adminManagement';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface props {
    displayData: Admin;
}


const AdminRow: React.FC<props> = ({ displayData }) => {
    const navigate =  useNavigate();
    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-2 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2">
                <div className='flex items-center gap-2'>
                    <img src={API_DOMAIN_Img + displayData.profile_picture} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.name}
                </div>
            </td>
            <td className="p-2">{displayData.role}</td>
            <td className="p-2">{formatCreatedAt(displayData.created_at)}</td>
            <td className="p-2">
                <div className=''>
                    <div className={` ${displayData.is_active ? 'bg-green-500' : 'bg-red-500'} rounded-full w-4 h-4`}></div>
                </div>
            </td>
            <td className='p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <Button handleFunction={() => navigate(`/settings/admin/${displayData.id}/detail`)} >
                        Admin Details
                    </Button>
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

export default AdminRow