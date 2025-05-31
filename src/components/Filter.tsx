import React, { useState } from 'react';

interface Tab {
  name: string;
  value: string;
}

interface FilterProps {
  tabs: Tab[];
  handleValue: (value: string) => void;
  activeTab: string | undefined;
  tabPadding?: string;
}

const Filter: React.FC<FilterProps> = ({ tabs, handleValue, activeTab, tabPadding = '2' }) => {
  const [activeTabs, setactiveTabs] = useState(activeTab);

  const handleTabClick = (tab: Tab) => {
    handleValue(tab.value);
    setactiveTabs(tab.name);
  };
  

  return (
    <div className="flex items-center gap-2 bg-theme-dark w-fit rounded-lg p-1 px-2 border border-gray-300 bg-white">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`capitalize cursor-pointer py-${tabPadding} px-8 rounded-lg ${
            activeTabs === tab.name
              ? 'bg-[#800080] text-white'
              : 'bg-transparent text-black transition'
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Filter;