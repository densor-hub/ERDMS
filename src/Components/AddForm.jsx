import { useState } from "react";
import Input from "./Input";
import PhoneInput from "react-phone-number-input";
const Form = ({ formContent, OnSubmit, OnCancel, formTitle, feedback }) => {
  const [PhoneInputValue, setPhoneInputValue] = useState("");
  const inputStyle = {
    valid: "border-2  border-slate-200 rounded-lg w-full",
    invlaid: "border-0 border-b-2 border-red-500",
  };
  return (
    <main className=" w-[400px]">
      <div className="text-center pb-4 ">{feedback}</div>
      <div className="uppercase font-bold  w-fit relative left-[35%] pb-4">
        {formTitle}
      </div>
      <form className="">
        <table className="w-full">
          {formContent?.length > 0 &&
            formContent.map((element, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td className="w-full h-10 pb-3 ">
                      <div>
                        <label className="text-md font-semibold">
                          {element?.label}
                        </label>
                      </div>

                      {/* //refer to input component if there is any ambiguity */}
                      {element?.input?.type === "text" ||
                      element?.input?.type === "email" ||
                      element?.input?.type === "number" ||
                      element?.input?.type === "date" ||
                      element?.input?.type === "date-time" ? (
                        <Input
                          type={element?.input?.type}
                          autoComplete={element?.input?.autoComplete}
                          id={element?.label?.toLowerCase()}
                          placeholder={element?.input?.placeholder}
                          name={element?.label.toLowerCase()}
                          refValue={element?.input?.refValue}
                          condition={element?.input?.condition}
                          style={inputStyle}
                        ></Input>
                      ) : element?.input.type === "select" ? (
                        <select
                          className="w-full border-2 border-slate-200 rounded-lg"
                          ref={element?.input?.refValue}
                          name={element?.label.toLowerCase()}
                          autoComplete={element?.input?.autoComplete}
                          id={element?.label?.toLowerCase()}
                          // condition={element?.input?.condition}
                        >
                          {element?.input?.options?.map((element, index) => {
                            return (
                              <option key={index} value={element}>
                                {element}
                              </option>
                            );
                          })}
                        </select>
                      ) : element?.input.type === "textarea" ? (
                        <textarea
                          className={
                            !element?.input?.condition
                              ? "text-sm border-2 border-slate-200 rounded-lg w-full"
                              : "border-2 border-red-500 "
                          }
                          type={element?.input?.type}
                          autoComplete={element?.input?.autoComplete}
                          id={element?.label?.toLowerCase()}
                          placeholder={element?.input?.placeholder}
                          name={element?.label.toLowerCase()}
                          refValue={element?.input?.refValue}
                          condition={element?.input?.condition}
                        ></textarea>
                      ) : (
                        element?.input.type === "tel" && (
                          <PhoneInput
                            defaultCountry="GH"
                            autoComplete="false"
                            placeholder={"Enter Phone Number"}
                            onChange={setPhoneInputValue}
                            value={PhoneInputValue}
                          ></PhoneInput>
                        )
                      )}
                    </td>
                  </tr>
                  {index === formContent?.length - 1 && (
                    <tr>
                      <td className="text-center">
                        <button
                          className="px-4 py-2 rounded-lg mr-2 bg-slate-700 text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-700"
                          label={"Submit"}
                          onClick={() => {
                            OnSubmit();
                          }}
                        >
                          Submit
                        </button>

                        <button
                          className="px-4 py-2 rounded-lg ml-2 bg-slate-700 text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-700"
                          label={"Cancel"}
                          onClick={() => {
                            OnCancel();
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
        </table>
      </form>
    </main>
  );
};

export default Form;
