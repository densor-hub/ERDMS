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
      Styles,
      //for styling the form incase default style is not preffered
      onSubmit,
      //customised submit Function from developer;
      onCancel,
      //customised cancel Function from developer
      formType,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => {
      return {
        inputRefs: RequiredRefs,
        cancelOperation: cancelOperation,
        clearInputs: clearInputs,
      };
    });

    let validatedData = useRef({});
    const [feedback, setFeedback] = useState("");

    const [bools, setBools] = useState({
      genderSelected: false,
      showCancelModal: false,
    });

    //for Fieldsets
    const FieldSetRefs = useRef([]);
    const addToFielSetRefs = (element) => {
      if (element && !FieldSetRefs.current?.includes(element)) {
        FieldSetRefs.current?.push(element);
      } else {
        FieldSetRefs.current?.pop(element);
      }
    };

    const RequiredRefs = useRef([]);
    const addToRequiredRefs = (element) => {
      if (element && !RequiredRefs?.current?.includes(element)) {
        RequiredRefs?.current?.push(element);
      } else {
        RequiredRefs?.current?.pop(element);
      }
    };

    //for file uploader
    const setFileFxnRefs = useRef([]);
    const addToSetFileFxnRefs = (element) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("file");
        }).length > setFileFxnRefs?.current?.length
      ) {
        setFileFxnRefs.current.push(element);
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

    //for setting file
    useEffect(() => {
      formData?.forEach((element) => {
        //for files
        if (element?.input?.type === "file") {
          setFileFxnRefs?.current?.find((Ref, i) => {
            if (
              Ref?.uploadFileInputRef?.name?.toLowerCase()?.trim() ===
              element?.label?.toLowerCase()?.trim()
            ) {
              if (Ref?.uploadFileInputRef?.files?.length <= 0) {
                Ref.setFile(element?.data);
              }
            }
          });
        }
      });
    }, [setFileFxnRefs]);

    const ON_SUBMIT = (e) => {
      e.preventDefault();
      let validityChecked = [];

      formData?.forEach((element, index) => {
        //for files
        if (element?.input?.type === "file") {
          setFileFxnRefs?.current?.find((Ref, i) => {
            if (
              Ref?.uploadFileInputRef?.name?.toLowerCase()?.trim() ===
              element?.label?.toLowerCase()?.trim()
            ) {
              if (
                Ref?.uploadFileInputRef?.files?.length > 0 &&
                element?.data !== ""
              ) {
                validityChecked[index] = true;
              } else if (
                Ref?.uploadFileInputRef?.files?.length <= 0 &&
                element?.data === ""
              ) {
                validityChecked[index] = false;
                setFeedback("Please upload an image.");
                // since JS is Async by default and this process takes much time, this process run last.
                //hence the need to check and set feedback of first process
                RequiredRefs?.current?.forEach((e, i) => {
                  if (
                    formData?.find((ele) => {
                      return (
                        ele?.label?.toLowerCase()?.trim() ===
                        e?.name?.toLowerCase()?.trim()
                      );
                    })?.data === "" &&
                    e.value === ""
                  ) {
                    setFeedback("Please enter all required fields");
                  }
                  if (e.value !== "" && validityChecked[i] === false) {
                    setFeedback("Invalid value detected");
                  }
                });
              }
            }
          });
        } else {
          //if not files
          let ref = RequiredRefs.current?.find((ref) => {
            return ref?.name?.toLowerCase() === element?.label?.toLowerCase();
          });

          if (ref !== null && ref !== undefined) {
            if (element.input?.required) {
              if (!ref?.value) {
                FieldSetRefs.current[index].style.borderColor = "red";
                setFeedback("Please enter all required fields.");
                setBools((p) => {
                  return { ...p, invalidPhone: true };
                });
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
                    FieldSetRefs.current[index].style.borderColor = "";
                    validityChecked[index] = true;
                  } else {
                    FieldSetRefs.current[index].style.borderColor = "red";
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
                        FieldSetRefs.current[index].style.borderColor = "";
                      } else {
                        setFeedback(
                          "Please select country and enter valid phone numner"
                        );
                        validityChecked[index] = false;
                        setBools((p) => {
                          return { ...p, invalidPhone: true };
                        });
                        FieldSetRefs.current[index].style.borderColor = "red";
                      }
                    } else {
                      //any other input element
                      if (element?.validCondintion(ref?.value)) {
                        FieldSetRefs.current[index].style.borderColor = "";

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
                        FieldSetRefs.current[index].style.borderColor = "red";
                        setFeedback("Invalid value detected");
                        validityChecked[index] = false;
                      }
                    }
                  } else {
                    //if no valid condition function
                    FieldSetRefs.current[index].style.borderColor = "";
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
                  }
                }
              }
            } else {
              FieldSetRefs.current[index].style.borderColor = "";
              //if not required
              if (ref?.value) {
                if (element?.validCondintion) {
                  if (element.validCondintion(ref?.value)) {
                    //if no valid condition function
                    FieldSetRefs.current[index].style.borderColor = "";
                    validityChecked[index] = true;

                    setformData((p) => {
                      p.find((item) => {
                        return (
                          item?.label?.toLowerCase() ===
                          ref?.name?.toLowerCase()
                        );
                      }).data = ref.value;
                      return [...p];
                    });
                  } else {
                    FieldSetRefs.current[index].style.borderColor = "red";
                    validityChecked[index] = false;
                    setFeedback("Invalid value detected");
                  }
                } else {
                  //if no valid condition function
                  FieldSetRefs.current[index].style.borderColor = "";
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
        }
      });

      if (
        validityChecked?.every((element) => {
          return element === true;
        })
      ) {
        RequiredRefs?.current.forEach((i) => {
          validatedData.current[replaceWhiteSpaceWithDash(i?.name)] = i.value;
        });

        formData?.forEach((i) => {
          if (i?.data instanceof Object) {
            validatedData.current[
              replaceWhiteSpaceWithDash(i?.label?.toLowerCase()?.trim())
            ] = i.data;
          }
        });

        if (onSubmit) {
          onSubmit(validatedData.current);
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
        formData?.find((element) => {
          return element?.data !== "";
        })
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

    const clearInputs = () => {
      FieldSetRefs.current?.forEach((element) => {
        element.style.borderColor = "";
      });
      RequiredRefs?.current?.forEach((element) => {
        element.value = "";
      });

      selectedValueFxnRefs?.current?.forEach((element) => {
        element?.setSelectedValue("");
      });

      setRadioFxnRefs?.current?.forEach((element) => {
        element?.setRadioValue("");
      });

      setFileFxnRefs?.current?.forEach((Ref) => {
        Ref?.setFile("");
      });
    };

    const cancelOperation = () => {
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
        clearInputs();

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

      if (onCancel) {
        onCancel();
      }
    };

    //fileupload fxn passed to UploadFile component
    const onFileUpload = (files) => {
      setformData((p) => {
        p.find((ele) => {
          return (
            ele?.label?.toLowerCase() ===
            setFileFxnRefs?.current
              ?.find((i) => {
                return (
                  i?.uploadFileInputRef?.name?.toLowerCase() ===
                  ele?.label?.toLowerCase()
                );
              })
              ?.uploadFileInputRef?.name?.toLowerCase()
          );
        }).data = files[0];
        return [...p];
      });
    };

    //feedback
    useEffect(() => {
      if (feedback) {
        setTimeout(() => {
          setFeedback("");
        }, 3000);
      }
    });

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
              {formData?.length > 0 &&
                formData.map((element, index) => {
                  return (
                    element?.input?.type !== "file" && (
                      <FieldSet
                        key={index}
                        addToFielSetRefs={addToFielSetRefs}
                        element={element}
                        addToRequiredRefs={addToRequiredRefs}
                        formData={formData}
                        formType={formType}
                        addToSelectedValueFxns={addToSelectedValueFxns}
                        addToValididyPhoneNumberRefs={
                          addToValididyPhoneNumberRefs
                        }
                        Styles={Styles}
                        addTosetRadioFxnRefs={addTosetRadioFxnRefs}
                        bools={bools}
                      ></FieldSet>
                    )
                  );
                })}

              <div className="mt-5 h-[100px]">
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
            {formData.map((element, index) => {
              const Icon = element?.input?.icon;
              return (
                element?.input?.type === "file" && (
                  <div className="relative h-fit top-10" key={index}>
                    <UploadFile
                      ref={addToSetFileFxnRefs}
                      onUpload={onFileUpload}
                      refValue={addToRequiredRefs}
                      fallbackIcon={Icon}
                      alt={element?.label}
                      allowedExtensions={element?.input?.allowedExtensions}
                    />
                  </div>
                )
              );
            })}
          </section>
        </main>
      </>
    );
  }
);

export default Form;

const FieldSet = ({
  element,
  Styles,
  formType,
  addToFielSetRefs,
  addToRequiredRefs,
  formData,
  addToSelectedValueFxns,
  addToValididyPhoneNumberRefs,
  addTosetRadioFxnRefs,
  bools,
}) => {
  const [showLegend, setShowLegend] = useState(true);

  const inputStyle = {
    valid: "border-2  border-slate-200 rounded-lg w-full mb-2 ",
    invlaid: "border-0 border-b-2 border-red-500 mb-2",
  };

  const falsifyShowLegend = () => {
    setTimeout(() => {
      setShowLegend(true);
    }, 2000);
  };

  return (
    <fieldset
      className={inputStyle.valid}
      ref={addToFielSetRefs}
      style={Styles?.input}
    >
      {showLegend && !formType?.regular && (
        <legend className="text-yellow-700 text-[12px]">
          {element?.label}{" "}
          <span className="text-xs relative top-[25%]">
            {element?.input?.required && (
              <i className="text-[11px] text-slate-400 relative bottom-[1px]">
                required
              </i>
            )}
            <span style={{ visibility: "hidden" }}> *</span>
          </span>
        </legend>
      )}
      <label style={Styles?.row}>
        {!showLegend ||
          (formType?.regular && (
            <div className="transition-all relative" style={Styles?.label}>
              {element?.label}{" "}
              <span className="text-xs absolute right-0 top-[50%] translate-y-[-50%]">
                {element?.input?.required && " *"}
              </span>{" "}
            </div>
          ))}

        {element?.input?.type === "text" ||
        element?.input?.type === "textarea" ||
        element?.input?.type === "email" ||
        element?.input?.type === "number" ||
        element?.input?.type === "date" ||
        element?.input?.type === "checkbox" ||
        element?.input?.type === "date-time" ? (
          <input
            style={{
              padding: "0px",
              margin: "0px",
              border: "0px",
              outline: "none",
              width: "calc(100% - 10px)",
              position: "relative",
              left: "5px",
            }}
            {...element?.input}
            id={element?.label?.toLowerCase()}
            placeholder={
              element?.input?.placeholder
                ? ` ${element?.input?.placeholder}`
                : ` ${element?.label?.trim()}`
            }
            name={element?.label.toLowerCase()}
            ref={addToRequiredRefs}
            onChange={element.onChange}
            defaultValue={element?.data}
            onFocus={() => {}}
          ></input>
        ) : element?.input?.type?.trim()?.toLowerCase() === "select" ? (
          <Select
            ref={addToSelectedValueFxns}
            addToRequiredRefs={addToRequiredRefs}
            element={element}
            formData={formData}
            Styles={Styles}
          />
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
      </label>
    </fieldset>
  );
};

const Radio = forwardRef(({ element, addToRequiredRefs, formData }, ref) => {
  useImperativeHandle(ref, () => {
    return { setRadioValue: setInputValue };
  });

  const [showChildren, setShowChildren] = useState(false);
  const [inputValue, setInputValue] = useState(
    formData?.find((ele) => {
      return ele?.input?.type?.toLowerCase()?.includes("radio");
    })?.data
  );

  return (
    <div className="w-fit">
      {!showChildren ? (
        <input
          style={{
            margin: "0px auto",
            padding: "0px",
            width: "calc(100% - 10px)",
            position: "relative",
            left: "5px",
            outline: "none",
          }}
          autoComplete={element?.input?.autoComplete}
          id={element?.label?.toLowerCase()}
          placeholder={
            element?.input?.placeholder
              ? ` ${element?.input?.placeholder}`
              : ` ${element?.label?.trim()}`
          }
          name={element?.label.toLowerCase()}
          ref={addToRequiredRefs}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onFocus={() => {
            setTimeout(() => {
              setShowChildren(true);
            }, 1);
          }}
          onClick={() => {
            setTimeout(() => {
              setShowChildren(true);
            }, 1);
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
});

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
  }, [countryCode, element?.label]);

  return (
    <div>
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

const Select = forwardRef(({ element, addToRequiredRefs }, ref) => {
  useImperativeHandle(ref, () => {
    return {
      setSelectedValue: setSelectedItem,
    };
  });

  const [showChildren, setShowChildren] = useState(false);
  const [selectedItem, setSelectedItem] = useState(element?.data);

  const selectItemFilterBoxRef = useRef();
  useOutsideClicked(selectItemFilterBoxRef, setShowChildren, false, []);

  //selectedObject && console.log(selectedObject);
  return (
    <main className="relative  ">
      <input
        style={{
          margin: "0px auto",
          padding: "0px",
          width: "calc(100% - 10px)",
          position: "relative",
          left: "5px",
          outline: "none",
          border: "0px",
        }}
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
          className=" absolute w-full  z-10"
          ref={selectItemFilterBoxRef}
        >
          {element?.children?.map((child, index) => {
            return (
              <div
                key={child?.id ? child?.id : child?._id ? child?._id : index}
              >
                <button
                  className=" w-full min-h-[40px] bg-slate-400 text-white text-left hover:bg-slate-600"
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
                    ? " " +
                      ` ${child?.name ? child?.name : ""} ${
                        child?.type ? child?.type : ""
                      } ${child?.size ? child?.size : ""}`
                    : " " + child}
                </button>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
});
