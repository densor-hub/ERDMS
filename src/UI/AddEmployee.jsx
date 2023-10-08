import Menu from "../Components/Menu";
import NavBar from "../Components/NavBar";
import AddPersonForm from "../Components/AddPersonForm";
import PageRightSide from "../Components/PageRightSide";
import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { formatEmail, formatFullName } from "../Functions/FormatString";
import { isValidDate } from "../Functions/DateFunctions";
import { isValidPhoneNumber } from "react-phone-number-input";

const AddEmployee = () => {
  const [personalDetails, setPersonalDetails] = useState([
    {
      label: "Full name",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
      },
      validCondintion: (fullname) => {
        if (formatFullName(fullname)) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Gh ID",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
        placeholder: " Enter Ghana card no_",
      },
    },
    {
      label: "Date of birth",
      data: "",
      input: {
        type: "date",
        required: true,
        autoComplete: "off",
        placeholder: " Enter type",
      },
      validCondintion: (dateofbith) => {
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

  const [employmentDetails, setEmploymentDetails] = useState([
    {
      label: "Type",
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
      validCondintion: (salary) => {
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

  const formDataSetterFunctions = useRef([
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
      fileInclusive: {
        allowedExtensions: ["png", "jpg", "jpeg", "webp"],
        fileIcon: FaUser,
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
        final: true,
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
            navigation={navigation}
            formDataSetterFunctions={formDataSetterFunctions}
          />
        </section>
      </section>
    </main>
  );
};

export default AddEmployee;
