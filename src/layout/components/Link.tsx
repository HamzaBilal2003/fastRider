import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SubLink {
  name: string;
  link: string;
  icon: string;
}

interface LinkCompProps {
  name: string;
  link: string;
  sub?: SubLink[];
  isActiveCheck: boolean;
  icon: string;
  onClick: () => void;
  menuStatus: boolean;
}

const LinkComp: React.FC<LinkCompProps> = ({
  name,
  link,
  sub = [],
  isActiveCheck,
  icon,
  onClick,
  menuStatus,
}) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(isActiveCheck);
  if (location.pathname.split('/')[1] == link.split('/')[1]) {
    console.log("true")
  }

  useEffect(() => {
    setIsActive(
      location.pathname.split('/')[1] == link.split('/')[1] ||
      sub.some((item) =>
        location.pathname === item.link ||
        location.pathname.split('/')[1] === link.split('/')[1]
      )
    );
  }, [location.pathname, link, sub]);

  return (
    <div className="relative">
      {/* Purple Side Border for Active Tab */}

      {isActive && <div className="absolute left-0 top-1/2 h-[80%] bg-purple-500 w-1 rounded transform -translate-y-1/2"></div>}
      <Link
        to={link}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ml-4
          ${isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}
      >
        <img src={icon} alt={`${name} icon`} className="w-5 h-5" />
        {!menuStatus && <span className="font-medium">{name}</span>}
      </Link>
    </div>
  );
};

export default LinkComp;
