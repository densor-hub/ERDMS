import { useState, useRef, useImperativeHandle } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import { forwardRef } from "react";
import { useEffect } from "react";
import { replaceWhiteSpaceWithDash } from "../Functions/FormatString";
import UploadFile from "./UploadFile";
import Modal from "./Modal";
import Button from "./Button";
import { useOutsideClicked } from "../Hooks/useOutSideClicked";

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
      formDataSetterFunctions,
      //Only  needed when there are multiple instances of the form, purposely for setting all the data entered to blank when operation is cancelled
      content,
      //for navigation - if there is no navigation from one form to the other, dont provide this
      //object- {next:'string', previous:'string'}
      //if thers no other form instance to be rendered on next,  dont provide next
      //if thers no other form instance to be rendered on previous,  dont provide previous
      //CONTENT is only needed when there are multiple instances of this form in your component and the said instances are moved from one to the other based on next and previous consitions
      setCurrentContent,
      //the setter fuction of the state currentContent (string) which is used to conditionally form based on the next or previous
      //for setting current content dispayed in the form based on the next and previous provided in CONTENT
      fileInclusive,
      //Object{allowedMimeTypes=[], } - for specifying whether a file upload is need.
      Styles,
      //for styling the form incase default style is not preffered
      onSubmit,
      //customised submit Function from developer;
      onCancel,
      //customised cancel Function from developer
    },
    ref
  ) => {
    const FaUser = fileInclusive?.fileIcon;
    useImperativeHandle(ref, () => {
      return {
        inputRefs: RequiredRefs,
        clearInputs: cancelOperation,
      };
    });

    const [ValidatedData_FromForm, setValidatedData_FromForm] = useState({});
    const [feedback, setFeedback] = useState("");
    const inputStyle = {
      valid: "border-2  border-slate-200 rounded-lg w-full",
      invlaid: "border-0 border-b-2 border-red-500",
    };

    const [bools, setBools] = useState({
      genderSelected: false,
      showCancelModal: false,
    });

    const RequiredRefs = useRef([]);
    const addToRequiredRefs = (element) => {
      if (element && !RequiredRefs?.current?.includes(element)) {
        RequiredRefs?.current?.push(element);
      } else {
        RequiredRefs?.current?.pop(element);
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

    //for type Phone
    const validifyPhoneNumbersRefs = useRef([]);
    const addToValididyPhoneNumberRefs = (element) => {
      if (
        element &&
        !validifyPhoneNumbersRefs?.current?.find((i) => {
          return i?.id === element?.id;
        })
      ) {
        validifyPhoneNumbersRefs?.current.push(element);
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
          if (element.input?.required) {
            if (!ref?.value) {
              ref.style.borderColor = "red";
              setFeedback("Please enter all required fields.");
              return (validityChecked[index] = false);
            } else {
              //if theres value in ref
              if (element?.children) {
                //if children
                if (
                  element?.children.find((i) => {
                    return i === element?.data;
                  })
                ) {
                  ref.style.borderColor = "";
                  validityChecked[index] = true;
                } else {
                  ref.style.borderColor = "red";
                  validityChecked[index] = false;
                  setFeedback("Invalid value detected");
                }
              } else {
                //if no children
                if (element?.validCondintion) {
                  //if phone number
                  if (element?.input?.type?.toLowerCase()?.includes("tel")) {
                    //if no local storage value
                    if (
                      (localStorage?.getItem(`${element?.label}`) !== null &&
                        isValidPhoneNumber(
                          parsePhoneNumber(
                            ref?.value?.toString(),
                            localStorage?.getItem(`${element?.label}`)
                          )?.number
                        )) ||
                      isValidPhoneNumber(ref?.value)
                    ) {
                      setformData((p) => {
                        p.find((item) => {
                          return (
                            item?.label?.toLowerCase() ===
                            ref?.name?.toLowerCase()
                          );
                        }).data = parsePhoneNumber(
                          ref.value,
                          localStorage?.getItem(`${element?.label}`)
                        )?.number;
                        return [...p];
                      });
                      validityChecked[index] = true;
                      setBools((p) => {
                        return { ...p, invalidPhone: false };
                      });
                    } else {
                      setFeedback(
                        "Please select country and enter valid phone numner"
                      );
                      validityChecked[index] = false;
                      setBools((p) => {
                        return { ...p, invalidPhone: true };
                      });
                    }
                  } else {
                    //any other input element
                    if (element?.validCondintion(ref?.value)) {
                      ref.style.borderColor = "";

                      setformData((p) => {
                        p.find((item) => {
                          return (
                            item?.label?.toLowerCase() ===
                            ref?.name?.toLowerCase()
                          );
                        }).data = ref.value;
                        return [...p];
                      });

                      validityChecked[index] = true;
                    } else {
                      ref.style.borderColor = "red";
                      setFeedback("Invalid value detected");
                      validityChecked[index] = false;
                    }
                  }
                } else {
                  //if no valid condition function
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
                }
              }
            }
          } else {
            ref.style.borderColor = "";
            //if not required
            if (ref?.value) {
              if (element?.validCondintion) {
                if (element.validCondintion(ref?.value)) {
                  //if no valid condition function
                  ref.style.borderColor = "";
                  validityChecked[index] = true;

                  setformData((p) => {
                    p.find((item) => {
                      return (
                        item?.label?.toLowerCase() === ref?.name?.toLowerCase()
                      );
                    }).data = ref.value;
                    return [...p];
                  });
                } else {
                  ref.style.borderColor = "red";
                  validityChecked[index] = false;
                  setFeedback("Invalid value detected");
                }
              } else {
                //if no valid condition function
                ref.style.borderColor = "";
                validityChecked[index] = true;

                setformData((p) => {
                  p.find((item) => {
                    return (
                      item?.label?.toLowerCase() === ref?.name?.toLowerCase()
                    );
                  }).data = ref.value;
                  return [...p];
                });
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
        let obj = {};
        RequiredRefs?.current.forEach((i) => {
          obj[replaceWhiteSpaceWithDash(i?.name)] = i.value;
          setValidatedData_FromForm((p) => {
            return { ...p, ...obj };
          });
        });

        formData?.forEach((i) => {
          if (i?.data instanceof Object) {
            obj[replaceWhiteSpaceWithDash(i?.label?.toLowerCase()?.trim())] =
              i.data;
            setValidatedData_FromForm((p) => {
              return { ...p, ...obj };
            });
          }
        });

        //console.log(obj);
        if (onSubmit) {
          onSubmit(obj);
        }
        if (content?.next) {
          setCurrentContent(content?.next);
        }
      }
    };

    const ON_CANCEL = () => {
      if (
        RequiredRefs.current?.find((element) => {
          return element.value?.length > 0;
        }) ||
        file
      ) {
        if (content?.previous) {
          //if there is previous
          formData?.forEach((item) => {
            let ref = RequiredRefs.current?.find((ref) => {
              return ref?.name?.toLowerCase() === item?.label?.toLowerCase();
            });

            item.data = ref.value;
          });
          setCurrentContent(content?.previous);
        } else {
          setBools((p) => {
            return { ...p, showCancelModal: true };
          });
        }
      } else {
        cancelOperation();
        if (onCancel) {
          onCancel();
        }
      }
    };

    const cancelOperation = () => {
      selectedValueFxnRefs?.current?.forEach((element) => {
        element?.setSelectedValue("");
      });

      setRadioFxnRefs?.current?.forEach((element) => {
        element?.setRadioValue("");
      });

      if (content?.previous) {
        //if there is previous
        formData?.forEach((item) => {
          let ref = RequiredRefs.current?.find((ref) => {
            return ref?.name?.toLowerCase() === item?.label?.toLowerCase();
          });

          item.data = ref.value;
        });

        setCurrentContent(content?.previous);
      } else {
        //if no previous

        //if file
        if (file) {
          setFile("");
        }

        formData?.forEach((item) => {
          item.data = "";
        });

        if (formDataSetterFunctions?.length > 0) {
          formDataSetterFunctions.forEach((setterFunction) => {
            setterFunction((p) => {
              p.forEach((i) => {
                i.data = "";
                return { ...i };
              });
              return [...p];
            });
          });
        }

        setValidatedData_FromForm({});

        RequiredRefs?.current?.forEach((element) => {
          element.value = "";
          return (element.style.borderColor = "");
        });

        if (content?.default) {
          setCurrentContent(content?.default);
        }
      }

      if (bools?.showCancelModal) {
        setBools((p) => {
          return { ...p, showCancelModal: false };
        });
      }
    };

    return (
      <>
        {bools?.showCancelModal && (
          <Modal
            EffectNotice={"You will lose current operation."}
            ActionInOneWord={"Cancel"}
            ActionFucntion={cancelOperation}
            CancelFunction={() =>
              setBools((p) => {
                return { ...p, showCancelModal: false };
              })
            }
          />
        )}
        <main className="w-full max-w-[500px]  mx-auto">
          <div className="uppercase font-bold  w-fit relative left-[35%] pb-4">
            {formTitle}
          </div>

          <div className="text-center text-red-500 relative bottom-4">
            <span style={{ visibility: "hidden" }}>.</span>
            {feedback}
          </div>
          <section className="flex w-full">
            <form className="w-[400px]" style={Styles?.form}>
              <table className="w-full">
                <tbody>
                  {formData?.length > 0 &&
                    formData.map((element, index) => {
                      return (
                        !element?.notShow && (
                          <tr key={index}>
                            <td style={Styles?.row}>
                              <div style={Styles?.label}>
                                <label>{element?.label} </label>
                                <span className="text-xs relative top-[25%]">
                                  {element?.input?.required && "*"}
                                </span>
                              </div>

                              {/* //refer to input component if there is any ambiguity */}
                              {element?.input?.type === "text" ||
                              element?.input?.type === "email" ||
                              element?.input?.type === "number" ||
                              element?.input?.type === "date" ||
                              element?.input?.type === "date-time" ? (
                                <input
                                  {...element?.input}
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
                                  style={Styles?.input}
                                ></input>
                              ) : element?.input?.type
                                  ?.trim()
                                  ?.toLowerCase() === "select" ? (
                                <Select
                                  ref={addToSelectedValueFxns}
                                  addToRequiredRefs={addToRequiredRefs}
                                  element={element}
                                  formData={formData}
                                  Styles={Styles}
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
                                  style={Styles?.input}
                                ></textarea>
                              ) : element?.input?.type === "tel" ? (
                                <PhoneNumber
                                  element={element}
                                  addToRequiredRefs={addToRequiredRefs}
                                  ref={addToValididyPhoneNumberRefs}
                                  Styles={Styles?.phoneNumber}
                                  bools={bools}
                                />
                              ) : element?.input?.type === "radio" ? (
                                <Radio
                                  ref={addTosetRadioFxnRefs}
                                  element={element}
                                  addToRequiredRefs={addToRequiredRefs}
                                  formData={formData}
                                  Styles={Styles}
                                />
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        )
                      );
                    })}
                </tbody>
              </table>

              <div className="mt-5">
                <Button
                  label={content?.next ? "Save" : "Submit"}
                  onClick={(e) => {
                    ON_SUBMIT(e);
                  }}
                />

                <Button
                  label={content?.previous ? "Back" : "Cancel"}
                  onClick={(e) => {
                    e.preventDefault();
                    ON_CANCEL();
                  }}
                  style={Styles?.button}
                />
              </div>
            </form>
            {fileInclusive && (
              <div className="relative h-fit top-10">
                <UploadFile
                  file={file}
                  setFile={setFile}
                  fallbackIcon={FaUser}
                  allowedExtensions={fileInclusive?.allowedExtensions}
                />
              </div>
            )}
          </section>
        </main>
      </>
    );
  }
);

export default Form;

const Radio = forwardRef(
  ({ element, addToRequiredRefs, formData, bools }, ref) => {
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
                  element.data = child;
                }}
              >
                {child}
              </button>
            );
          })
        )}
      </div>
    );
  }
);

