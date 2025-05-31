import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();

export interface BookingManagement {
    status: "success";
    data: {
        totalBookings: number;
        activeBookings: number;
        completedBookings: number;
        cancelledBookings: number;
        bookings: Booking[];
    };
    message: string;
}

export interface Booking {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    sender_address: string;
    receiver_address: string;
    schedule_type: string;
    scheduled_date: string;
    scheduled_time: string;
    sender_name: string;
    sender_phone: string;
    receiver_name: string;
    receiver_phone: string;
    parcel_name: string;
    parcel_category: string;
    parcel_value: string;
    description: string;
    payer: string;
    payment_method: string;
    pay_on_delivery: string;
    amount: string;
    delivery_fee: string;
    total_amount: string | null;
    status: string;
    is_canceled: number;
    cancellation_reason: string | null;
    ordered_at: string;
    picked_up_at: string | null;
    in_transit_at: string | null;
    delivered_at: string | null;
    rider_id: number;
    accepted_bid_id: number;
    is_assigned: number;
    pickup_code: string;
    delivery_code: string;
    is_pickup_confirmed: string;
    is_delivery_confirmed: string;
    current_latitude: string | null;
    current_longitude: string | null;
    deleted_at: string | null;
    rider_start_location: string;
    user: User | null;
    rider: Rider | null;
    accepted_bid: AcceptedBid | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    otp: string | null;
    profile_picture: string | null;
    phone: string;
    otp_verified: number;
    is_active: number;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface Rider {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    otp: string | null;
    profile_picture: string | null;
    phone: string;
    otp_verified: number;
    is_active: number;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface AcceptedBid {
    id: number;
    send_parcel_id: number;
    rider_id: number;
    user_id: number | null;
    bid_amount: string;
    message: string | null;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

// Fetch all riders
export const fetchbookingsManagement = async (): Promise<BookingManagement> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.booking.getall, method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};