import { API_ENDPOINT } from '../../apiConfig';
import { apiCall } from '../../cutomApiCall';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();



export interface riderDetail {
    status: string;
    data: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        otp: string;
        profile_picture: string;
        phone: string;
        otp_verified: number;
        is_active: number;
        role: string;
        created_at: string;
        updated_at: string;
        wallet: {
            id: number;
            user_id: number;
            balance: string;
            withdrawn_amount: string;
            deposit_amount: string;
            created_at: string;
            updated_at: string;
        };
        rider_parcel: RiderParcel[];
        rider_verification: {
            id: number;
            user_id: number;
            first_name: string;
            last_name: string;
            email_address: string;
            phone: string;
            address: string;
            nin_number: string;
            vehicle_type: string;
            plate_number: string;
            riders_permit_number: string;
            color: string;
            passport_photo: string;
            rider_permit_upload: string;
            vehicle_video: string;
            created_at: string;
            updated_at: string;
        } | null;
    };
    message: string;
}

export interface RiderParcel {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    sender_address: string;
    receiver_address: string;
    schedule_type: string;
    scheduled_date: string;
    scheduled_time: string;
    sender_name: string;
    sender_phone: string;
    receiver_name: string;
    receiver_phone: string;
    parcel_name: string;
    parcel_category: string;
    parcel_value: string;
    description: string;
    payer: string;
    payment_method: string;
    pay_on_delivery: string;
    amount: string;
    delivery_fee: string;
    total_amount: string | null;
    status: string;
    is_canceled: number;
    cancellation_reason: string | null;
    ordered_at: string;
    picked_up_at: string;
    in_transit_at: string | null;
    delivered_at: string | null;
    rider_id: number;
    accepted_bid_id: number;
    is_assigned: number;
    pickup_code: string;
    delivery_code: string;
    is_pickup_confirmed: string;
    is_delivery_confirmed: string;
    current_latitude: string | null;
    current_longitude: string | null;
    deleted_at: string | null;
    rider_start_location: string;
}

export const fetchRidersDetail = async (id: number): Promise<riderDetail> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.RIDER_MANAGEMENT.GET_USER_DETAILS(id), method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};




export const fetchRidersParcel = async (id: number): Promise<any> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.RIDER_MANAGEMENT.GET_PARCELS_FOR_USER(id), method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};

export interface UserChat {
    status: string;
    data: UserChatData[];
    message: string;
}

export interface UserChatData {
    id: number;
    name: string;
    email: string;
    phone: string;
    profile_picture: string;
}

export const fetchUserChat = async (id: number): Promise<UserChat> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.RIDER_MANAGEMENT.GET_USER_CHATS(id), method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};
export const fetchcustomerChat = async (id: number): Promise<UserChat> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.GetUserChat + id, method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};

export interface UserMessages {
    status: string;
    data: Message[];
    message: string;
}

export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    sent_at: string;
    created_at: string;
    updated_at: string;
}

export const fetchUserMessages = async (id: number, userId: number): Promise<UserMessages> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.RIDER_MANAGEMENT.GET_CONVERSATION(id, userId), method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};

export interface UserTransaction {
    status: string;
    data: {
        stats: {
            total: number;
            withdrawalTransactions: number;
            topupTransactions: string;
        };
        transactions: Transaction[];
    };
    message: string;
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
    user: {
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
    }
}

export const fetchRiderTransactions = async (id: number): Promise<UserTransaction> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.RIDER_MANAGEMENT.GET_TRANSACTIONS_FOR_USER(id), method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};


