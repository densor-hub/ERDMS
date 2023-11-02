import React, { useState, useRef, useEffect } from "react";
import Form from "../Components/Form.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
import DefaultPage from "./DefaultPage.tsx";

const CreateBranch: React.FC = () => {
  const Submit: Function = () => {};
  const Cancel: Function = () => {};

  //feedbacks(error or success messages)
  const [feedback, setFeedback] = useState<string>("");

  const [formData, setFormData] = useState<Array<iFormDataObject>>([
    {
      label: "Location",
      data: "",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Enter location",
        required: true,
      },
    },
    {
      label: "Administrator",
      data: "",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Select Administrator",
        required: true,
      },
    },
    {
      label: "Email",
      data: "",
      input: {
        type: "email",
        autoComplete: "off",
        placeholder: " Enter email of branch",
        required: true,
      },
    },
    {
      label: "Phone",
      data: "",
      input: {
        type: "tel",
        autoComplete: "off",
        placeholder: " Enter phone number of branch",
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
        formData={formData}
        setformData={setFormData}
        onSubmit={Submit}
        onCancel={Cancel}
        formTitle={"Create New Branch"}
      ></Form>
    </DefaultPage>
  );
};

export default CreateBranch;
