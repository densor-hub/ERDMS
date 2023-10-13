import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { useState, forwardRef, useEffect } from "react";

const PhoneNumber = forwardRef(({ phoneNumberData, REF }, ref) => {
  const [PhoneInputValue, setPhoneInputValue] = useState(
    parsePhoneNumber(
      phoneNumberData?.data,
      localStorage.getItem(`${phoneNumberData?.label}`)
    )?.number
  );
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem(`${phoneNumberData?.label}`)
  );

  useEffect(() => {
    if (countryCode) {
      if (countryCode) {
        localStorage.setItem(`${phoneNumberData?.label}`, countryCode);
      }
    }
  }, [countryCode, phoneNumberData?.label]);

  return (
    <div>
      <PhoneInput
        defaultCountry={localStorage.getItem(`${phoneNumberData.label}`)}
        style={{ border: "0px" }}
        ref={REF}
        autoComplete="false"
        placeholder={
          phoneNumberData?.input?.placeholder
            ? ` ${phoneNumberData?.input?.placeholder}`
            : ` Enter ${phoneNumberData?.label?.toLowerCase()}`
        }
        onChange={setPhoneInputValue}
        value={PhoneInputValue}
        onCountryChange={setCountryCode}
        name={phoneNumberData?.label}
        type="tel"
      ></PhoneInput>
    </div>
  );
});

export default PhoneNumber;
