import { apiCall } from '../cutomApiCall';
import { API_ENDPOINT } from '../apiConfig';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('authToken')?.toString();

export interface Location {
    id?: string;
    country: string;
    state : string;
    created_at : string;
    update_at :string;
}

export const fetchGetLocations = async (): Promise<Location[]> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.location.getAll,
            method: 'GET',
            data: undefined,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch locations');
    }
};

export const createLocation = async (location: {country:string;state:string}): Promise<Location> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINT.location.create,
            method: 'POST',
            data: location,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to create location');
    }
};

export const updateLocation = async (id: string, location: {country:string;state:string}): Promise<Location> => {
    try {
        const response = await apiCall({
            url: `${API_ENDPOINT.location.update}${id}`,
            method: 'PUT',
            data: location,
            token: getToken()
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to update location');
    }
};

export const deleteLocation = async (id: string): Promise<void> => {
    try {
        await apiCall({
            url: `${API_ENDPOINT.location.delete}${id}`,
            method: 'DELETE',
            data: undefined,
            token: getToken()
        });
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to delete location');
    }
};
