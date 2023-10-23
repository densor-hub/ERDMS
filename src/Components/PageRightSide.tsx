import "../index.css";
import React from "react";

interface iPageRight {
  appName: string;
  actions: Array<iPageRightAction>;
}

interface iPageRightAction {
  ref?: React.RefObject<HTMLButtonElement>;
  label: string;
  onClick?: React.MouseEventHandler;
}

const PageRightSide = ({ appName, actions }: iPageRight) => {
  return (
    <div className="FormRightside w-40">
      <div className="py-5 text-center text-md font-bold text-slate-700">
        <b>
          <i>{appName}</i>
        </b>
      </div>

      {actions?.length > 0 &&
        actions?.map((elements, index) => {
          return (
            <button
              key={index}
              ref={elements?.ref}
              onClick={elements?.onClick}
              className="bg-slate-700"
            >
              {elements?.label}
            </button>
          );
        })}
    </div>
  );
};

export default PageRightSide;
