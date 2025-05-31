import React from 'react';
import { formatAmount, formatCreatedAt } from '../../../constants/help';
import Button from '../../../components/buttons/Button';
import { LocateFixed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ParcelData } from '../../../queries/user/UserDetail';

interface props {
  displayData: ParcelData;
}

const BookingRow: React.FC<props> = ({ displayData }) => {
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-2 px-4 w-10">
          <input type="checkbox" />
        </td>
        <td className="p-2">{displayData.id}</td>
        <td className="p-2">{displayData.sender_name || 'N/A'}</td>
        <td className="p-2">{displayData.receiver_name || 'N/A'}</td>
        <td className="p-2">
          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-1'>
              <LocateFixed color='green' size={20} />
              {displayData.sender_address}
            </div>
            <div className='flex items-center gap-1'>
              <LocateFixed color='red' size={20} />
              {displayData.receiver_address}
            </div>
          </div>
        </td>
        <td className="p-2">N {formatAmount(displayData.amount)}</td>
        <td className="p-2 text-sm">
            <span>{formatCreatedAt(displayData.picked_up_at)}</span>
        </td>
        <td className="p-2 text-sm">
            <span>{formatCreatedAt(displayData.delivered_at)}</span>
        </td>
        <td className="p-2">
          <div className='flex flex-col justify-center items-center text-center'>
            <div className={`${displayData.status === 'completed' ? 'bg-green-800' : displayData.status == 'active' ? 'bg-purple-500' : 'bg-orange-500'} rounded-full w-6 h-6`}></div>
          </div>
        </td>
        <td className='p-2'>
          <div className='flex items-center justify-center gap-2'>
            <Button handleFunction={() => navigate(`/booking/${displayData.id}/detail`)}>
              Full Detail
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BookingRow;