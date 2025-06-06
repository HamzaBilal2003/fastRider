const API_DOMAIN = 'https://fastlogistic.hmstech.xyz/api/'
export const API_DOMAIN_Img = 'https://fastlogistic.hmstech.xyz/storage/'
const API_BASE_URL = 'https://fastlogistic.hmstech.xyz/';
// const temp_Domain = 'http://127.0.0.1:8000/api/';

const API_ENDPOINT = {
  Admin: {
    login: API_DOMAIN + 'auth/user/login',
  },
  UserManagement: {
    getAll: API_DOMAIN + 'admin/usermanagement',
    getUser: API_DOMAIN + 'admin/usermanagement/get-user-details/',
    EditUser: API_DOMAIN + 'admin/usermanagement/edit-user/',
    getUserParcel: API_DOMAIN + 'admin/usermanagement/get-parcel-for-user/',
    GetParcelDetail: API_DOMAIN + 'admin/usermanagement/get-parcel-details/',
    GetUserChat: API_DOMAIN + 'admin/usermanagement/get-user-chats/',
    GetUserTransactions: API_DOMAIN + 'admin/usermanagement/get-transactions-for-user/',
  },
  RIDER_MANAGEMENT: {
    GET_USERS: API_DOMAIN + 'admin/rider-management',
    GET_USER_DETAILS: (userId: number) => API_DOMAIN + `admin/rider-management/get-user-details/${userId}`,
    GET_PARCELS_FOR_USER: (userId: number) => API_DOMAIN + `admin/rider-management/get-parcel-for-user/${userId}`,
    GET_PARCEL_DETAILS: (parcelId: number) => API_DOMAIN + `admin/rider-management/get-parcel-details/${parcelId}`,
    GET_USER_CHATS: (userId: number) => API_DOMAIN + `admin/rider-management/get-user-chats/${userId}`,
    GET_CONVERSATION: (userId: number, receiverId: number) =>
      API_DOMAIN + `admin/rider-management/get-conversation-between-users/${userId}/${receiverId}`,
    GET_TRANSACTIONS_FOR_USER: (userId: number) =>
      API_DOMAIN + `admin/rider-management/get-transactions-for-user/${userId}`,
  },
  booking: {
    getall: API_DOMAIN + 'booking-management',
  },
  transaction: {
    getall: API_DOMAIN + 'admin/transactions/get-all',
  },
  notification: {
    getAll: API_DOMAIN + 'admin/notifications',
    store: API_DOMAIN + 'admin/notifications/store',
    update: API_DOMAIN + 'admin/notifications/update/',
    delete: API_DOMAIN + 'admin/notifications/destory/',
  },
  banner: {
    getAll: API_DOMAIN + 'admin/banners',
    store: API_DOMAIN + 'admin/banners/store',
    update: API_DOMAIN + 'admin/banners/update/',
    delete: API_DOMAIN + 'admin/banners/delete/',
  },
  adminEndpoint: {
    getAll: API_DOMAIN + 'admin/admin-management',
    addUser: API_DOMAIN + 'admin/admin-management/add-admin',
    Modules: API_DOMAIN + 'admin/modules/',
    Createrole: API_DOMAIN + 'admin/roles/create',
    UpdateRole: API_DOMAIN + 'admin/roles/update/', // add id + id
    deleteRole: API_DOMAIN + 'admin/roles/delete/', // add id + id
    assignmodule : API_DOMAIN + 'admin/roles/', // pass mudule id { "module_ids": ["1"] }
    addAdmin : API_DOMAIN + 'admin/admin-management/add-admin',
    updateAdmin: API_DOMAIN + 'admin/admin-management/update-admin/',
  },
  reports : {
    earnreport : API_DOMAIN + 'admin/earn-report',
    reviewreport : API_DOMAIN + 'admin/reviews',
  },
  location : {
    getAll : API_DOMAIN + 'admin/locations',
    create : API_DOMAIN + 'admin/locations/create',
    update: API_DOMAIN + 'admin/locations/update/',
    delete : API_DOMAIN + 'admin/locations/delete/',
  },
  tiers : {
    getAll : API_DOMAIN + 'admin/tiers',
    create : API_DOMAIN + 'admin/tiers/create',
    update: API_DOMAIN + 'admin/tiers/update/',
    delete : API_DOMAIN + 'admin/tiers/delete/',
  },
  setting :{
    getAll :  API_DOMAIN + 'admin/settings',
    update: API_DOMAIN + 'admin/settings/upsert-multiple',
  },
  dashboard : {
    getAll: API_DOMAIN + 'admin/dashboard',
  },
  useractions : {
    blockUser : API_DOMAIN + 'admin/block-user/',
  },
  Analytic : {
    GetAll : API_DOMAIN + 'admin/analytics/',
  },
}

export { API_DOMAIN, API_ENDPOINT, API_BASE_URL }