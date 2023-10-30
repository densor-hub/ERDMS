import { type } from "os";
import "../index.css";
import React, { CSSProperties } from "react";

interface iButton {
  label: string;
  onClick: React.MouseEventHandler;
  style?: CSSProperties;
  type: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, style, type }: iButton) => {
  return (
    <button
      onClick={onClick}
      className=" relative generalBTN"
      style={{ ...style }}
      type={type}
    >
      <div style={{ zIndex: 0 }} className="absolute w-full h-full abss"></div>
      <div className="relative">{label}</div>
    </button>
  );
};

export default Button;
