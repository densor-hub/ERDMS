import Menu from "../Components/Menu/MenuWithSideBar/Index.tsx";
import NavBar from "../Components/NavBar.tsx";
import AddPersonForm from "../Components/Form/FormWithNavigation.tsx";
import PageRightSide from "../Components/PageRightSide.tsx";
import React, { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { formatEmail, formatFullName } from "../Functions/FormatString.ts";
import { isValidDate } from "../Functions/DateFunctions.ts";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  iFormWithNavigationContentObject,
  iFormDataObject,
} from "../Interfaces/Interfaces.ts";
import DefaultPage from "../Layouts/CynosureLayout.tsx";

const AddSupplier = () => {
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

  const [contactDetails, setContactDetails] = useState<iFormDataObject[]>([
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

  const [companyDetails, setCompanyDetails] = useState<iFormDataObject[]>([
    {
      label: "Company name",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Enter company name",
      },
    },
    {
      label: "Company phone",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Comapny's phone number",
      },
    },
    {
      label: "Location",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Company's location",
      },
    },
  ]);

  const formDataSetterFunctions = useRef<Array<Function>>([
    setPersonalDetails,
    setContactDetails,
    setCompanyDetails,
  ]);

  const navigation = useRef({
    generalDetails: "general details",
    contactDetails: "contact details",
    companytDetails: "company details",
    preview: "preview",
  });

  const content: iFormWithNavigationContentObject[] = [
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
        next: navigation?.current?.companytDetails,
        default: navigation?.current?.generalDetails,
      },
    },
    {
      title: navigation?.current?.companytDetails,
      formData: companyDetails,
      setformData: setCompanyDetails,
      navigation: {
        previous: navigation?.current?.contactDetails,
        next: navigation?.current?.preview,
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

export default AddSupplier;
