import React from "react";
import { iStyles } from "../Interfaces/Interfaces";
import Button from "./Button";

interface iModal {
  EffectNotice: string;
  ActionInOneWord: string;
  ActionFucntion: Function;
  CancelInOneWord: string;
  CancelFunction: Function;
  Styles: iStyles;
}
const Modal = ({
  EffectNotice,
  ActionInOneWord,
  ActionFucntion,
  CancelFunction,
  CancelInOneWord,
  Styles,
}: iModal) => {
  return (
    <main className="fixed top-0 left-0 right-0 bottom-0 min-h-screen w-screen  bg-[rgb(0,0,0,0.5)] text-white z-20 flex justify-center items-center">
      <div className="w-fit p-10 mx-auto border-2 border-slate-400 bg-[rgb(0,0,0,0.5)] rounded-lg">
        <table>
          <tbody>
            <tr>
              <td>
                <span>{EffectNotice}</span>
                <br />
                <span>Do you still want to {ActionInOneWord}? </span>
              </td>
            </tr>

            <tr>
              <td className="text-center py-2">
                <Button
                  label={"Yes"}
                  onClick={(e) => {
                    ActionFucntion();
                  }}
                  style={Styles?.button}
                  // className="border-2 px-4 rounded-lg w-[80px] border-slate-700 hover:text-slate-700 hover:bg-slate-300 mx-1 bg-slate-500 text-white"
                ></Button>
                <Button
                  label={"No"}
                  onClick={(e) => {
                    CancelFunction();
                  }}
                  style={Styles?.button}
                ></Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Modal;
