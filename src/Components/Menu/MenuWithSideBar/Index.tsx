import MenuItem from "./MenuItem.tsx";
import SideBarContent from "./MenuSideBar.tsx";
import { useState, useRef } from "react";
import { useOutsideClicked } from "../../../Hooks/useOutSideClicked.jsx";
import React from "react";
import { iMenuWithSideBarObject } from "../../../Interfaces/Interfaces.ts";


interface iMenuWithSideBar {
  content: iMenuWithSideBarObject[];
}

const MenuWithSideBar = ({ content }: iMenuWithSideBar) => {
  const [currentContent, setCurrentContent] =
    useState<iMenuWithSideBarObject | null>(null);
  const MenuRef = useRef();

  //onclick function passed to MenuChild to set current MenuContent to be displayed
  const onClick = (selectedContent: iMenuWithSideBarObject) => {
    setCurrentContent(selectedContent);
  };

  //when outside of Menu is Clicked
  useOutsideClicked(MenuRef, setCurrentContent, [], [currentContent]);

  return (
    <main className={"flex w-fit h-scren min-h-fit"} ref={MenuRef} >
      <section className="w-32 h-full  bg-slate-700 ">
        {content?.map((elements: iMenuWithSideBarObject, index: number) => {
          return (
            <MenuItem
              key={index}
              onClick={onClick}
              entity={elements}
              currentContent={currentContent}
              icon={elements.icon}
            />
          );
        })}
      </section>

      <section
        className={
          currentContent?.sideBarContent?.length > 0
            ? "relative right-10 w-60 translate-x-10 transition-transform duration-100 ease-in"
            : " relative left-10  transition-transform duration-[1s] "
        }
      >
        <SideBarContent currentContent={currentContent} />
      </section>
    </main>
  );
};

export default MenuWithSideBar;
