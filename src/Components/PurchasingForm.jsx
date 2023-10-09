import React, { useState, useEffect, useRef } from "react";
import {
  isValidDate,
  convertMonthTo_ALPHABETS,
} from "../Functions/DateFunctions";
import axios from "axios";
import Modal from "./Modal";
import List from "../Components/List";
import PageRightSide from "./PageRightSide";

import "../index.css";
import Form from "./Form";
import {
  insertArrayItem,
  removeArrayItem,
} from "../Functions/FormatArraysAndObjects";

const PurchaseForm = ({ TypeOfPurchase }) => {
  const ConvertNANtoZero = (data) => {
    if (!Number(data)) {
      return 0;
    } else {
      return Number(data);
    }
  };
  //purchase details states
  const [feedback, setFeedback] = useState(null);

  const [dataFromAPI, setDataFromAPI] = useState({
    fetchItemsResults: [
      {
        id: 1,
        name: "cement",
        type: "Ghacem black",
        size: "50kg",
        price: "80",
        code: "ds323433ddfdsf",
      },
      {
        id: 2,
        name: "Paint",
        type: "Azar",
        size: "Mini bucket",
        price: "80",
        code: "ds323433ddfdsf",
      },
    ],
    fetchSuppliersResults: [
      {
        id: 1,
        name: "David Ensor",
        phone: "0233443353",
        company: "Obaapa Gyasi Enterprise",
      },
    ],
  });

  const [purchaseDetails, setPurcahseDetails] = useState({
    Supplier: {},
    dateofPurcahse: "",
    specificPurchase: "Pieces",
    ALLitemsSelected: [],
    detailsExpanded: [],
  });

  const purcahseType = {
    pieces: "Pieces",
    packs: "Packs",
  };

  const [bools, setBools] = useState({
    showCancelModal: false,
    showLoading: false,
    showSwitchPurchaseTypeModal: false,
    dateAlreadySet: false,
    supplierAlreadySet: false,
  });

  const [PiecesformData, setPiecesformData] = useState([
    {
      label: "Item",
      data: "",
      input: {
        type: "select",
        required: true,
        autoComplete: "off",
        placeholder: "Item name",
      },
      validCondintion: (itemanme) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      children: dataFromAPI?.fetchItemsResults,
    },
    {
      label: "Quantity",
      data: "",
      input: {
        type: "number",
        required: true,
        autoComplete: "off",
        placeholder: "Quantity",
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
      label: "Unit price",
      data: "",
      input: {
        type: "number",
        required: true,
        autoComplete: "off",
        placeholder: "Unit cost",
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
      label: "AddOns",
      data: "",
      input: {
        type: "number",
        required: false,
        autoComplete: "off",
        placeholder: "Extra added on",
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
      label: "Discount",
      data: "",
      input: {
        type: "number",
        required: false,
        autoComplete: "off",
        placeholder: "Discount per Item",
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
      label: "VAT",
      data: "",
      input: {
        type: "text",
        required: false,
        autoComplete: "off",
        placeholder: "VAT per item",
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
      label: "Supplier",
      data: "",
      input: {
        type: "select",
        required: true,
        autoComplete: "off",
        placeholder: "Select Supplier",
      },
      validCondintion: (itemanme) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      children: dataFromAPI?.fetchSuppliersResults,
    },
    {
      label: "Date",
      data: "",
      input: {
        type: "date",
        required: true,
        autoComplete: "off",
        placeholder: "Select Supplier",
      },
      validCondintion: (itemanme) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);

  //PAGE THEME COLORS
  const colors = {
    currentBtnColor: "#334155",
    defaultColor: "#cbd5e1",
    errorColor: "red",
    f3f3f3: "#f3f3f3",
    white: "white",
  };

  const formRef = useRef();

  const cancelOperation = () => {
    formRef?.current?.clearInputs();

    if (bools.showSwitchPurchaseTypeModal) {
      if (purchaseDetails?.specificPurchase === purcahseType?.packs) {
        purchaseDetails.specificPurchase = purcahseType.pieces;
      } else if (purchaseDetails?.specificPurchase === purcahseType?.pieces) {
        purchaseDetails.specificPurchase = purcahseType.packs;
      }
    }
    setBools((p) => {
      return {
        ...p,
        showSwitchPurchaseTypeModal: false,
      };
    });

    setPurcahseDetails((p) => {
      return { ...p, ALLitemsSelected: [], detailsExpanded: [] };
    });
  };

  const checkForOngoingOperation = () => {
    if (
      PiecesformData?.find((element) => {
        return element.data !== "";
      }) ||
      purchaseDetails?.ALLitemsSelected?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  //CHANGING FORM'S titles buttons COLOR
  const piecesBtnRef = useRef();
  const packsBtnRef = useRef();

  useEffect(() => {
    if (purchaseDetails.specificPurchase === purcahseType.pieces) {
      piecesBtnRef.current.style.backgroundColor = colors.currentBtnColor;
      piecesBtnRef.current.style.color = colors.f3f3f3;
    } else {
      piecesBtnRef.current.style.backgroundColor = colors.f3f3f3;
      piecesBtnRef.current.style.color = colors.currentBtnColor;
    }
    if (purchaseDetails.specificPurchase === purcahseType.packs) {
      packsBtnRef.current.style.backgroundColor = colors.currentBtnColor;
      packsBtnRef.current.style.color = colors.f3f3f3;
    } else {
      packsBtnRef.current.style.backgroundColor = colors.f3f3f3;
      packsBtnRef.current.style.color = colors.currentBtnColor;
    }
  }, [purchaseDetails.specificPurchase]);

  //close filterBox

  //FETCH DATA
  const getData = async (e) => {
    // setBools((p) => {
    //   // return { ...p, showLoading: true };
    // });
    // try {
    //   //fetch ITEMS and suppliers
    //   let itemsResponse = await axios.get(`${BaseURL}/items`, {
    //     withCredentials: true,
    //   });
    //   if (itemsResponse.status === 200) {
    //     setFetchItemshResults(itemsResponse.data.items);
    //     getSuppliers();
    //   }
    //   if (itemsResponse?.status === 204) {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setFeedback("Add items you sell");
    //   }
    // } catch (error) {
    //   console.log(error.response.status);
    //   if (!error?.response?.data) {
    //     setFeedback("Could not connect");
    //   } else if (error?.response?.status === 401) {
    //     GotoRefreshEndPoint(auth).then((r) => {
    //       if (r.status === 200) {
    //         getData();
    //       } else {
    //         navigateTo(
    //           `/${auth?.usersNameInURL?.trim()?.toLowerCase()}/sign-out`
    //         );
    //       }
    //     });
    //   } else {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setStatuscodeErrorMessage(error?.response?.status, setFeedback);
    //   }
    // }
  };

  const getSuppliers = async () => {
    // try {
    //   let suppliersResponse = await axios.get(`${BaseURL}/suppliers`, {
    //     withCredentials: true,
    //   });
    //   if (suppliersResponse.status === 200) {
    //     setFetchSuppliershResults(suppliersResponse.data.suppliers);
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     itemNameRef.current.focus();
    //   }
    //   if (suppliersResponse?.status === 204) {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setFeedback("Add suppliers you purchase from");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (!error?.response?.data) {
    //     setFeedback("Could not connect");
    //   } else if (error?.response?.status === 401) {
    //     GotoRefreshEndPoint(auth).then((r) => {
    //       if (r.status === 200) {
    //         getSuppliers();
    //       } else {
    //         navigateTo(
    //           `/${auth?.usersNameInURL?.trim()?.toLowerCase()}/sign-out`
    //         );
    //       }
    //     });
    //   } else {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setStatuscodeErrorMessage(error?.response?.status, setFeedback);
    //   }
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  //Make final submission handler
  const submitRequest = async () => {
    try {
      setBools((p) => {
        return { ...p, showLoading: true };
      });

      let response = await axios.post(
        `${process.env.REACT_APP_LOCAL_BASE_URL}/purcahseitems`,
        {
          items: purchaseDetails.ALLitemsPaidFor,
          date: {
            numerical: purchaseDetails.dateofPurcahse,
            words: convertMonthTo_ALPHABETS(purchaseDetails.dateofPurcahse),
          },
          supplier: purchaseDetails.Supplier,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setFeedback("Submitted successfully");
        cancelOperation();
        setBools((p) => {
          return { ...p, showLoading: false };
        });
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data) {
        setFeedback("Could not connect");
      } else if (error?.response?.status === 401) {
        //     GotoRefreshEndPoint(auth).then((r) => {
        //       if (r.status === 200) {
        //         submitRequest();
        //       } else {
        //         navigateTo(
        //           `/${auth?.usersNameInURL?.trim()?.toLowerCase()}/sign-out`
        //         );
        //       }
        //     });
        //   } else {
        //     setBools((p) => {
        //       return { ...p, showLoading: false };
        //     });
        //     setStatuscodeErrorMessage(error?.response?.status, setFeedback);
      }
    }
  };

  const stopActionForModal = () => {
    setBools((p) => {
      return {
        ...p,
        showCancelModal: false,
        showSwitchPurchaseTypeModal: false,
      };
    });
  };

  const onFormCancel = () => {
    //clear AllItemsSelected and clear detailsExpanded
    setPurcahseDetails((p) => {
      return { ...p, ALLitemsSelected: [], detailsExpanded: [] };
    });

    //insert Supplier and Date back into the form thus if item and supplier are not in the form already.
    if (
      PiecesformData?.find((element) => {
        return element?.label?.trim()?.toLowerCase() === "supplier";
      })
    ) {
      setPiecesformData((p) => {
        p?.forEach((item) => {
          item.data = "";
        });
        return [...p];
      });
    } else {
      setPiecesformData((p) => {
        p.forEach((item) => {
          item.data = "";
        });
        return [
          ...p,
          {
            label: "Supplier",
            data: "",
            input: {
              type: "select",
              required: true,
              autoComplete: "off",
              placeholder: "Select Supplier",
            },
            validCondintion: (itemanme) => {
              if (itemanme.length > 0) {
                return true;
              } else {
                return false;
              }
            },
            children: dataFromAPI?.fetchSuppliersResults,
          },
          {
            label: "Date",
            data: "",
            input: {
              type: "date",
              required: true,
              autoComplete: "off",
              placeholder: "Select Supplier",
            },
            validCondintion: (itemanme) => {
              if (itemanme.length > 0) {
                return true;
              } else {
                return false;
              }
            },
          },
        ];
      });
    }
  };
  const OnFormSubmit = (ValidatedData_FromForm) => {
    const itemObject = {
      id: ValidatedData_FromForm?.item?.id,
      name: `${
        ValidatedData_FromForm?.item?.name
          ? ValidatedData_FromForm?.item?.name
          : ""
      } ${
        ValidatedData_FromForm?.item?.type
          ? ValidatedData_FromForm?.item?.type
          : ""
      } ${
        ValidatedData_FromForm?.item?.size
          ? ValidatedData_FromForm?.item?.size
          : ""
      }`,
      quantity: ValidatedData_FromForm?.quantity,
      price: ValidatedData_FromForm?.unit_price,
      addons: ValidatedData_FromForm?.addons,
      totalDiscount:
        ConvertNANtoZero(ValidatedData_FromForm?.discount) *
        ConvertNANtoZero(ValidatedData_FromForm?.quantity),
      totalVAT:
        ConvertNANtoZero(ValidatedData_FromForm?.vat) *
        ConvertNANtoZero(ValidatedData_FromForm?.quantity),
      total_cost: parseFloat(
        ConvertNANtoZero(ValidatedData_FromForm?.quantity) *
          ConvertNANtoZero(ValidatedData_FromForm?.unit_price) -
          ConvertNANtoZero(ValidatedData_FromForm?.discount) *
            ConvertNANtoZero(ValidatedData_FromForm?.quantity) +
          ConvertNANtoZero(ValidatedData_FromForm?.vat) *
            ConvertNANtoZero(ValidatedData_FromForm?.quantity)
      ).toFixed(2),
      totalpieces:
        ConvertNANtoZero(ValidatedData_FromForm?.puantity) *
          ConvertNANtoZero(ValidatedData_FromForm?.pcs_in_pack) +
        ConvertNANtoZero(ValidatedData_FromForm?.addons),
      dateInNumers: ValidatedData_FromForm?.date,
    };

    if (purchaseDetails?.ALLitemsSelected?.length === 0) {
      setPurcahseDetails((p) => {
        return {
          ...p,
          Supplier: ValidatedData_FromForm?.supplier,
          dateofPurcahse: ValidatedData_FromForm?.date,
          ALLitemsSelected: [...p.ALLitemsSelected, itemObject],
        };
      });

      //remove supplier  and date from form data
      setPiecesformData((p) => {
        return p.slice(
          0,
          p.indexOf(
            p.find((item) => {
              return item.label?.toLowerCase()?.trim() === "supplier";
            })
          )
        );
      });

      setFeedback("Added successfully.");
      formRef.current?.clearInputs();
    } else {
      if (
        purchaseDetails?.ALLitemsSelected?.find((element) => {
          return element?.id === ValidatedData_FromForm?.item?.id;
        })
      ) {
        setFeedback("Item already added to list.");
      } else {
        setPurcahseDetails((p) => {
          return {
            ...p,
            ALLitemsSelected: [...p.ALLitemsSelected, itemObject],
          };
        });
        setFeedback("Added successfully.");
        formRef.current?.clearInputs();
      }
    }
  };

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  });

  return (
    <main
      className="relative flex w-full h-full "
      style={{
        backgroundColor: "white",
      }}
    >
      {bools?.showSwitchPurchaseTypeModal && (
        <Modal
          EffectNotice={"You will lose current operation"}
          ActionInOneWord={"Switch purchase type"}
          ActionFucntion={cancelOperation}
          CancelFunction={stopActionForModal}
        />
      )}

      <div className="w-full h-full">
        {bools?.showLoading && <div>LOADING....</div>}

        <div className="PURCHASEComponentContainer flex h-full">
          <PageRightSide
            appName={"CYNOSURE"}
            actions={[
              {
                ref: piecesBtnRef,
                label: `${TypeOfPurchase} ${purcahseType?.pieces}`,
                onClick: () => {
                  if (
                    purchaseDetails?.specificPurchase?.trim()?.toLowerCase() !==
                    purcahseType?.pieces?.trim()?.toLowerCase()
                  ) {
                    if (checkForOngoingOperation()) {
                      setBools((p) => {
                        return { ...p, showSwitchPurchaseTypeModal: true };
                      });
                    } else {
                      formRef?.current?.clearInputs();
                      setPurcahseDetails((p) => {
                        return { ...p, specificPurchase: purcahseType?.pieces };
                      });
                      setPiecesformData((p) => {
                        return removeArrayItem(
                          p,
                          p.indexOf(
                            p.find((element) => {
                              return (
                                element.label?.toLowerCase() ===
                                "Pcs in Packs"?.toLowerCase()
                              );
                            })
                          ),
                          1
                        );
                      });
                    }
                  }
                },
              },
              {
                ref: packsBtnRef,
                label: `${TypeOfPurchase} ${purcahseType?.packs}`,
                onClick: () => {
                  if (
                    purchaseDetails?.specificPurchase?.trim()?.toLowerCase() !==
                    purcahseType?.packs?.trim()?.toLowerCase()
                  ) {
                    if (checkForOngoingOperation()) {
                      setBools((p) => {
                        return { ...p, showSwitchPurchaseTypeModal: true };
                      });
                    } else {
                      setPurcahseDetails((p) => {
                        return { ...p, specificPurchase: purcahseType?.packs };
                      });

                      formRef?.current?.clearInputs();

                      setPiecesformData((p) => {
                        return insertArrayItem(
                          p,
                          {
                            label: "Pcs in Packs",
                            data: "",
                            input: {
                              type: "number",
                              required: true,
                              autoComplete: "off",
                              placeholder: "Pieces in pack",
                            },
                            validCondintion: (number) => {
                              if (Number(number) > 0) {
                                return true;
                              } else {
                                return false;
                              }
                            },
                          },
                          2
                        );
                      });
                    }
                  }
                },
              },
            ]}
          />

          {
            <section className="leftsideContainer  w-full flex border-2 border-l-0 ">
              <div className="leftside w-full h-full">
                <div className=" w-full flex h-full">
                  <div className="formsContainer p-2 border-r-2">
                    <h4 className="text-center text-lg relative top-6">
                      {TypeOfPurchase}
                      <span style={{ color: colors.errorColor }}>
                        <i>{` ${purchaseDetails.specificPurchase}`} </i>
                      </span>
                    </h4>

                    <div
                      className={
                        feedback?.includes("successfull")
                          ? "text-center relative top-4 text-green-600 shadow-md shadow-green-200 w-fit mx-auto"
                          : "text-center relative top-4 text-red-600 shadow-md shadow-red-200 w-fit mx-auto"
                      }
                    >
                      {feedback} <span style={{ visibility: "hidden" }}>.</span>
                    </div>

                    <Form
                      ref={formRef}
                      formData={PiecesformData}
                      setformData={setPiecesformData}
                      onSubmit={OnFormSubmit}
                      onCancel={onFormCancel}
                      Styles={{
                        form: {
                          width: "fit-content",
                          top: "0px",
                        },
                        row: {
                          display: "flex",
                          fontWeight: "normal",
                          width: "fit-content",
                          height: "35px",
                        },
                        label: {
                          width: "95px",
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "normal",
                          marginRight: "5px",
                        },
                        input: {
                          borderRadius: "0px",
                        },
                      }}
                    />
                  </div>
                  {purchaseDetails?.ALLitemsSelected?.length > 0 && (
                    <List
                      Date={{
                        //date is the only prop that is an object, all other props are arrays of objects {title, data}
                        title: "Date",
                        data: purchaseDetails?.dateofPurcahse,
                      }}
                      CompleteData={{
                        title: [
                          "id",
                          "name",
                          "quantity",
                          "price",
                          "add-ons",
                          "total discount",
                          "total vat",
                          "total cost",
                          "total pieces",
                        ],
                        data: [...purchaseDetails?.ALLitemsSelected],
                        detailsExpanded: purchaseDetails?.detailsExpanded,
                      }}
                      Columns={{
                        title: ["Name", "Price", "Quantity", "Total"],
                        data: purchaseDetails?.ALLitemsSelected?.map(
                          ({ name, price, quantity, total_cost }) => {
                            //  console.log(item);
                            return {
                              name,
                              price,
                              quantity,
                              total_cost,
                            };
                          }
                        ),
                      }}
                      OnTopOfTable={[
                        {
                          title: "Supplier",
                          data: Object.values(purchaseDetails?.Supplier),
                        },
                      ]}
                      Actions={[
                        {
                          title: "details",
                          action: (id) => {
                            if (
                              purchaseDetails.detailsExpanded?.find((ID) => {
                                return ID === id;
                              })
                            ) {
                              setPurcahseDetails((p) => {
                                return {
                                  ...p,
                                  detailsExpanded:
                                    purchaseDetails.detailsExpanded?.filter(
                                      (ID) => {
                                        return ID !== id;
                                      }
                                    ),
                                };
                              });
                            } else {
                              setPurcahseDetails((p) => {
                                return {
                                  ...p,
                                  detailsExpanded: [
                                    ...purchaseDetails?.detailsExpanded,
                                    id,
                                  ],
                                };
                              });
                            }
                          },
                        },
                        {
                          title: "delete",
                          btnColor: "red",
                          action: (id) => {
                            if (
                              purchaseDetails?.ALLitemsSelected?.length === 1
                            ) {
                              //onFormCancel empties allItemsSelected and detailsOpened
                              //onFormCancel also sets supplier and data back into form
                              onFormCancel();
                              setPurcahseDetails((p) => {
                                return {
                                  ...p,
                                  ALLitemsSelected: [],
                                };
                              });
                            } else {
                              setPurcahseDetails((p) => {
                                return {
                                  ...p,
                                  ALLitemsSelected:
                                    purchaseDetails?.ALLitemsSelected?.filter(
                                      (element) => {
                                        return element?.id !== id;
                                      }
                                    ),
                                };
                              });
                            }
                          },
                        },
                      ]}
                    />
                  )}
                </div>
              </div>
            </section>
          }
        </div>
      </div>
    </main>
  );
};

export default PurchaseForm;
