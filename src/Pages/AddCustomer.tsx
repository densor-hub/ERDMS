import Menu from "../Components/Menu/MenuWithSideBar/Index.tsx";
import NavBar from "../Components/NavBar.tsx";
import AddPersonForm from "../Components/Form/FormWithNavigation.tsx";
import PageRightSide from "../Components/PageRightSide.tsx";
import React, { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { formatEmail, formatFullName } from "../Functions/FormatString.ts";
import { isValidDate } from "../Functions/DateFunctions.ts";
import { isValidPhoneNumber } from "react-phone-number-input";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
import DefaultPage from "../Layouts/CynosureLayout.tsx";

const AddCustomer = () => {
  const [personalDetails, setPersonalDetails] = useState<
    Array<iFormDataObject>
  >([
    {
      label: "Full name",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
      },
      validator: (fullname: string) => {
        if (formatFullName(fullname)) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Ghana card number",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
      },
    },
    {
      label: "Date of birth",
      data: "",
      input: {
        type: "date",
        required: true,
        autoComplete: "off",
      },
      validator: (dateofbith: Date) => {
        if (isValidDate(dateofbith)) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Gender",
      data: "",
      input: {
        type: "radio",
        required: true,
        autoComplete: "off",
      },
      children: ["Male", "Female"],
    },
    {
      label: "image",
      data: "",
      input: {
        type: "file",
        required: false,
        autoComplete: "off",
        allowedExtensions: ["png", "jpg", "jpeg", "webp"],
        icon: FaUser,
      },
    },
  ]);

  const [contactDetails, setContactDetails] = useState<Array<iFormDataObject>>([
    {
      label: "Phone",
      data: "",
      input: {
        required: true,
        type: "tel",
        autoComplete: "off",
        placeholder: " Enter phone number",
      },
      validator: (phoneNumber: string) => {
        if (isValidPhoneNumber(phoneNumber)) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Email",
      data: "",
      input: {
        required: false,
        type: "email",
        autoComplete: "off",
        placeholder: " Enter email address",
      },
      validator: (email: string) => {
        if (formatEmail(email)) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Adrress",
      data: "",
      input: {
        required: false,
        type: "text",
        autoComplete: "off",
        placeholder: " Enter location address",
      },
    },
    {
      label: "Gh Post",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Enter Gh post address",
      },
    },
  ]);

  const formDataSetterFunctions = useRef<Array<Function>>([
    setPersonalDetails,
    setContactDetails,
  ]);

  const navigation = useRef({
    generalDetails: "general details",
    contactDetails: "contact details",
    preview: "preview",
  });

  const content = [
    {
      title: navigation?.current?.generalDetails,
      formData: personalDetails,
      setformData: setPersonalDetails,
      navigation: {
        next: navigation?.current?.contactDetails,
        default: navigation?.current?.generalDetails,
      },
    },
    {
      title: navigation?.current?.contactDetails,
      formData: contactDetails,
      setformData: setContactDetails,
      navigation: {
        previous: navigation?.current?.generalDetails,
        default: navigation?.current?.generalDetails,
      },
    },
  ];
  return (
    <DefaultPage>
      <AddPersonForm
        content={content}
        navigation={navigation.current}
        formDataSetterFunctions={formDataSetterFunctions.current}
      />
    </DefaultPage>
  );
};

export default AddCustomer;
