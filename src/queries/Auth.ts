import { API_ENDPOINT } from '../apiConfig';
import { apiCall } from '../cutomApiCall';
// import { API_ENDPOINTS } from '../../apiConfig';
// import { apiCall } from '../customApiCall';
interface LoginData {
    email: string;
    password: string;
}
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

export interface ApiResponse {
    status: string;
    data: {
        user: User;
        token: string;
    };
    message: string;
}


export const loginAdmin = async (data: LoginData): Promise<ApiResponse> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.Admin.login, method: 'POST', data });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};