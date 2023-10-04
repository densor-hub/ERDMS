import { useState, useRef, useImperativeHandle } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { forwardRef } from "react";
import { useEffect } from "react";
import { replaceWhiteSpaceWithDash } from "../Functions/FormatString";
import UploadFile from "./UploadFile";

const Form = forwardRef(
  (
    {
      formTitle,
      //string that represenst the title of the form
      formData,
      //array of objects {
      //#label -[id, name, label, pathnameLastItem],
      // #data-[empty string],
      // #input-[required props - *required *type ] ,
      //#validCondintion - function that takes a parameter, the parameter will reprensent the data in the input- hence the function should cover all necessary validations needed to validate the value in the input
      // }
      setformData,
      //the setter fuction of the state formData
      content,
      //object- {next:'string', previous:'string'}
      //if thers no other form instance to be rendered on next,  dont provide next
      //if thers no other form instance to be rendered on previous,  dont provide previous
      //CONTENT is only needed when there are multiple instances of this form in your component and the said instances are moved from one to the other based on next and previous consitions
      setCurrentContent,
      //the setter fuction of the state currentContent (string) which is used to conditionally form based on the next or previous
      //for setting current content dispayed in the form based on the next and previous provided in CONTENT
      setValidatedData_FromForm,
      //the setter fuction of the state that contains an object of with labels in *formData* as keys and validated input values as values
      endPointUrl,
      //string url that represents the endpoint that the the form must point to during final submission
      fileInclusive,
      //Object{allowedMimeTypes=[], } - for specifying whether a file upload is need.
    },
    ref
  ) => {
    useImperativeHandle(ref, () => {
      return {
        RequiredRefs: RequiredRefs,
        Not_RequiredRefs: Not_RequiredRefs,
        feedback: feedback,
      };
    });

    const [feedback, setFeedback] = useState("");
    const [PhoneInputValue, setPhoneInputValue] = useState(
      formData?.find((ele) => {
        return ele?.input?.type?.toLowerCase()?.includes("tel");
      })?.data
    );
    const inputStyle = {
      valid: "border-2  border-slate-200 rounded-lg w-full",
      invlaid: "border-0 border-b-2 border-red-500",
    };

    const [bools, setBools] = useState({
      invalidPhone: false,
      genderSelected: false,
    });

    const RequiredRefs = useRef([]);
    const addToRequiredRefs = (element) => {
      if (element && !RequiredRefs?.current?.includes(element)) {
        RequiredRefs?.current?.push(element);
      } else {
        RequiredRefs?.current?.pop(element);
      }
    };

    const Not_RequiredRefs = useRef([]);
    const addTo_NotRequiredRefs = (element) => {
      if (element && !Not_RequiredRefs?.current?.includes(element)) {
        Not_RequiredRefs?.current?.push(element);
      } else {
        Not_RequiredRefs?.current?.pop(element);
      }
    };

    //for type select
    const selectedValueFxnRefs = useRef([]);
    const addToSelectedValueFxns = (element) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("select");
        }).length > selectedValueFxnRefs?.current?.length
      ) {
        selectedValueFxnRefs.current.push(element);
      }
    };

    //for type  radio
    const setRadioFxnRefs = useRef([]);
    const addTosetRadioFxnRefs = (element) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("radio");
        }).length > setRadioFxnRefs?.current?.length
      ) {
        setRadioFxnRefs.current.push(element);
      }
    };

    //file upload
    const [file, setFile] = useState(fileInclusive?.fileUploaded);

    //feedback
    useEffect(() => {
      if (feedback) {
        setTimeout(() => {
          setFeedback("");
        }, 3000);
      }
    });

    //file
    useEffect(() => {
      console.log(fileInclusive);

      if (!file && formData?.image) {
      } else if (file && !formData?.image) {
        setValidatedData_FromForm((p) => {
          return { ...p, image: file };
        });
      }
    }, [formData?.image, file, fileInclusive?.fileInclusive]);

    const ON_SUBMIT = (e) => {
      e.preventDefault();
      let validityChecked = [];

      formData?.forEach((element, index) => {
        let ref = RequiredRefs.current?.find((ref) => {
          return ref?.name?.toLowerCase() === element?.label?.toLowerCase();
        });

        if (ref !== null && ref !== undefined) {
          if (!ref?.value) {
            ref.style.borderColor = "red";
            setFeedback("Please enter all required fields.");

            //for phone input border
            if (!PhoneInputValue || !isValidPhoneNumber(PhoneInputValue)) {
              setBools((p) => {
                return { ...p, invalidPhone: true };
              });
            }

            return (validityChecked[index] = false);
          } else {
            if (!element?.validCondintion) {
              if (!element?.children) {
                ref.style.borderColor = "";

                setformData((p) => {
                  p.find((item) => {
                    return (
                      item?.label?.toLowerCase() === ref?.name?.toLowerCase()
                    );
                  }).data = ref.value;
                  return [...p];
                });

                return (validityChecked[index] = true);
              } else {
                if (
                  element?.children?.find((item) => {
                    return item === ref?.value;
                  })
                ) {
                  ref.style.borderColor = "";

                  setformData((p) => {
                    p.find((item) => {
                      return (
                        item?.label?.toLowerCase() === ref?.name?.toLowerCase()
                      );
                    }).data = ref.value;
                    return [...p];
                  });

                  return (validityChecked[index] = true);
                } else {
                  ref.style.borderColor = "red";
                }
              }
              return true;
            } else {
              if (element?.input?.type?.toLowerCase()?.includes("tel")) {
                setformData((p) => {
                  p.find((item) => {
                    return (
                      item?.label?.toLowerCase() === ref?.name?.toLowerCase()
                    );
                  }).data = ref.value;
                  return [...p];
                });

                if (element?.validCondintion(PhoneInputValue)) {
                  setBools((p) => {
                    return { ...p, invalidPhone: false };
                  });
                } else {
                  console.log(bools);
                  setBools({ ...bools, invalidPhone: false });
                }

                validityChecked[index] = true;
                return element?.validCondintion(PhoneInputValue);
              } else {
                if (element?.validCondintion(ref?.value)) {
                  ref.style.borderColor = "";

                  setformData((p) => {
                    p.find((item) => {
                      return (
                        item?.label?.toLowerCase() === ref?.name?.toLowerCase()
                      );
                    }).data = ref.value;
                    return [...p];
                  });

                  validityChecked[index] = true;
                } else {
                  ref.style.borderColor = "red";
                  validityChecked[index] = false;
                  setFeedback("Invalid value detected.");
                }
              }
            }
          }
        }
      });

      if (
        validityChecked?.every((element) => {
          return element === true;
        })
      ) {
        RequiredRefs?.current?.forEach((item) => {
          let obj = {};
          obj[replaceWhiteSpaceWithDash(item?.name)] = item?.value;

          setValidatedData_FromForm((p) => {
            return { ...p, ...obj };
          });
        });

        if (content?.next) {
          setCurrentContent(content?.next);
        } else {
          //submit to databse
        }
      }
    };

    const ON_CANCEL = () => {
      selectedValueFxnRefs?.current?.forEach((element) => {
        element?.setSelectedValue("");
      });

      setRadioFxnRefs?.current?.forEach((element) => {
        element?.setRadioValue("");
      });

      if (content?.previous) {
        setCurrentContent(content?.previous);
      } else {
        RequiredRefs?.current?.forEach((element) => {
          element.value = "";
          return (element.style.borderColor = "");
        });
        Not_RequiredRefs?.current?.forEach((element) => {
          element.value = "";
          return (element.style.borderColor = "");
        });

        if (content?.default) {
          setCurrentContent(content?.default);
        }
      }
    };

    return (
      <main className="w-full max-w-[500px]  mx-auto">
        <div className="uppercase font-bold  w-fit relative left-[35%] pb-4">
          {formTitle}
        </div>

        <div className="text-center text-red-500">
          <span style={{ visibility: "hidden" }}>.</span>
          {feedback}
        </div>
        <section className="flex w-full">
          <form className="w-[400px]">
            <table className="w-full">
              {formData?.length > 0 &&
                formData.map((element, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="w-full h-10 pb-3 ">
                          <div>
                            <label className="text-md font-semibold">
                              {element?.label}
                            </label>
                          </div>

                          {/* //refer to input component if there is any ambiguity */}
                          {element?.input?.type === "text" ||
                          element?.input?.type === "email" ||
                          element?.input?.type === "number" ||
                          element?.input?.type === "date" ||
                          element?.input?.type === "date-time" ? (
                            <input
                              type={element?.input?.type}
                              autoComplete={element?.input?.autoComplete}
                              id={element?.label?.toLowerCase()}
                              placeholder={
                                element?.input?.placeholder
                                  ? ` ${element?.input?.placeholder}`
                                  : ` Enter ${element?.label?.toLowerCase()}`
                              }
                              name={element?.label.toLowerCase()}
                              ref={addToRequiredRefs}
                              className={inputStyle.valid}
                              onChange={element.onChange}
                              defaultValue={element?.data}
                            ></input>
                          ) : element?.input?.type?.trim()?.toLowerCase() ===
                            "select" ? (
                            <Select
                              ref={addToSelectedValueFxns}
                              addToRequiredRefs={addToRequiredRefs}
                              element={element}
                              formData={formData}
                            />
                          ) : element?.input?.type === "textarea" ? (
                            <textarea
                              type={element?.input?.type}
                              autoComplete={element?.input?.autoComplete}
                              id={element?.label?.toLowerCase()}
                              placeholder={
                                element?.input?.placeholder
                                  ? ` ${element?.input?.placeholder}`
                                  : ` Enter ${element?.label?.toLowerCase()}`
                              }
                              name={element?.label.toLowerCase()}
                              ref={addToRequiredRefs}
                              className={inputStyle.valid}
                              onChange={element.onChange}
                              defaultValue={element?.data}
                            ></textarea>
                          ) : element?.input?.type === "tel" ? (
                            <div
                              className={
                                bools?.invalidPhone
                                  ? "border-2  border-red-500 rounded-lg"
                                  : "border-2  rounded-lg "
                              }
                            >
                              <PhoneInput
                                style={{ border: "0px" }}
                                ref={addToRequiredRefs}
                                defaultCountry="GH"
                                autoComplete="false"
                                placeholder={
                                  element?.input?.placeholder
                                    ? ` ${element?.input?.placeholder}`
                                    : ` Enter ${element?.label?.toLowerCase()}`
                                }
                                onChange={setPhoneInputValue}
                                value={PhoneInputValue}
                                name={"phone"}
                                type="tel"
                              ></PhoneInput>
                            </div>
                          ) : element?.input?.type === "radio" ? (
                            <Radio
                              ref={addTosetRadioFxnRefs}
                              element={element}
                              addToRequiredRefs={addToRequiredRefs}
                              formData={formData}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                      {index === formData?.length - 1 && (
                        <tr>
                          <td className="text-center h-14 ">
                            <button
                              className="px-4 py-2 rounded-lg mr-2 bg-slate-700 text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-700"
                              label={"Submit"}
                              onClick={(e) => {
                                ON_SUBMIT(e);
                              }}
                            >
                              {content?.next ? "Save" : "Submit"}
                            </button>

                            <button
                              className="px-4 py-2 rounded-lg ml-2 bg-slate-700 text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-700"
                              label={"Cancel"}
                              onClick={(e) => {
                                e.preventDefault();
                                ON_CANCEL();
                              }}
                            >
                              {content?.previous ? "Back" : "Cancel"}
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  );
                })}
            </table>
          </form>
          {fileInclusive && (
            <div className="relative h-fit top-10">
              <UploadFile
                file={file}
                setFile={setFile}
                allowedExtensions={fileInclusive?.allowedExtensions}
              />
            </div>
          )}
        </section>
      </main>
    );
  }
);

export default Form;

const Radio = forwardRef(({ element, addToRequiredRefs, formData }, ref) => {
  useImperativeHandle(ref, () => {
    return { setRadioValue: setInputValue };
  });
  const inputStyle = {
    valid: "border-2  border-slate-200 rounded-lg w-full",
    invlaid: "border-0 border-b-2 border-red-500",
  };

  const [showChildren, setShowChildren] = useState(false);
  const [inputValue, setInputValue] = useState(
    formData?.find((ele) => {
      return ele?.input?.type?.toLowerCase()?.includes("radio");
    })?.data
  );

  return (
    <div className="w-fit ">
      {!showChildren ? (
        <input
          autoComplete={element?.input?.autoComplete}
          id={element?.label?.toLowerCase()}
          placeholder={
            element?.input?.placeholder
              ? ` ${element?.input?.placeholder}`
              : ` Enter ${element?.label?.toLowerCase()}`
          }
          name={element?.label.toLowerCase()}
          ref={addToRequiredRefs}
          condition={element?.input?.condition}
          className={inputStyle.valid}
          value={inputValue}
          onChange={() => {
            setShowChildren(true);
          }}
          onClick={() => {
            setShowChildren(true);
          }}
        ></input>
      ) : (
        element?.children?.map((child, index) => {
          return (
            <button
              key={index}
              className="w-14 h-6 text-white bg-slate-500 rounded-full text-xs ml-1 hover:bg-slate-700"
              onClick={(e) => {
                e.preventDefault();
                setShowChildren(false);
                setInputValue(child);
              }}
            >
              {child}
            </button>
          );
        })
      )}
    </div>
  );
});

const Select = forwardRef(({ element, addToRequiredRefs }, ref) => {
  useImperativeHandle(ref, () => {
    return { setSelectedValue: setSelectedValue };
  });
  const inputStyle = {
    valid: "border-2  border-slate-200 rounded-lg w-full",
    invlaid: "border-0 border-b-2 border-red-500",
  };
  const [showChildren, setShowChildren] = useState(false);
  const [selectedVALUE, setSelectedValue] = useState();

  return (
    <main className="relative  ">
      <input
        autoComplete={element?.input?.autoComplete}
        id={element?.label?.toLowerCase()}
        placeholder={
          element?.input?.placeholder
            ? ` ${element?.input?.placeholder}`
            : ` Enter ${element?.label?.toLowerCase()}`
        }
        name={element?.label.toLowerCase()}
        ref={addToRequiredRefs}
        condition={element?.input?.condition}
        className={inputStyle.valid}
        onClick={() => {
          setShowChildren(true);
        }}
        onChange={(e) => {
          setShowChildren(true);
          setSelectedValue(e.target.value);
        }}
        value={selectedVALUE}
      ></input>
      {showChildren && (
        <section className=" absolute w-[100px] max-h-20 right-0">
          {element?.children?.map((child, index) => {
            return (
              <div key={index} className="bg-slate-700 text-white border-b-2">
                <button
                  className="w-full h-8"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedValue(child);
                    setShowChildren(false);
                  }}
                >
                  {child}
                </button>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
});
