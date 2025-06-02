import { apiCall } from '../cutomApiCall';
import { API_ENDPOINT } from '../apiConfig';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('authToken')?.toString();

export interface DashboardData {
    site: {
        totalUsers: number;
        totalRider: number;
        totalActiveRider: number;
        revenue: string;
    };
    rides: {
        totaldelivered: number;
        totalActive: number;
        totalscheduled: number;
        totalpickup: number;
    };
    monthlySendParcel: number[];
    monthlyEarnings: number[];
    currentMonthStatusCounts:number[];
    bookings: any[]; 
}

export const fetchdashboard = async (): Promise<DashboardData> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.dashboard.getAll,
            method: 'GET',
            data: undefined,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch locations');
    }
};