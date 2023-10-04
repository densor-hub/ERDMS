import { useState, useRef, useEffect } from "react";
import Form from "../Components/Form";
import NavBar from "../Components/NavBar";
import Menu from "../Components/Menu";

const AddCustomer = () => {
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
    customerName: false,
    Phone: false,
    Email: false,
    Location: false,
  });

  const formContent = [
    {
      label: "Customer name",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Enter name",
        refValue: addToRequiredRefs,
        condition: bools.customerName,
      },
    },

    {
      label: "Phone",
      input: {
        type: "tel",
        autoComplete: "off",
        placeholder: " Enter phone number",
        refValue: addToRequiredRefs,
        condition: bools.Phone,
      },
    },

    {
      label: "Email",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Enter email",
        refValue: addToRequiredRefs,
        condition: bools.Email,
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
              formTitle={"Add New Customer"}
              feedback={feedback}
            ></Form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AddCustomer;
