import { apiCall } from '../cutomApiCall';
import { API_ENDPOINT } from '../apiConfig';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('authToken')?.toString();

export interface BlockResponse {
    status: string;
    data: {
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
    };
    message: string;
}
export const fetchBlockUser = async (id:any): Promise<BlockResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.useractions.blockUser + id,
            method: 'POST',
            data: undefined,
            token: getToken(),
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch tiers');
    }
};