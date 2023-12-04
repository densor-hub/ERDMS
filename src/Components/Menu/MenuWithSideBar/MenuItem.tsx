import React, { CSSProperties } from "react";
import { iMenuWithSideBarObject } from "../../../Interfaces/Interfaces";

interface iMenuItem {
  onClick: (entity: iMenuWithSideBarObject) => void;
  entity: iMenuWithSideBarObject;
  currentContent: iMenuWithSideBarObject | null;
  icon: any;
}

interface iMenuIcon {
  icon?: any;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

const MenuItem = (prop: iMenuItem) => {
  return (
    <button
      onClick={() => {
        prop.onClick(prop.entity);
      }}
      className={
        prop.entity?.label?.toLowerCase() === prop?.currentContent?.label?.toLowerCase()
          ? "w-full h-20 bg-yellow-600"
          : "w-full h-20 bg-slate-700"
      }
    >
      <main className="flex justify-center flex-col items-center text-center text-sm text-white ">
        <div>
          <Icon icon={prop.icon} size={30} />
        </div>
        <div>{String(prop.entity?.label)}</div>
      </main>
    </button>
  );
};

export default MenuItem;

const Icon = ({ icon, size }: iMenuIcon) => {
  const Icon = icon;
  return <Icon size={size}></Icon>;
};
