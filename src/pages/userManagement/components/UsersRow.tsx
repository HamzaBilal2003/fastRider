import React from 'react'
import { dummyImage, formatAmount } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import MoreDropdown from '../../../components/MoreDropdown';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, AlertTriangle } from 'lucide-react';
import { User } from '../../../queries/user/UserManagement';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface props {
    displayData:User;
}


const UsersRow: React.FC<props> = ({ displayData }) => {
    const navigate = useNavigate();
    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative"> {/* Removed border-b */}
            <td className="p-2 px-4 w-10">
                <input type="checkbox" />
            </td>
            <td className="p-2">
                <div className='flex items-center gap-2'>
                    <img src={API_DOMAIN_Img+ displayData.profile_picture} alt="" className='w-10 h-10 rounded-full' />
                    {displayData.name}
                </div>
            </td>
            <td className="p-2">{displayData.email}</td>
            <td className="p-2">{displayData.phone}</td>
            <td className="p-2 text-center">N {formatAmount(displayData.wallet.balance)}</td>
            <td className="p-2">
                <div className='flex justify-center items-center'>
                    <div className={` ${displayData.is_active == 1 ? 'bg-green-500' : 'bg-red-500'} rounded-full w-6 h-6`}></div>
                </div>
            </td>
            <td className='p-2'>
                <div className='flex items-center justify-center gap-2'>
                    <Button handleFunction={() => navigate(`/user/management/${displayData.id}/customer/detail`)}>
                        Customer Details
                    </Button>
                    <Button handleFunction={() => navigate(`/user/management/${displayData.id}/customer/transactions`)} bgColor='bg-black' TextColor='text-white'>
                        Transactions
                    </Button>
                </div>
            </td>
            <td className='p-2'>
                <MoreDropdown
                    iconClass="bi bi-three-dots-vertical"
                    menuClass="bg-theme-dark min-w-[150px] bg-white"
                >
                    <div className='flex flex-col gap-2'>
                        <button className='flex gap-2 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'>
                            <AlertTriangle size={20} color='black' />
                            Block User
                        </button>
                        <button className='flex gap-2 text-red-500 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'>
                            <AlertOctagon size={20} color='red' />
                            Delete User
                        </button>
                    </div>
                </MoreDropdown>
            </td>
        </tr>
    )
}

export default UsersRow