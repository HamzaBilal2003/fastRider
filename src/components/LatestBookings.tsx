import React from "react";

interface Booking {
  user: string;
  rider: string;
  customer: string;
  address: string;
  payOnDelivery?: string;
  pickupTime?: string;
  dropTime?: string;
  status?: string;
}

interface LatestBookingsProps {
  bookings: Booking[];
  actionButton?: {
    text: string;
    onClick: (booking: Booking) => void;
  };
  title: string; // Added title to props
}

const LatestBookings: React.FC<LatestBookingsProps> = ({ bookings, actionButton, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-lg font-semibold  p-4">{title}</h2> {/* Dynamic Title */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <td className="p-2 w-10">
              <input type="checkbox" />
            </td>
            <td className="p-2">User Name</td>
            <td className="p-2">Rider Name</td>
            <td className="p-2">Customer Name</td>
            <td className="p-2">Pick/Drop Address</td>
            {bookings.some((b) => b.payOnDelivery) && <td className="p-2">Pay on Delivery</td>}
            {bookings.some((b) => b.pickupTime) && <td className="p-2">Pickup Date & Time</td>}
            {bookings.some((b) => b.dropTime) && <td className="p-2">Drop Date & Time</td>}
            {bookings.some((b) => b.status) && <td className="p-2">Status</td>}
            {actionButton && <td className="p-2 text-center">Other</td>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="hover:bg-gray-100 transition"> {/* Removed border-b */}
              <td className="p-2 w-10">
                <input type="checkbox" />
              </td>
              <td className="p-2">{booking.user}</td>
              <td className="p-2">{booking.rider}</td>
              <td className="p-2">{booking.customer}</td>
              <td className="p-2 flex items-center gap-2">
                {index % 2 === 0 ? (
                  <i className="bi bi-check-circle text-green-500"></i>
                ) : (
                  <i className="bi bi-x-circle text-red-500"></i>
                )}
                {booking.address}
              </td>
              {booking.payOnDelivery && <td className="p-2">{booking.payOnDelivery}</td>}
              {booking.pickupTime && <td className="p-2">{booking.pickupTime.replace('|','')}</td>}
              {booking.dropTime && <td className="p-2">{booking.dropTime.replace('|','')}</td>}
              {booking.status && (
                <td className="p-2">
                  <span className="w-4 h-4 inline-block bg-green-500 rounded-full"></span>
                </td>
              )}
              {actionButton && (
                <td className="p-2 text-center">
                  <button
                    onClick={() => actionButton.onClick(booking)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
                  >
                    {actionButton.text}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestBookings;
