import React from "react";
import Cookies from "js-cookie";
import { API_DOMAIN_Img } from "../../apiConfig";


const Profile: React.FC = () => {
  const userCookie = Cookies.get('user');
  const getUser = userCookie ? JSON.parse(userCookie) : null;
  return (
    <div className="flex items-center gap-4 ">
      <img src={API_DOMAIN_Img+ getUser.profile_picture} alt="profile" className="w-14 h-14 rounded-full" loading="lazy" />
      <div>
        <h4 className="text-lg ">Hey, {getUser?.name}</h4>
      </div>
    </div>
  );
};

export default Profile;
