import React, { useImperativeHandle, useState, useRef } from "react";
import { useOutsideClicked } from "../Hooks/useOutSideClicked.jsx";
import {
  iFormSubComponent,
  iForwardedBySelect,
} from "../Interfaces/Interfaces";

const Select = React.forwardRef<iForwardedBySelect, iFormSubComponent>(
  ({ formDataObject, REF }, ref) => {
    useImperativeHandle(ref, () => {
      return {
        setSelectedValue: setSelectedItem,
      };
    });

    const [showChildren, setShowChildren] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(formDataObject?.data);

    const selectItemFilterBoxRef = useRef<HTMLInputElement | null>(null);
    useOutsideClicked(selectItemFilterBoxRef, setShowChildren, false, []);

    return (
      <main className="relative  ">
        <input
          style={{
            margin: "0px auto",
            padding: "0px",
            width: "calc(100% - 10px)",
            position: "relative",
            left: "5px",
            outline: "none",
            border: "0px",
          }}
          autoComplete={formDataObject?.input?.autoComplete}
          id={formDataObject?.label?.toLowerCase()}
          placeholder={
            formDataObject?.input?.placeholder
              ? ` ${formDataObject?.input?.placeholder}`
              : ` Enter ${formDataObject?.label?.toLowerCase()}`
          }
          name={formDataObject?.label.toLowerCase()}
          ref={REF}
          onClick={() => {
            setShowChildren(true);
          }}
          onChange={(e) => {
            setShowChildren(true);
            setSelectedItem(e?.target?.value);
          }}
          value={selectedItem}
        ></input>
        {showChildren && (
          <section
            className=" absolute w-full  z-10"
            ref={selectItemFilterBoxRef}
          >
            {formDataObject?.children?.map((child: any, index: number) => {
              return (
                <div
                  key={
                    child instanceof Object && child?.id
                      ? child?.id
                      : child instanceof Object && child?._id
                      ? child?._id
                      : index
                  }
                >
                  <button
                    className=" w-full min-h-[40px] bg-slate-400 text-white text-left hover:bg-slate-600"
                    onClick={(e) => {
                      e.preventDefault();
                      formDataObject.data = child;
                      setShowChildren(false);
                      setSelectedItem(
                        child instanceof Object
                          ? `${child?.name ? child?.name : ""} ${
                              child?.type ? child?.type : ""
                            } ${child?.size ? child?.size : ""}`
                          : child
                      );
                    }}
                  >
                    {child instanceof Object
                      ? " " +
                        ` ${child?.name ? child?.name : ""} ${
                          child?.type ? child?.type : ""
                        } ${child?.size ? child?.size : ""}`
                      : " " + child}
                  </button>
                </div>
              );
            })}
          </section>
        )}
      </main>
    );
  }
);

export default Select;
