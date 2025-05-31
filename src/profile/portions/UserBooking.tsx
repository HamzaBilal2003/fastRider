import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ProfileHeader from '../component/ProfileHeader';
import BookingRow from '../../pages/transactions/component/BookingRow';
import TableCan from '../../components/TableCan';
import HorizontalAlign from '../../components/HorizontalAlign';
import ItemGap from '../../components/ItemGap';
import Dropdown from '../../components/Dropdown';
import Filter from '../../components/Filter';
import SearchFilter from '../../components/SearchFilter';
import StatCard from '../../components/StatCard';
import Loader from '../../components/Loader';

import { fetchUsersDetail, ParcelData, SendParcel } from '../../queries/user/UserDetail';
import { bookingStatus, bulkOptions, DateDropOptions } from '../../components/FilterData';
import images from '../../constants/images';

const UserBooking: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [activeStatus, setActiveStatus] = useState('all');
    const [selectedDateRange, setSelectedDateRange] = useState('9999');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: rawUserDetail, isLoading, error, refetch } = useQuery({
        queryKey: ["userdetail"],
        queryFn: () => fetchUsersDetail(parseInt(username)),
    });



    const bookingsData: SendParcel[] = rawUserDetail?.data.send_parcel || [];

    const filteredBookings = useMemo(() => bookingsData.filter((booking) => {
        const matchesStatus = activeStatus === 'all' || booking.status.toLowerCase() === activeStatus;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            !searchQuery ||
            booking.sender_name?.toLowerCase().includes(searchLower) ||
            booking.receiver_name?.toLowerCase().includes(searchLower) ||
            booking.parcel_name?.toLowerCase().includes(searchLower) ||
            booking.status.toLowerCase().includes(searchLower);

        const bookingDate = new Date(booking.scheduled_date).getTime();
        const now = Date.now();
        const daysAgo = (now - bookingDate) / (1000 * 60 * 60 * 24);
        const matchesDate = selectedDateRange === '9999' || daysAgo <= parseInt(selectedDateRange);

        return matchesStatus && matchesSearch && matchesDate;
    }), [bookingsData, activeStatus, searchQuery, selectedDateRange]);

    const bookingsStats = useMemo(() => ([
        {
            title: 'Total Bookings',
            value: bookingsData.length,
        },
        {
            title: 'Active Bookings',
            value: bookingsData.filter(b => b.status.toLowerCase() === 'in_transit').length,
        },
        {
            title: 'Completed Bookings',
            value: bookingsData.filter(b => b.status.toLowerCase() === 'delivered').length,
        },
    ]), [bookingsData]);

    const handleFilter = (status: string) => setActiveStatus(status.toLowerCase());
    const handleDateFilter = (range: string) => setSelectedDateRange(range);
    const handleSearch = (query: string) => setSearchQuery(query);
    const handleBulkAction = (action: string) => console.log('Bulk action:', action);
    if (isLoading) return <Loader />;
    if (error) return <div>Error loading bookings</div>;
    return (
        <>
            <ProfileHeader url="bookings" userId={username ?? ''} />
            <div className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {bookingsStats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            description="+5% increase from last month"
                            icon={images.rider}
                            bgIcon="bg-[#601A08]"
                            bgCard="bg-[#471204]"
                            textColor="white"
                            statChangeColor="text-green-500"
                        />
                    ))}
                </div>

                <HorizontalAlign>
                    <ItemGap>
                        <Filter tabs={bookingStatus} activeTab={activeStatus} handleValue={handleFilter} />
                        <Dropdown options={DateDropOptions} onChange={handleDateFilter} placeholder="Period" position="right-0" />
                        <Dropdown options={bulkOptions} onChange={handleBulkAction} placeholder="Bulk Actions" position="right-0" />
                    </ItemGap>
                    <SearchFilter handleFunction={handleSearch} />
                </HorizontalAlign>

                <TableCan
                    heading="All Transactions"
                    showHeading
                    headerTr={['Order id', 'Sender Name', 'Receiver Name', 'Parcel Name', 'Amount', 'Scheduled Date', 'Status', 'Other']}
                    dataTr={filteredBookings}
                    TrName={BookingRow}
                />
            </div>
        </>
    );
};

export default UserBooking;
