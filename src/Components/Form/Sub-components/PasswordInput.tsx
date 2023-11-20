import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, {
  //   forwardRef,
  //   useImperativeHandle,
  useState,
} from "react";
import {
  iFormSubComponent,
  iForwardedByPasswordInput,
} from "../../../Interfaces/Interfaces";

const PasswordInput = React.forwardRef<
  iForwardedByPasswordInput,
  iFormSubComponent
>(({ formDataObject, REF, inputRefs }, ref) => {
  //   useImperativeHandle(ref, () => {
  //     return { setPassword: setPassword };
  //   });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  inputRefs.find((element) => {
    return element.name.toLowerCase() === formDataObject.label.toLowerCase();
  });

  return (
    <div style={{ display: "flex" }}>
      <input
        name={formDataObject?.label?.toLowerCase()}
        id={formDataObject?.label?.toLowerCase()}
        ref={REF}
        placeholder={
          formDataObject?.input?.placeholder
            ? ` ${formDataObject?.input?.placeholder}`
            : ` Enter ${formDataObject?.label?.toLowerCase()}`
        }
        defaultValue={formDataObject?.data}
        style={{
          padding: "0px",
          margin: "0px",
          border: "0px",
          outline: "none",
          width: "calc(100% - 10px)",
          position: "relative",
          left: "5px",
          backgroundColor: "transparent",
        }}
        type="password"
      />
      {!showPassword ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(true);
            let specificInput = inputRefs?.find((element) => {
              return (
                element?.name?.toLowerCase() ===
                formDataObject?.label?.toLowerCase()
              );
            });
            specificInput.type = "text";
          }}
          style={{
            margin: "0px 7px",
          }}
        >
          <AiOutlineEye color="white" size={20} />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(false);
            let specificInput = inputRefs?.find((element) => {
              return (
                element?.name?.toLowerCase() ===
                formDataObject?.label?.toLowerCase()
              );
            });
            specificInput.type = "password";
          }}
          style={{
            margin: "0px 7px",
          }}
        >
          <AiOutlineEyeInvisible color="white" size={20} />
        </button>
      )}
    </div>
  );
});

export default PasswordInput;
