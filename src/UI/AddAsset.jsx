import { useState, useRef, useEffect } from "react";
import Form from "../Components/AddForm";
import NavBar from "../Components/NavBar";
import Menu from "../Components/Menu";
const AddAsset = () => {
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

  const formContent = [
    {
      label: "Item name",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Enter name",
        refValue: addToRequiredRefs,
        condition: bools.itemName,
      },
    },
    {
      label: "Select type",
      input: {
        type: "select",
        autoComplete: "off",
        placeholder: " Select type",
        refValue: addToRequiredRefs,
        condition: bools.Asset_type,
        options: [
          "Vehicle",
          "Appartment",
          "Computer",
          "Laptop",
          "Tool",
          "Other",
        ],
      },
    },
    {
      label: "Identification",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Plate , House or Serial Number",
        refValue: addToRequiredRefs,
        condition: bools.Identification,
      },
    },
    {
      label: "Description",
      input: {
        type: "textarea",
        autoComplete: "off",
        placeholder: " Short description",
        refValue: addToRequiredRefs,
        condition: bools.Description,
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
              formTitle={"Add Asset"}
              feedback={feedback}
            ></Form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AddAsset;
