import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { replaceWhiteSpaceWithDash } from "../Functions/FormatString.ts";
import UploadFile from "./UploadFile.tsx";
import Modal from "./Modal.tsx";
import Button from "./Button.tsx";
import Select from "./Select.tsx";
import Radio from "./Radio.tsx";
import PhoneNumer from "./PhoneInput.tsx";
import Password from "./PasswordInput.tsx";

import {
  iForm,
  iFormDataObject,
  iForwardedByFileUploader,
  iForwardedBySelect,
  iForwaredByRadio,
  iForwardedByPasswordInput,
  iForwaredByPhoneInput,
} from "../Interfaces/Interfaces.ts";

const Form = forwardRef(
  (
    {
      formTitle,
      formData,
      setformData,
      formDataSetterFunctions,
      navigation,
      setCurrentContent,
      Styles,
      onSubmit,
      onCancel,
      formType,
      buttonLabels,
    }: iForm,
    ref
  ) => {
    useImperativeHandle(ref, () => {
      return {
        inputRefs: inputRefs,
        cancelOperation: cancelOperation,
        clearInputs: clearInputs,
      };
    });

    let validatedData = useRef<any>({});
    const [feedback, setFeedback] = useState<string>("");

    const inputStyle = {
      valid: "border-2  border-slate-200 rounded-lg w-full mb-2 ",
      invlaid: "border-0 border-b-2 border-red-500 mb-2",
    };
    const [bools, setBools] = useState({
      showCancelModal: false,
    });

    //for Fieldsets
    const FieldSetRefs = useRef<HTMLFieldSetElement[]>([]);
    const addToFielSetRefs = (element: HTMLFieldSetElement) => {
      if (element && !FieldSetRefs.current?.includes(element)) {
        FieldSetRefs.current?.push(element);
      } else {
        FieldSetRefs.current?.pop();
      }
    };

    const inputRefs = useRef<Array<HTMLInputElement>>([]);
    const addInputRefs = (element: HTMLInputElement) => {
      if (element && !inputRefs?.current?.includes(element)) {
        inputRefs?.current?.push(element);
      } else {
        inputRefs?.current?.pop();
      }
    };

    const setFileFxnRefs = useRef<Array<iForwardedByFileUploader>>([]);
    const addToSetFileFxnRefs = (element: iForwardedByFileUploader) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("file");
        }).length > setFileFxnRefs?.current?.length
      ) {
        setFileFxnRefs.current.push(element);
      }
    };

    //passwords
    const setPassowrdFxnRefs = useRef<Array<iForwardedByPasswordInput>>([]);
    const addToSetPasswordFxnRefs = (element: iForwardedByPasswordInput) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("password");
        }).length > setPassowrdFxnRefs?.current?.length
      ) {
        setPassowrdFxnRefs.current.push(element);
      }
    };

    //for type select
    const selectedValueFxnRefs = useRef<Array<iForwardedBySelect>>([]);
    const addToSelectedValueFxns = (element: iForwardedBySelect) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("select");
        }).length > selectedValueFxnRefs?.current?.length
      ) {
        selectedValueFxnRefs.current.push(element);
      }
    };

    //for type  radio
    const setRadioFxnRefs = useRef<Array<iForwaredByRadio>>([]);
    const addTosetRadioFxnRefs = (element: iForwaredByRadio) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("radio");
        }).length > setRadioFxnRefs?.current?.length
      ) {
        setRadioFxnRefs.current.push(element);
      }
    };

    //for type Phone
    const setPhoneNumberFxnRefs = useRef<iForwaredByPhoneInput[]>([]);
    const addTosetPhoneNumberFxnRefs = (element: iForwaredByPhoneInput) => {
      if (
        formData?.filter((ele) => {
          return ele?.input?.type.toLowerCase()?.includes("file");
        }).length > setPhoneNumberFxnRefs?.current?.length
      ) {
        setPhoneNumberFxnRefs?.current.push(element);
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
            return (
              Ref?.uploadFileInputRef?.name?.toLowerCase()?.trim() ===
              element?.label?.toLowerCase()?.trim()
            );
          });
        }
      });
    }, [setFileFxnRefs]);

    const ON_SUBMIT = (e: React.MouseEvent) => {
      e.preventDefault();
      let validityChecked: Array<boolean> = [];

      formData?.forEach((element, index) => {
        //for files
        if (element?.input?.type === "file") {
          if (element.input?.required) {
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
                  inputRefs?.current?.forEach((e, i) => {
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

              return (
                Ref?.uploadFileInputRef?.name?.toLowerCase()?.trim() ===
                element?.label?.toLowerCase()?.trim()
              );
            });
          }
        } else {
          //if not files
          let ref = inputRefs.current?.find((ref) => {
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

                  if (element?.validator) {
                    //if phone number
                    if (element?.input?.type?.toLowerCase()?.includes("tel")) {
                      //if no local storage value

                      let phoneNumberString = ref?.value.toString();
                      let localStorageCountryCode: any;

                      if (localStorage.getItem(`${element?.label}`)) {
                        localStorageCountryCode = localStorage.getItem(
                          `${element?.label}`
                        );
                      }
                      if (
                        (localStorage?.getItem(`${element?.label}`) !== null &&
                          isValidPhoneNumber(
                            parsePhoneNumber(
                              phoneNumberString,
                              localStorageCountryCode
                            )?.number
                          )) ||
                        isValidPhoneNumber(ref?.value)
                      ) {
                        setformData((p: Array<iFormDataObject>) => {
                          p.find((item) => {
                            return (
                              item?.label?.toLowerCase() ===
                              ref?.name?.toLowerCase()
                            );
                          }).data = parsePhoneNumber(
                            phoneNumberString,
                            localStorageCountryCode
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
                      if (element?.validator(ref?.value)) {
                        FieldSetRefs.current[index].style.borderColor = "";

                        setformData((p: Array<iFormDataObject>) => {
                          p.find((item) => {
                            return (
                              item?.label?.toLowerCase() ===
                              ref?.name?.toLowerCase()
                            );
                          }).data = ref?.value;
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
                    //if no validator provided.
                    if (ref.value.length > 0) {
                      FieldSetRefs.current[index].style.borderColor = "";
                      setformData((p: Array<iFormDataObject>) => {
                        p.find((item) => {
                          return (
                            item?.label?.toLowerCase() ===
                            ref?.name?.toLowerCase()
                          );
                        }).data = ref?.value;
                        return [...p];
                      });

                      validityChecked[index] = true;
                    } else {
                      validityChecked[index] = false;
                      FieldSetRefs.current[index].style.borderColor = "red";
                      setFeedback("Please enter all required fields");
                    }
                  }
                }
              }
            } else {
              FieldSetRefs.current[index].style.borderColor = "";
              //if not required
              if (ref?.value) {
                if (element?.validator) {
                  if (element.validator(ref?.value)) {
                    //if no valid condition function
                    FieldSetRefs.current[index].style.borderColor = "";
                    validityChecked[index] = true;

                    setformData((p: Array<iFormDataObject>) => {
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

                  setformData((p: Array<iFormDataObject>) => {
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
        inputRefs?.current.forEach((i) => {
          validatedData.current[replaceWhiteSpaceWithDash(i.name)] = i.value;
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
        if (navigation?.next) {
          setCurrentContent(navigation?.next);
        }
      }
    };

    const ON_CANCEL = () => {
      console.log(
        formData?.find((element) => {
          return element?.data !== "";
        })
      );
      if (
        inputRefs.current?.find((element) => {
          return element.value?.length > 0;
        }) ||
        formData?.find((element) => {
          return element?.data !== "";
        })
      ) {
        if (navigation?.previous) {
          //if there is previous
          formData?.forEach((item) => {
            let ref = inputRefs.current?.find((ref) => {
              return ref?.name?.toLowerCase() === item?.label?.toLowerCase();
            });

            item.data = ref.value;
          });

          setCurrentContent(navigation?.previous);
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
      inputRefs?.current?.forEach((element) => {
        element.value = "";
      });

      setPassowrdFxnRefs?.current?.forEach((element) => {
        element.setPassword("");
      });

      setPhoneNumberFxnRefs?.current?.forEach((element) => {
        element?.setPhoneInputValue("");
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
      if (navigation?.previous) {
        //if there is previous
        formData?.forEach((item) => {
          let ref = inputRefs.current?.find((ref) => {
            return ref?.name?.toLowerCase() === item?.label?.toLowerCase();
          });

          item.data = ref.value;
        });

        setCurrentContent(navigation?.previous);
      } else {
        //if no previous
        clearInputs();

        //clear data property in fromDataObject
        formData?.forEach((item) => {
          let ref = inputRefs.current?.find((ref) => {
            return ref?.name?.toLowerCase() === item?.label?.toLowerCase();
          });

          item.data = "";
        });

        if (formDataSetterFunctions?.length > 0) {
          formDataSetterFunctions.forEach((setterFunction) => {
            setterFunction((p: Array<iFormDataObject>) => {
              p.forEach((i) => {
                i.data = "";
                return { ...i };
              });
              return [...p];
            });
          });
        }

        inputRefs?.current?.forEach((element) => {
          element.value = "";
          return (element.style.borderColor = "");
        });

        if (navigation?.default) {
          setCurrentContent(navigation?.default);
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
    const onFileUpload = (files: HTMLImageElement) => {
      setformData((p: iFormDataObject[]) => {
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
      let feedbackTimeout: any;

      const feedBackSetter = () => {
        if (feedback) {
          setFeedback("");
        }
      };

      feedbackTimeout = setTimeout(() => {
        feedBackSetter();
      }, 3000);

      return () => {
        clearTimeout(feedbackTimeout);
      };
    }, [feedback]);

    return (
      <>
        {bools?.showCancelModal && (
          <Modal
            EffectNotice={"You will lose current operation."}
            ActionInOneWord="Cancel"
            CancelInOneWord="Go back"
            ActionFucntion={cancelOperation}
            CancelFunction={() =>
              setBools((p) => {
                return { ...p, showCancelModal: false };
              })
            }
            Styles={Styles}
          />
        )}
        <main className="w-full max-w-[500px]  mx-auto">
          <h1 className="uppercase font-bold  w-fit relative left-[35%] pb-4 ">
            {formTitle}
          </h1>

          <div className="text-center text-red-500 relative bottom-4">
            <span style={{ visibility: "hidden" }}>.</span>
            <span data-testid="feedback">{feedback}</span>
          </div>
          <section className="flex w-full">
            <form className="w-[400px]" style={Styles?.form}>
              {formData?.length > 0 &&
                formData.map((element, index) => {
                  return (
                    element?.input?.type !== "file" && (
                      <fieldset
                        key={index}
                        className={inputStyle.valid}
                        ref={addToFielSetRefs}
                        style={Styles?.input}
                      >
                        {!formType?.regular && (
                          <legend
                            className="text-[12px] text-yellow-700 "
                            style={{ ...Styles?.label }}
                          >
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
                        <label
                          style={Styles?.row}
                          htmlFor={element?.label?.toLowerCase()}
                        >
                          {formType?.regular && (
                            <div
                              className="transition-all relative"
                              style={Styles?.label}
                            >
                              {element?.label}{" "}
                              <span className="text-xs absolute right-0 top-[50%] translate-y-[-50%]">
                                {element?.input?.required && " *"}
                              </span>{" "}
                            </div>
                          )}

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
                                backgroundColor: "transparent",
                              }}
                              {...element?.input}
                              id={element?.label?.toLowerCase()}
                              placeholder={
                                element?.input?.placeholder
                                  ? ` ${element?.input?.placeholder}`
                                  : ` ${element?.label?.trim()}`
                              }
                              name={element?.label.toLowerCase()}
                              ref={addInputRefs}
                              defaultValue={element?.data}
                              onFocus={() => {}}
                            ></input>
                          ) : element?.input?.type?.trim()?.toLowerCase() ===
                            "select" ? (
                            <Select
                              ref={addToSelectedValueFxns}
                              REF={addInputRefs}
                              formDataObject={element}
                              Styles={Styles}
                              inputRefs={inputRefs.current}
                            />
                          ) : element?.input?.type === "tel" ? (
                            <PhoneNumer
                              formDataObject={element}
                              REF={addInputRefs}
                              ref={addTosetPhoneNumberFxnRefs}
                              Styles={Styles}
                            />
                          ) : element?.input?.type === "radio" ? (
                            <Radio
                              ref={addTosetRadioFxnRefs}
                              formDataObject={element}
                              REF={addInputRefs}
                              Styles={Styles}
                            />
                          ) : element?.input?.type === "password" ? (
                            <Password
                              ref={addToSetPasswordFxnRefs}
                              formDataObject={element}
                              REF={addInputRefs}
                              Styles={Styles}
                              inputRefs={inputRefs.current}
                            />
                          ) : (
                            ""
                          )}
                        </label>
                      </fieldset>
                    )
                  );
                })}

              <div className="mt-5 h-[100px]">
                <Button
                  type="submit"
                  onClick={(e: React.MouseEvent) => {
                    ON_SUBMIT(e);
                  }}
                  style={{
                    padding: "5px 10px",
                    marginRight: "10px",
                    ...Styles?.button,
                  }}
                >
                  {navigation?.next
                    ? "Save"
                    : buttonLabels?.submit
                    ? buttonLabels.submit
                    : "Submit"}
                </Button>

                <Button
                  type="reset"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    ON_CANCEL();
                  }}
                  style={{
                    padding: "5px 10px",
                    marginLeft: "10px",
                    ...Styles?.button,
                  }}
                >
                  {navigation?.previous
                    ? "Back"
                    : buttonLabels?.reset
                    ? buttonLabels?.reset
                    : "Cancel"}
                </Button>
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
                      REF={addInputRefs}
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

/// Additional Docs
/// The setter fuctions of all subComponents are forwared to this form via forward ref.
/// On save of  this form, the setter fuctions returned from the subComponents are used to validated and save values of the REF(inputRef) of the subComponent's input, into the data property of the formDataObject.

//on cancel, in ClearInput Fuction , clear inputs of subcomponenta by utilizing the setter fuctions returened by the
