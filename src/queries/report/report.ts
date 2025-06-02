import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const getToken = () => Cookies.get('authToken')?.toString();

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    otp: string | null;
    profile_picture: string;
    phone: string;
    otp_verified: number;
    is_active: number;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface Rider extends User { }

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

export interface Earning {
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
    picked_up_at: string;
    in_transit_at: string;
    delivered_at: string;
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
    is_payment_done: number;
    sender_lat: string;
    sender_long: string;
    receiver_lat: string;
    receiver_long: string;
    user: User;
    rider: Rider;
    accepted_bid: AcceptedBid;
}

export interface EarningsReport {
    status: string;
    message: string;
    data: {
        totalRideCost: number;
        tolalAdminCommission: number;
        totalRiderEarnings: number;
        earnings: Earning[];
    };
}

export const fetchEarnings = async (): Promise<EarningsReport> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.reports.earnreport,
            method: 'GET',
            data: undefined,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch roles and modules');
    }
};

export interface ReviewUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    otp: string | null;
    profile_picture: string;
    phone: string;
    otp_verified: number;
    is_active: number;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface ReviewData {
    id: number;
    send_parcel_id: number;
    from_user_id: number;
    to_user_id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
    to_user: ReviewUser;
    from_user: ReviewUser;
}

export interface ReviewResponse {
    status: string;
    message: string;
    data: ReviewData[];
}


export const fetchReview = async (): Promise<ReviewResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.reports.reviewreport,
            method: 'GET',
            data: undefined,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch roles and modules');
    }
};