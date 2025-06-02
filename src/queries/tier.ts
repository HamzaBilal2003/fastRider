import { apiCall } from '../cutomApiCall';
import { API_ENDPOINT } from '../apiConfig';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('authToken')?.toString();

export interface TierResponse {
    id: number;
    tier: number;
    no_of_rides: number;
    commission: string;
    tier_amount: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export const fetchTiers = async (): Promise<TierResponse[]> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.tiers.getAll,
            method: 'GET',
            data: undefined,
            token: getToken(),
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch tiers');
    }
};

export const createTier = async (data: Partial<TierResponse>): Promise<TierResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.tiers.create,
            method: 'POST',
            data,
            token: getToken(),
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to create tier');
    }
};

export const updateTier = async (id: number, data: Partial<TierResponse>): Promise<TierResponse> => {
    try {
        const response = await apiCall({
            url: `${API_ENDPOINT.tiers.update}${id}`,
            method: 'PUT',
            data,
            token: getToken(),
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to update tier');
    }
};

export const deleteTier = async (id: number): Promise<void> => {
    try {
        await apiCall({
            url: `${API_ENDPOINT.tiers.delete}${id}`,
            method: 'DELETE',
            data: undefined,
            token: getToken(),
        });
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to delete tier');
    }
};