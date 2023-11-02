import React from "react";
import Menu from "../Components/Menu.tsx";
import PageRightSide from "../Components/PageRightSide.tsx";
import NavBar from "../Components/NavBar.tsx";

const DefaultPage = ({ children, PageRight }: any) => {
  const IncomingPageRightComponent = PageRight;
  return (
    <main className="flex w-full h-full overflow-x-hidden ">
      <Menu />
      <section className="w-full ">
        <NavBar />
        <section className="w-full flex h-screen min-h-[515px]">
          {PageRight ? (
            <IncomingPageRightComponent />
          ) : (
            <PageRightSide
              appName={"CYNOSURE"}
              actions={[{ label: "Employement" }]}
            />
          )}
          {children}
        </section>
      </section>
    </main>
  );
};

export default DefaultPage;
