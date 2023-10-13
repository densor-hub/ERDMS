import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useOutsideClicked } from "../Hooks/useOutSideClicked";

const Select = forwardRef(({ selectData, REF }, ref) => {
  useImperativeHandle(ref, () => {
    return {
      setSelectedValue: setSelectedItem,
    };
  });

  const [showChildren, setShowChildren] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectData?.data);

  const selectItemFilterBoxRef = useRef();
  useOutsideClicked(selectItemFilterBoxRef, setShowChildren, false, []);

  //selectedObject && console.log(selectedObject);
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
        autoComplete={selectData?.input?.autoComplete}
        id={selectData?.label?.toLowerCase()}
        placeholder={
          selectData?.input?.placeholder
            ? ` ${selectData?.input?.placeholder}`
            : ` Enter ${selectData?.label?.toLowerCase()}`
        }
        name={selectData?.label.toLowerCase()}
        ref={REF}
        condition={selectData?.input?.condition}
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
          {selectData?.children?.map((child, index) => {
            return (
              <div
                key={child?.id ? child?.id : child?._id ? child?._id : index}
              >
                <button
                  className=" w-full min-h-[40px] bg-slate-400 text-white text-left hover:bg-slate-600"
                  onClick={(e) => {
                    e.preventDefault();
                    selectData.data = child;
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
});

export default Select;
