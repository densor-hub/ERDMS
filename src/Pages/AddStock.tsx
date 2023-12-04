import React, { useState, useRef, useEffect } from "react";
import Form from "../Components/Form/FieldsetForm.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu/MenuWithSideBar/Index.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
import DefaultPage from "../Layouts/CynosureLayout.tsx";
const AddStock = () => {
  const Submit = () => { };
  const Cancel = () => { };

  //feedbacks(error or success messages)
  const [feedback, setFeedback] = useState("");
  const [formContent, setformData] = useState<Array<iFormDataObject>>([
    {
      label: "Item name",
      data: "",
      input: {
        required: true,
        type: "text",
        autoComplete: "off",
        placeholder: " Select item",
      },
    },

    {
      label: "Quantity",
      data: "",
      input: {
        type: "number",
        autoComplete: "off",
        placeholder: " Enter quantity",
        required: true,
      },
    },

    {
      label: "Date",
      data: "",
      input: {
        type: "date",
        autoComplete: "off",
        placeholder: " Select date",
        required: true,
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
        setformData={setformData}
        onSubmit={Submit}
        onCancel={Cancel}
        formTitle={"Add Asset"}
      ></Form>
    </DefaultPage>
  );
};

export default AddStock;
