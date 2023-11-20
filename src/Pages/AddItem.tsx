import React, { useState, useRef, useEffect } from "react";
import Form from "../Components/Form/FieldsetForm.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu/MenuWithSideBar.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
import DefaultPage from "../Layouts/CynosureLayout.tsx";
const AddItem = () => {
  const Submit = () => { };
  const Cancel = () => { };

  //feedbacks(error or success messages)
  const [feedback, setFeedback] = useState("");

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
    <DefaultPage>
      <Form
        formData={formContent}
        setformData={setFormData}
        onSubmit={Submit}
        onCancel={Cancel}
        formTitle={"Add Item"}
      ></Form>
    </DefaultPage>
  );
};

export default AddItem;
