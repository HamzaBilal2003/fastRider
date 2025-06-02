import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('authToken')?.toString();

export const fetchAnalytics = async (page: string): Promise<an> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.Analytic.GetAll + page,
            method: 'GET',
            data: undefined,
            token: getToken(),
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch tiers');
    }
};