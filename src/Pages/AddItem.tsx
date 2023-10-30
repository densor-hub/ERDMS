import React, { useState, useRef, useEffect } from "react";
import Form from "../Components/Form.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
const AddItem = () => {
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
    itemName: false,
    Asset_type: false,
    Identification: false,
    Description: false,
  });

  const [formContent, setFormData] = useState<Array<iFormDataObject>>([
    {
      label: "Item name",
      data: "",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Enter name",
        required: true,
      },
    },
    {
      label: "Item type",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Enter type",
      },
    },
    {
      label: "Identification",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Serial number",
      },
    },
    {
      label: "Purcahse price",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Purchase price",
      },
    },
    {
      label: "Selling price",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Selling Price",
      },
    },
  ]);

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
              formData={formContent}
              setformData={setFormData}
              onSubmit={Submit}
              onCancel={Cancel}
              formTitle={"Add Item"}
            ></Form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AddItem;
