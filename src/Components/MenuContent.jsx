import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { createPathname } from "../Functions/FormatString";

const MenuContent = ({ currentContent }) => {
  //current content from Menu in UI
  return (
    currentContent?.content?.length > 0 && (
      <main className="bg-slate-600 min-h-screen h-full ">
        <div className="pt-11 ">
          {currentContent?.content?.length > 0 &&
            currentContent?.content.map((element, index) => {
              return (
                <div
                  key={index}
                  className={index === 0 && "border-t-4 border-slate-300"}
                >
                  <MenuContentBody element={element} />
                </div>
              );
            })}
        </div>
      </main>
    )
  );
};

export default MenuContent;

const MenuContentBody = ({ element }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div className="text-white  text-left w-full ] ">
      {element?.children ? (
        <section className="w-full">
          <div className="h-12  flex items-center ">
            <button
              className="flex hover:text-yellow-600"
              onClick={() => {
                setShowChildren(!showChildren);
              }}
            >
              <span className="flex items-center justify-left relative left-[30%]">
                <span
                  className={
                    showChildren
                      ? "rotate-90 relative right-2 transition-transform"
                      : "rotate-360 relative right-2 transition-transform"
                  }
                >
                  <AiOutlineRight color={"white"} />
                </span>
                <span>{element?.title}</span>
              </span>
            </button>
          </div>
          <section className="bg-slate-400 text-black ">
            {showChildren &&
              element.children.map((childrenElement, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-7  hover:text-yellow-400"
                  >
                    <Link
                      to={`/${createPathname(childrenElement?.title)}`}
                      className="relative left-[30%]"
                    >
                      {childrenElement?.title}
                    </Link>
                  </div>
                );
              })}
          </section>
        </section>
      ) : (
        <div className="h-12 flex items-center ">
          <Link
            to={`/${createPathname(element?.title)}`}
            className="relative left-[10%]"
          >
            <span className="flex items-center ">
              <span className="relative top-1" style={{ visibility: "hidden" }}>
                <AiOutlineRight color={"white"} />
              </span>
              {element?.title}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};
