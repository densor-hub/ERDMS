import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { useState, useEffect } from "react";
import {
  iFormSubComponent,
  iForwaredByPhoneInput,
} from "../Interfaces/Interfaces";
import React from "react";
import { useImperativeHandle } from "react";

const PhoneNumber = React.forwardRef<iForwaredByPhoneInput, iFormSubComponent>(
  ({ formDataObject, REF }, ref) => {
    useImperativeHandle(ref, () => {
      return {
        setPhoneInputValue: setPhoneInputValue,
      };
    });
    let phoneNumberString = formDataObject?.data.toString();
    let localStorageCountryCode: any;

    if (localStorage.getItem(`${formDataObject?.label}`)) {
      localStorageCountryCode = localStorage.getItem(
        `${formDataObject?.label}`
      );
    }

    const [PhoneInputValue, setPhoneInputValue] = useState<string | undefined>(
      parsePhoneNumber(phoneNumberString, localStorageCountryCode)?.number
    );

    const [countryCode, setCountryCode] = useState<string | undefined>(
      localStorageCountryCode
    );

    useEffect(() => {
      if (countryCode) {
        if (countryCode) {
          localStorage.setItem(`${formDataObject?.label}`, countryCode);
        }
      }
    }, [countryCode, formDataObject?.label]);

    return (
      <div>
        <PhoneInput
          defaultCountry={localStorageCountryCode}
          style={{ border: "0px" }}
          ref={REF}
          autoComplete="false"
          placeholder={
            formDataObject?.input?.placeholder
              ? ` ${formDataObject?.input?.placeholder}`
              : ` Enter ${formDataObject?.label?.toLowerCase()}`
          }
          onChange={setPhoneInputValue}
          value={PhoneInputValue}
          onCountryChange={setCountryCode}
          name={formDataObject?.label.toLowerCase()}
          type="tel"
        ></PhoneInput>
      </div>
    );
  }
);

export default PhoneNumber;
