import "../index.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface iPageRight {
  appName: string;
}

const PageRightSide = ({ appName }: iPageRight) => {
  const { pathname } = useLocation();

  return (
    <div className="FormRightside w-40">
      <div className="py-5 text-center text-md font-bold text-slate-700">
        <b>
          <i>{appName}</i>
        </b>
      </div>

      <button
        className="bg-slate-700 capitalize font-bold"
      >
        {(pathname.split('/')[pathname.split('/').length - 1]).replace("-", " ")}
      </button>
    </div>
  );
};

export default PageRightSide;
