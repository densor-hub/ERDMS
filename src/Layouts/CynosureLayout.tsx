import React from "react";
import PageRightSide from "../Components/PageRightSide.tsx";
import NavBar from "../Components/NavBar.tsx";
import CynosureMenu from "../Components/CynosureMenu.tsx";

const CynosureLayout = ({ children }: any) => {
  return (
    <main className="flex w-full  overflow-hidden h-screen min-h-[560px]" >
      <CynosureMenu />
      <section className="w-full h-full">
        <NavBar />
        <section className="w-full flex h-full" >
          <PageRightSide
            appName={"CYNOSURE"}
          />
          {children}
        </section>
      </section>
    </main>
  );
};

export default CynosureLayout;
