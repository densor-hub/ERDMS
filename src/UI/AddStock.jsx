import { useState, useRef, useEffect } from "react";
import Form from "../Components/Form";
import NavBar from "../Components/NavBar";
import Menu from "../Components/Menu";
const AddStock = () => {
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
    Quanitity: false,
    Date: false,
  });

  const formContent = [
    {
      label: "Item name",
      input: {
        type: "text",
        autoComplete: "off",
        placeholder: " Select item",
        refValue: addToRequiredRefs,
        condition: bools.itemName,
      },
    },

    {
      label: "Quantity",
      input: {
        type: "number",
        autoComplete: "off",
        placeholder: " Enter quantity",
        refValue: addToRequiredRefs,
        condition: bools.Quanitity,
      },
    },

    {
      label: "Date",
      input: {
        type: "date",
        autoComplete: "off",
        placeholder: " Select date",
        refValue: addToRequiredRefs,
        condition: bools.Date,
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

export default AddStock;
