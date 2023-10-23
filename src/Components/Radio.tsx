import { useImperativeHandle, useState } from "react";
import { iFormSubComponent, iForwaredByRadio } from "../Interfaces/Interfaces";
import React from "react";

const Radio = React.forwardRef<iForwaredByRadio, iFormSubComponent>(
  ({ formDataObject, REF }, ref) => {
    useImperativeHandle(ref, () => {
      return { setRadioValue: setInputValue };
    });

    const [showChildren, setShowChildren] = useState(false);
    const [inputValue, setInputValue] = useState(formDataObject?.data);

    return (
      <div className="w-fit">
        {!showChildren ? (
          <input
            style={{
              margin: "0px auto",
              padding: "0px",
              width: "calc(100% - 10px)",
              position: "relative",
              left: "5px",
              outline: "none",
            }}
            autoComplete={formDataObject?.input?.autoComplete}
            id={formDataObject?.label?.toLowerCase()}
            placeholder={
              formDataObject?.input?.placeholder
                ? ` ${formDataObject?.input?.placeholder}`
                : ` ${formDataObject?.label?.trim()}`
            }
            name={formDataObject?.label.toLowerCase()}
            ref={REF}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onFocus={() => {
              setTimeout(() => {
                setShowChildren(true);
              }, 1);
            }}
            onClick={() => {
              setTimeout(() => {
                setShowChildren(true);
              }, 1);
            }}
          ></input>
        ) : (
          formDataObject?.children?.map((child, index) => {
            return (
              <button
                key={index}
                className="w-14 h-6 text-white bg-slate-500 rounded-full text-xs ml-1 hover:bg-slate-700"
                onClick={(e) => {
                  e.preventDefault();
                  setShowChildren(false);
                  setInputValue(child);
                  formDataObject.data = child;
                }}
              >
                {child}
              </button>
            );
          })
        )}
      </div>
    );
  }
);

export default Radio;
