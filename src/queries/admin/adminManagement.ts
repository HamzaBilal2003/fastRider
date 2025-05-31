import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();

export interface Admin {
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

export interface AdminManagement {
  admins: Admin[];
  total: number;
  active: number;
  inactive: number;
}

// Fetch all riders
export const fetchAdminsManagement = async (): Promise<AdminManagement> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.adminEndpoint.getAll , method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};

export const createAdmin = async (data: FormData): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.adminEndpoint.addUser , method: 'POST', data, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};