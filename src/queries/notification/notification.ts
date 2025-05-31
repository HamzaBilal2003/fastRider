import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();

export interface NotificationData {
    id: number;
    title: string;
    content: string;
    location: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface NotificationResponse {
    notifications: NotificationData[];
    message: string;
}

// Fetch all riders
export const fetchNotification = async (): Promise<NotificationResponse> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.notification.getAll , method: 'GET', data:undefined,token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};

export const createNotification = async (data: FormData): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.notification.store, method: 'POST', data, token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};

export const updateNotification = async (data: FormData, id: number): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.notification.update + id, method: 'POST', data, token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
}

export const deleteNotification = async (id: number): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.notification.delete + id, method: 'DELETE', data:undefined, token:tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
}