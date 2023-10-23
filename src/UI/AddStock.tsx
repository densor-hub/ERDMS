import React, { useState, useRef, useEffect } from "react";
import Form from "../Components/Form.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
const AddStock = () => {
  const Submit = () => {};
  const Cancel = () => {};


  //feedbacks(error or success messages)
  const [feedback, setFeedback] = useState("");

  //bools for validating input fields
  const [bools, setBools] = useState({
    itemName: false,
    Quanitity: false,
    Date: false,
  });

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
    <main className="overflow-x-hidden">
      <section className="flex">
        <Menu />

        <section className="w-full">
          <NavBar />
          <div className="relative top-14 w-fit mx-auto">
            <Form
              formData={formContent}
              setformData={setformData}
              onSubmit={Submit}
              onCancel={Cancel}
              formTitle={"Add Asset"}
            ></Form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AddStock;
