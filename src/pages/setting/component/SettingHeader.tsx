import React from "react";
import { useNavigate } from "react-router-dom";
import HorizontalAlign from "../../../components/HorizontalAlign";
import ItemGap from "../../../components/ItemGap";
import Filter from "../../../components/Filter";

// Define props interface
interface Props {
  url?: string;
}

const SettingHeader: React.FC<Props> = ({ url }) => {
    const navigate = useNavigate();
  const tabs = [
    { value: "/settings/general", name: "General" },
    { value: "/settings/admin", name: "Admin Management" },
  ];

  const handleNavigate = (path: string) => {
      navigate(path);
  };

  return (
    <div className="bg-white">
      <HorizontalAlign havsShadow={true}>
        <h1 className="text-2xl font-semibold px-6">Settings</h1>
        <ItemGap className="px-6">
          <Filter
            tabs={tabs}
            activeTab={url}
            handleValue={handleNavigate}
          />
        </ItemGap>
      </HorizontalAlign>
    </div>
  );
};

export default SettingHeader;
