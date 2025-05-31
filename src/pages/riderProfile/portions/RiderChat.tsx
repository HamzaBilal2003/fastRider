import React, { useMemo, useState } from 'react';
import SearchFilter from '../../../components/SearchFilter';
import UserChat from '../../support/components/UserChat';
import SupportHeader from '../../support/components/SupportHeader';
import { useQuery } from '@tanstack/react-query';
import { fetchUserChat, UserChatData } from '../../../queries/rider/riderDetail';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { API_DOMAIN_Img } from '../../../apiConfig';
import UserMessageChat from '../component/UserMessageChat';
import ProfileHeader from '../component/ProfileHeader';

const RiderChat: React.FC = () => {
    const { username } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserChat, setselectedUserChat] = useState<any>()
    const { data: chats, isLoading, error } = useQuery({
        queryKey: ['chats'],
        queryFn: () => fetchUserChat(Number(username)),
    });
    console.log(chats)

    const filteredChat = useMemo(() => {
        if (!chats) return [];
        return chats?.data?.filter((transaction: UserChatData) => {

            // Search filter
            if (searchQuery.trim()) {
                const searchLower = searchQuery.toLowerCase().trim();
                return (
                    transaction.name.toLowerCase().includes(searchLower)
                );
            }
            return true;
        }) || [];
        // searchQuery,
    }, [chats,searchQuery]);
    console.log(selectedUserChat)
    const handleFilter = (value :string) =>{
        setSearchQuery(value);
    }
    if (isLoading) return <Loader />;
    return (
        <>
        <ProfileHeader url={'chat'} username={username}  />
            <div className='grid grid-cols-1 md:grid-cols-12 p-6'>
                <div className={`md:col-span-4 h-full`}>
                    <div className='p-4 shadow-sm shadow-gray-400 rounded-lg h-full rounded-br-none'>
                        <SearchFilter
                            Placeholder='Search'
                            bgColor='bg-[#ECECEC]'
                            handleFunction={(value:string) => handleFilter(value)}
                        />
                        <div className='h-[600px] overflow-auto space-y-4 divide-gray-400'>
                            {filteredChat.length !== 0 ? (
                                filteredChat.map((chat, index) => (
                                    <UserChat
                                        key={index}
                                        UserId={chat.id}
                                        UserName={chat.name}
                                        onSelectChat={setselectedUserChat}
                                        UserImage={API_DOMAIN_Img+ chat.profile_picture}
                                    />
                                ))
                            ) : (
                                <div className='text-center text-lg p-4 text-gray-500'>Start Chatting...</div>
                            )}
                        </div>
                    </div>
                </div>
                {selectedUserChat && <div className='md:col-span-8'>
                    <SupportHeader username={selectedUserChat.UserName} ProfileImg={selectedUserChat.UserImage} />
                    <UserMessageChat selectedUserChat={selectedUserChat}  notShowInputCan={true} />
                </div>}
            </div>
        </>
    );
};

export default RiderChat;