import React from "react";
import HorizontalAlign from "../../components/HorizontalAlign";
import ItemGap from "../../components/ItemGap";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import Dropdown from "../../components/Dropdown";
import { onlineStatus } from "../../components/FilterData";
import SearchFilter from "../../components/SearchFilter";
import { MapPin } from "lucide-react";
import MapContainer from "../../components/MapContainer";

const Tracking : React.FC = () => {
  const navigate = useNavigate();
  const tabs = [
    { value: "/tracking&location", name: "Live location" },
    { value: "/tracking&location/localization", name: "Localization" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  const handleDetailsClick = (e: string) => {
    console.log("Status selected:", e);
  }
  return (
    <>
      <div className="bg-white">
        <HorizontalAlign havsShadow={true}>
          <h1 className="text-lg font-semibold px-6">Settings</h1>
          <ItemGap className="px-6">
            <Filter
              tabs={tabs}
              activeTab={"Live location"}
              handleValue={handleNavigate}
            />
          </ItemGap>
        </HorizontalAlign>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <HorizontalAlign>
          <Dropdown
            options={onlineStatus}
            onChange={handleDetailsClick}
            placeholder="Region"
            position="left-0"
          />
          <SearchFilter />
        </HorizontalAlign>
        <MapContainer
                origin={{ lat: 40.719526, lng: -73.952255 }} // example: McCarren Park
                destination={{ lat: 40.744679, lng: -73.948542 }} // example: LaGuardia Community College
              />
        <div className="flex items-center gap-6 p-4 bg-white shadow-md shadow-gray-400 rounded-md">
          <div className="flex items-center gap-1">
            <MapPin size={25} fill="purple" color="white" />
            <h1 className="text-lg">Online Rider</h1>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={25} fill="blue" color="white" />
            <h1 className="text-lg">Users</h1>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={25} fill="red" color="white" />
            <h1 className="text-lg">Offline Rider</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracking;
