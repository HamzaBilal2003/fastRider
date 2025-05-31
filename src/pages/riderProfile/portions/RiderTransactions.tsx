import React, { useMemo, useState } from 'react'
import ProfileHeader from '../component/ProfileHeader'

import { bulkOptions, DateDropOptions, transactionstatus, typeOptions } from '../../../components/FilterData';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {  Transaction } from '../../../queries/user/UserDetail';
import Loader from '../../../components/Loader';
import images from '../../../constants/images';
import { formatAmount } from '../../../constants/help';
import { fetchRiderTransactions } from '../../../queries/rider/riderDetail';
import StatCard from '../../../components/StatCard';
import HorizontalAlign from '../../../components/HorizontalAlign';
import ItemGap from '../../../components/ItemGap';
import Filter from '../../../components/Filter';
import Dropdown from '../../../components/Dropdown';
import SearchFilter from '../../../components/SearchFilter';
import TableCan from '../../../components/TableCan';
import TransactionsRow from '../../transactions/component/TransactionsRow';
// import { useNavigate } from 'react-router-dom';

const RiderTransactions: React.FC = () => {
    const handleDetailsClick = (e: any) => {
        console.log(e.target.value);
    }
    const { username } = useParams();
    const { data: rawUserTransaction, isLoading, error } = useQuery({
        queryKey: ['userdetail', username],
        queryFn: () => fetchRiderTransactions(Number(username)),
        enabled: !!username, // Only run if username exists
    });
    console.log(rawUserTransaction);

    // const navigate = useNavigate();
    // const [activeRole, setActiveRole] = useState('All');
    const [activeType, setActiveType] = useState('all');
    const [activeStatus, setActiveStatus] = useState('all');
    const [activePeriod, setActivePeriod] = useState('ll');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = useMemo(() => {
        if (!rawUserTransaction) return [];
        return rawUserTransaction.data.transactions.filter((transaction: Transaction) => {
            // Role filter
            // if (activeRole !== 'All' && transaction.role.toLowerCase() !== activeRole.toLowerCase()) {
            //     return false;
            // }

            // Type filter
            if (activeType !== 'all' && transaction.transaction_type.toLowerCase() !== activeType.toLowerCase()) {
                return false;
            }

            // Status filter
            if (activeStatus !== 'all' && transaction.status.toLowerCase() !== activeStatus.toLowerCase()) {
                return false;
            }

            // Period filter
            if (activePeriod !== 'all') {
                const transactionDate = new Date(transaction.created_at);
                const today = new Date();
                const daysDiff = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

                switch (activePeriod) {
                    case 'Today':
                        return daysDiff === 0;
                    case 'Last 7 days':
                        return daysDiff <= 7;
                    case 'Last 30 days':
                        return daysDiff <= 30;
                    case 'Last 90 days':
                        return daysDiff <= 90;
                    default:
                        return true;
                }
            }

            // Search filter
            // if (searchQuery.trim()) {
            //     const searchLower = searchQuery.toLowerCase().trim();
            //     return (
            //         transaction.username.toLowerCase().includes(searchLower) ||
            //         transaction.transactionId.toLowerCase().includes(searchLower)
            //     );
            // }

            return true;
        });
        // searchQuery,
    }, [activeType, activeStatus, activePeriod,  rawUserTransaction]);
    // activeRole,

    // const handleRoleFilter = (value: string) => {
    //     setActiveRole(value);
    // };

    const handleTypeFilter = (value: string) => {
        setActiveType(value);
    };

    const handleStatusFilter = (value: string) => {
        setActiveStatus(value);
    };

    const handlePeriodFilter = (value: string) => {
        setActivePeriod(value);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };
    const transactions = [
        {
            title: "Total Transactions",
            value: "N " + formatAmount(rawUserTransaction?.data.stats.total),
            description: "+5% increase from last month",
            icon: images.transactions,
            bgIcon: "bg-[#620748]",
            bgCard: "bg-[#470434]",
            textColor: "white",
            statChangeColor: "text-green-500",
        },
        {
            title: "Topup",
            value: "N " + formatAmount(rawUserTransaction?.data.stats.topupTransactions),
            description: "+5% increase from last month",
            icon: images.transactions,
            bgIcon: "bg-[#620748]",
            bgCard: "bg-[#470434]",
            textColor: "white",
            statChangeColor: "text-green-500",
        },
        {
            title: "Withdrawal",
            value: "N " + formatAmount(rawUserTransaction?.data.stats.withdrawalTransactions),
            description: "+5% increase from last month",
            icon: images.transactions,
            bgIcon: "bg-[#620748]",
            bgCard: "bg-[#470434]",
            textColor: "white",
            statChangeColor: "text-green-500",
        },
    ]
    if (isLoading) return <Loader />;
    if (error) return <div>Error loading transactions</div>;
    return (
        <>
            <ProfileHeader url='transaction' username={username} handlePeriod={handleDetailsClick} />
            <div className='flex flex-col gap-4 p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {transactions.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
                <HorizontalAlign>
                    <ItemGap>
                        <Filter
                            tabs={typeOptions}
                            activeTab={'all'}
                            handleValue={handleTypeFilter}
                        />
                        <Dropdown
                            options={transactionstatus}
                            onChange={handleStatusFilter}
                            placeholder="All"
                            position="right-0"
                        />
                        <Dropdown
                            options={DateDropOptions}
                            onChange={handlePeriodFilter}
                            placeholder="Period"
                            position="right-0"
                        />
                        <Dropdown
                            options={bulkOptions}
                            onChange={(value: string) => console.log('Bulk action:', value)}
                            placeholder="Bulk Actions"
                            position="right-0"
                        />
                    </ItemGap>
                    <SearchFilter handleFunction={(e) => handleSearch(e)} />
                </HorizontalAlign>
                <TableCan
                    heading='All Transactions'
                    showHeading={true}
                    headerTr={['name', 'transaction id', 'amount', 'status', 'payment method', 'Date&Time', 'other']}
                    dataTr={filteredTransactions}
                    TrName={TransactionsRow}
                />
            </div>
        </>
    )
}

export default RiderTransactions