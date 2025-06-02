import { apiCall } from '../cutomApiCall';
import { API_ENDPOINT } from '../apiConfig';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('authToken')?.toString();

export interface Setting {
    id: number;
    name: string;
    value: string;
    created_at: string;
    updated_at: string;
}


export const fetchsettings = async (): Promise<Setting[]> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.setting.getAll,
            method: 'GET',
            data: undefined,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch locations');
    }
};
export const updatesettings = async (settings: Record<string, string>): Promise<SettingResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.setting.update,
            method: 'POST',
            data: { settings },
            token: getToken(),
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to update settings');
    }
};
