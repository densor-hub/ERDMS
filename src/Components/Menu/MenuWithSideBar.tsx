import MenuChild from "./MWSB-Sub-components/MWSB_Child.tsx";
import MenuGrandChildren from "./MWSB-Sub-components/MWSB_GrandChildren.tsx";
import { useState, useRef } from "react";
import { useOutsideClicked } from "../../Hooks/useOutSideClicked.jsx";
import React from "react";
import { iMenucontentContainer } from "../../Interfaces/Interfaces.ts";

const MenuWithSideBar = ({headers, sideBarContent}) => {
  

  const [currentContent, setCurrentContent] =
    useState<iMenucontentContainer | null>(null);
  const MenuRef = useRef();

  //onclick function passed to MenuChild to set current MenuContent to be displayed
  const onClick = (content: iMenucontentContainer) => {
    setCurrentContent(content);
  };

  //when outside of Menu is Clicked
  useOutsideClicked(MenuRef, setCurrentContent, [], [currentContent]);

  
  return (
    <main className={"flex w-fit h-scren min-h-fit"} ref={MenuRef} >
      <section className="w-32 h-full  bg-slate-700 ">
        {headers?.map((elements, index) => {
          return (
            <MenuChild
              key={index}
              label={elements?.label}
              onClick={onClick}
              content={sideBarContent}
              currentContent={currentContent}
              icon={elements.icon}
            />
          );
        })}
      </section>

      <section
        className={
          currentContent?.content?.length > 0
            ? "relative right-10 w-60 translate-x-10 transition-transform duration-100 ease-in"
            : " relative left-10  transition-transform duration-[1s] "
        }
      >
        <MenuGrandChildren currentContent={currentContent} />
      </section>
    </main>
  );
};

export default MenuWithSideBar;
