import { API_ENDPOINT } from '../../apiConfig';
import { apiCall } from '../../cutomApiCall';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();
export interface ApiResponse {
    status: string;
    data: {
        total_users: number;
        active_users: number;
        inactive_users: number;
        users: User[];
    };
    message: string;
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

export const fetchUsersManagement = async (): Promise<ApiResponse> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.getAll, method: 'GET', data:undefined,token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};