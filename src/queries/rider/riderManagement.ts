import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();

export interface RiderManagementData {
    total_users: number;
    active_users: number;
    inactive_users: number;
    users: RiderManagementUser[];
}

export interface RiderManagementUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    otp: string;
    profile_picture: string | null;
    phone: string;
    otp_verified: number;
    is_active: number;
    role: string;
    created_at: string;
    updated_at: string;
    verifiedPercentage ?: string | number | null;
    wallet: {
        id: number;
        user_id: number;
        balance: string;
        withdrawn_amount: string;
        deposit_amount: string;
        created_at: string;
        updated_at: string;
    };
}

export interface RIDER_MANAGEMENT {
    status: string;
    data: RiderManagementData;
    message: string;
}

// Fetch all riders
export const fetchRidersManagement = async (): Promise<RIDER_MANAGEMENT> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.RIDER_MANAGEMENT.GET_USERS, method: 'GET', data:undefined,token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};