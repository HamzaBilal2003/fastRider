export const DateDropOptions = [
    { name: 'today', value: '0' },
    { name: 'This week', value: '7' },
    { name: 'Last month', value: '30' },
    { name: 'Last 6 month', value: '180' },
    { name: 'Last year', value: '365' },
    { name: 'All time', value: '9999' },
];

export const onlineStatus = [
    { name: 'All', value: 'all' },
    { name: 'Online', value: "1" },
    { name: 'Offline', value: "0" },
]

export const bulkOptions = [
    { name: 'Export as CSV', value: 'csv' },
    { name: 'Export as PDF', value: 'pdf' },
    { name: 'delete', value: 'delete', isdanger: true }
]

export const roles = [
    { id: '1', name: 'User', permissions: ['dashboard', 'view'] },
    { id: '2', name: 'Admin', permissions: ['dashboard', 'create', 'update', 'delete'] },
];

export const rolestabs = [
    { value: 'all', name: 'all' },
    { value: 'user', name: 'Users' },
    { value: 'rider', name: 'Riders' },
];

export const typeOptions = [
    { value: 'all', name: 'all' },
    { value: 'topup', name: 'topup' },
    { value: 'withdrawal', name: 'withdrawal' },
]

export const transactionstatus = [
    { value: 'all', name: 'all' },
    { value: 'pending', name: 'Pending' },
    { value: 'completed', name: 'completed' },
    { value: 'failed', name: 'Failed' },
]

export const bookingStatus = [
    { value: 'all', name: 'all' },
    { value: 'picked_up', name: 'picked up' },
    { value: 'ordered', name: 'ordered' },
    { value: 'delivered', name: 'delivered' },
]



export const riderStatus = [
    { "value": "all", "name": "All" },
    { "value": "activated", "name": "Activated" },
    { "value": "pending", "name": "Pending" },
    { "value": "rejected", "name": "Rejected" }
]

export const tierStatus = [
    { "value": "1", "name": "Tier 1" },
    { "value": "2", "name": "Tier 2" },
    { "value": "3", "name": "Tier 3" },
    { "value": "4", "name": "Tier 4" },
    { "value": "5", "name": "Tier 5" },
    { "value": "6", "name": "Tier 6" }
]

export const tierstatus = [
    { "value": "all", "name": "all" },
    { "value": "active", "name": "active" },
    { "value": "inactive", "name": "inactive" },
]