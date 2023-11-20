import React, { useState } from "react";
import FieldsetForm from "./FieldsetForm.tsx";
import ProgresBar from "../ProgressBar.tsx";
import Profile from "../Profile.tsx";
import Button from "../Button.tsx";
import { iFormWithNavigation } from "../../Interfaces/Interfaces.ts";

const FormWithNavigation = ({
  content,
  navigation,
  formDataSetterFunctions,
  Styles
}: iFormWithNavigation) => {
  const [currentContent, setCurrentContent] = useState<any>(
    Object?.values(navigation)[0]
  );

  const [finalData, setFinalData] = useState({});

  const onDetailsSubmit = (ValidatedData_FromForm: any) => {
    setFinalData({
      ...finalData,
      ...ValidatedData_FromForm,
    });
  };

  const cancelEmployment = () => {
    setFinalData({});
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
              <FieldsetForm
                key={index}
                formTitle={contents?.title}
                formData={contents?.formData}
                setformData={contents?.setformData}
                formDataSetterFunctions={formDataSetterFunctions}
                navigation={contents?.navigation}
                setCurrentContent={setCurrentContent}
                Styles={Styles}
                onSubmit={onDetailsSubmit}
                onCancel={cancelEmployment}
              />
            )
          );
        })
      ) : (
        <section>
          <Profile profileData={finalData} />
          <div className="flex">
            <Button
              onClick={() => {
                console.log("I want to Save");
              }}
              type={"button"}
            >
              {"Save"}
            </Button>
            <Button
              onClick={() => {
                setCurrentContent(
                  Object.values(navigation)[
                  Object.values(navigation).length - 2
                  ]
                );
              }}
              type={"button"}
            >
              {"Back"}
            </Button>
          </div>
        </section>
      )}
    </main>
  );
};

export default FormWithNavigation;
