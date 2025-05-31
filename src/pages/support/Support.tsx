import React, { useState } from 'react';
import SupportHeader from './components/SupportHeader';
import UserChat from './components/UserChat';
import SearchFilter from '../../components/SearchFilter';
import ChatCan from './ChatComponents/ChatCan';

const Support : React.FC = () => {
    const [selectedUserChat, setselectedUserChat] = useState<any>()

    const chatsData = [
        {
            id: 1,
            name: 'Alucard',
            lastMessage: 'Hello world',
            lastMessageTime: '12:30 AM',
            lastMessageCount: '2',
            UserImage: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
            id: 2,
            name: 'Shawn',
            lastMessage: 'Hi there',
            lastMessageTime: '11:30 AM',
            lastMessageCount: '1',
            UserImage: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
            id: 3,
            name: 'Raven',
            lastMessage: 'I am good',
            lastMessageTime: '10:30 AM',
            lastMessageCount: '0',
            UserImage: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            id: 4,
            name: 'Ben',
            lastMessage: 'How are you?',
            lastMessageTime: '9:30 AM',
            lastMessageCount: '0',
            UserImage: "https://randomuser.me/api/portraits/men/6.jpg"
        }
    ];
    
    const [filterData, setFilterData] = useState<any[]>(chatsData);
    const handleFilter = (value: string) => {
        console.log("Search Username: ", value);
        const filtered = chatsData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilterData(filtered);
    };
    console.log(selectedUserChat)

    return (
        <>
            

            <div className='grid grid-cols-1 md:grid-cols-12 p-6'>
                <div className={`${selectedUserChat ? "md:col-span-4" : "md:col-span-12"} h-full`}>
                    <div className='p-4 shadow-sm shadow-gray-400 rounded-lg h-full rounded-br-none'>
                        <SearchFilter
                            Placeholder='Search'
                            bgColor='bg-[#ECECEC]'
                            handleFunction={()=>handleFilter}
                        />
                        <div className='h-[600px] overflow-auto space-y-4 divide-gray-400'>
                            {filterData.length !== 0 ? (
                                filterData.map((chat, index) => (
                                    <UserChat
                                        key={index}
                                        UserId={chat.id}
                                        UserName={chat.name}
                                        LastMessage={chat.lastMessage}
                                        LastMessageTime={chat.lastMessageTime}
                                        LastMessageCount={chat.lastMessageCount}
                                        onSelectChat={setselectedUserChat}
                                        UserImage={chat.UserImage}
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
                    <ChatCan/>
                </div>}
            </div>
        </>
    );
};

export default Support;