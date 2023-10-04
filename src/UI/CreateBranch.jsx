import { useState, useRef, useEffect } from "react";
import Form from "../Components/Form";
import NavBar from "../Components/NavBar";
import Menu from "../Components/Menu";

const CreateBranch = () => {
  const Submit = () => {};
  const Cancel = () => {};

  //refs
  const RequiredRefs = useRef([]);
  const addToRequiredRefs = (element) => {
    if (element && !RequiredRefs?.current?.includes(element)) {
      RequiredRefs.current?.push(element);
    }
  };

  //feedbacks(error or success messages)
  const [feedback, setFeedback] = useState("");

  //bools for validating input fields
  const [bools, setBools] = useState({
    Admin: false,
    Location: false,
    Phone: false,
    Email: false,
  });

  const formContent = [
    {
      label: "Location",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Enter location",
        refValue: addToRequiredRefs,
        condition: bools.Location,
      },
    },
    {
      label: "Administrator",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Select Administrator",
        refValue: addToRequiredRefs,
        condition: bools.Admin,
      },
    },
    {
      label: "Email",
      input: {
        type: "email",
        autoComplete: "off",
        placeholder: " Enter email of branch",
        refValue: addToRequiredRefs,
        condition: bools.Admin,
      },
    },
    {
      label: "Phone",
      input: {
        type: "tel",
        autoComplete: "off",
        placeholder: " Enter phone number of branch",
        refValue: addToRequiredRefs,
        condition: bools.Admin,
      },
    },
  ];

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  });
  return (
    <main className="overflow-x-hidden">
      <section className="flex">
        <Menu />

        <section className="w-full">
          <NavBar />
          <div className="relative top-14 w-fit mx-auto">
            <Form
              formContent={formContent}
              OnSubmit={Submit}
              OnCancel={Cancel}
              formTitle={"Create New Branch"}
              feedback={feedback}
            ></Form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default CreateBranch;
