import { useState } from "react";
import Form from "./Form";
import ProgresBar from "./ProgressBar";
import Profile from "./Profile";
import Button from "./Button";

const AddPersonForm = ({ content, navigation, formDataSetterFunctions }) => {
  const [currentContent, setCurrentContent] = useState(
    Object?.values(navigation?.current)[0]
  );

  const [finalEMploymentData, setFinalEmploymentData] = useState({});

  const onDetailsSubmit = (ValidatedData_FromForm) => {
    setFinalEmploymentData({
      ...finalEMploymentData,
      ...ValidatedData_FromForm,
    });
  };

  console.log(finalEMploymentData);
  return (
    <main className="w-full ">
      <ProgresBar
        content={Object.values(navigation?.current)}
        currentContent={currentContent}
      />
      {content?.length > 0 &&
      currentContent !==
        Object?.values(navigation?.current)[
          Object?.values(navigation?.current)?.length - 1
        ] ? (
        content?.map((contents, index) => {
          return (
            contents?.title?.trim()?.toLowerCase() ===
              currentContent?.trim()?.toLowerCase() && (
              <Form
                key={index}
                formTitle={contents?.title}
                formData={contents?.formData}
                setformData={contents?.setformData}
                formDataSetterFunctions={formDataSetterFunctions?.current}
                content={contents?.navigation}
                setCurrentContent={setCurrentContent}
                fileInclusive={contents?.fileInclusive}
                endPointUrl={contents?.endPointUrl}
                Styles={{
                  input: { width: "300px" },
                  label: { fontWeight: "450" },
                }}
                onSubmit={onDetailsSubmit}
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
                  Object.values(navigation?.current)[
                    Object.values(navigation?.current).length - 2
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
