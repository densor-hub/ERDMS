import { useState, useRef } from "react";
import Form from "./Form";
import UploadImage from "./UploadFile";
import { formatEmail, formatFullName } from "../Functions/FormatString";
import { isValidDate } from "../Functions/DateFunctions";
import { isValidPhoneNumber } from "react-phone-number-input";
import ProgresBar from "./ProgressBar";
import Profile from "./Profile";
import { useEffect } from "react";

const AddPersonForm = () => {
  const content = useRef({
    personalDetails: "general-details",
    contactDetails: "contact-details",
    employmentDetails: "employment-details",
    preview: "preview",
  });

  //IMAGE IS FROM UPLOAD IMAGE COMPONENT
  const [ValidatedData_FromForm, setValidatedData_FromForm] = useState([]);
  const [image, setImage] = useState();

  const [currentContent, setCurrentContent] = useState(
    content?.current?.personalDetails
  );

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
        required: true,
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

  console.log(ValidatedData_FromForm);
  return (
    <main className="w-full ">
      <ProgresBar
        content={[
          content?.current?.personalDetails,
          content?.current?.contactDetails,
          content?.current?.employmentDetails,
          content?.current?.preview,
        ]}
        currentContent={currentContent}
      />
      {!(currentContent === content.current?.preview) ? (
        <section className="mx-auto w-full bg-white h-fit">
          {currentContent === content.current?.personalDetails ? (
            <PersonalDetails
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
              content={content}
              setCurrentContent={setCurrentContent}
              setValidatedData_FromForm={setValidatedData_FromForm}
            />
          ) : currentContent === content.current?.contactDetails ? (
            <ContactDetails
              contactDetails={contactDetails}
              setContactDetails={setContactDetails}
              content={content}
              setCurrentContent={setCurrentContent}
              setValidatedData_FromForm={setValidatedData_FromForm}
            />
          ) : (
            currentContent === content.current?.employmentDetails && (
              <EmploymentDetails
                employmentDetails={employmentDetails}
                setEmploymentDetails={setEmploymentDetails}
                content={content}
                setCurrentContent={setCurrentContent}
                setValidatedData_FromForm={setValidatedData_FromForm}
              />
            )
          )}
        </section>
      ) : (
        <Profile profileData={ValidatedData_FromForm} />
      )}
    </main>
  );
};

export default AddPersonForm;

const PersonalDetails = ({
  personalDetails,
  setPersonalDetails,
  content,
  setCurrentContent,
  setValidatedData_FromForm,
}) => {
  return (
    <main className="w-full">
      {personalDetails?.length > 0 && (
        <Form
          formTitle={
            content?.current?.personalDetails.split("-")[0] +
            " " +
            content?.current?.personalDetails.split("-")[1]
          }
          formData={personalDetails}
          setformData={setPersonalDetails}
          content={{
            next: content?.current?.contactDetails,
            default: content?.current?.personalDetails,
          }}
          setCurrentContent={setCurrentContent}
          setValidatedData_FromForm={setValidatedData_FromForm}
          fileInclusive={{ allowedExtensions: ["png", "jpg", "jpeg", "webp"] }}
          endPointUrl="http://localhost:3500/adada"
        ></Form>
      )}
    </main>
  );
};

const ContactDetails = ({
  contactDetails,
  setContactDetails,
  content,
  setCurrentContent,
  setValidatedData_FromForm,
}) => {
  return (
    <main>
      {contactDetails?.length > 0 && (
        <Form
          formTitle={
            content?.current?.contactDetails?.split("-")[0] +
            " " +
            content?.current?.contactDetails?.split("-")[1]
          }
          formData={contactDetails}
          setformData={setContactDetails}
          content={{
            next: content?.current?.employmentDetails,
            previous: content?.current?.personalDetails,
            default: content?.current?.personalDetails,
          }}
          setCurrentContent={setCurrentContent}
          setValidatedData_FromForm={setValidatedData_FromForm}
          endPointUrl="http://localhost:3500/adada"
        ></Form>
      )}
    </main>
  );
};

const EmploymentDetails = ({
  employmentDetails,
  setEmploymentDetails,
  content,
  setCurrentContent,
  setValidatedData_FromForm,
}) => {
  return (
    <main>
      <div>{}</div>
      {employmentDetails?.length > 0 && (
        <Form
          formTitle={
            content?.current?.employmentDetails?.split("-")[0] +
            " " +
            content?.current?.employmentDetails?.split("-")[1]
          }
          formData={employmentDetails}
          setformData={setEmploymentDetails}
          content={{
            next: content?.current?.preview,
            previous: content?.current?.contactDetails,
            default: content?.current?.personalDetails,
          }}
          setCurrentContent={setCurrentContent}
          setValidatedData_FromForm={setValidatedData_FromForm}
          endPointUrl="http://localhost:3500/adada"
        ></Form>
      )}
    </main>
  );
};
