import React, { useState } from "react";
import Form from "./Form.tsx";
import ProgresBar from "./ProgressBar.tsx";
import Profile from "./Profile.tsx";
import Button from "./Button.tsx";
import { iAddPerson } from "../Interfaces/Interfaces.ts";

const AddPersonForm = ({
  content,
  navigation,
  formDataSetterFunctions,
}: iAddPerson) => {
  const [currentContent, setCurrentContent] = useState<any>(
    Object?.values(navigation)[0]
  );

  const [finalEMploymentData, setFinalEmploymentData] = useState({});

  const onDetailsSubmit = (ValidatedData_FromForm: any) => {
    setFinalEmploymentData({
      ...finalEMploymentData,
      ...ValidatedData_FromForm,
    });
  };

  const cancelEmployment = () => {
    setFinalEmploymentData({});
  };
  return (
    <main className="w-full ">
      <ProgresBar
        content={Object.values(navigation)}
        currentContent={currentContent}
      />
      {content?.length > 0 &&
      currentContent !==
        Object?.values(navigation)[Object?.values(navigation)?.length - 1] ? (
        content?.map((contents, index: number) => {
          return (
            contents?.title?.trim()?.toLowerCase() ===
              currentContent?.trim()?.toLowerCase() && (
              <Form
                key={index}
                formTitle={contents?.title}
                formData={contents?.formData}
                setformData={contents?.setformData}
                formDataSetterFunctions={formDataSetterFunctions}
                navigation={contents?.navigation}
                setCurrentContent={setCurrentContent}
                Styles={{
                  input: { marginBottom: "8px" },
                  label: { fontWeight: "450" },
                  button: {
                    padding: "5px",
                    marginLeft: "5px",
                    border: "2px solid #94a3b8",
                    minWidth: "100px",
                  },
                }}
                onSubmit={onDetailsSubmit}
                onCancel={cancelEmployment}
              />
            )
          );
        })
      ) : (
        <section>
          <Profile profileData={finalEMploymentData} />
          <div className="flex">
            <Button
              label={"Save"}
              onClick={() => {
                console.log("I want to Save");
              }}
            />
            <Button
              label={"Back"}
              onClick={() => {
                setCurrentContent(
                  Object.values(navigation)[
                    Object.values(navigation).length - 2
                  ]
                );
              }}
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default AddPersonForm;
