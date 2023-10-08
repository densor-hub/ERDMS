import { useEffect, useState } from "react";

const ProgresBar = ({ content, currentContent }) => {
  const [progressed, setProgressed] = useState([]);

  let gridColumns = "";
  if (content?.length > 0) {
    for (var i = 0; i < content?.length; i++) {
      gridColumns =
        gridColumns + `${Math?.floor(100 / content?.length) + "%"} `;
    }
  }

  useEffect(() => {
    if (content?.length > 0) {
      setProgressed(content.slice(0, content?.indexOf(currentContent) + 1));
    }
  }, [currentContent]);

  return (
    <main className="w-[95%] mx-auto relative left-[10%] py-10">
      <div className="grid " style={{ gridTemplateColumns: gridColumns }}>
        {content?.length > 0 &&
          content?.map((elements, index) => {
            return (
              <div key={index} className="">
                <section className="flex h-full">
                  <div
                    className={
                      !progressed?.includes(elements)
                        ? "w-10 h-10 rounded-full bg-slate-300 font-bold text-white flex justify-center items-center"
                        : "w-10 h-10 rounded-full bg-slate-700 font-bold text-white flex justify-center items-center "
                    }
                  >
                    {index + 1}
                  </div>
                  {index !== content?.length - 1 && (
                    <div className="h-full justify-center items-center w-[calc(100%-40px)]">
                      <div
                        className={
                          !progressed?.includes(content[index + 1])
                            ? "h-[3px]  bg-slate-300 relative top-[18px] "
                            : "h-[3px]  bg-slate-700 relative top-[18px] "
                        }
                      ></div>
                    </div>
                  )}
                </section>
                <div className="text-xs italic">{`${elements[0]?.toUpperCase()}${elements?.slice(
                  1,
                  elements?.length
                )}`}</div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default ProgresBar;
