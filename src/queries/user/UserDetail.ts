import { API_ENDPOINT } from '../../apiConfig';
import { apiCall } from '../../cutomApiCall';
import Cookies from 'js-cookie';
const tokenn = Cookies.get('authToken')?.toString();
export interface ApiResponse {
    status: string;
    data: UserDetail;
    message: string;
}

export interface UserDetail {
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
    wallet: {
        id: number;
        user_id: number;
        balance: string;
        withdrawn_amount: string;
        deposit_amount: string;
        created_at: string;
        updated_at: string;
    };
    send_parcel: SendParcel[];
    addresses: Address[];
}

export interface SendParcel {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    sender_address: string;
    receiver_address: string;
    schedule_type: string;
    scheduled_date: string;
    scheduled_time: string;
    sender_name: string | null;
    sender_phone: string | null;
    receiver_name: string | null;
    receiver_phone: string | null;
    parcel_name: string | null;
    parcel_category: string | null;
    parcel_value: string | null;
    description: string | null;
    payer: string | null;
    payment_method: string | null;
    pay_on_delivery: string;
    amount: string | null;
    delivery_fee: string | null;
    total_amount: string | null;
    status: string;
    ordered_at: string;
    picked_up_at: string | null;
    in_transit_at: string | null;
    delivered_at: string | null;
    rider_id: number | null;
    accepted_bid_id: number | null;
    is_assigned: number;
    pickup_code: string | null;
    delivery_code: string | null;
    is_pickup_confirmed: string;
    is_delivery_confirmed: string;
    current_latitude: string | null;
    current_longitude: string | null;
    bids: Bid[];
}

export interface Bid {
    id: number;
    send_parcel_id: number;
    rider_id: number;
    user_id: number | null;
    bid_amount: string;
    message: string;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface Address {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    state: string;
    city: string;
    address: string;
    type: string;
}
export interface ParcelData {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    sender_address: string;
    receiver_address: string;
    schedule_type: string;
    scheduled_date: string;
    scheduled_time: string;
    sender_name: string | null;
    sender_phone: string | null;
    receiver_name: string | null;
    receiver_phone: string | null;
    parcel_name: string | null;
    parcel_category: string | null;
    parcel_value: string | null;
    description: string | null;
    payer: string;
    payment_method: string;
    pay_on_delivery: string;
    amount: string;
    delivery_fee: string;
    total_amount: string | null;
    status: string;
    ordered_at: string;
    picked_up_at: string | null;
    in_transit_at: string | null;
    delivered_at: string | null;
    rider_id: number | null;
    accepted_bid_id: number | null;
    is_assigned: number;
    pickup_code: string | null;
    delivery_code: string | null;
    is_pickup_confirmed: string;
    is_delivery_confirmed: string;
    current_latitude: string | null;
    current_longitude: string | null;
    accepted_bid: {
        id: number;
        send_parcel_id: number;
        rider_id: number;
        user_id: number | null;
        bid_amount: string;
        message: string;
        status: string;
        created_by: string;
        created_at: string;
        updated_at: string;
        rider: {
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
        };
        user: {
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
    };
}
export interface UserParcelResponse {
    status: string;
    data: ParcelData[];
    message: string;
}

interface ParcelDetail {
    status: string;
    data: ParcelDataDetail;
    message: string;
}

export interface ParcelDataDetail {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    sender_address: string;
    receiver_address: string;
    schedule_type: string;
    scheduled_date: string;
    scheduled_time: string;
    sender_name: string | null;
    sender_phone: string | null;
    receiver_name: string | null;
    receiver_phone: string | null;
    parcel_name: string | null;
    parcel_category: string | null;
    parcel_value: string | null;
    description: string | null;
    payer: string;
    payment_method: string;
    pay_on_delivery: string;
    amount: string;
    delivery_fee: string;
    total_amount: string | null;
    status: string;
    ordered_at: string;
    picked_up_at: string | null;
    in_transit_at: string | null;
    delivered_at: string | null;
    rider_id: number | null;
    accepted_bid_id: number | null;
    is_assigned: number;
    pickup_code: string | null;
    delivery_code: string | null;
    is_pickup_confirmed: string;
    is_delivery_confirmed: string;
    current_latitude: string | null;
    current_longitude: string | null;
    accepted_bid: {
        id: number;
        send_parcel_id: number;
        rider_id: number;
        user_id: number | null;
        bid_amount: string;
        message: string;
        status: string;
        created_by: string;
        created_at: string;
        updated_at: string;
        rider: {
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
        };
        user: {
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
    };
}




export const fetchUsersDetail = async (id: number): Promise<ApiResponse> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.getUser + id, method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};


export const EditUserQuery = async (data: FormData, id: number): Promise<ApiResponse> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.EditUser + id, method: 'POST', data: data, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Edit failed due to unknown error');
    }
};



export const fetchUsersParcel = async (id: number): Promise<UserParcelResponse> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.getUserParcel + id, method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};
export const fetchParcelDetail = async (id: number): Promise<ParcelDetail> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.GetParcelDetail + id, method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};

export interface UserChat {
    status: string;
    data: {
        id: number;
        name: string;
        email: string;
        phone: string;
        profile_picture: string;
    }[];
    message: string;
}

export const fetchUserChat = async (id: number): Promise<UserChat> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.GetUserChat + id, method: 'GET', data: undefined, token: tokenn });
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

export const fetchUserTransactions = async (id: number): Promise<UserTransaction> => {
    try {
        const response = await apiCall({ url: API_ENDPOINT.UserManagement.GetUserTransactions + id, method: 'GET', data: undefined, token: tokenn });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Login failed due to unknown error');
    }
};


