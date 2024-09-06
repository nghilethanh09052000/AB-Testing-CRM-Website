"use client"
import React, { useState } from "react";
import Link from "next/link";


interface Tab {
  id: number;
  name: string;
}

interface TabOneProps {
  tabs: Tab[];
  handleTabClick: (tabId: number) => void;

}

const TabOne:  React.FC<TabOneProps> = ({tabs, handleTabClick}) => {
  const [openTab, setOpenTab] = useState<number>(tabs[0].id);
  const onTabClick = (tabId: number) => {
    setOpenTab(tabId);
    handleTabClick(tabId)
    
  };

  const activeClasses = "bg-primary text-white";
  const inactiveClasses = "bg-gray dark:bg-meta-4 text-black dark:text-white";

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-7.5 flex flex-wrap gap-3 rounded-lg border border-stroke px-4 py-3 dark:border-strokedark">
        
        
      {tabs.map((tab) => (
          <Link
            key={tab.id}
            href="#"
            className={`rounded-md px-4 py-3 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6 ${
              openTab === tab.id ? activeClasses : inactiveClasses
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabOne;
