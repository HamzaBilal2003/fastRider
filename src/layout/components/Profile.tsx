import React, { useState, useRef, useEffect, useContext } from 'react';
import admin from '../../assets/images/admin.png';
import Cookies from 'js-cookie';
import { API_DOMAIN_Img } from '../../apiConfig';
import { ChangePasswordModalComponent } from './ChangePasswordModalComponent';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  name?: string;
  img?: string;
}
interface ProfileDetails {
  name: string;
  email: string;
  phone: string;
  status: "verified" | "unverified";
  profile_picture: string;
  date_joined: string;
  total_amount_in_dollar: string;
  total_amount_in_naira: string;
  backgroundimg?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = 'Admin', img = admin }) => {
  const [showeditmodel, setshoweditmodel] = useState(false);
  const userCookie = Cookies.get('user');
  const getUser = userCookie ? JSON.parse(userCookie) : null;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const onSubmit = (values: ProfileDetails) => {
    console.log(values);
  };
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    console.log('Password changed:', { oldPassword, newPassword });
    // Add any success notification here
  };
  const { logout } = useContext(AuthContext)
  const naviagte = useNavigate();

  const handlelogout = () =>{
    logout();
    naviagte('/')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img src={API_DOMAIN_Img + getUser?.profile_picture}  className="w-14 h-14 rounded-md bg-gray-200" />
        <div>
          <h2 className="text-xl capitalize"> Hey, {getUser?.name || name}</h2>
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setShowChangePasswordModal(true)} >Change Password</li>
            {/* <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setshoweditmodel(true)}>Edit Profile</li> */}
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handlelogout}>Logout</li>
          </ul>
        </div>
      )}
      <ChangePasswordModalComponent
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
};

export default Profile;
