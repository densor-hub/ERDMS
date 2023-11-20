import React, {
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
} from "react";
import { useEffect } from "react";
import {
  iFormSubComponent,
  iForwardedBySelect,
} from "../../../Interfaces/Interfaces";

const Select = React.forwardRef<iForwardedBySelect, iFormSubComponent>(
  ({ formDataObject, REF, inputRefs, formType, Styles }, ref) => {
    useImperativeHandle(ref, () => {
      return {
        setSelectedValue: setSelectedItem,
      };
    });

    const [showChildren, setShowChildren] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(formDataObject?.data);

    const selectItemFilterBoxRef = useRef<HTMLSelectElement | null>(null);

    const hideSelectOptions = useCallback(
      (event: any) => {
        let inputRef = inputRefs.find((element) => {
          return (
            formDataObject?.label.toLowerCase().trim() ===
            element?.id.toLowerCase().trim()
          );
        });

        if (
          showChildren &&
          selectItemFilterBoxRef.current &&
          !selectItemFilterBoxRef.current?.contains(event.target) &&
          !inputRef.contains(event.target)
        ) {
          setShowChildren(false);
        }
      },
      [
        showChildren,
        selectItemFilterBoxRef.current,
        inputRefs,
        formDataObject?.label,
      ]
    );
    useEffect(() => {
      document.addEventListener("click", hideSelectOptions);
      return () => {
        document.removeEventListener("click", hideSelectOptions);
      };
    }, [hideSelectOptions]);

    const inputStyle = {
      valid: "border-2  border-slate-200 rounded-lg w-full mb-2 ",
      invlaid: "border-0 border-b-2 border-red-500 mb-2",
    };

    return (
      <main className="relative" style={{ width: "100%" }}>
        <input
          className={inputStyle.valid}
          style={!formType?.regular ? {
            padding: "0px",
            margin: "0px",
            border: "0px",
            outline: "none",
            width: "calc(100% - 10px)",
            position: "relative",
            left: "5px",
            backgroundColor: "transparent",
            ...Styles.input
          } : {
            outline: "none",
            width: "calc(100% ",
            position: "relative",
            backgroundColor: "transparent",
            ...Styles?.input
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
            //  setShowChildren(true);
            setSelectedItem(e?.target?.value);
          }}
          value={selectedItem}
        ></input>
        {showChildren && (
          <section
            className=" absolute w-full  z-10 border-2 "
            ref={selectItemFilterBoxRef}
            data-testid="select-options"
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
                      setSelectedItem(
                        child instanceof Object
                          ? `${child?.name ? child?.name : ""} ${child?.type ? child?.type : ""
                          } ${child?.size ? child?.size : ""}`
                          : child
                      );
                      setShowChildren(false);
                    }}
                  >
                    {child instanceof Object
                      ? " " +
                      ` ${child?.name ? child?.name : ""} ${child?.type ? child?.type : ""
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
