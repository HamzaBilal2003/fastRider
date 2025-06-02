import React from 'react'
import { formatAmount } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import MoreDropdown from '../../../components/MoreDropdown';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, AlertTriangle } from 'lucide-react';
import { RiderManagementUser } from '../../../queries/rider/riderManagement';
import { API_DOMAIN, API_DOMAIN_Img } from '../../../apiConfig';
import { useMutation } from '@tanstack/react-query';
import { fetchBlockUser } from '../../../queries/useractions';
import { toast } from 'react-toastify';
import ButtonLoader from '../../../components/ButtonLoader';

interface props {
    displayData: RiderManagementUser;
    handlerefetch:()=>void;
}


const RiderRow: React.FC<props> = ({ displayData,handlerefetch }) => {
    const navigate = useNavigate();
    const { mutate: handleBlock, isPending: isBlocking } = useMutation({
        mutationKey: ['block-user'],
        mutationFn: (id: any) => fetchBlockUser(id),
        onSuccess: (response) => {
            if (response.data.is_active == 3) {
                toast.success('Rider block successfully');
            } else {
                toast.success('Rider unblock successfully');
            }
            handlerefetch();
        },
        onError: (error: any) => {
            console.error('Error updating user profile:', error);
            toast.error(error?.response?.data?.message || error.message || 'Failed to block.');
        },
    });
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (100 / 100) * circumference;

    const getColor = (value: string) => {
        const getvalue = parseInt(value);
        if (getvalue <= 50) return 'orange';
        if (getvalue > 75 && getvalue <= 80) return 'purple';
        if (getvalue > 80) return 'green';
        return 'orange'; // default color for 51-75%
    };
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
            <td className="p-2">{displayData.email}</td>
            <td className="p-2">{displayData.phone}</td>
            <td className="p-2 text-center">N {displayData.wallet ? formatAmount(displayData.wallet.balance) : 0}</td>
            <td className="p-2">
                <div className='flex justify-center items-center'>
                    <div className={` ${displayData.is_active == 1 ? 'bg-green-500' : 'bg-red-500'} rounded-full w-6 h-6`}></div>
                </div>
            </td>
            <td className="p-2 text-center">{1}</td>
            <td className='p-2'>
                <div className='flex gap-2 items-center'>
                    <div className='flex flex-col justify-center gap-2'>
                        <Button bgColor='bg-[black]' TextColor='text-[white]' handleFunction={() => navigate(`/rider/management/${displayData.id}/customer/verification`)}>
                            verification
                        </Button>
                        <Button handleFunction={() => navigate(`/rider/management/${displayData.id}/customer/detail`)}>
                            Rider Details
                        </Button>
                    </div>
                    <MoreDropdown
                        iconClass="bi bi-three-dots-vertical"
                        menuClass="bg-theme-dark min-w-[150px] bg-white"
                    >
                        <div className='flex flex-col gap-2'>
                            <button disabled={isBlocking} onClick={()=>handleBlock(displayData.id)} className='flex gap-2 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'>
                                <AlertTriangle size={20} color='black' />
                                {isBlocking ? <ButtonLoader/>  : displayData.is_active == 3 ? 'Unblock Rider' : "Block Rider"}
                            </button>
                            <button className='flex gap-2 text-red-500 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'>
                                <AlertOctagon size={20} color='red' />
                                Delete Rider
                            </button>
                        </div>
                    </MoreDropdown>
                </div>
            
            </td>
        </tr>
    )
}

export default RiderRow