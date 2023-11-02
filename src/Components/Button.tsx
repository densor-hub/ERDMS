import { type } from "os";
import "../index.css";
import React, { CSSProperties } from "react";

interface iButton {
  children: any;
  onClick: React.MouseEventHandler;
  style?: CSSProperties;
  type: "button" | "submit" | "reset";
}

const Button = ({ onClick, style, type, children }: iButton) => {
  return (
    <button
      onClick={onClick}
      className=" relative generalBTN"
      style={{ ...style }}
      type={type}
    >
      <div style={{ zIndex: 0 }} className="absolute w-full h-full abss"></div>
      <div className="relative">{children}</div>
    </button>
  );
};

export default Button;
