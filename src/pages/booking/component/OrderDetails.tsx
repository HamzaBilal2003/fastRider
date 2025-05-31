import React from 'react';
import { LocateFixed } from 'lucide-react';
export interface OrderDetailsType {
  orderId: string;
  pickupAddress: string;
  deliveryAddress: string;
  riderName: string;
  customerName: string;
  pickupDateTime: string;
  deliveryDateTime: string;
  packageName: string;
  packageCategory: string;
  packageValue: string;
  description: string;
  payOnDelivery: boolean;
  podAmount: number;
  deliveryFeePayment: string;
  paymentMethod: string;
  deliveryFee: number;
  total: number;
  deliveryStatus: 'picked' | 'ordered' | 'completed';
}

interface OrderDetailsProps {
  order: OrderDetailsType;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm  max-w-2xl">
      <h2 className="text-xl font-semibold p-6 bg-gray-200 rounded-t-lg py-4">Order Details</h2>
      <div className="space-y-6 p-6 ">
          <h3 className="font-medium mb-4">Delivery Details</h3>
        <div className="bg-white rounded-lg border border-gray-300 p-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <span className="text-gray-600">Order ID</span>
              <span>{order.orderId}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <span className="text-gray-600">Pickup Address</span>
              <div className="flex items-start gap-2">
                <LocateFixed className="w-6 h-6 text-green-500 mt-1" />
                <span>{order.pickupAddress}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <span className="text-gray-600">Delivery Address</span>
              <div className="flex items-start gap-2">
                <LocateFixed className="w-6 h-6 text-red-500 mt-1" />
                <span>{order.deliveryAddress}</span>
              </div>
            </div>
            <div className='border border-gray-300'  />

            {[
              ['Rider Name', order.riderName],
              ['Customer Name', order.customerName],
              ['Pickup Date/Time', order.pickupDateTime],
              ['Delivery Date/Time', order.deliveryDateTime],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-4">
                <span className="text-gray-600">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-medium mb-4">Package Details</h3>
        <div className="bg-white rounded-lg border border-gray-300 p-4">
          <div className="space-y-6">
            {[
              ['Package Name', order.packageName],
              ['Package Category', order.packageCategory],
              ['Package Value', order.packageValue],
              ['Description', order.description || 'Nil'],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-4">
                <span className="text-gray-600">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-medium mb-4">Payment Details</h3>
        <div className="bg-white rounded-lg border border-gray-300 p-4">
          <div className="space-y-6">
            {[
              ['Pay on Delivery', order.payOnDelivery ? 'Yes' : 'No'],
              ['POD Amount', `₦${order.podAmount}`],
              ['Delivery Fee Payment', order.deliveryFeePayment],
              ['Payment Method', order.paymentMethod],
              ['Delivery Fee', `₦${order.deliveryFee}`],
              ['Total', `₦${order.total}`],
            ].map((item,index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <span className="text-gray-600">{item[0]}</span>
                <div className="flex items-center gap-2">
                  <span>{item[1]}</span>
                  {item[2] && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      {item[2]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-4">
          <span className="font-medium">Delivery Status</span>
          <span className={`px-3 py-1 rounded ${order.deliveryStatus === 'completed' ? 'bg-green-100 text-green-700' :
            order.deliveryStatus === 'ordered' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
            {order.deliveryStatus}
          </span>
        </div>
      </div>
    </div>
  );
}