import React from 'react';
import images from '../../constants/images';
import MoreDropdown from '../../components/MoreDropdown';

interface UserProfileProps {
  userData: {
    name: string;
    email: string;
    phoneNumber: string;
    location?: string;
    lastLogin?: string;
    accountCreation?: string;
    walletBalance: number;
    profilePicture?: string;
    status: any;
  };
  disabledLeft?:boolean;
  handleEdit:()=>void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData,disabledLeft,handleEdit }) => {
  return (
    <div className="bg-[#470434] text-white rounded-2xl shadow-lg ">
      <div className={`grid grid-cols-1 ${ disabledLeft ? "lg:grid-cols-9" : "lg:grid-cols-12"} gap-6`}>
        {/* Left Section - Wallet */}
        {!disabledLeft && <div className={`space-y-6 lg:col-span-3 bg-[#620748] p-6 rounded-l-2xl`}>
          <h2 className="text-lg opacity-90">Wallet Balance</h2>
          <p className="text-4xl font-bold">₦{userData.walletBalance.toLocaleString()}</p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer">
              Topup
            </button>
            <button className="bg-white border-2 border-white text-black px-6 py-2 rounded-lg font-medium  cursor-pointer">
              Withdraw
            </button>
          </div>
        </div>}

        {/* Right Section - User Info */}
        <div className="flex items-start gap-6 lg:col-span-9 p-6 pl-2">
          <div className={`relative ${disabledLeft && "lg:mx-6"}`}>
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-700">
                  <span className="text-2xl font-bold">
                    {userData.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-purple-900 ${userData.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4">
                {userData.name && (
                <div className='space-y-2'>
                  <h3 className="font-medium opacity-80">Name</h3>
                  <p className="font-semibold">{userData.name}</p>
                </div>
                )}
                {userData.email && (
                <div className='space-y-2'>
                  <h3 className="font-medium opacity-80">Email</h3>
                  <p className="font-semibold">{userData.email}</p>
                </div>
                )}
                {userData.location && (
                <div className='space-y-2'>
                  <h3 className="font-medium opacity-80">Location</h3>
                  <p className="font-semibold">{userData.location}</p>
                </div>
                )}
                {userData.phoneNumber && (
                <div className='space-y-2'>
                  <h3 className="font-medium opacity-80">Phone Number</h3>
                  <p className="font-semibold">{userData.phoneNumber}</p>
                </div>
                )}
                {userData.lastLogin && (
                <div className='space-y-2'>
                  <h3 className="font-medium opacity-80">Last Login</h3>
                  <p className="font-semibold">{userData.lastLogin}</p>
                </div>
                )}
              <div className="flex justify-end items-center gap-2">
                <button onClick={handleEdit} className="p-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors border border-gray-400">
                  <img src={images.profileBell} alt="icon" className='size-[20px]' />
                </button>
                <button className="p-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors border border-gray-400">
                  <img src={images.ProfileNotifcation} alt="icon" className='size-[20px]' />
                </button>
                <MoreDropdown
                  iconClass="bi bi-three-dots-vertical"
                  menuClass="min-w-[150px] bg-white"
                >
                  <div className='flex flex-col gap-2 px-1'>
                    <button className='py-2 flex items-center gap-2 px-2 hover:underline text-black cursor-pointer text-center'>
                      <img src={images.warning} alt="block icon" className='size-[20px]' />
                      Block User
                    </button>
                    <button className='py-2 flex items-center gap-2 px-2 hover:underline text-black cursor-pointer text-center'>
                      <img src={images.del} alt="del icon" className='size-[20px]' />
                      Delete User
                    </button>
                  </div>
                </MoreDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
