import React from 'react';
import { dummyImage } from '../../../constants/help';

type props = {
    UserImage?: string;
    UserName: string;
    LastMessage?: string;
    LastMessageTime?: string;
    LastMessageCount?: string;
    UserId: number;
    onSelectChat: (user: any) => void;
}

const UserChat : React.FC<props> = ({
    UserId,
    UserImage = dummyImage(),
    UserName,
    LastMessage,
    LastMessageTime,
    LastMessageCount,
    onSelectChat
}) => {


    return (
        <div
            className='h-[80px] flex items-center justify-between cursor-pointer hover:bg-gray-100'
            onClick={() => onSelectChat({
                UserId,
                UserImage,
                UserName,
                LastMessage,
                LastMessageTime,
                LastMessageCount,
            })}
        >
            <div className='flex items-center gap-3'>
                <img src={UserImage} alt={UserName} className='w-14 h-14 rounded-full' />
                <div className='flex flex-col justify-between gap-1'>
                    <h1 className='text-lg font-bold'>{UserName}</h1>
                    {LastMessage && <h1 className='text-gray-500'>{LastMessage}</h1>}
                </div>
            </div>
            {LastMessageCount && <div className='flex flex-col justify-between gap-2'>
                <h1 className={`w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center self-end text-white ${parseInt(LastMessageCount) <= 0 && "opacity-0"}`}>{LastMessageCount}</h1>
                <h1 className='text-gray-500 self-end'>{LastMessageTime}</h1>
            </div>}
        </div>
    )
}

export default UserChat