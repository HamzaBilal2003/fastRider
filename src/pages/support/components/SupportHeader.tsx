import React from 'react';
import { dummyImage } from '../../../constants/help';

type props ={
    username: string;
    ProfileImg?:string;
}

const SupportHeader: React.FC<props> = ({username ,ProfileImg = dummyImage()}) => {
    return (
        <div className='flex p-4 items-center gap-2 shadow-sm shadow-gray-400 rounded-tr-lg'>
            <img src={ProfileImg} alt={username} className='w-14 h-14 rounded-full' />
            <h1 className='text-2xl'>{username}</h1>
        </div>
    )
}

export default SupportHeader