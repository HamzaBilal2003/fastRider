import { apiCall } from '../../cutomApiCall';
import { API_ENDPOINT } from '../../apiConfig';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();

export interface TransactionsManagement {
    totalTransactions: number;
    completedTransactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    transactions: Transaction[];
}

export interface Transaction {
    id: number;
    user_id: number;
    transaction_type: string;
    amount: string;
    status: string;
    reference: string;
    icon: string | null;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface User {
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

// Fetch all riders
export const fetchTransactionsManagement = async (): Promise<TransactionsManagement> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.transaction.getall , method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'unknown error');
    }
};