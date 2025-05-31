import React, { useState } from 'react';
import { dummyImage, formatAmount, formatCreatedAt } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import TransactionDetailsModal from './TransactionDetailsModal';
import { Transaction } from '../../../queries/user/UserDetail';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface props {
    displayData: Transaction;
}

const TransactionsRow: React.FC<props> = ({ displayData }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-100 transition cursor-pointer relative">
                <td className="p-2 px-4 w-10">
                    <input type="checkbox" />
                </td>
                <td className="p-2">
                    <div className='flex items-center gap-2'>
                        {/* displayData.profile_picture */}
                        <img src={API_DOMAIN_Img + displayData.user.profile_picture} alt="" className='w-10 h-10 rounded-full' />
                        {displayData.user.name}
                    </div>
                </td>
                <td className='p-2'>{ 'transaction_' +displayData.id}</td>
                <td className="p-2">N {formatAmount(displayData.amount)}</td>
                <td className="p-2">
                    <div className='flex flex-col justify-center items-center text-center'>
                        <div className={`${displayData.status === 'completed' ? 'bg-green-800' : displayData.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'} rounded-full w-6 h-6`}></div>
                    </div>
                </td>
                <td className="p-2 text-sm">{displayData.transaction_type}</td>
                <td className="p-2 text-sm">{formatCreatedAt(displayData.created_at)}</td>
                <td className='p-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <Button handleFunction={() => setShowModal(true)}>
                            Full Detail
                        </Button>
                    </div>
                </td>
            </tr>

            <TransactionDetailsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                transaction={displayData}
            />
        </>
    );
};

export default TransactionsRow;