import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { createPathname } from "../Functions/FormatString.ts";

const MenuGrandChildren = ({ currentContent }) => {
  //current content from Menu in UI
  return (
    currentContent?.content?.length > 0 && (
      <main className="bg-slate-600 min-h-[560px] h-full">
        <div className="pt-11">
          {currentContent?.content?.length > 0 &&
            currentContent?.content.map((element, index) => {
              return (
                <div
                  key={index}
                  className={index === 0 ? "border-t-4 border-slate-300" : {}}
                >
                  <MenuGrandChildrenBody element={element} />
                </div>
              );
            })}
        </div>
      </main>
    )
  );
};

export default MenuGrandChildren;

const MenuGrandChildrenBody = ({ element }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div className="text-white  text-left w-full  ">
      {element?.children ? (
        <section className="w-full">
          <div className="h-12  flex items-center">
            <button
              className={
                !showChildren
                  ? "flex hover:text-white text-slate-400 pl-7"
                  : "flex text-yellow-600 pl-7"
              }
              onClick={() => {
                setShowChildren(!showChildren);
              }}
            >
              <span className="flex items-center justify-left relative">
                <span
                  className={
                    showChildren
                      ? "rotate-90 relative right-2 transition-transform duration-600"
                      : "rotate-360 relative right-2 transition-transform duration-300"
                  }
                >
                  <AiOutlineRight color={"white"} />
                </span>
                <span>{element?.title}</span>
              </span>
            </button>
          </div>

          <div
            className={
              showChildren
                ? "relative bottom-5 translate-y-5 transition-transform duration-500"
                : ""
            }
          >
            {showChildren && (
              <section className="bg-slate-400 text-zinc-700 ">
                {element.children.map((childrenElement, index) => {
                  return (
                    <div key={index} className="w-full h-7  ">
                      <Link
                        to={`/${createPathname(childrenElement?.title)}`}
                        className="relative left-16 "
                      >
                        {childrenElement?.title}
                      </Link>
                    </div>
                  );
                })}
              </section>
            )}
          </div>
        </section>
      ) : (
        <div className="h-12 flex items-center ">
          <Link
            to={`/${createPathname(element?.title)}`}
            className="relative left-[10%] text-slate-400 hover:text-white"
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
