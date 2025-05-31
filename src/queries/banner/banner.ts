import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();

export interface bannerResponse {
    id: number;
    location: string;
    subject: string;
    image: string;
    created_at: string;
    updated_at: string;
}

// Fetch all riders
export const fetchBanner = async (): Promise<bannerResponse[]> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.banner.getAll , method: 'GET', data:undefined,token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};

export const createBanner = async (data: FormData): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.banner.store, method: 'POST', data, token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};

export const updateBanner = async (data: FormData, id: number): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.banner.update + id, method: 'POST', data, token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
}

export const deleteBanner = async (id: number): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.banner.delete + id, method: 'DELETE', data:undefined, token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
}