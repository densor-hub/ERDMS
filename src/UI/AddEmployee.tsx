import Menu from "../Components/Menu.tsx";
import NavBar from "../Components/NavBar.tsx";
import AddPersonForm from "../Components/AddPersonForm.tsx";
import PageRightSide from "../Components/PageRightSide.tsx";
import React, { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { formatEmail, formatFullName } from "../Functions/FormatString.ts";
import { isValidDate } from "../Functions/DateFunctions.ts";
import { isValidPhoneNumber } from "react-phone-number-input";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";

const AddEmployee = () => {
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
        required: true,
        autoComplete: "off",
        allowedExtensions: ["png", "jpg", "jpeg", "webp"],
        icon: FaUser,
      },
    },
  ]);

  const [contactDetails, setContactDetails] = useState([
    {
      label: "Phone",
      data: "",
      input: {
        required: true,
        type: "tel",
        autoComplete: "off",
        placeholder: " Enter phone number",
      },
      validCondintion: (phoneNumber) => {
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
      validCondintion: (email) => {
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

  const [employmentDetails, setEmploymentDetails] = useState<
    Array<iFormDataObject>
  >([
    {
      label: "Employment type",
      data: "",
      input: {
        required: true,
        type: "select",
        autoComplete: "off",
        placeholder: " Select type",
      },
      children: ["Permanet", "Contract"],
    },
    {
      label: "Salary",
      data: "",
      input: {
        required: true,
        type: "number",
        autoComplete: "off",
        placeholder: " Enter salary",
      },
      validator: (salary: string) => {
        if (Number(salary) > 200) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Role",
      data: "",
      input: {
        required: true,
        type: "select",
        autoComplete: "off",
        placeholder: " Select role",
      },
      children: ["Manager", "Sales agent", "Admin", "Director"],
    },
  ]);

  const formDataSetterFunctions = useRef<Array<Function>>([
    setPersonalDetails,
    setContactDetails,
    setEmploymentDetails,
  ]);

  const navigation = useRef({
    generalDetails: "general details",
    contactDetails: "contact details",
    employmentDetails: "employment details",
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
        next: navigation?.current?.employmentDetails,
        previous: navigation?.current?.generalDetails,
        default: navigation?.current?.generalDetails,
      },
    },
    {
      title: navigation?.current?.employmentDetails,
      formData: employmentDetails,
      setformData: setEmploymentDetails,
      navigation: {
        next: navigation?.current?.preview,
        previous: navigation?.current?.contactDetails,
        default: navigation?.current?.generalDetails,
      },
    },
  ];
  return (
    <main className="flex w-full h-full overflow-x-hidden ">
      <Menu />
      <section className="w-full ">
        <NavBar />
        <section className="w-full flex h-screen min-h-[515px]">
          <PageRightSide
            appName={"CYNOSURE"}
            actions={[{ label: "Employement" }]}
          />

          <AddPersonForm
            content={content}
            navigation={navigation.current}
            formDataSetterFunctions={formDataSetterFunctions.current}
          />
        </section>
      </section>
    </main>
  );
};

export default AddEmployee;