import React, { CSSProperties } from "react";
import { iMenucontentContainer } from "../Interfaces/Interfaces";

interface iMenuChild {
  key: number | string;
  label: string;
  onClick: Function;
  content: iMenucontentContainer[];
  currentContent: iMenucontentContainer | null;
  icon: any;
}

interface iMenuIcon {
  icon?: any;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

const MenuChild = (prop: iMenuChild) => {
  return (
    <button
      onClick={() => {
        prop.onClick(
          prop.content.find((element: iMenucontentContainer) => {
            return element?.id.toLowerCase() === prop.label.toLowerCase();
          })
        );
      }}
      className={
        prop.label?.toLowerCase() === prop?.currentContent?.id?.toLowerCase()
          ? "w-full h-20 bg-yellow-600"
          : "w-full h-20 bg-slate-700"
      }
    >
      <main className="flex justify-center flex-col items-center text-center text-sm text-white ">
        <div>
          <MenuIcon icon={prop.icon} size={30} />
        </div>
        <div>{String(prop.label)}</div>
      </main>
    </button>
  );
};

export default MenuChild;

const MenuIcon = ({ icon, size }: iMenuIcon) => {
  const Icon = icon;
  return <Icon size={size}></Icon>;
};
