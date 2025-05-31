import React from 'react'
import { OrderDetails, OrderDetailsType } from './OrderDetails';
import HorizontalAlign from '../../../components/HorizontalAlign';
import Button from '../../../components/buttons/Button';
import MapContainer from '../../../components/MapContainer';
import { useQuery } from '@tanstack/react-query';
import { fetchParcelDetail } from '../../../queries/user/UserDetail';
import { useParams } from 'react-router-dom';
import { formatCreatedAt } from '../../../constants/help';

const BookingDetail: React.FC = () => {
  const {id} = useParams();

  const { data: rawParcelDetail, isLoading, refetch } = useQuery({
    queryKey: ["userdetail"],
    queryFn: () => fetchParcelDetail(parseInt(id)),
  });

  console.log('Fetch data : ', rawParcelDetail);
  const sampleOrder: OrderDetailsType = {
    orderId: rawParcelDetail?.data.id,
    pickupAddress: rawParcelDetail?.data.sender_address,
    deliveryAddress: rawParcelDetail?.data.receiver_address,
    riderName: 'Adewale Simon',
    customerName: rawParcelDetail?.data.sender_name,
    pickupDateTime: formatCreatedAt(rawParcelDetail?.data.picked_up_at),
    deliveryDateTime: formatCreatedAt(rawParcelDetail?.data.delivered_at),
    packageName: rawParcelDetail?.data.parcel_name,
    packageCategory: rawParcelDetail?.data.parcel_category,
    packageValue: rawParcelDetail?.data.parcel_value,
    description: rawParcelDetail?.data.description,
    payOnDelivery: rawParcelDetail?.data.status,
    podAmount: rawParcelDetail?.data.amount,
    deliveryFeePayment: rawParcelDetail?.data.is_delivery_confirmed,
    paymentMethod: rawParcelDetail?.data.payment_method,
    deliveryFee: rawParcelDetail?.data.delivery_fee,
    total: rawParcelDetail?.data.total_amount,
    deliveryStatus: rawParcelDetail?.data.status
  };
  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-2xl font-semibold px-6"><span className='text-black opacity-50'>Bookings Detail</span> / ORD-{sampleOrder.orderId}</h1>
        </HorizontalAlign>
      </div>

      <div className='p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <OrderDetails order={sampleOrder} />
          <div className='relative '>
            <div className='sticky top-10 space-y-2'>
              <MapContainer
                origin={{ lat: 40.719526, lng: -73.952255 }} // example: McCarren Park
                destination={{ lat: 40.744679, lng: -73.948542 }} // example: LaGuardia Community College
              />
              <Button>
                View Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default BookingDetail