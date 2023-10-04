import { useState, useRef, useEffect } from "react";
import Form from "../Components/Form";
import NavBar from "../Components/NavBar";
import Menu from "../Components/Menu";
const AddAsset = () => {
  const [validatedData_FromForm, setValidatedData_FromForm] = useState({});
  const [formData, setformData] = useState([
    {
      label: "Item name",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
      },
      validCondintion: (itemanme) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Select type",
      data: "",
      input: {
        type: "select",
        required: true,
        autoComplete: "off",
        placeholder: " Select type",
      },
      children: [
        "Vehicle",
        "Appartment",
        "Computer",
        "Laptop",
        "Tool",
        "Other",
      ],
    },
    {
      label: "Identification",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
        placeholder: " Car , House or Serial Number",
      },
      validCondintion: (id) => {
        if (id.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Description",
      data: "",
      input: {
        type: "textarea",
        required: true,
        autoComplete: "off",
        placeholder: " Short description",
      },
    },
  ]);

  console.log(validatedData_FromForm);

  return (
    <main className="overflow-x-hidden">
      <section className="flex">
        <Menu />

        <section className="w-full">
          <NavBar />
          <div className="relative top-14 w-fit mx-auto">
            <Form
              formTitle={"Add Asset"}
              formData={formData}
              setformData={setformData}
              setValidatedData_FromForm={setValidatedData_FromForm}
            ></Form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AddAsset;