const PhoneNumber = forwardRef(({ element, addToRequiredRefs, bools }, ref) => {
  const [PhoneInputValue, setPhoneInputValue] = useState(
    parsePhoneNumber(element?.data, localStorage.getItem(`${element?.label}`))
      ?.number
  );
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem(`${element?.label}`)
  );

  useEffect(() => {
    if (countryCode) {
      if (countryCode) {
        localStorage.setItem(`${element?.label}`, countryCode);
      }
    }
  }, [countryCode]);

  return (
    <div
      className={
        bools?.invalidPhone
          ? "border-2  border-red-500 rounded-lg"
          : "border-2  rounded-lg "
      }
    >
      <PhoneInput
        defaultCountry={localStorage.getItem(`${element.label}`)}
        style={{ border: "0px" }}
        ref={addToRequiredRefs}
        autoComplete="false"
        placeholder={
          element?.input?.placeholder
            ? ` ${element?.input?.placeholder}`
            : ` Enter ${element?.label?.toLowerCase()}`
        }
        onChange={setPhoneInputValue}
        value={PhoneInputValue}
        onCountryChange={setCountryCode}
        name={element?.label}
        type="tel"
      ></PhoneInput>
    </div>
  );
});

const Select = forwardRef(({ element, addToRequiredRefs, Styles }, ref) => {
  useImperativeHandle(ref, () => {
    return {
      setSelectedValue: setSelectedItem,
    };
  });
  const inputStyle = {
    valid: "border-2  border-slate-200 rounded-lg w-full",
    invlaid: "border-0 border-b-2 border-red-500",
  };
  const [showChildren, setShowChildren] = useState(false);
  const [selectedItem, setSelectedItem] = useState(element?.data);

  const selectItemFilterBoxRef = useRef();
  useOutsideClicked(selectItemFilterBoxRef, setShowChildren, false, []);

  //selectedObject && console.log(selectedObject);
  return (
    <main className="relative  ">
      <input
        style={Styles?.input}
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
          setSelectedItem(e?.target?.value);
        }}
        value={selectedItem}
      ></input>
      {showChildren && (
        <section
          className=" absolute w-[100px]  z-10"
          ref={selectItemFilterBoxRef}
        >
          {element?.children?.map((child, index) => {
            return (
              <div
                key={child?.id ? child?.id : child?._id ? child?._id : index}
              >
                <button
                  className=" w-[170px] min-h-[40px] bg-slate-400 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    element.data = child;
                    setShowChildren(false);
                    setSelectedItem(
                      child instanceof Object
                        ? `${child?.name ? child?.name : ""} ${
                            child?.type ? child?.type : ""
                          } ${child?.size ? child?.size : ""}`
                        : child
                    );
                  }}
                >
                  {child instanceof Object
                    ? `${child?.name ? child?.name : ""} ${
                        child?.type ? child?.type : ""
                      } ${child?.size ? child?.size : ""}`
                    : child}
                </button>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
});
