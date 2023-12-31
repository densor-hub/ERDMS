import React, { useState } from "react";
import FieldsetForm from "../Components/Form/FieldsetForm.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";
import CynosureLayout from "../Layouts/CynosureLayout.tsx";

const AddAsset = () => {
  const [validatedData_FromForm, setValidatedData_FromForm] = useState({});
  const [formData, setformData] = useState<Array<iFormDataObject>>([
    {
      label: "Item name",
      data: "",
      input: {
        type: "text",
        required: true,
        autoComplete: "off",
      },
      validator: (itemanme: string) => {
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
        placeholder: " Unique Identification",
      },
      validator: (id: string) => {
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

  //console.log(validatedData_FromForm);
  const onFormCancel = () => { };

  const onFormSubmit = () => { };
  return (
    <CynosureLayout>
      <FieldsetForm
        formTitle={"Add Asset"}
        formData={formData}
        setformData={setformData}
        onCancel={onFormCancel}
        onSubmit={onFormSubmit}
        Styles={{ form: { minWidth: "300px" } }}
      ></FieldsetForm>
    </CynosureLayout>
  );
};

export default AddAsset;
