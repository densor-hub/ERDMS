import { forwardRef, useImperativeHandle, useState } from "react";

const Radio = forwardRef(({ radioData, REF }, ref) => {
  useImperativeHandle(ref, () => {
    return { setRadioValue: setInputValue };
  });

  const [showChildren, setShowChildren] = useState(false);
  const [inputValue, setInputValue] = useState(radioData?.data);

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
          autoComplete={radioData?.input?.autoComplete}
          id={radioData?.label?.toLowerCase()}
          placeholder={
            radioData?.input?.placeholder
              ? ` ${radioData?.input?.placeholder}`
              : ` ${radioData?.label?.trim()}`
          }
          name={radioData?.label.toLowerCase()}
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
        radioData?.children?.map((child, index) => {
          return (
            <button
              key={index}
              className="w-14 h-6 text-white bg-slate-500 rounded-full text-xs ml-1 hover:bg-slate-700"
              onClick={(e) => {
                e.preventDefault();
                setShowChildren(false);
                setInputValue(child);
                radioData.data = child;
              }}
            >
              {child}
            </button>
          );
        })
      )}
    </div>
  );
});

export default Radio;
